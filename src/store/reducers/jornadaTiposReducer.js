import {
    SET_JORNADA_TIPOS
} from '../actions/actions_types'


const initialState = {
    jornadaTipos: {}
};


export function jornadaTiposReducer(state = initialState, action) {
    switch (action.type) {
        case SET_JORNADA_TIPOS:
            return Object.assign({}, state, {
                jornadaTipos: action.jornadaTipos
            });    
    }
    return state;
}
