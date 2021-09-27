import {
    SET_VEICULOS
} from '../actions/actions_types'


const initialState = {
   veiculos: {}
};


export function veiculosReducer(state = initialState, action) {
    switch (action.type) {
        case SET_VEICULOS:
            return Object.assign({}, state, {
                veiculos: action.veiculos
            });    
    }
    return state;
}
