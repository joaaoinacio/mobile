import * as Keychain from 'react-native-keychain';

export default class SecuryStorageController {
  static async get() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return Promise.resolve(credentials);
      }
      return Promise.resolve({
        username: '',
        password: '',
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async store(credentials = {}) {
    try {
      await Keychain.resetGenericPassword();
      await Keychain.setGenericPassword(
        credentials.username,
        credentials.password,
      );
      return Promise.resolve('done');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async reset() {
    try {
      await Keychain.resetGenericPassword();
      return Promise.resolve('done');
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
