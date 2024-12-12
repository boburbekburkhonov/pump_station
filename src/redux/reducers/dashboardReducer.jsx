/** @format */

import { DASHBOARD_DATAS } from "../actions/dashboard";

const initialState = {
  statisticData: [],
  stationsId: []
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_DATAS.GET_COUNT_STATIONS_STATISTICS:
      return {
        ...state,
        statisticData: action.payload,
      };
    case DASHBOARD_DATAS.FIND_ALL_STATIONS_ID:
      return {
        ...state,
        stationsId: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
