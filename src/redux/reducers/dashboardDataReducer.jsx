/** @format */

import { DASHBOARD_ACTIONS_TYPES } from "../actions/dashboardActions";

const initialState = {
  pumpLastData: {},
  pumpLastIdData: {},
  pumpIdData: {},
  pumpLineChartData: null,
  electryIdData: {},
  electryLineChartData: null,
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
    case DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID:
      return {
        ...state,
        pumpIdData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID:
      return {
        ...state,
        pumpLineChartData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID:
      return {
        ...state,
        electryIdData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID:
      return {
        ...state,
        electryLineChartData: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardDataReducer;
