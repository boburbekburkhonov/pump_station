/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils";

export const DASHBOARD_DATAS = {
  GET_USER_INFORMATION_BY_ID: "GET_USER_INFORMATION_BY_ID",
  GET_VOLUME_AND_ENERGY_DATA_BY_GROUPSTATION: "GET_VOLUME_AND_ENERGY_DATA_BY_GROUPSTATION",
  UPDATED_USER_INFORMATION_BY_ID: "UPDATE_USER_INFORMATION_BY_ID",
  GET_COUNT_STATIONS_STATISTICS: "GET_COUNT_STATIONS_STATISTICS",
  GET_COUNT_STATIONS_STATISTICS_FOR_ORGANIZATION: "GET_COUNT_STATIONS_STATISTICS_FOR_ORGANIZATION",
  GET_STATISTIC_DATA_LOADING: "GET_STATISTIC_DATA_LOADING",
  GET_COUNT_STATIONS_STATISTICS_FOR_ADMIN:
    "GET_COUNT_STATIONS_STATISTICS_FOR_ADMIN",
  FIND_ALL_STATIONS_ID: "FIND_ALL_STATIONS_ID",
};

export const getUserInformationById = (userId, token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`users/getById?id=${userId}`, token);

    if (res.data.statusCode == 200) {
      dispatch({
        type: DASHBOARD_DATAS.GET_USER_INFORMATION_BY_ID,
        payload: res.data.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.message,
      },
    });
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
  }
};

export const getStatisticsDashboard =
  (regionId, lang, token) => async (dispatch) => {
    try {
      dispatch({
        type: DASHBOARD_DATAS.GET_STATISTIC_DATA_LOADING,
        payload: true,
      });

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
      ];

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
    } finally {
      dispatch({
        type: DASHBOARD_DATAS.GET_STATISTIC_DATA_LOADING,
        payload: false,
      });
    }
  };

  export const getStatisticsDashboardForOrganization =
  (regionId, lang, token) => async (dispatch) => {
    try {
      dispatch({
        type: DASHBOARD_DATAS.GET_STATISTIC_DATA_LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `dashboard/findStationCountGroup?lang=${lang}&regionId=${regionId}`,
        token
      );

      const data = res.data.data

      const newData = [
        data.totalStations,
        data.totalActiveStations,
        data.totalInactiveStations,
      ];

      dispatch({
        type: DASHBOARD_DATAS.GET_COUNT_STATIONS_STATISTICS_FOR_ORGANIZATION,
        payload: {
          newData: newData,
          districts: res.data.data.data
        },
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
    } finally {
      dispatch({
        type: DASHBOARD_DATAS.GET_STATISTIC_DATA_LOADING,
        payload: false,
      });
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

export const isUserUpdated = () => async (dispatch) => {
  dispatch({
    type: DASHBOARD_DATAS.UPDATED_USER_INFORMATION_BY_ID,
    payload: {
      statusCode: 200,
    },
  });
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

export const getVolumeAndEnergyDataByGroupStation =
  (lang, token, dataType) => async (dispatch) => {
    try {
      const res = await getDataApi(
        `dashboard/getVolumeAndEnergyDataByGroupStation?lang=${lang}&dataType=${dataType}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: DASHBOARD_DATAS.GET_VOLUME_AND_ENERGY_DATA_BY_GROUPSTATION,
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