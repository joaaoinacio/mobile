import http from '../services/api';
import Routes from '../services/routes';
import {Store} from '../store';
import { setJornada, setLancamentos } from '../store/actions';
import Database from '../database';
import ConnectionController from './ConnectionController';
import AuthController from './AuthController';
import {isEmpty} from 'lodash';
import Axios from 'axios';
import moment from 'moment';
import { Toast } from 'native-base';
import ErrorHandle from './ErrorHandle';
import { sleep } from '../functions/util';


export default class JornadaController {

    static async index(forceUpdate){
        //CREATE DATABASE INSTANCE
        const DB = new Database('JornadaMenu')
        try{
            let storeData = Store.getState().jornada.jornada 
            if(!isEmpty(storeData) && !isEmpty(storeData.menu) && !forceUpdate){
                return Promise.resolve('Done')
            }
            //OPEN DATABASE
            await DB.open()
            //GET OFFLINE VALUES
            const offlineData = await DB.index()
            //DISPACH OFFLINE VALUES ALREADY SETTED
            Store.dispatch(setJornada({
                menu: offlineData
            }))
            //VERIFY CONNECTION
            const isConnected = await ConnectionController.isConnected()
            //HAS CONNECTION
            if(isConnected){
                //GET DATA FROM API
                const apiData = await http.get(Routes.api + '/jornada/menu')
                //SYNC DATABASE
                await DB.deleteAll()
                const dbData = await DB.store(apiData && apiData.data)
                //SET REDUX STORE
                Store.dispatch(setJornada({
                    menu: dbData
                }))
                //CLOSE DATABASE
                await DB.close()
                //RESOLVE DATA
                return Promise.resolve(dbData)
            }
            //HAS NO CONNECTION
            else{
                //CLOSE DATABASE
                await DB.close()
                return Promise.resolve('Done!')
            }
        }
        catch(err){
            DB.close()
            return Promise.reject(err)
        }  
    }

    static async store(data){
         //CREATE DATABASE INSTANCE
         const DB = new Database('JornadaLancamentoEnviar')
        try{
            const isConnected = await ConnectionController.isConnected()
            console.log(isConnected)
            //OPEN DATABASE
            await DB.open()
            //SYNC DATABASE
            const dbData = await DB.store([data])
            //CLOSE DATABASE
            await DB.close()
            //SEND DATA TO SERVER
            if(isConnected) await JornadaController.syncLancamentosEnviar()
            else await sleep(2000)
            //RESOLVE DATA
            return Promise.resolve(dbData)
        }
        catch(err){
             //CLOSE DATABASE
            await DB.close()
            await ErrorHandle.store(err)
            return Promise.reject(err)
        }

    }
 

    static async getLancamentos(query){
        try{
            await JornadaController.dispatchLancamentos(query)
            return Promise.resolve('done!')
        }
        catch(err){
            return Promise.reject(err)
        }
    }

    static async getLancamentosAPI(days){
        try{
            const isConnected = await ConnectionController.isConnected()
            if(!isConnected){
                Toast.show({
                    text: 'Sem conexão com internet! Para ver lançamentos em um período maior que 60 dias há necessidade de rede, conecte seu smartphone em uma rede estável e tente novamente.',
                    type: 'warning',
                    duration: 13000,
                    buttonText: 'Ok'
                })
                return Promise.resolve('Done')
            }
            const response = await http.get(Routes.api + '/jornada/lancamentos?days=' + days)
            if(isEmpty(response)){
                Store.dispatch(setLancamentos({
                    list: []
                }))
                return Promise.resolve('Done')
            }
            if(isEmpty(response.data)){
                Store.dispatch(setLancamentos({
                    list: []
                }))
                return Promise.resolve('Done')
            }
            Store.dispatch(setLancamentos({
                list: response.data.sort((a,b) => { return new Date(b.data) - new Date(a.data) })
            }))
            return Promise.resolve('done!')
        }
        catch(err){
            return Promise.reject(err)
        }
    }

    static async syncLancamentosEnviar(service){
        const DB = new Database('JornadaLancamentoEnviar')
        const DB2 = new Database('JornadaLancamentos')
        
        try{
            const isConnected = await ConnectionController.isConnected()
            if(!isConnected){
                return Promise.resolve('Done')
            }  
            await DB.open()
            const offline_data = await DB.index()
            if(isEmpty(offline_data)){
                await DB.close()
                return Promise.resolve('Done')
            }

            Date.prototype.toJSON = function(){
                return moment(this).format();
            };
            
            const axios_config = await AuthController.getHeaders()
            const response = await Axios.post(Routes.api + '/jornada/lancamentos', {lancamentos: offline_data}, axios_config)
            if(isEmpty(response)){
                await DB.close()
                return Promise.resolve('Done')
            }
            if(isEmpty(response.data)){
                await DB.close()
                return Promise.resolve('Done')
            }
            await DB.deleteAll()
            await DB.close()

            await DB2.open()
            await DB2.store(response.data)
            await DB2.close()

            if(!service)
                Toast.show({
                    text: response.data.length + ' Lançamentos Sincronizados com Sucesso!',
                    type: 'success',
                    duration: 3000,
                    buttonText: 'Ok'
                })
            
            return Promise.resolve('Done')
        }
        catch(err){
            console.log('deu ruim', err)
            await DB.close()
            await DB2.close()
            return Promise.reject(err)
        }

    }

    static async syncLancamentosApi(query){
        //CREATE DATABASE INSTANCE
        const DB = new Database('JornadaLancamentos')
        try{
            const isConnected = await ConnectionController.isConnected()
            if(!isConnected) return Promise.resolve("Sem conexão")
            //OPEN DATABASE
            await DB.open()
            //GET HEADERS
            const axios_config = await AuthController.getHeaders()
            //FETCH DATA
            const response = await Axios.get(Routes.api + '/jornada/lancamentos?days=60', axios_config)
            if(isEmpty(response)){
                await DB.close()
                return Promise.resolve('Done')
            }
            if(isEmpty(response.data)){
                await DB.close()
                return Promise.resolve('Done')
            }
            //GET DATA FROM DATABASE
             const dbData = await DB.store(response.data)
             //CLOSE DATABASE
             await DB.close()
             //RESOLVE DATA
             return Promise.resolve(dbData)
        }
        catch(err){

            console.log('error to sync data', err)
             //CLOSE DATABASE
             await DB.close()
            return Promise.reject(err)
        }

    }

    static async dispatchLancamentos(query){
        const DB = new Database('JornadaLancamentos')
        const DB2 = new Database('JornadaLancamentoEnviar')
        
        try{    
            await DB.open()
            const offline_data = await DB.index(query)
            await DB.close()
            console.log('3 caiu aqui', offline_data)
        
            await DB2.open()
            const offline_data_2 = await DB2.index(query)
            await DB2.close()

            let data = [...offline_data, ...offline_data_2]
            Store.dispatch(setLancamentos({
                list: data.sort((a,b) => { return new Date(b.data) - new Date(a.data) })
            }))
            return Promise.resolve(data)
        }
        catch(err){
            console.log('deu ruim', err)
            await DB.close()
            await DB2.close()
            return Promise.reject(err)
        }
    }

    static async dropLancamentos(){
        const DB = new Database('JornadaLancamentos')
        try{    
            await DB.open()
            await DB.deleteAll()
            await DB.close()
            return Promise.resolve('Done')
        }
        catch(err){
            await DB.close()
            return Promise.reject(err)
        }
    }

}