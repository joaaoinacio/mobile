/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import BackgroundFetch from 'react-native-background-fetch';
import BackgroundServiceController from './src/controllers/BackgroundServiceController';

BackgroundFetch.registerHeadlessTask(async () => {
  try {
    BackgroundServiceController.headlessTask();
  } catch (err) {
    BackgroundFetch.finish();
  }
});

AppRegistry.registerComponent(appName, () => App);
