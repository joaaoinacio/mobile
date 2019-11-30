import {
    SET_CONNECTION
} from '../actions/actions_types'


const initialState = {
   isConnected: true,
   connection: {}
};


export function connectionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CONNECTION:
            return Object.assign({}, state, {
                connection: action.connection
            });    
    }
    return state;
}
