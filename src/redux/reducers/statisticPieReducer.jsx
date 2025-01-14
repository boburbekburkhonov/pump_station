/** @format */

import { PIE_ACTIONS_TYPES } from "../actions/statisticPieActions";

const initialState = {
  totalData: null,
  firstPieData: false,
  secondPieData: false,
  loadingData: false,
};

const pieReducer = (state = initialState, action) => {
  switch (action.type) {
    case PIE_ACTIONS_TYPES.FIND_TODAY_DATA_STATISTICS:
      return {
        ...state,
        totalData: action.payload,
      };
    case PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS:
      return {
        ...state,
        loadingData: action.payload,
      };
    case PIE_ACTIONS_TYPES.FIND_YESTERDAY_DATA_STATISTICS:
      return {
        ...state,
        totalData: action.payload,
      };
    case PIE_ACTIONS_TYPES.FIND_WEEKLY_DATA_STATISTICS:
      return {
        ...state,
        totalData: action.payload,
      };
    case PIE_ACTIONS_TYPES.FIND_MONTH_DATA_STATISTICS:
      return {
        ...state,
        totalData: action.payload,
      };
    case PIE_ACTIONS_TYPES.FIND_YEARS_DATA_STATISTICS:
      return {
        ...state,
        totalData: action.payload,
      };
    case PIE_ACTIONS_TYPES.FIRST_PIE_DATA:
      return {
        ...state,
        firstPieData: action.payload,
      };
    case PIE_ACTIONS_TYPES.SECOND_PIE_DATA:
      return {
        ...state,
        secondPieData: action.payload,
      };
    default:
      return state;
  }
};

export default pieReducer;
