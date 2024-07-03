/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import PermissionController from './PermissionController';
import JornadaController from './JornadaController';
import GeolocationController from './GeolocationController';
import {setBootList} from '../store/actions';
import {Store} from '../store';
import BackgroundServiceController from './BackgroundServiceController';
import moment from 'moment';
import AuthController from './AuthController';
import ErrorHandle from './ErrorHandle';
import DeviceInfoController from './DeviceInfoController';
import ConnectionController from './ConnectionController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../services/api';
import Routes from '../services/routes';
import SyncWifiController from './ConfigController/SyncWifiController';
import {setJornadaTipos} from '../store/actions';
import {setVeiculos} from '../store/actions';
import Database from '../database';

class BootController {
  static async index() {
    try {
      await BootController.syncPermissions();
      await BootController.syncGeolocation();
      await BootController.getAppInfo();
      await BootController.syncFetchData();
      await BootController.startServices();
      await BootController.syncAppConfigs();

      Store.dispatch(
        setBootList({
          list: [],
        }),
      );

      return Promise.resolve('DONE!');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async startServices() {
    try {
      Store.dispatch(
        setBootList({
          list: ['Ligando serviços'],
        }),
      );
      ErrorHandle.errorEventListener();
      await BackgroundServiceController.index();
      return Promise.resolve('ok');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAppInfo() {
    try {
      Store.dispatch(
        setBootList({
          list: ['Coletando Informações do APP'],
        }),
      );
      const deviceInfo = await DeviceInfoController.index();
      const user = await AuthController.getUser();

      const appInfo = {
        data: moment().format(),
        device_info: deviceInfo,
        user_id: user.id,
      };

      let arrayOfUserLogs = [];

      const userLogs = await AsyncStorage.getItem('userLogs');

      if (userLogs) {
        arrayOfUserLogs = JSON.parse(userLogs);
      }
      arrayOfUserLogs.push(appInfo);

      await AsyncStorage.setItem('userLogs', JSON.stringify(arrayOfUserLogs));

      return Promise.resolve('ok');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async syncPermissions() {
    try {
      Store.dispatch(
        setBootList({
          list: ['Aguardando permissões'],
        }),
      );
      await PermissionController.index();
      return Promise.resolve('ok');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async syncFetchData() {
    try {
      Store.dispatch(
        setBootList({
          list: [
            ...Store.getState().bootList.bootList.list,
            'Sincronizando dados offline',
          ],
        }),
      );
      await JornadaController.index();
      await ErrorHandle.sync();

      const hasInternet = await ConnectionController.isConnected();
      const checkSyncWifi = await SyncWifiController.check();

      await Database.open('Veiculo');
      const offlineVeiculosData = await Database.index();
      Store.dispatch(
        setVeiculos({
          veiculos: offlineVeiculosData,
        }),
      );

      await Database.open('JornadasTipo');
      const offlineJornadasTipoData = await Database.index();
      Store.dispatch(
        setJornadaTipos({
          jornadaTipos: offlineJornadasTipoData,
        }),
      );

      if (hasInternet && checkSyncWifi) {
        const userLogs = await AsyncStorage.getItem('userLogs');
        if (userLogs) {
          await http.post(Routes.api + '/user-logs', {
            logs: JSON.parse(userLogs),
          });
          await AsyncStorage.removeItem('userLogs');
        }

        const user = await AuthController.getUser();

        await Database.open('JornadasTipo');
        const apiDataJornadaTipo = await http.get(
          Routes.api + '/tipo-jornada?id=' + user.empresa.id,
        );
        const JornadasTipoDBData = await Database.store(
          apiDataJornadaTipo && apiDataJornadaTipo.data,
        );

        Store.dispatch(
          setJornadaTipos({
            jornadaTipos: JornadasTipoDBData,
          }),
        );
        await Database.close('JornadasTipo');
        await Database.open('Veiculo');
        const apiDataVeiculos = await http.get(
          Routes.api + '/veiculos?empresa_id=' + user.empresa.id,
        );

        const VeiculoDBData = await Database.store(
          apiDataVeiculos && apiDataVeiculos.data,
        );

        Store.dispatch(
          setVeiculos({
            veiculos: VeiculoDBData,
          }),
        );
        await Database.close('Veiculo');
      }

      const init = await AuthController.getInitConfg();
      if (init && init.sync) {
        await AuthController.setInitConfg({sync: false});
      }
      return Promise.resolve('ok');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async syncGeolocation() {
    try {
      Store.dispatch(
        setBootList({
          list: [
            ...Store.getState().bootList.bootList.list,
            'Aguardando geolocalizacao',
          ],
        }),
      );
      await GeolocationController.enableGPS();
      await GeolocationController.index();
      return Promise.resolve('ok');
    } catch (err) {
      console.log(err);
      return Promise.resolve('ok');
    }
  }

  static async syncAppConfigs() {
    try {
      Store.dispatch(
        setBootList({
          list: [
            ...Store.getState().bootList.bootList.list,
            'Levantando as configurações...',
          ],
        }),
      );
      Date.prototype.toJSON = function () {
        return moment(this).format();
      };

      return Promise.resolve('ok');
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default BootController;
