import AsyncStorage from "@react-native-community/async-storage";
import { uuidv4 } from "./utils";


export default class Database {
    constructor({ name }) {
        this.name = name;
    }

    async index({ query } = {}) {
        try {
            const data = await AsyncStorage.getItem(this.name);
            if (data !== null) {
                let response = this.formatData({ data });

                return response;
            }
            return Promise.resolve([]);
        }
        catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async getOne(query) {
        try {
            const values = await AsyncStorage.getItem(this.name);
            if (value !== null) {
                // value previously stored
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async store({ storeData }) {
        try {
            const data = await this.index();

            if (!Array.isArray(storeData) && typeof storeData === 'object') storeData = [storeData]
            else if (!Array.isArray(storeData)) storeData = [];

            storeData = storeData.map(item => {
                if (!item.id) return {
                    ...item,
                    id: uuidv4()
                }

                return item
            });

            storeData = storeData.filter(item => {
                if (data.map(e => e.id).indexOf(item.id) !== -1) return false;
                return true;
            })

            const new_data = [...data, ...storeData];

            await AsyncStorage.setItem(this.name, JSON.stringify(new_data));
            return Promise.resolve(storeData);
        }
        catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async update({ id, ids }) {
        try {

        }
        catch (err) {
            console.log(err);
        }
    }

    async delete({ id, ids }) {
        try {

        }
        catch (err) {
            console.log(err);
        }
    }

    async truncate() {
        try {
            await AsyncStorage.setItem(this.name, JSON.stringify([]));
            return Promise.resolve('Done');
        }
        catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async sync({ syncData }) {
        try {
            const data = await this.index();
            const only_news = data.filter(e => e.new);

            const new_data = [...syncData, ...only_news];

            await AsyncStorage.setItem(this.name, JSON.stringify(new_data));

            return Promise.resolve(new_data);
        }
        catch (err) {
            console.log(err);
        }
    }

    formatData({ data, single }) {
        try {
            let json_parsed = JSON.parse(data);
            if (!single && Array.isArray(json_parsed)) return json_parsed
            if (typeof json_parsed === 'object') return json_parsed

            return single ? {} : []
        }
        catch (err) {
            return single ? {} : []
        }
    }
}
