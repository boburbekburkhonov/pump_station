/** @format */

import { ORGANIZATION_TYPES } from "../actions/organizationActions";

const initialState = {
  organizations: [],
  organizationsByRegionId: [],
  organizationsForOrg: [],
};

const districtReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORGANIZATION_TYPES.GET_ALL_ORGANIZATION_DATA:
      return {
        ...state,
        organizations: action.payload,
      };
    case ORGANIZATION_TYPES.GET_ALL_ORGANIZATION_DATA_BY_REGION_ID:
      return {
        ...state,
        organizationsByRegionId: action.payload,
      };
    case ORGANIZATION_TYPES.GET_ALL_ORGANIZATION_DATA_FOR_ORG:
      return {
        ...state,
        organizationsForOrg: action.payload,
      };
    default:
      return state;
  }
};

export default districtReducer;
