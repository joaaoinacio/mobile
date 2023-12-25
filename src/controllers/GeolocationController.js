import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {setGeolocation} from '../store/actions';
import {Store} from '../store';
import {Platform} from 'react-native';

class GeolocationControllerClass {
  watchId = null;

  constructor() {
    if (GeolocationControllerClass.instance) {
      return GeolocationControllerClass.instance;
    }
    GeolocationControllerClass.instance = this;
    this.setConfig();
    return this;
  }

  async index() {
    this.watchPosition();
    Geolocation.getCurrentPosition(
      position => {
        Store.dispatch(
          setGeolocation({
            coords: position && position.coords,
          }),
        );
        console.log(position);
      },
      error => {
        console.log('geolocation error', error);
      },
      this.getConfig(),
    );
  }

  async enableGPS() {
    if (Platform.OS === 'ios') {
      return Promise.resolve(true);
    }

    try {
      const data =
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        });

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  watchPosition() {
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId);
    }

    this.watchId = Geolocation.watchPosition(
      position => {
        console.log(position);
        Store.dispatch(
          setGeolocation({
            coords: position && position.coords,
          }),
        );
      },
      error => {
        console.log('geolocation error', error);
      },
      this.getConfig(),
    );
  }

  setConfig() {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
    });
  }

  getConfig() {
    return {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    };
  }
}

const GeolocationController = new GeolocationControllerClass();

export default GeolocationController;
