// import Routes from '../services/routes';
// import Axios from 'axios';
// import apiErros, {voidError} from '../services/apiErrors';
// import {Toast} from 'native-base';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import NavigationService from '../NavigationService';
// import {isEmpty, values} from 'lodash';
// import {Store} from '../store';
// import {setUser} from '../store/actions';
// import Database from '../database';
// import SecuryStorageController from './SecuryStorageController';
// import ConnectionController from './ConnectionController';

// export default class AuthController {
//   static index(user) {
//     console.log(user)
//     console.log(Routes.url + '/oauth/token')
//     return new Promise((resolve, reject) => {
//       Axios.post(Routes.url + '/oauth/token', {
        

//         // client_id: 12,
//         // client_secret: 'jFc2AtMRezvMFgBQpwDgckrlbLMuGTfyFXUiAOsm',
//         // grant_type: 'password',
//         client_id: 4,
//         client_secret: 'q1ShOPElLMu1yXTKOwvAjthqizmhBapHQjepkQHu',
//         grant_type: 'password',
//         ...user,

//       }, {
//         withCredentials: false,
//         headers:{'Content-Type': 'application/x-www-form-urlencoded'}
//       })
//         .then(response => {          
//           if (isEmpty(response)) {
//             voidError();
//             reject('Network Error!');
//           }
//           if (isEmpty(response.data)) {
//             voidError();
//             reject('Network Error!');
//           }

        

//           AuthController.setPersistences(response.data)

//             .then(async res => {
//               console.log(49)
//               await SecuryStorageController.store(user);
//               await AsyncStorage.setItem('logged', 'true');
//               resolve(response);
//             })
//             .catch(err => {
//               console.log(55)
//               console.log(err)
//               console.log(values)
//               reject(err);
//             });
//         })
//         .catch(error => {
//           console.log(62)
//           if (isEmpty(error)) {
//             voidError();
//             reject('Network Error!');
//           }
//           if (isEmpty(error.response)) {
//             voidError();
//             reject('Network Error!');
//           }
//           if (error.response?.status != 401 && error.response.status != 400) {
//             apiErros(error.response);
//             reject(error.response);
//           } else {
//             Toast.show({
//               text: 'Credenciais inválidas!',
//               type: 'warning',
//               duration: 3000,
//             });
//             reject('credenciais invalidas');
//           }
//           reject(error);
//         });
//     });
//   }

//   static async oneTapLogin() {
//     console.log('88')
//     try {
//       console.log('90')
//       const is_connect = await ConnectionController.isConnected();
//       const credentials = await SecuryStorageController.get();

//       if (is_connect) {
//         await AuthController.index(credentials);
//       }

//       const token = await AuthController.getToken();
//       const user = await AuthController.getUser();

//       if (!isEmpty(token) && !isEmpty(user)) {
//         await AsyncStorage.setItem('logged', 'true');
//         return Promise.resolve('ok');
//       }

//       return Promise.reject('no data');
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   }

//   static async isLogged() {
//     console.log('113')
//     try {
//       const token = await AuthController.getToken();
//       const user = await AuthController.getUser();
//       const logged = await AsyncStorage.getItem('logged');

//       if (!isEmpty(token) && !isEmpty(user) && logged === 'true') {
//         Axios.defaults.headers.common['Authorization'] = token;
//         return Promise.resolve(true);
//       } else {
//         await AuthController.loggout();
//         return Promise.reject(false);
//       }
      
//     } catch (error) {
//       console.log('128')
//       await AuthController.loggout();
//       return Promise.reject(false);
//     }
//   }

//   static async loggout() {
//     console.log(135)
//     try {
//       await AsyncStorage.setItem('logged', 'false');
//       NavigationService.navigate('Login');

//       Promise.resolve('bye');
//     } catch (error) {
//       Promise.reject(error);
//     }
//   }

//   static async cleanUserData() {
//     console.log(147)
//     try {
//       await AsyncStorage.setItem('logged', 'false');
//       await AuthController.removeToken();
//       await AuthController.removeUser();
//       AuthController.dropDatabases();
//       Promise.resolve('bye');
//     } catch (err) {
//       Promise.reject(err);
//     }
//   }

//   static async setPersistences(data) {
//     console.log(160)
//     try {
//       await AuthController.setToken(data.token_type, data.access_token);
//       await AuthController.setUser(data.userdata);
//       await AuthController.setInitConfg({sync: true});
//       Promise.resolve('ok');
//     } catch (error) {
//       console.log(167)
//       Promise.reject(error);
//     }
//   }

//   static async setToken(type, token) {
//     try {
//       await AsyncStorage.setItem('token', type + ' ' + token);
//       Axios.defaults.headers.common['Authorization'] = type + ' ' + token;
//       Promise.resolve(token);
//     } catch (error) {
//       Promise.reject(error);
//     }
//   }

