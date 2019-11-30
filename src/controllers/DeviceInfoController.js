import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export default class DeviceInfoController{
    static async index(){
        try{
            const deviceInfo = {
                deviceID:       await DeviceInfoController.getDeviceId(),
                device:         await DeviceInfoController.getDevice(),
                versions:       await DeviceInfoController.getVersion(), 
                phoneState:     await DeviceInfoController.getPhoneState(), 
            }
            console.log(deviceInfo)
            return Promise.resolve(deviceInfo)
        }
        catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    }

    static async getDeviceId(){
        try{
            const id = await DeviceInfo.getDeviceId()
            return Promise.resolve(id) 
        }
        catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    }

    static async getDevice(){
        try{
            var device = {}
            if(Platform.OS == 'ios'){
                device['device'] = 'IPhone'
            }    
            else{
                device['device'] = await DeviceInfo.getDevice()
            }
            device['model'] = await DeviceInfo.getModel() 
            return Promise.resolve(device) 
        }
        catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    }

    static async getVersion(){
        try{
            var version = {}
            if(Platform.OS == 'ios'){
                version['ios_sdk']      = await DeviceInfo.getApiLevel()
                version['ios']          = await DeviceInfo.getSystemVersion()
            }
            else{
                version['android_sdk']      = await DeviceInfo.getApiLevel()
                version['android']          = await DeviceInfo.getSystemVersion()
            }
            version['app_build']    = await DeviceInfo.getBuildNumber()
            version['app_version']  = await DeviceInfo.getReadableVersion()
            return Promise.resolve(version) 
        }
        catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    }

    static async getPhoneState(){
        try{
            var state = {}
            if(Platform.OS == 'ios'){

            }
            else{
                state['max_memory'] = await DeviceInfo.getMaxMemory()
            }
            state['isCharging']         = await DeviceInfo.isBatteryCharging()
            state['used_memory']        = await DeviceInfo.getUsedMemory()
            state['disk_capacity']      = await DeviceInfo.getTotalDiskCapacity()
            state['disk_free_space']    = await DeviceInfo.getFreeDiskStorage()
            state['power_state']        = await DeviceInfo.getPowerState()
            state['battery_level']      = await DeviceInfo.getBatteryLevel()
            
            return Promise.resolve(state) 
        }
        catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    }
    
}