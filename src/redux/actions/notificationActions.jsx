/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { getDataApi, postDataApi } from "../../utils";

export const NOTIFICATIONS_TYPES = {
  GET_ALL_NOTIFICATION_COUNTS: "GET_ALL_NOTIFICATION_COUNTS",
  GET_ALL_NOTIFICATIONS_UNSEEN: "GET_ALL_NOTIFICATIONS_UNSEEN",
  GET_ALL_NOTIFICATIONS_FOR_INFO: "GET_ALL_NOTIFICATIONS_FOR_INFO",
  DELETE_NOTIFICATIONS: "DELETE_NOTIFICATIONS",
};

export const getNotificationCount = (lang, token) => async (dispatch) => {
  try {
    const res = await getDataApi(
      `notification/getUnseenNotificationsCount?lang=${lang}`,
      token
    );

    dispatch({
      type: NOTIFICATIONS_TYPES.GET_ALL_NOTIFICATION_COUNTS,
      payload: res.data.data,
    });
  } catch (err) {
    if (!err.response) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Network Error",
        },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message || err.response.statusText,
        },
      });
    }
  }
};

export const getAllNotifications =
  (lang, token, page, perPage) => async (dispatch) => {
    try {
      const res = await getDataApi(
        `notification/getNotifications?lang=${lang}&page=${
          page != undefined ? page : ""
        }&perPage=${perPage != undefined ? perPage : ""}`,
        token
      );

      dispatch({
        type: NOTIFICATIONS_TYPES.GET_ALL_NOTIFICATIONS_UNSEEN,
        payload: res.data.data,
      });
    } catch (err) {
      if (!err.response) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: "Network Error",
          },
        });
      } else {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

export const getAllNotificationsForOneInfo =
  (lang, token) => async (dispatch) => {
    try {
      const res = await getDataApi(
        `notification/getNotifications?lang=${lang}`,
        token
      );

      dispatch({
        type: NOTIFICATIONS_TYPES.GET_ALL_NOTIFICATIONS_FOR_INFO,
        payload: res.data.data,
      });
    } catch (err) {
      if (!err.response) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: "Network Error",
          },
        });
      } else {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

export const deleteNotification = (data, token) => async (dispatch) => {
  try {
    const res = await postDataApi(
      "notification/markAsSeen",
      { notificationId: data },
      token
    );

    dispatch({
      type: NOTIFICATIONS_TYPES.DELETE_NOTIFICATIONS,
      payload: res.data.message,
    });
  } catch (err) {
    if (!err.response) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Network Error",
        },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message || err.response.statusText,
        },
      });
    }
  }
};
