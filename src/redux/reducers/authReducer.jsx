/** @format */

import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  codeData: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUS:
      return {
        ...state,
        codeData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
