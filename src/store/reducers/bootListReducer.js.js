import {
    SET_BOOT_LIST
} from '../actions/actions_types'


const initialState = {
   list: []
};


export function bootListReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BOOT_LIST:
            return Object.assign({}, state, {
                bootList: action.bootList
            });    
    }
    return state;
}
