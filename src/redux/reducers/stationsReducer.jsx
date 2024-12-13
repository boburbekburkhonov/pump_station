import { STATIONS_TYPES } from "../actions/stationsActions";

const initialState = {
    stationsData: [],
    stationData: [],
    stationsLoading: false,
    stationsLastData: [],
    stationsMap: [],
    stationsPolygon: {}
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
        case STATIONS_TYPES.FIND_LAST_DATA_AND_STATIONS:
            return {
                ...state,
                stationsLastData: action.payload
            };
        case STATIONS_TYPES.FIND_LAST_DATA_LOADING:
            return {
                ...state,
                stationsLoading: action.payload
            };
        case STATIONS_TYPES.FIND_MAPS_LAST_DATA:
            return {
                ...state,
                stationsMap: action.payload
            };
        case STATIONS_TYPES.FIND_MY_LOCATIONS_POLYGONE:
            return {
                ...state,
                stationsPolygon: action.payload
            };
        default:
            return state;
    }
}


export default stationsReducer
