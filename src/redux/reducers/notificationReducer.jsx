/** @format */

import { NOTIFICATIONS_TYPES } from "../actions/notificationActions";

const initialState = {
  countNotif: 0,
  unseenNotif: [],
  allNotifications: []
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_TYPES.GET_ALL_NOTIFICATION_COUNTS:
      return {
        ...state,
        countNotif: action.payload,
      };

    case NOTIFICATIONS_TYPES.GET_ALL_NOTIFICATIONS_UNSEEN:
      return {
        ...state,
        unseenNotif: action.payload,
      };
    case NOTIFICATIONS_TYPES.GET_ALL_NOTIFICATIONS_FOR_INFO:
      return {
        ...state,
        allNotifications: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
