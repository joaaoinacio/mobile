import AsyncStorage  from '@react-native-community/async-storage';
import {setJSExceptionHandler, setNativeExceptionHandler, getJSExceptionHandler} from 'react-native-exception-handler';
import DeviceInfoController from './DeviceInfoController';
import AuthController from './AuthController';
import moment from 'moment';
import ConnectionController from './ConnectionController';
import http from '../services/api';
import Routes from '../services/routes';

const errorSchema = {
    date:       'date',
    message:    'string',
    stack:      'int',
    local:      'string',
    device:     'string',
    error:      'string'   
}


class ErrorHandle{
    
    static errorEventListener(){
        const exceptionhandler = (error, isFatal) => {
            console.log("inside error handle")
            console.log(error)
            ErrorHandle.store(error)
        };
        setJSExceptionHandler(exceptionhandler, true);
        const currentHandler = getJSExceptionHandler();
        setNativeExceptionHandler(exceptionString => {
            console.log(exceptionString)
            ErrorHandle.store(exceptionString)
        });
       
    }
    
    static async index(){
        try {
            const value = await AsyncStorage.getItem('errors');
            if (value !== null) {
                return Promise.resolve(JSON.parse(value))
            }
            Promise.resolve({})
        } catch (error) {
            return Promise.reject(err)
        }

    }
    
    static async store(error, local){
        try {
            console.log('inside error handle', error)
            const deviceInfo    = await DeviceInfoController.index()
            const logged_user   = await AuthController.getUser()

            let full_error = {
                data:       moment().format(),
                message:    error && error.message,
                stack:      error && error.stack && error.stack.toString(),
                local:      local,
                device:     deviceInfo,
                user:       logged_user.id,
                error:      error && error.toString()
            }

            const StoreErrors = await AsyncStorage.getItem('errors')
            let arrayOfErrors = []
            if(StoreErrors){
                arrayOfErrors = JSON.parse(StoreErrors)
            }
            arrayOfErrors.push(full_error) 
            await AsyncStorage.setItem('errors', JSON.stringify(arrayOfErrors));
            return Promise.resolve('ok')
        } catch (err) {
            console.log(err)
            return Promise.reject(err)
        }
    }

    static async sync(){
        try{
            const hasInternet = ConnectionController.isConnected()
            if(hasInternet){
                const errors = await AsyncStorage.getItem('errors')
                if(errors){
                    await http.post(Routes.api + '/errors', {errors: JSON.parse(errors)})
                    await AsyncStorage.removeItem('errors')
                }
            }
            return Promise.resolve('ok')
        }
        catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    }

}

export default ErrorHandle;