import {isEmpty} from 'lodash';
import Database from '../database';
import http from '../services/api';
import Routes from '../services/routes';
import {Store} from '../store';
import {setJornada} from '../store/actions';
import {setJornadaTipos} from '../store/actions';
import {setVeiculos} from '../store/actions';
import ConnectionController from './ConnectionController';
export default class JornadaController {
  static async index(forceUpdate) {
    //CREATE DATABASE INSTANCE
    try {
      let storeData = Store.getState().jornada.jornada;
      if (!isEmpty(storeData) && !isEmpty(storeData.menu) && !forceUpdate) {
        return Promise.resolve('Done');
      }
      //OPEN DATABASE
      await Database.open('JornadaMenu');
      //GET OFFLINE VALUES
      const offlineData = await Database.index();
      //DISPACH OFFLINE VALUES ALREADY SETTED
      Store.dispatch(
        setJornada({
          menu: offlineData,
        }),
      );
      //VERIFY CONNECTION
      const isConnected = await ConnectionController.isConnected();
      console.log('isCONECETED', isConnected);
      //HAS CONNECTION
      if (isConnected) {
        //GET DATA FROM API
        const apiData = await http.get(Routes.api + '/jornada/menu-dinamico');
        await Database.deleteAll();
        const dbData = await Database.store(apiData && apiData.data);
        //SET REDUX STORE
        Store.dispatch(
          setJornada({
            menu: dbData,
          }),
        );
        //CLOSE DATABASE
        await Database.close();
        //RESOLVE DATA
        return Promise.resolve(dbData);
      }
      //HAS NO CONNECTION
      else {
        //CLOSE DATABASE
        await Database.close();
        return Promise.resolve('Done!');
      }
    } catch (err) {
      Database.close();
      return Promise.reject(err);
    }
  }
}
