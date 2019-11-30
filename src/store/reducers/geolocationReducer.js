import {
    SET_GEOLOCATION
} from '../actions/actions_types'


const initialState = {
   coords: {}
};


export function geolocationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GEOLOCATION:
            return Object.assign({}, state, {
                geolocation: action.geolocation
            });    
    }
    return state;
}
