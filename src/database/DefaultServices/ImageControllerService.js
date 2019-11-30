import { isUndefined } from "lodash";
import Realm from 'realm';
import ImageController from "../../controllers/ImageController";

async function storeImage(
    item,
    imageName,
    imageSaveName,
    imageType
){
    try{
        const path = await ImageController.download(item[imageName], imageSaveName + item.id + imageType )
        return Promise.resolve(path)
    }
    catch(err){
        return Promise.resolve(null)
    }    
}


export default ({
    schema, 
    schemaVersion,
    hashName,
    imageName,
    imageSaveName,
    imageType,
    data,
    schemaName,
    realm
}) => {

    return new Promise((resolve, reject) => {
        
        realm.write(() => {
            data.map(item => {

                let itemOnDataBase = realm.objectForPrimaryKey(schemaName, item.id)
                
                if(isUndefined(itemOnDataBase)) {
                    console.log('new item')
                    storeImage(item, imageName, imageSaveName, imageType).then((path) => {
                        if(!path) realm.create(schema, {...item, [hashName]: '-$666$'}, true)
                        else realm.create(schemaName, {...item, [imageName]: path }, true)
                    })
                }
                else if(item[hashName] != itemOnDataBase[hashName]) {
                    console.log('update image item')
                    ImageController.delete(itemOnDataBase[imageName]).then(() => {
                        storeImage(item, imageName, imageSaveName, imageType).then((path) => {
                            if(!path) realm.create(schemaName, {...item, [hashName]: '-$666$'}, true)
                            else realm.create(schemaName, {...item, [imageName]: path }, true)
                        })
                    }).catch(() => {
                        storeImage(item, imageName, imageSaveName, imageType).then((path) => {
                            if(!path) realm.create(schemaName, {...item, [hashName]: '-$666$'}, true)
                            else realm.create(schemaName, {...item, [imageName]: path }, true)
                        })
                    })

                }
                else {
                    console.log('no image update')
                    delete item[imageName]
                    realm.create(schemaName, item, true);
                }
                
            })
            return resolve(realm.objects(schemaName))
        }); 
    })
    .catch(err => {
        console.log('error inside image service controller', err)
        return reject(err)
    }) 

    

}

