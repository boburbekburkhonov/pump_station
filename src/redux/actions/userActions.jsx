/** @format */

import { getDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const USER_ACTIONS_TYPES = {
  GET_MY_PROFILE: "GET_MY_PROFILE",
};

export const getMyProfileData = (token) => async (dispatch) => {
  try {
    const res = await getDataApi('users/getMyProfile', token)

    dispatch({
        type: USER_ACTIONS_TYPES.GET_MY_PROFILE,
        payload: res.data.data
    })
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
