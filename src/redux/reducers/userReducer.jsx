/** @format */

import { USER_ACTIONS_TYPES } from "../actions/userActions";

const initialState = {
  myProfileData: {},
  allUsers: {},
  allRoles: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS_TYPES.GET_MY_PROFILE:
      return {
        ...state,
        myProfileData: action.payload,
      };
    case USER_ACTIONS_TYPES.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case USER_ACTIONS_TYPES.GET_ALL_ROLES:
      return {
        ...state,
        allRoles: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