//   static async setInitConfg(value) {
//     try {
//       await AsyncStorage.setItem('init', JSON.stringify(value));
//       return Promise.resolve(true);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   static async getInitConfg() {
//     try {
//       const value = await AsyncStorage.getItem('init');
//       if (value !== null) {
//         return Promise.resolve(JSON.parse(value));
//       } else return Promise.resolve(null);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   static async getToken() {
//     try {
//       const value = await AsyncStorage.getItem('token');
//       if (value !== null) {
//         Axios.defaults.headers.common['Authorization'] = value;
//         return Promise.resolve(value);
//       } else return Promise.resolve(null);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   static async getUser(noDispatch) {
//     try {
//       const value = await AsyncStorage.getItem('user');
//       if (value !== null) {
//         const parsedUser = JSON.parse(value);
//         if (!noDispatch)
//           Store.dispatch(
//             setUser({
//               user: parsedUser,
//             }),
//           );
//         return Promise.resolve(parsedUser);
//       } else return Promise.resolve(null);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   static async removeToken() {
//     try {
//       await AsyncStorage.removeItem('token');
//       Promise.resolve('removed');
//     } catch (error) {
//       Promise.reject(error);
//     }
//   }

//   static async removeUser() {
//     try {
//       await AsyncStorage.removeItem('user');
//       Promise.resolve('removed');
//     } catch (error) {
//       Promise.reject(error);
//     }
//   }

//   static getAuthorization() {
//     Promise.resolve(AsyncStorage.getItem('token'))
//       .then(value => {
//         Axios.defaults.headers.common['Authorization'] = value;
//       })
//       .catch(erro => {
//         console.error(erro);
//       });
//     return Axios.defaults.headers.common['Authorization'];
//   }

//   static async setUser(user) {
//     try {
//       let user_str = JSON.stringify(user);
//       await AsyncStorage.setItem('user', user_str);
//       Store.dispatch(
//         setUser({
//           user: user,
//         }),
//       );
//       Promise.resolve(user_str);
//     } catch (error) {
//       Promise.reject(error);
//     }
//   }

//   static async updateUser(data = {}) {
//     try {
//       const currentUser = await AuthController.getUser(true);

//       let newUser = {
//         ...currentUser,
//         ...data,
//       };

//       await AsyncStorage.setItem('user', JSON.stringify(newUser));
//       Store.dispatch(
//         setUser({
//           user: newUser,
//         }),
//       );
//       Promise.resolve(newUser);
//     } catch (error) {
//       Promise.reject(error);
//     }
//   }

