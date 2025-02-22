import {isEmpty} from 'lodash';
import Database from '../asyncStorageDatabase';
import Routes from '../services/routes';
import {Store} from '../store';
import {setLancamentos} from '../store/actions';
import APIController from './APIController';
import SyncWifiController from './ConfigController/SyncWifiController';
import moment from 'moment';
import AuthController from './AuthController';
import Axios from 'axios';
import {Toast} from 'native-base';

export default class LancamentosJornadaController {
  constructor() {
    this.db = Database;
    this.db.open('JornadaLancamentos');
    this.syncDays = 500;
  }

  async index({startDate, endDate}) {
    try {
      const response = await this.db.index();
      const data = this.tempFormatData({
        startDate,
        endDate,
        data: response,
      });

      this.setStore(data);
      return Promise.resolve(data);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  tempFormatData({startDate, endDate, data}) {
    try {
      if (isEmpty(data)) return [];

      data = data.filter(e => {
        let date = moment(e.data).format('yyyy-MM-DD');
        if (
          moment(startDate).isSameOrBefore(date, 'day') &&
          moment(endDate).isSameOrAfter(date, 'day')
        )
          return true;
        return false;
      });

      data = data.sort((a, b) => {
        return moment(b.data) - moment(a.data);
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async store({data}) {
    try {
      const response = await this.db.store({storeData: data});
      this.syncNews();
      return Promise.resolve(response);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async setVeiculo({veiculo}) {
    try {
      const currentUser = await AuthController.getUser(true);
      await AuthController.updateUser({
        veiculo: {
          ...(currentUser && currentUser.veiculo ? currentUser.veiculo : {}),
          veiculo: {
            ...(currentUser &&
            currentUser.veiculo &&
            currentUser.veiculo.veiculo
              ? currentUser.veiculo.veiculo
              : {}),
            ...veiculo,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async delete({id}) {
    try {
      const response = await this.db.delete({id});

      return Promise.resolve(response);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async sync({syncDays} = {}) {
    try {
      const isConnected = await SyncWifiController.check();
      if (isConnected) {
        const api_response = await APIController.get(
          `${Routes.api}/jornada/lancamentos?days=${syncDays ?? this.syncDays}`,
        );
        await this.db.sync({syncData: api_response});
      }

      return Promise.resolve('done');
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async syncNews(service) {
    try {
      const isConnected = await SyncWifiController.check();
      if (!isConnected) return Promise.resolve('No connection!');
      const response = await this.db.index();
      let news = response.filter(e => e.new);

      if (isEmpty(news)) {
        await this.sync();
        return Promise.resolve('done');
      }

      Date.prototype.toJSON = function () {
        return moment(this).format().utc(true);
      };

      const axios_config = await AuthController.getHeaders();
      const res = await Axios.post(
        Routes.api + '/jornada/lancamentos',
        {lancamentos: news},
        axios_config,
      );
      await this.db.truncate();
      await this.sync();

      if (!service) {
        Toast.show({
          text:
            (res && res.data && res.data.length) +
            ' Lançamentos Sincronizados com Sucesso!',
          type: 'success',
          duration: 3000,
          buttonText: 'Ok',
        });
      }

      return Promise.resolve('done');
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  setStore(list = []) {
    try {
      Store.dispatch(
        setLancamentos({
          list,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }
}



// import {isEmpty} from 'lodash';
// import Database from '../asyncStorageDatabase';
// import Routes from '../services/routes';
// import {Store} from '../store';
// import {setLancamentos} from '../store/actions';
// import APIController from './APIController';
// import SyncWifiController from './ConfigController/SyncWifiController';
// import moment from 'moment';
// import AuthController from './AuthController';
// import Axios from 'axios';
// import {Toast} from 'native-base';
// import NetInfo from "@react-native-community/netinfo"; // Importação do NetInfo

// export default class LancamentosJornadaController {
//   constructor() {
//     this.db = Database;
//     this.db.open('JornadaLancamentos');
//     this.syncDays = 500;
//   }

//   async index({startDate, endDate, includeOffline = true}) { // Adicionando um parâmetro para incluir lançamentos offline
//     try {
//       const isConnected = await NetInfo.fetch().then(state => state.isConnected);

//       const response = await this.db.index();
//       let data = this.tempFormatData({
//         startDate,
//         endDate,
//         data: response,
//       });

//       if (!isConnected && !includeOffline) {
//         data = data.filter(item => !item.new); // Filtrando lançamentos offline
//       }

//       this.setStore(data);
//       return Promise.resolve(data);
//     } catch (err) {
//       console.log(err);
//       return Promise.reject(err);
//     }
//   }

//   tempFormatData({startDate, endDate, data}) {
//     try {
//       if (isEmpty(data)) return [];

//       data = data.filter(e => {
//         let date = moment(e.data).format('yyyy-MM-DD');
//         if (
//           moment(startDate).isSameOrBefore(date, 'day') &&
//           moment(endDate).isSameOrAfter(date, 'day')
//         )
//           return true;
//         return false;
//       });

//       data = data.sort((a, b) => {
//         return moment(b.data) - moment(a.data);
//       });

//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async store({data}) {
//     try {
//       const response = await this.db.store({storeData: data});
//       this.syncNews();
//       return Promise.resolve(response);
//     } catch (err) {
//       console.log(err);
//       return Promise.reject(err);
//     }
//   }

//   async setVeiculo({veiculo}) {
//     try {
//       const currentUser = await AuthController.getUser(true);
//       await AuthController.updateUser({
//         veiculo: {
//           ...(currentUser && currentUser.veiculo ? currentUser.veiculo : {}),
//           veiculo: {
//             ...(currentUser &&
//             currentUser.veiculo &&
//             currentUser.veiculo.veiculo
//               ? currentUser.veiculo.veiculo
//               : {}),
//             ...veiculo,
//           },
//         },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async delete({id}) {
//     try {
//       const response = await this.db.delete({id});

//       return Promise.resolve(response);
//     } catch (err) {
//       console.log(err);
//       return Promise.reject(err);
//     }
//   }

//   async sync({syncDays} = {}) {
//     try {
//       const isConnected = await SyncWifiController.check();
//       if (isConnected) {
//         const api_response = await APIController.get(
//           `${Routes.api}/jornada/lancamentos?days=${syncDays ?? this.syncDays}`,
//         );
//         await this.db.sync({syncData: api_response});
//       }

//       return Promise.resolve('done');
//     } catch (err) {
//       console.log(err);
//       return Promise.reject(err);
//     }
//   }

//   async syncNews(service) {
//     try {
//       const isConnected = await SyncWifiController.check();
//       if (!isConnected) return Promise.resolve('No connection!');
//       const response = await this.db.index();
//       let news = response.filter(e => e.new);

//       if (isEmpty(news)) {
//         await this.sync();
//         return Promise.resolve('done');
//       }

//       Date.prototype.toJSON = function () {
//         return moment(this).format().utc(true);
//       };

//       const axios_config = await AuthController.getHeaders();
//       const res = await Axios.post(
//         Routes.api + '/jornada/lancamentos',
//         {lancamentos: news},
//         axios_config,
//       );
//       await this.db.truncate();
//       await this.sync();

//       if (!service) {
//         Toast.show({
//           text:
//             (res && res.data && res.data.length) +
//             ' Lançamentos Sincronizados com Sucesso!',
//           type: 'success',
//           duration: 3000,
//           buttonText: 'Ok',
//         });
//       }

//       return Promise.resolve('done');
//     } catch (err) {
//       console.log(err);
//       return Promise.reject(err);
//     }
//   }

//   setStore(list = []) {
//     try {
//       Store.dispatch(
//         setLancamentos({
//           list,
//         }),
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
