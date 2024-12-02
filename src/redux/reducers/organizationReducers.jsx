/** @format */

import { ORGANIZATION_TYPES } from "../actions/organizationActions";

const initialState = {
  organizations: [],
};

const districtReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORGANIZATION_TYPES.GET_ALL_ORGANIZATION_DATA:
      return {
        ...state,
        organizations: action.payload,
      };
    default:
      return state;
  }
};

export default districtReducer;
