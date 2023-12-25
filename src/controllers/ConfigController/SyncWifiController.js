import AsyncStorage from '@react-native-async-storage/async-storage';
import ConnectionController from '../ConnectionController';

class SyncWifiController {
  static async turnOn(active = true) {
    try {
      await AsyncStorage.setItem('syncWifi', JSON.stringify({active}));
      return Promise.resolve('done');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getStore() {
    try {
      const data = await AsyncStorage.getItem('syncWifi');
      if (data) {
        let parsed_data = JSON.parse(data);
        if (parsed_data && parsed_data.active !== 'null')
          return Promise.resolve({active: parsed_data.active});
        await SyncWifiController.turnOn();
        return Promise.resolve({active: true});
      }
      await SyncWifiController.turnOn();
      return Promise.resolve({active: true});
    } catch (err) {
      await SyncWifiController.turnOn();
      return Promise.resolve({active: true});
    }
  }

  static async check() {
    try {
      const {active} = await SyncWifiController.getStore();
      const net_type = await ConnectionController.connectionType();
      if (!active) return Promise.resolve(true);

      if (net_type === 'wifi') return Promise.resolve(true);

      return Promise.resolve(false);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default SyncWifiController;
