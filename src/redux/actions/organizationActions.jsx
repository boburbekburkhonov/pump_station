/** @format */

import { getDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const ORGANIZATION_TYPES = {
  GET_ALL_ORGANIZATION_DATA: "GET_ALL_ORGANIZATION_DATA",
};

export const getAllOrganizationsData = (lang, token) => async (dispatch) => {
  try {
    const res = await getDataApi(
      `organizations/getAll?page=1&perPage=10000&lang=${lang}`,
      token
    );

    dispatch({
      type: ORGANIZATION_TYPES.GET_ALL_ORGANIZATION_DATA,
      payload: res.data.data.data,
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
          error: err.response.data.message || err.response.message,
        },
      });
    }
  }
};
