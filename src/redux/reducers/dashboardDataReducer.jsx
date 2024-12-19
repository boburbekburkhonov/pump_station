/** @format */

import { DASHBOARD_ACTIONS_TYPES } from "../actions/dashboardActions";

const initialState = {
  pumpLastData: [],
  pumpLastIdData: [],
};

const dashboardDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_ACTIONS_TYPES.FIND_PUMP_LAST_DATA_BY_STATIONS_ID:
      return {
        ...state,
        pumpLastData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_AGGREGATE_ID:
      return {
        ...state,
        pumpLastIdData: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardDataReducer;
