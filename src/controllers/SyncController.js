import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'native-base';
import http from '../services/api';
import Routes from '../services/routes';
import SyncWifiController from './ConfigController/SyncWifiController';
import ConnectionController from './ConnectionController';
import ErrorHandle from './ErrorHandle';
import JornadaController from './JornadaController';
import LancamentosJornadaController from './LancamentosJornadaController';

class SyncController {
  static async index() {
    try {
      const hasInternet = await ConnectionController.isConnected();
      const checkSyncWifi = await SyncWifiController.check();

      if (!hasInternet) {
        Toast.show({
          type: 'warning',
          text: 'Sem conexao com a internet!',
        });

        return Promise.resolve('No connection!');
      }

      if (!checkSyncWifi) {
        Toast.show({
          type: 'warning',
          text: 'Sincronizar pode ser feito apenas no wifi!',
        });

        return Promise.resolve('No connection!');
      }

      await JornadaController.index(true);
      const LancamentosJornadaCont = new LancamentosJornadaController();
      await LancamentosJornadaCont.syncNews(true);
      await ErrorHandle.sync();

      const userLogs = await AsyncStorage.getItem('userLogs');
      if (userLogs) {
        await http.post(Routes.api + '/user-logs', {
          logs: JSON.parse(userLogs),
        });
        await AsyncStorage.removeItem('userLogs');
      }

      Toast.show({
        type: 'success',
        text: 'Sincronização realizada com sucesso!',
      });

      return Promise.resolve('ok');
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default SyncController;