//   static async getHeaders() {
//     try {
//       const token = await AuthController.getToken();
//       return Promise.resolve({
//         headers: {Authorization: token},
//       });
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   static async dropDatabases() {
//     try {
//       await Database.open('JornadaLancamentos');
//       await Database.deleteAll();
//       await Database.close();
//       return Promise.resolve('Done');
//     } catch (err) {
//       await Database.close();
//       return Promise.reject(err);
//     }
//   }

//   static async storeLoginInfo(data) {
//     try {
//       const loginInfoStorage = await AsyncStorage.getItem('loginInfo');
//       let arrayOfinfos = [];
//       if (loginInfoStorage) {
//         arrayOfinfos = JSON.parse(loginInfoStorage);
//       }
//       arrayOfinfos.push(data);
//       await AsyncStorage.setItem('loginInfo', JSON.stringify(arrayOfinfos));
//       return Promise.resolve('ok');
//     } catch (err) {
//       console.log(err);
//       return Promise.reject(err);
//     }
//   }

//   static async getLoginInfo() {
//     try {
//       const loginInfoStorage = await AsyncStorage.getItem('loginInfo');
//       return Promise.resolve(loginInfoStorage);
//     } catch (err) {
//       console.log(err);
//       return Promise.reject(err);}
//     }  
// }

import Routes from '../services/routes';
import Axios from 'axios';
import apiErros, { voidError } from '../services/apiErrors';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../NavigationService';
import { isEmpty, values } from 'lodash';
import { Store } from '../store';
import { setUser } from '../store/actions';
import Database from '../database';
import SecuryStorageController from './SecuryStorageController';
import ConnectionController from './ConnectionController';

export default class AuthController {
  static index(user) {
    if (console.tron) console.tron.log('Iniciando autenticação', user);
    console.log('URL de autenticação', Routes.url + '/oauth/token');
    return new Promise((resolve, reject) => {
      Axios.post(Routes.url + '/oauth/token', {
        client_id: 4,
        client_secret: 'q1ShOPElLMu1yXTKOwvAjthqizmhBapHQjepkQHu',
        grant_type: 'password',
        ...user,
      }, {
        withCredentials: false,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(response => {
          if (console.tron) console.tron.log('Resposta da autenticação', response);
          if (isEmpty(response)) {
            voidError();
            reject('Network Error!');
          }
          if (isEmpty(response.data)) {
            voidError();
            reject('Network Error!');
          }
          console.tron.log(response.data);

          AuthController.setPersistences(response.data)
            .then(async res => {
              if (console.tron) console.tron.log('Persistindo dados de autenticação');
              await SecuryStorageController.store(user);
              await AsyncStorage.setItem('logged', 'true');
              resolve(response);
            })
            .catch(err => {
              if (console.tron) console.tron.error('Erro ao persistir dados de autenticação', err);
              reject(err);
            });
        })
        .catch(error => {
          if (console.tron) console.tron.error('Erro na autenticação', error);
          if (isEmpty(error)) {
            voidError();
            reject('Network Error!');
          }
          if (isEmpty(error.response)) {
            voidError();
            reject('Network Error!');
          }
          if (error.response?.status != 401 && error.response.status != 400) {
            apiErros(error.response);
            reject(error.response);
          } else {
            Toast.show({
              text: 'Credenciais inválidas!',
              type: 'warning',
              duration: 3000,
            });
            reject('credenciais invalidas');
          }
          reject(error);
        });
    });
  }

  static async oneTapLogin() {
    if (console.tron) console.tron.log('Iniciando oneTapLogin');
    try {
      const is_connect = await ConnectionController.isConnected();
      const credentials = await SecuryStorageController.get();
      if (console.tron) {
        console.tron.log('Conectado à internet:', is_connect);
        console.tron.log('Credenciais:', credentials);
      }

      if (is_connect) {
        await AuthController.index(credentials);
      }

      const token = await AuthController.getToken();
      const user = await AuthController.getUser();

      if (!isEmpty(token) && !isEmpty(user)) {
        await AsyncStorage.setItem('logged', 'true');
        return Promise.resolve('ok');
      }

      return Promise.reject('no data');
    } catch (err) {
      if (console.tron) console.tron.error('Erro em oneTapLogin', err);
      return Promise.reject(err);
    }
  }

  static async isLogged() {
    if (console.tron) console.tron.log('Verificando se usuário está logado');
    try {
      const token = await AuthController.getToken();
      const user = await AuthController.getUser();
      const logged = await AsyncStorage.getItem('logged');
      if (console.tron) {
        console.tron.log('Token:', token);
        console.tron.log('Usuário:', user);
        console.tron.log('Status de login:', logged);
      }

      if (!isEmpty(token) && !isEmpty(user) && logged === 'true') {
        Axios.defaults.headers.common['Authorization'] = token;
        return Promise.resolve(true);
      } else {
        await AuthController.loggout();
        return Promise.reject(false);
      }

    } catch (error) {
      if (console.tron) console.tron.error('Erro ao verificar login', error);
      await AuthController.loggout();
      return Promise.reject(false);
    }
  }

  static async loggout() {
    if (console.tron) console.tron.log('Fazendo logout');
    try {
      await AsyncStorage.setItem('logged', 'false');
      NavigationService.navigate('Login');

      return Promise.resolve('bye');
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao fazer logout', error);
      return Promise.reject(error);
    }
  }

  static async cleanUserData() {
    if (console.tron) console.tron.log('Limpando dados do usuário');
    try {
      await AsyncStorage.setItem('logged', 'false');
      await AuthController.removeToken();
      await AuthController.removeUser();
      AuthController.dropDatabases();
      return Promise.resolve('bye');
    } catch (err) {
      if (console.tron) console.tron.error('Erro ao limpar dados do usuário', err);
      return Promise.reject(err);
    }
  }

  static async setPersistences(data) {
    if (console.tron) console.tron.log('Setando persistências', data);
    try {
      await AuthController.setToken(data.token_type, data.access_token);
      console.tron.log(data.userdata);
      await AuthController.setUser(data.userdata);
      await AuthController.setInitConfg({ sync: true });
      return Promise.resolve('ok');
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao setar persistências', error);
      return Promise.reject(error);
    }
  }

  static async setToken(type, token) {
    if (console.tron) console.tron.log('Setando token', { type, token });
    try {
      await AsyncStorage.setItem('token', type + ' ' + token);
      Axios.defaults.headers.common['Authorization'] = type + ' ' + token;
      return Promise.resolve(token);
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao setar token', error);
      return Promise.reject(error);
    }
  }

  static async setInitConfg(value) {
    if (console.tron) console.tron.log('Setando configuração inicial', value);
    try {
      await AsyncStorage.setItem('init', JSON.stringify(value));
      return Promise.resolve(true);
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao setar configuração inicial', error);
      return Promise.reject(error);
    }
  }

  static async getInitConfg() {
    if (console.tron) console.tron.log('Obtendo configuração inicial');
    try {
      const value = await AsyncStorage.getItem('init');
      if (value !== null) {
        return Promise.resolve(JSON.parse(value));
      } else return Promise.resolve(null);
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao obter configuração inicial', error);
      return Promise.reject(error);
    }
  }

  static async getToken() {
    if (console.tron) console.tron.log('Obtendo token');
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        Axios.defaults.headers.common['Authorization'] = value;
        return Promise.resolve(value);
      } else return Promise.resolve(null);
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao obter token', error);
      return Promise.reject(error);
    }
  }

  static async getUser(noDispatch) {
    if (console.tron) console.tron.log('Obtendo usuário', { noDispatch });
    try {
      const value = await AsyncStorage.getItem('user');
      //if (value !== null) {
        const parsedUser = JSON.parse(value);
        if (!noDispatch)
          Store.dispatch(
            setUser({
              user: parsedUser,
            }),
          );
        return Promise.resolve(parsedUser);
      //} else return Promise.resolve(null);
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao obter usuário', error);
      return Promise.reject(error);
    }
  }

  static async removeToken() {
    if (console.tron) console.tron.log('Removendo token');
    try {
      await AsyncStorage.removeItem('token');
      return Promise.resolve('removed');
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao remover token', error);
      return Promise.reject(error);
    }
  }

  static async removeUser() {
    if (console.tron) console.tron.log('Removendo usuário');
    try {
      await AsyncStorage.removeItem('user');
      return Promise.resolve('removed');
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao remover usuário', error);
      return Promise.reject(error);
    }
  }

  static getAuthorization() {
    if (console.tron) console.tron.log('Obtendo autorização');
    Promise.resolve(AsyncStorage.getItem('token'))
      .then(value => {
        Axios.defaults.headers.common['Authorization'] = value;
      })
      .catch(erro => {
        if (console.tron) console.tron.error('Erro ao obter autorização', erro);
      });
    return Axios.defaults.headers.common['Authorization'];
  }

  static async setUser(user) {
    if (console.tron) console.tron.log('Setando usuário', user);
    try {
      let user_str = JSON.stringify(user);
      console.tron.log('user_str', user_str);
      await AsyncStorage.setItem('user', user_str);
      Store.dispatch(
        setUser({
          user: user,
        }),
      );
      return Promise.resolve(user_str);
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao setar usuário', error);
      return Promise.reject(error);
    }
  }

  static async updateUser(data = {}) {
    if (console.tron) console.tron.log('Atualizando usuário', data);
    try {
      const currentUser = await AuthController.getUser(true);

      let newUser = {
        ...currentUser,
        ...data,
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      Store.dispatch(
        setUser({
          user: newUser,
        }),
      );
      return Promise.resolve(newUser);
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao atualizar usuário', error);
      return Promise.reject(error);
    }
  }

  static async getHeaders() {
    if (console.tron) console.tron.log('Obtendo headers');
    try {
      const token = await AuthController.getToken();
      return Promise.resolve({
        headers: { Authorization: token },
      });
    } catch (error) {
      if (console.tron) console.tron.error('Erro ao obter headers', error);
      return Promise.reject(error);
    }
  }

  static async dropDatabases() {
    if (console.tron) console.tron.log('Desfazendo bancos de dados');
    try {
      await Database.open('JornadaLancamentos');
      await Database.deleteAll();
      await Database.close();
      return Promise.resolve('Done');
    } catch (err) {
      if (console.tron) console.tron.error('Erro ao desfazer bancos de dados', err);
      await Database.close();
      return Promise.reject(err);
    }
  }

  static async storeLoginInfo(data) {
    if (console.tron) console.tron.log('Armazenando informações de login', data);
    try {
      const loginInfoStorage = await AsyncStorage.getItem('loginInfo');
      let arrayOfinfos = [];
      if (loginInfoStorage) {
        arrayOfinfos = JSON.parse(loginInfoStorage);
      }
      arrayOfinfos.push(data);
      await AsyncStorage.setItem('loginInfo', JSON.stringify(arrayOfinfos));
      return Promise.resolve('ok');
    } catch (err) {
      if (console.tron) console.tron.error('Erro ao armazenar informações de login', err);
      return Promise.reject(err);
    }
  }

  static async getLoginInfo() {
    if (console.tron) console.tron.log('Obtendo informações de login');
    try {
      const loginInfoStorage = await AsyncStorage.getItem('loginInfo');
      return Promise.resolve(loginInfoStorage ? JSON.parse(loginInfoStorage) : []);
    } catch (err) {
      if (console.tron) console.tron.error('Erro ao obter informações de login', err);
      return Promise.reject(err);
    }
  }
}
