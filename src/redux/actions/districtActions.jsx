/** @format */

import { getDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const DISTRICT_TYPES = {
  GET_ALL_DISTRICT: "GET_ALL_DISTRICT",
  GET_ALL_DISTRICT_BY_REGIOND_ID: "GET_ALL_DISTRICT_BY_REGIOND_ID",
  GET_ALL_DISTRICT_FOR_DISTRICT: "GET_ALL_DISTRICT_FOR_DISTRICT",
  GET_BY_REGION_ID: "GET_BY_REGION_ID"
};

export const getAllDistrictData = (lang, token, page, perPage) => async (dispatch) => {
  try {
    const res = await getDataApi(`districts/getAll?page=${page != undefined ? page : "1"}&perPage=${perPage != undefined ? perPage : "65"}&lang=${lang}`, token);


    dispatch({
      type: DISTRICT_TYPES.GET_ALL_DISTRICT,
      payload: res.data.data.data,
    });

    dispatch({
      type: DISTRICT_TYPES.GET_ALL_DISTRICT_FOR_DISTRICT,
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

export const getAllDistrictDataByRegionId = (lang, token, regionId) => async (dispatch) => {
  try {
    const res = await getDataApi(`districts/getByRegionId?regionId=${regionId}&lang=${lang}`, token);

    dispatch({
      type: DISTRICT_TYPES.GET_ALL_DISTRICT_BY_REGIOND_ID,
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

export const getByRegionIdData = (lang, token, id) => async (dispatch) => {
  try {
    const res = await getDataApi(`stations/findStationCountByGroupRegionId?regionId=${id}&lang=${lang}`, token)

    dispatch({
      type: DISTRICT_TYPES.GET_BY_REGION_ID,
      payload: res.data.data.data
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
          error: err.response.data.message || err.response.message,
        },
      });
    }
  }
}
