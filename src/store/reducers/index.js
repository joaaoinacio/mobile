import { combineReducers } from 'redux';
import { jornadaReducer } from './jornadaReducer';
import { userReducer } from './userReducer';
import { connectionReducer } from './connectionReducer';
import { bootListReducer } from './bootListReducer.js';
import { geolocationReducer } from './geolocationReducer';
import { lancamentosReducer } from './lancamentosReducer';

export const Reducers = combineReducers({
    jornada:        jornadaReducer,
    user:           userReducer,
    connection:     connectionReducer,
    bootList:       bootListReducer,
    geolocation:    geolocationReducer,
    lancamentos:    lancamentosReducer
});