import moment from 'moment'

export default class JornadaLancamentoService{

    static getSchemaVersion = () => {return 0}

    static store(realm, schema, data){

        return new Promise((resolve, reject) => {
            try{
                realm.write(() => {
                    data.map(item => {
                        realm.create(schema.name, {
                            ...item,
                            latitude: parseFloat(item.latitude),
                            longitude: parseFloat(item.longitude),
                            obs: item.obs ? item.obs : '',
                            data: new Date(moment(item.data).format())
                        }
                        , true);
                    })
                    return resolve(realm.objects(schema.name))
                }); 
            }
            catch(err){
                return reject(err)
            }
        })
           
    }

}

