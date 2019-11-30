import Routes from '../services/routes';
import Axios from 'axios';
import apiErros, { voidError } from '../services/apiErrors';
import { Toast } from 'native-base';
import AsyncStorage  from '@react-native-community/async-storage';
import NavigationService from '../NavigationService';
import { isEmpty } from 'lodash';
import {Store} from '../store';
import { setUser } from '../store/actions';
import Database from '../database';


export default class AuthController {

    static index (user){
        return new Promise((resolve, reject) => { 
            Axios.post(Routes.url + '/oauth/token', {
                // client_id: 12,
                // client_secret: 'jFc2AtMRezvMFgBQpwDgckrlbLMuGTfyFXUiAOsm',
                // grant_type: 'password', 
                client_id: 4,
                client_secret: 'q1ShOPElLMu1yXTKOwvAjthqizmhBapHQjepkQHu',
                grant_type: 'password', 
            ...user})
            .then(response => {
                if(isEmpty(response)) {
                    voidError()
                    reject('Network Error!')
                }
                if(isEmpty(response.data)) {
                    voidError()
                    reject('Network Error!')
                }

                AuthController.setPersistences(response.data).then((res) => {
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                })
                
            })
            .catch(error => {
                if(isEmpty(error)) {
                    voidError()
                    reject('Network Error!')
                }
                if(isEmpty(error.response)) {
                    voidError()
                    reject('Network Error!')
                }
                if(error.response.status != 401 && error.response.status != 400){
                    apiErros(error.response)  
                    reject(error.response)
                } 
                else {
                    Toast.show({
                        text: 'Credenciais inválidas!',
                        type: 'warning',
                        duration: 3000
                    })
                    reject('credenciais invalidas')
                }
                reject(error)
            })
        })
    }

    static async isLogged(){
        try {
            const token = await AuthController.getToken();
            const user  = await AuthController.getUser();
            if(!isEmpty(token) && !isEmpty(user)){
                Axios.defaults.headers.common['Authorization'] = token
                return Promise.resolve(true)
            }
            else {
                await AuthController.loggout()
                return Promise.reject(false)
            }
        } catch (error) {
            await AuthController.loggout()
            return Promise.reject(false)
            
        }
    }

    static async loggout(){
        try {
            await AuthController.removeToken();
            await AuthController.removeUser();
            NavigationService.navigate('Login');
            AuthController.dropDatabases()
            
            Promise.resolve('bye')
        } catch (error) {
            Promise.reject(error)
        }
    }
    
    static async setPersistences(data){
        try {
            await AuthController.setToken(data.token_type, data.access_token);
            await AuthController.setUser(data.userdata);
            await AuthController.setInitConfg({sync: true});
            Promise.resolve('ok')
        } catch (error) {
            Promise.reject(error)
        }
    }

    static async setToken(type, token){
        try {
            await AsyncStorage.setItem('token', type + ' ' + token);
            Axios.defaults.headers.common['Authorization'] = type + ' ' + token
            Promise.resolve(token)
        } catch (error) {
            Promise.reject(error)
        }
    }

    static async setInitConfg(value){
        try {
            await AsyncStorage.setItem('init', JSON.stringify(value));
            return Promise.resolve(true)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getInitConfg(){
        try {
            const value = await AsyncStorage.getItem('init');
        if (value !== null) {
            return Promise.resolve(JSON.parse(value))
        }
        else return Promise.resolve(null)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getToken(){
        try {
            const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            Axios.defaults.headers.common['Authorization'] = value
            return Promise.resolve(value)
        }
        else return Promise.resolve(null)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getUser(){
        try {
            const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            Store.dispatch(setUser({
                user: JSON.parse(value)
            }))
            return Promise.resolve(JSON.parse(value))
        }
        else return Promise.resolve(null)
        } catch (error) {
            return Promise.reject(error)
        }
    }


    static async removeToken(){
        try {
            await AAsyncStorage.removeItem('token');
            Promise.resolve('removed')
        } catch (error) {
            Promise.reject(error)
        }
    }

    static async removeUser(){
        try {
            await AsyncStorage.removeItem('user');
            Promise.resolve('removed')
        } catch (error) {
            Promise.reject(error)
        }
    }

    static getAuthorization(){
       Promise.resolve(AsyncStorage.getItem('token'))
        .then(value => {
            Axios.defaults.headers.common['Authorization'] = value
        })
        .catch(erro => {
            console.error(erro)
        })
        return Axios.defaults.headers.common['Authorization']
    }

    static async setUser(user){
        try {
            let user_str = JSON.stringify(user)
            await AsyncStorage.setItem('user', user_str);
            Store.dispatch(setUser({
                user: user
            }))
            Promise.resolve(user_str)
        } catch (error) {
            Promise.reject(error)
        }
    }

    static async getHeaders(){
        try {
            const token = await AuthController.getToken()
            return Promise.resolve({
                 headers: { 'Authorization': token }  
            })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async dropDatabases(){
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

    static async storeLoginInfo(data){
        try{
            const loginInfoStorage = await AsyncStorage.getItem('loginInfo')
            let arrayOfinfos = []
            if(loginInfoStorage){
                arrayOfinfos = JSON.parse(loginInfoStorage)
            }
            arrayOfinfos.push(data) 
            await AsyncStorage.setItem('loginInfo', JSON.stringify(arrayOfinfos));
            return Promise.resolve('ok') 
        }
        catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    }

    static async getLoginInfo(){
        try{
            const loginInfoStorage = await AsyncStorage.getItem('loginInfo')
            return Promise.resolve(loginInfoStorage) 
        }
        catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    }
    
}