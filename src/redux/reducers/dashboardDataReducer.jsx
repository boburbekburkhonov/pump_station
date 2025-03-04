/** @format */

import { DASHBOARD_ACTIONS_TYPES } from "../actions/dashboardActions";

const initialState = {
  pumpLastData: {},
  pumpLastIdData: {},
  pumpIdData: {},
  pumpLineChartData: null,
  electryIdData: {},
  foundElectryById: {},
  foundAggregateById: {},
  foundStationById: {},
  electryLineChartData: null,
  pumpDataWithStationId: [],
  totalValueData: [],
  lineStationId: {}
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
    case DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataWithStationId: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA:
      return {
        ...state,
        lineStationId: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL:
      return {
        ...state,
        totalValueData: action.payload,
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
    case DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_FOR_NAME:
      return {
        ...state,
        foundElectryById: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPES.FIND_AGGREGATE_FOR_NAME:
      return {
        ...state,
        foundAggregateById: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPES.FIND_STATION_FOR_NAME:
      return {
        ...state,
        foundStationById: action.payload,
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
