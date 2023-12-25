import {isEmpty, isUndefined} from 'lodash';
import {Toast} from 'native-base';
import Realm from 'realm';
import JornadaLancamentosEnviarSchema from './Jornada/Schemas/JornadaLancamentosEnviarSchema';
import JornadaLancamentosSchema from './Jornada/Schemas/JornadaLancamentosSchema';
import JornadaMenuSchema from './Jornada/Schemas/JornadaMenuSchema';
import JornadasTipoSchema from './Jornada/Schemas/JornadasTipoSchema';
import VeiculoSchema from './Jornada/Schemas/VeiculoSchema';
import JornadaLancamentoService from './Jornada/Services/JornadaLancamentoService';
import {sleep} from '../functions/util';

const Schemas = {
  JornadaMenu: JornadaMenuSchema,
  JornadaLancamentoEnviar: JornadaLancamentosEnviarSchema,
  JornadaLancamentos: JornadaLancamentosSchema,
  Veiculo: VeiculoSchema,
  JornadasTipo: JornadasTipoSchema,
};

const Services = {
  JornadaLancamentos: JornadaLancamentoService,
};

class DatabaseClass {
  static instance = null;
  realm = null;
  schema = null;
  schemaName = null;

  constructor() {
    if (DatabaseClass.instance) {
      return DatabaseClass.instance;
    }
    DatabaseClass.instance = this;
    return this;
  }

  async open(schemaName) {
    try {
      if (this.realm) {
        await this.close();
      }
      this.schema = Schemas[schemaName];
      this.schemaName = schemaName;

      if (isEmpty(this.schema)) {
        return Promise.reject(
          'Nenhum schema com esse nome encontrado no banco de dados.',
        );
      }
      const realm = await Realm.open({
        schema: [this.schema],
        deleteRealmIfMigrationNeeded: true,
      });
      this.realm = realm;
      return Promise.resolve('Database is opened!');
    } catch (err) {
      console.error(err);
      Toast.show({
        text: JSON.stringify(err),
        type: 'warning',
        duration: 10000,
        buttonText: 'Ok',
      });
      return Promise.reject(err);
    }
  }

  async close() {
    try {
      if (!this.realm) {
        return Promise.resolve('Database is closed!');
      }
      this.realm.close();
      await sleep(100);
      console.log('Database ' + this.schema.name + ' closed!');
      this.reset();
      return Promise.resolve('Database is closed!');
    } catch (err) {
      console.log('err to close database!');
      return Promise.reject(err);
    }
  }

  async index(query) {
    try {
      if (!this.realm) {
        return Promise.reject('Database is not opened!');
      }

      let data;
      if (
        !isUndefined(Services[this.schema.name]) &&
        !isUndefined(Services[this.schema.name].index)
      ) {
        data = await Services[this.schema.name].index(
          this.realm,
          this.schema,
          query,
        );
        return Promise.resolve(this.formatList(data));
      } else {
        if (query) {
          data = await this.realm
            .objects(this.schema.name)
            .filtered(query ? query : 'id != null');
        } else {
          data = await this.realm.objects(this.schema.name);
        }
        return Promise.resolve(this.formatList(data));
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  store(data) {
    return new Promise((resolve, reject) => {
      try {
        if (!this.realm) {
          return reject('Database is not opened!');
        }

        if (isEmpty(data)) {
          reject('Nenhum dado enviado para salvar.');
        }
        if (!Array.isArray(data)) {
          reject('A inserçao deve ser feita com um array de objetos.');
        }

        //SAVE IN SERVICE

        if (!isUndefined(Services[this.schema.name])) {
          Services[this.schema.name]
            .store(this.realm, this.schema, data)
            .then(res => {
              return resolve(this.formatList(res));
            })
            .catch(err => {
              return reject(err);
            });
        } else {
          //DEFAULT SAVE

          this.realm.write(() => {
            data.map(item => {
              this.realm.create(this.schema.name, item, true);
            });
            return resolve(
              this.formatList(this.realm.objects(this.schema.name)),
            );
          });
        }
      } catch (err) {
        console.log(err);
        return reject(err);
      }
    });
  }

  delete(data) {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          this.realm.delete(data);
          return resolve('Done!');
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  deleteWhere(query) {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          const objects = this.realm.objects(this.schema.name).filtered(query);
          this.realm.delete(objects);
          return resolve('Done!');
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          this.realm.deleteAll();
          return resolve('Done!');
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  formatList(data) {
    let model = this.schema.properties;
    let newData = [];
    let obj = {};

    data.map(realmItem => {
      obj = {};
      Object.keys(model).map(function (key, index) {
        obj[key] = realmItem[key];
      });
      newData.push(obj);
    });

    return newData;
  }

  reset() {
    this.realm = null;
    this.schema = null;
    this.schemaName = null;
  }
}

const Database = new DatabaseClass();

export default Database;
