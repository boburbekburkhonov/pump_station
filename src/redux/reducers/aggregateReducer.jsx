/** @format */

import { AGGREGATE_TYPES } from "../actions/aggregateActions";

const initialState = {
  aggregateData: [],
};

const aggregateReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGGREGATE_TYPES.FIND_BY_STATIONS_ID_AGGREGATE:
      return {
        ...state,
        aggregateData: action.payload,
      };
    default:
      return state;
  }
};

export default aggregateReducer;
