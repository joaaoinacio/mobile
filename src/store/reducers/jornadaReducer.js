import {
    SET_JORNADA
} from '../actions/actions_types'


const initialState = {
   menu: {}
};


export function jornadaReducer(state = initialState, action) {
    switch (action.type) {
        case SET_JORNADA:
            return Object.assign({}, state, {
                jornada: action.jornada
            });    
    }
    return state;
}
