import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = {
    loading: false,
    codeData: {}
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.ALERT:
            return action.payload;
        case GLOBALTYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case GLOBALTYPES.STATUS:
            return {
                ...state,
                codeData: action.payload
            };
        default:
            return state;
    }
}


export default alertReducer
