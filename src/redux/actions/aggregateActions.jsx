/** @format */

import { getDataApi, postDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const AGGREGATE_TYPES = {
  CREATE_AGGREGATE_DATA: "CREATE_AGGREGATE_DATA",
  UPDATE_AGGREGATE_DATA: "UPDATE_AGGREGATE_DATA",
  DELETE_AGGREGATE_DATA: "DELETE_AGGREGATE_DATA",
  FIND_BY_ID_AGGREGATE_DATA: "FIND_BY_ID_AGGREGATE_DATA",
  FIND_BY_STATIONS_ID_AGGREGATE: "FIND_BY_STATIONS_ID_AGGREGATE",
};

export const createAggregateData = (data, lang, token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await postDataApi(`aggregate/create?lang=${lang}`, data, token);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });

    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
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

export const getAllStationsAggregate =
  (id, lang, token) => async (dispatch) => {
    try {
      const res = await getDataApi(
        `aggregate/findByStationId?lang=${lang}&stationId=${id}`,
        token
      );

      dispatch({
        type: AGGREGATE_TYPES.FIND_BY_STATIONS_ID_AGGREGATE,
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
