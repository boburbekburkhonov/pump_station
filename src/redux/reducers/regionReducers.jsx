/** @format */

import { REGION_TYPES } from "../actions/regionActions";

const initialState = {
  regions: [],
  regionsForRegion: [],
};

const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGION_TYPES.GET_ALL_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };
    case REGION_TYPES.GET_ALL_REGIONS_FOR_REGION:
      return {
        ...state,
        regionsForRegion: action.payload,
      };
    default:
      return state;
  }
};

export default regionReducer;
