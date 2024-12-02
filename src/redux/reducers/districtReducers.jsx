/** @format */

import { DISTRICT_TYPES } from "../actions/districtActions";

const initialState = {
  districts: [],
  districtByRegionId: []
};

const districtReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISTRICT_TYPES.GET_ALL_DISTRICT:
      return {
        ...state,
        districts: action.payload,
      };
    case DISTRICT_TYPES.GET_BY_REGION_ID:
      return {
        ...state,
        districtByRegionId: action.payload,
      };
    default:
      return state;
  }
};

export default districtReducer;
