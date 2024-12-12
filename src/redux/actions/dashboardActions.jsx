/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils";

export const DASHBOARD_ACTIONS_TYPES = {
  FIND_PUMP_LAST_DATA_BY_STATIONS_ID: "FIND_PUMP_LAST_DATA_BY_STATIONS_ID",
  FIND_LAST_DATA_BY_AGGREGATE_ID: "FIND_LAST_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_DATA_BY_STATION_ID: "FIND_ELECTRCITY_DATA_BY_STATION_ID",
  FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID:
    "FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID",

  FIND_TODAY_DATA_BY_STATION_ID: "FIND_TODAY_DATA_BY_STATION_ID",
  FIND_TODAY_DATA_BY_AGGREGATE_ID: "FIND_TODAY_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_TODAY_DATA_STATION_ID:
    "FIND_ELECTRCITY_TODAY_DATA_STATION_ID",
  FIND_TODAY_ELECTRICAL_ENERGY_ID: "FIND_TODAY_ELECTRICAL_ENERGY_ID",

  FIND_YESTERDAY_DATA_BY_STATION_ID: "FIND_YESTERDAY_DATA_BY_STATION_ID",
  FIND_YESTERDAY_DATA_BY_AGGREGATE_ID: "FIND_YESTERDAY_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_YESTERDAY_DATA_BY_STATION_ID:
    "FIND_ELECTRCITY_YESTERDAY_DATA_BY_STATION_ID",
  FIND_YESTERDAY_DATA_ELECTRICAL_ENERGY_ID:
    "FIND_YESTERDAY_DATA_ELECTRICAL_ENERGY_ID",

  FIND_WEEKLY_DATA_BY_STATION_ID: "FIND_WEEKLY_DATA_BY_STATION_ID",
  FIND_WEEKLY_DATA_BY_AGGREGATE_ID: "FIND_WEEKLY_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_WEEKLY_DATA_STATION_ID:
    "FIND_ELECTRCITY_WEEKLY_DATA_STATION_ID",
  FIND_WEEKLY_ELECTRICAL_ENERGY_ID: "FIND_WEEKLY_ELECTRICAL_ENERGY_ID",

  FIND_TEN_DAY_DATA_BY_STATION_ID: "FIND_TEN_DAY_DATA_BY_STATION_ID",
  FIND_TEN_DAY_DATA_BY_AGGREGATE_ID: "FIND_TEN_DAY_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_TEN_DAY_DATA_STATION_ID:
    "FIND_ELECTRCITY_TEN_DAY_DATA_STATION_ID",
  FIND_TEN_DAY_ELECTRICAL_ENERGY_ID: "FIND_TEN_DAY_ELECTRICAL_ENERGY_ID",

  FIND_MONTHLY_DATA_BY_STATION_ID: "FIND_MONTHLY_DATA_BY_STATION_ID",
  FIND_MONTHLY_DATA_BY_AGGREGATE_ID: "FIND_MONTHLY_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_MONTHLY_DATA_STATION_ID:
    "FIND_ELECTRCITY_MONTHLY_DATA_STATION_ID",
  FIND_MONTHLY_ELECTRICAL_ENERGY_ID: "FIND_MONTHLY_ELECTRICAL_ENERGY_ID",

  FIND_ALL_DATA_BY_STATION_ID: "FIND_ALL_DATA_BY_STATION_ID",
  FIND_ALL_DATA_BY_AGGREGATE_ID: "FIND_ALL_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_ALL_DATA_STATION_ID: "FIND_ELECTRCITY_ALL_DATA_STATION_ID",
  FIND_ALL_ELECTRICAL_ENERGY_ID: "FIND_ALL_ELECTRICAL_ENERGY_ID",
};

// Last data
export const getLastAggregateData =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findPumpLastDataByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_PUMP_LAST_DATA_BY_STATIONS_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const getLastAggregateIDData =
  (aggregateId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `aggregate/findLastDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_AGGREGATE_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findLastElectricityStationId =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findElectricityLastDataByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_BY_STATION_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findLastDataElectricityId =
  (electricalId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy/findLastDataByElectricalEnergyId?lang=${lang}&id=${electricalId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

// Today data
export const getTodayAggregateData =
  (stationId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-today-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_TODAY_DATA_BY_STATION_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const getTodayAggregateIDData =
  (aggregateId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-today-data/findDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_TODAY_DATA_BY_AGGREGATE_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findTodayElectricityStationId =
  (stationId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-today-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_TODAY_DATA_STATION_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findTodayDataElectricityId =
  (electricalId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-today-data/findDataByElectricalEnergyId?lang=${lang}&electricalEnergyId=${electricalId}&page=${page}&perPage=${perPage}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

// Yesterday
export const getYesterdayAggregateData =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findPumpLastDataByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_PUMP_LAST_DATA_BY_STATIONS_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const getYesterdayAggregateIDData =
  (aggregateId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `aggregate/findLastDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_AGGREGATE_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findYesterdayElectricityStationId =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findElectricityLastDataByStationId?lang=${lang}&aggregateId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_BY_STATION_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findYesterdayDataElectricityId =
  (electricalId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy/findLastDataByElectricalEnergyId?lang=${lang}&aggregateId=${electricalId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

// Weekly
export const getWeeklyAggregateData =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findPumpLastDataByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_PUMP_LAST_DATA_BY_STATIONS_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const getWeeklyAggregateIDData =
  (aggregateId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `aggregate/findLastDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_AGGREGATE_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findWeeklyElectricityStationId =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findElectricityLastDataByStationId?lang=${lang}&aggregateId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_BY_STATION_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findWeeklyDataElectricityId =
  (electricalId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy/findLastDataByElectricalEnergyId?lang=${lang}&aggregateId=${electricalId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

// Ten day data
export const getTenDayAggregateData =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findPumpLastDataByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_PUMP_LAST_DATA_BY_STATIONS_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const getTenDayAggregateIDData =
  (aggregateId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `aggregate/findLastDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_AGGREGATE_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findTenDayElectricityStationId =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findElectricityLastDataByStationId?lang=${lang}&aggregateId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_BY_STATION_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findTenDayDataElectricityId =
  (electricalId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy/findLastDataByElectricalEnergyId?lang=${lang}&aggregateId=${electricalId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

// Monthly data
export const getMonthlyAggregateData =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findPumpLastDataByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_PUMP_LAST_DATA_BY_STATIONS_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const getMonthlyAggregateIDData =
  (aggregateId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `aggregate/findLastDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_AGGREGATE_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findMonthlyElectricityStationId =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findElectricityLastDataByStationId?lang=${lang}&aggregateId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_BY_STATION_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findMonthlyDataElectricityId =
  (electricalId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy/findLastDataByElectricalEnergyId?lang=${lang}&aggregateId=${electricalId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

//   All data
export const getAllAggregateData =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findPumpLastDataByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_PUMP_LAST_DATA_BY_STATIONS_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const getAllAggregateIDData =
  (aggregateId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `aggregate/findLastDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_AGGREGATE_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findAllElectricityStationId =
  (stationId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findElectricityLastDataByStationId?lang=${lang}&aggregateId=${stationId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_BY_STATION_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };

export const findAllDataElectricityId =
  (electricalId, token, lang) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy/findLastDataByElectricalEnergyId?lang=${lang}&aggregateId=${electricalId}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID,
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
    } finally {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: false,
      });
    }
  };
