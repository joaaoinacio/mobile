import { PermissionsAndroid } from 'react-native';


const AppPermissions = [
    {
        permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        title: "Permissão para salvar arquivos no seu dispositivo.",
        message: "Precisamos de sua permissão para salvar arquivos no seu dispositivo e assim você poderá usufruir de todos os benefícios do seu aplicativo, mesmo sem internet!."
    },
    {
        permission: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        title: "Permissão para acessar sua localização.",
        message: "Precisamos acessar sua localização, para poder regitrar seu local automaticamente após você realizar um lançamento."
    },
    {
        permission: PermissionsAndroid.PERMISSIONS.CAMERA,
        title: "Permissão para acessar sua câmera.",
        message: "Precisamos acessar sua câmera, para o leitor de QR Code."
    }
]

class PermissionController {

    static async index() {
        try {
            for (let idx = 0; idx < AppPermissions.length; idx++) await PermissionController.callPermission(AppPermissions[idx])
        } catch (error) {
            return Promise.reject(err)
        }

    }

    static async callPermission(permission) {
        try {
            const granted = await PermissionsAndroid.request(
                permission.permission,
                {
                    title: permission.title,
                    message: permission.message,
                    buttonNeutral: 'Me lembre depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return Promise.resolve(true)
            } else {
                return Promise.resolve(false)
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }


}

export default PermissionController;