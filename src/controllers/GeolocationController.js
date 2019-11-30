import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { setGeolocation } from '../store/actions';
import { Store } from '../store';

class GeolocationController{
    
    static async index(){
        GeolocationController.watchPosition()
        Geolocation.getCurrentPosition((position) => {
            Store.dispatch(setGeolocation({
                coords: position && position.coords
            }))
            console.log(position)
        }, (error) => {
            console.log('geolocation error', error)
        }, GeolocationController.getConfig());
    }

    static enableGPS(){
        return new Promise(function(resolve, reject) { 
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {
                console.log(data)
                resolve(data)
            }).catch(err => {
                console.log(err)
                resolve(err)
            });
        });

    }


    static watchPosition(){
        Geolocation.watchPosition((position) => {
            console.log(position)
            Store.dispatch(setGeolocation({
                coords: position && position.coords
            }))
        }, (error) => {
            console.log('geolocation error', error)
        }, GeolocationController.getConfig());
    }

    static setConfig(){
        Geolocation.setRNConfiguration({
            skipPermissionRequests: true
        });
    }

    static getConfig(){
        return{
            enableHighAccuracy: true, 
            timeout: 20000, 
            maximumAge: 0 
        }
    }
    

}

export default GeolocationController;