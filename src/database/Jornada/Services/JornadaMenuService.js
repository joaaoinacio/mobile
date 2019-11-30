import { isUndefined } from "lodash";
import ImageController from "../../../controllers/ImageController";
import Realm from 'realm';
import ImageControllerService from "../../DefaultServices/ImageControllerService";


export default class JornadaMenuService{

    static getSchemaVersion = () => {return 0}

    static store(realm, schema, data){

        return new Promise((resolve, reject) => {
            ImageControllerService({
                schema: schema, 
                schemaVersion: JornadaMenuService.getSchemaVersion(),
                hashName: 'iconHash',
                imageName: 'icon',
                data: data,
                imageSaveName: 'jornada_menu_icon_',
                imageType: '.png',
                schemaName: schema.name,
                realm: realm
            }).then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
           
    }

}

