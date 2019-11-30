import NetInfo from '@react-native-community/netinfo';
import { setConnection } from '../store/actions';
import { Store } from '../store';

class ConnectionController{

    static isConnected(){
        return new Promise(function(resolve, reject) { 

            NetInfo.fetch().then((connectionInfo) => {
                if(!connectionInfo.isInternetReachable){
                    resolve(false)
                }
                resolve(true)
            })
            .catch(err => {
                console.log(err)
                resolve(false)
            });

        })
    }

    static connectionType(){
        return new Promise(function(resolve, reject) { 

            NetInfo.getConnectionInfo().then((connectionInfo) => {
                resolve(connectionInfo)
            })
            .catch(err => reject(err));
        })
    }

    static connectionListener(){
        NetInfo.addEventListener('connectionChange', (connectionInfo) => {
            if(!connectionInfo.isInternetReachable){
                Store.dispatch(setConnection({
                    isConnected: false,
                    connection: connectionInfo
                }))
            }
            else{
                Store.dispatch(setConnection({
                    isConnected: true,
                    connection: connectionInfo
                }))
            }
        })
    }
    
}

export default ConnectionController;