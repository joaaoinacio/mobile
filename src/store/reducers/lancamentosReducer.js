import {
    SET_LANCAMENTOS
} from '../actions/actions_types'


const initialState = {
   list: []
};


export function lancamentosReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LANCAMENTOS:
            return Object.assign({}, state, {
                lancamentos: action.lancamentos
            });    
    }
    return state;
}
