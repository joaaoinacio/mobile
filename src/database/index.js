import Realm from 'realm';
import JornadaMenuSchema from './Jornada/Schemas/JornadaMenuSchema';
import {isEmpty, isUndefined} from 'lodash';
import JornadaMenuService from './Jornada/Services/JornadaMenuService';
import JornadaLancamentosEnviarSchema from './Jornada/Schemas/JornadaLancamentosEnviarSchema';
import JornadaLancamentosSchema from './Jornada/Schemas/JornadaLancamentosSchema';
import JornadaLancamentoService from './Jornada/Services/JornadaLancamentoService';
import { Toast } from 'native-base';

const Schemas = {
    JornadaMenu: JornadaMenuSchema,
    JornadaLancamentoEnviar: JornadaLancamentosEnviarSchema,
    JornadaLancamentos: JornadaLancamentosSchema
}

const Services = {
    // JornadaMenu: JornadaMenuService,
    JornadaLancamentos: JornadaLancamentoService
}

class Database{

    constructor(schema) {
        this.schema     = Schemas[schema];
        this.realm      = null
    }

    async open(){

        if(isEmpty(this.schema)) return Promise.reject('Nenhum schema com esse nome encontrado no banco de dados.')
       
        try{
            const realm = await Realm.open({schema: [this.schema], deleteRealmIfMigrationNeeded: true})
            this.realm = realm
            return Promise.resolve('Database is opened!')   
        }
        catch(err){
            Toast.show({
                text: JSON.stringify(err),
                type: 'warning',
                duration: 10000,
                buttonText: 'Ok'
            })
            return Promise.reject(err)
        }
    }

    async close(){
        try{
            await this.realm.close()
            console.log('Database ' + this.schema.name + ' closed!')
            return Promise.resolve('Database is closed!') 
        }
        catch(err){
            console.log('err to close database!')
            return Promise.reject(err)
        }
    }

    async index(query){
        try{
            var data
            if(!isUndefined(Services[this.schema.name]) && !isUndefined(Services[this.schema.name].index)){
                data = await Services[this.schema.name].index(this.realm, this.schema, query)
                return Promise.resolve(this.formatList(data))
            }
            else{
                if(query) data = await this.realm.objects(this.schema.name).filtered(query ? query : 'id != null')
                else data = await this.realm.objects(this.schema.name)
                return Promise.resolve(this.formatList(data)) 
            } 
        }
        catch(err){
            return Promise.reject(err)
        }
    }

    store(data){
        return new Promise((resolve, reject) => {
            try{
                if(isEmpty(data)) reject('Nenhum dado enviado para salvar.')  
                if(!Array.isArray(data)) reject('A inserçao deve ser feita com um array de objetos.')

                
                //SAVE IN SERVICE

                
                if(!isUndefined(Services[this.schema.name])){

                    Services[this.schema.name].store(this.realm, this.schema, data).then((res) => {
                        return resolve(this.formatList(res))
                    })
                    .catch(err => {
                        return reject(err)
                    })

                }
                else{
                    //DEFAULT SAVE
                
                    this.realm.write(() => {
                        data.map(item => {
                            this.realm.create(this.schema.name, item, true);
                        })
                        return resolve(this.formatList(this.realm.objects(this.schema.name)))
                    }); 

                }
            }
            catch(err){
                console.log(err)
                return reject(err)
            }

            
            
        }); 
    }

    delete(data){
        return new Promise((resolve, reject) => {
            try{
                this.realm.write(() => {
                    this.realm.delete(data);
                    return resolve('Done!')
                });
            }
            catch(err){
                return reject(err)
            }
        })
    }

    deleteAll(){
        return new Promise((resolve, reject) => {
            try{
                this.realm.write(() => {
                    this.realm.deleteAll();
                    return resolve('Done!')
                });
            }
            catch(err){
                return reject(err)
            }
        })
    }



    formatList(data){
        let model = this.schema.properties
        let newData = []
        let obj = {}

        data.map(realmItem => {
            obj = {}
            Object.keys(model).map(function(key, index) {
                obj[key] = realmItem[key];
            });
            newData.push(obj)
        })

        return newData

    }

   

}

export default Database;