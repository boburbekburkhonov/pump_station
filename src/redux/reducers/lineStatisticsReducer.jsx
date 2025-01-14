/** @format */

import { LINE_STATISTIC_DATA_TYPES } from "../actions/lineStatisticsActions";

const initialState = {
  totalLineData: {},
  totalLineElectData: {},
  loadingLineData: false,
};

const lineReducer = (state = initialState, action) => {
  switch (action.type) {
    case LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA:
      return {
        ...state,
        totalLineData: action.payload,
      };

    case LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA2:
      return {
        ...state,
        totalLineElectData: action.payload,
      };
    case LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING:
      return {
        ...state,
        loadingLineData: action.payload,
      };
    case LINE_STATISTIC_DATA_TYPES.FIND_YESTERDAY_LINE_STATISTICS_DATA:
      return {
        ...state,
        totalLineData: action.payload,
      };
    case LINE_STATISTIC_DATA_TYPES.FIND_WEEKLY_LINE_STATISTICS_DATA:
      return {
        ...state,
        totalLineData: action.payload,
      };
    case LINE_STATISTIC_DATA_TYPES.FIND_MONTHLY_LINE_STATISTICS_DATA:
      return {
        ...state,
        totalLineData: action.payload,
      };
    case LINE_STATISTIC_DATA_TYPES.FIND_YEAR_LINE_STATISTICS_DATA:
      return {
        ...state,
        totalLineData: action.payload,
      };
    default:
      return state;
  }
};

export default lineReducer;
