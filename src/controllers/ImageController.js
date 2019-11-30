import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import {PermissionsAndroid} from 'react-native';

class ImageController{
    static index(){
        
        return new Promise(function(resolve, reject) { 

            RNFS.readDir(Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath)
            then((result) => {
                console.log(result)
                resolve(result)
            })
            .catch((err) => {
                console.log(err.message, err.code);
                reject(err)
            });

        })
    }

    static store(image){

        console.log(image)
        return
        
        var path = RNFS.DocumentDirectoryPath;

        // write the file
        RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    static download(url, imageName){

        return new Promise(function(resolve, reject) {

            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((hasPermission)=>{
                console.log('permission true')
                if(hasPermission){
                    RNFS.downloadFile({
                        fromUrl: url,
                        toFile: RNFS.DocumentDirectoryPath + imageName,
                    }).promise.then((r) => {
                        console.log('image saved inside downloads')
                        console.log(RNFS.DocumentDirectoryPath + imageName)
                        return resolve(RNFS.DocumentDirectoryPath + imageName)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
                }
                else return resolve(url)
            })
            .catch(err => {
                return reject(err)
            })
            

        })
    }

    static delete(path){
        return new Promise(function(resolve, reject) { 
            RNFS.unlink(path)
            .then(() => {
                console.log('file deleted')
                resolve('file deleted!')
            })
            .catch((err) => {
                console.log(err.message)
                reject(err.message)
            });
        });

    }

    static getPath(){
        return RNFS.DocumentDirectoryPath
    }
}



export default ImageController;