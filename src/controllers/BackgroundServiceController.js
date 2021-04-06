import BackgroundFetch from 'react-native-background-fetch';
import LancamentosJornadaController from './LancamentosJornadaController';

class BackgroundServiceController {
  static async index() {
    try {
      await BackgroundServiceController.fetchLancamentos();
      return Promise.resolve('service started!');
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  static async fetchLancamentos() {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        // Android options
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
        enableHeadless: true,
      },
      async () => {
        try {
          console.log('[js] RNBackgroundFetch start');
          // const res = await (new LancamentosJornadaController()).syncNews(true);
          // console.log('[js] RNBackgroundFetch Reusult, ', res);
          BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
          console.log('[js] RNBackgroundFetch finished');
        } catch (err) {
          console.log(err);
          BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
        }
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
      },
      error => {
        console.log('[js] RNBackgroundFetch failed to start');
      },
    );

    // Optional: Query the authorization status.
    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  }
}

export default BackgroundServiceController;
