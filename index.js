import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import  Axios  from 'axios';
import './ReactotronConfig';

import BackgroundFetch from 'react-native-background-fetch';
import BackgroundServiceController from './src/controllers/BackgroundServiceController';

BackgroundFetch.registerHeadlessTask(async () => {
  try {
    BackgroundServiceController.headlessTask();
  } catch (err) {
    BackgroundFetch.finish();
  }
});

Axios.defaults.headers.common = {
  'Content-Type': 'application/x-www-form-urlencoded'

}
Axios.defaults.withCredentials=false;

AppRegistry.registerComponent(appName, () => App);
