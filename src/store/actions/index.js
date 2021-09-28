import {
    SET_JORNADA,
    SET_USER,
    SET_CONNECTION,
    SET_BOOT_LIST,
    SET_GEOLOCATION,
    SET_LANCAMENTOS,
    SET_JORNADA_TIPOS,
    SET_VEICULOS
} from './actions_types'

export function setJornada(jornada) {
    return {
        type: SET_JORNADA,
        jornada: jornada
    };
}

export function setUser(user) {
    return {
        type: SET_USER,
        user: user
    };
}

export function setConnection(connection) {
    return {
        type: SET_CONNECTION,
        connection: connection
    };
}

export function setBootList(bootList) {
    return {
        type: SET_BOOT_LIST,
        bootList: bootList
    };
}

export function setGeolocation(geolocation) {
    return {
        type: SET_GEOLOCATION,
        geolocation: geolocation
    };
}

export function setLancamentos(lancamentos) {
    return {
        type: SET_LANCAMENTOS,
        lancamentos: lancamentos
    };
}

export function setJornadaTipos(jornadaTipos) {
    return {
        type: SET_JORNADA_TIPOS,
        jornadaTipos: jornadaTipos
    };
}

export function setVeiculos(veiculos) {
    return {
        type: SET_VEICULOS,
        veiculos: veiculos
    };
}