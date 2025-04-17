/** @format */

import { getDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const ORGANIZATION_TYPES = {
  GET_ALL_ORGANIZATION_DATA: "GET_ALL_ORGANIZATION_DATA",
  GET_ALL_ORGANIZATION_DATA_BY_REGION_ID: "GET_ALL_ORGANIZATION_DATA_BY_REGION_ID",
  GET_ALL_ORGANIZATION_DATA_FOR_ORG: "GET_ALL_ORGANIZATION_DATA_FOR_ORG",
};

export const getAllOrganizationsData = (lang, token, page, perPage) => async (dispatch) => {
  try {
    const res = await getDataApi(
      `organizations/getAll?page=${page != undefined ? page : "1"}&perPage=${perPage != undefined ? perPage : "10000"}&lang=${lang}`,
      token
    );

    dispatch({
      type: ORGANIZATION_TYPES.GET_ALL_ORGANIZATION_DATA,
      payload: res.data.data.data,
    });

    dispatch({
      type: ORGANIZATION_TYPES.GET_ALL_ORGANIZATION_DATA_FOR_ORG,
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
          error: err.response.data.message || err.response.message,
        },
      });
    }
  }
};

export const getAllOrganizationsDataByRegionId = (lang, token, regionId) => async (dispatch) => {
  try {
    const res = await getDataApi(
      `organizations/getByRegionId?regionId=${regionId}&lang=${lang}`,
      token
    );

    dispatch({
      type: ORGANIZATION_TYPES.GET_ALL_ORGANIZATION_DATA_BY_REGION_ID,
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
          error: err.response.data.message || err.response.message,
        },
      });
    }
  }
};