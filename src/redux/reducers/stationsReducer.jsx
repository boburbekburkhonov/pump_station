import { STATIONS_TYPES } from "../actions/stationsActions";

const initialState = {
    stationsData: [],
    stationData: []
}

const stationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATIONS_TYPES.FIND_ALL_STATIONS:
            return {
                ...state,
                stationsData: action.payload
            };
        case STATIONS_TYPES.FIND_BY_ID_STATIONS:
            return {
                ...state,
                stationData: action.payload
            };
        default:
            return state;
    }
}


export default stationsReducer
