/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils";

export const DASHBOARD_DATAS = {
  GET_COUNT_STATIONS_STATISTICS: "GET_COUNT_STATIONS_STATISTICS",
  GET_COUNT_STATIONS_STATISTICS_FOR_ADMIN: "GET_COUNT_STATIONS_STATISTICS_FOR_ADMIN",
  FIND_ALL_STATIONS_ID: "FIND_ALL_STATIONS_ID"
};

export const getStatisticsDashboard =
  (regionId, lang, token) => async (dispatch) => {
    try {
      const res = await getDataApi(
        `dashboard/findStationCountGroup?lang=${lang}&regionId=${regionId}`,
        token
      );
      const data = res.data.data;

    const newData = [
      data.countStations,
      data.countActiveStations,
      data.countInactiveStations,
      data.aggregate.countAggregate,
      data.aggregate.countWorking,
      data.aggregate.countDefection,
      data.aggregate.countNotWorking,
      data.electricalEnergy.countElectricalEnergy,
      data.electricalEnergy.countWorking,
      data.electricalEnergy.countNotWorking,
      data.electricalEnergy.countDefection,

    ]
    
    dispatch({
        type: DASHBOARD_DATAS.GET_COUNT_STATIONS_STATISTICS,
        payload: newData,
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

export const getStatisticsDashboardForAdmin =
(lang, token) => async (dispatch) => {
  try {
    const res = await getDataApi(
      `dashboard/findStationCountGroup?lang=${lang}`,
      token
    );
    const data = res.data.data;
    
    dispatch({
      type: DASHBOARD_DATAS.GET_COUNT_STATIONS_STATISTICS_FOR_ADMIN,
      payload: data,
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

export const getAllStationsId = (lang, token) => async (dispatch) => {
  try {
    const res = await getDataApi(
      `stations/findAllStationIdAndName?lang=${lang}`,
      token
    );

    dispatch({
      type: DASHBOARD_DATAS.FIND_ALL_STATIONS_ID,
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
