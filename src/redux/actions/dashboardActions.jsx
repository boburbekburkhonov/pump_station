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

  FIND_DAILY_DATA_BY_STATION_ID: "FIND_DAILY_DATA_BY_STATION_ID",
  FIND_DAILY_DATA_BY_AGGREGATE_ID: "FIND_DAILY_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_DAILY_DATA_BY_STATION_ID:
    "FIND_ELECTRCITY_DAILY_DATA_BY_STATION_ID",
  FIND_DAILY_DATA_ELECTRICAL_ENERGY_ID:
    "FIND_DAILY_DATA_ELECTRICAL_ENERGY_ID",

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

// * Last data

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

// * Today data

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

// * Yesterday
export const getYesterdayAggregateData =
  (stationId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-yesterday-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_YESTERDAY_DATA_BY_STATION_ID,
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
  (aggregateId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-yesterday-data/findDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_YESTERDAY_DATA_BY_AGGREGATE_ID,
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
  (stationId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-yesterday-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_YESTERDAY_DATA_BY_STATION_ID,
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
  (electricalId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-yesterday-data/findDataByElectricalEnergyId?lang=${lang}&stationId=${electricalId}&page=${page}&perPage=${perPage}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_YESTERDAY_DATA_ELECTRICAL_ENERGY_ID,
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

// * Weekly
export const getWeeklyAggregateData =
  (stationId, token, lang, page, perPage, month, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-weekly-data/findDataByStationIdAndYearMonthNumber?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_WEEKLY_DATA_BY_STATION_ID,
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
  (aggregateId, token, lang, month, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-weekly-data/findDataByAggregateIdAndYearMonthNumber?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_WEEKLY_DATA_BY_AGGREGATE_ID,
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
  (stationId, token, lang, page, perPage, month, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-weekly-data/findDataByStationId?lang=${lang}&aggregateId=${stationId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_WEEKLY_DATA_STATION_ID,
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
  (electricalId, token, lang, page, perPage, month, year) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: true,
        });

        const res = await getDataApi(
          `electrical-energy-weekly-data/findDataByElectricalEnergyId?lang=${lang}&aggregateId=${electricalId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
          token
        );

        dispatch({
          type: DASHBOARD_ACTIONS_TYPES.FIND_WEEKLY_ELECTRICAL_ENERGY_ID,
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

// * Ten day data
export const getTenDayAggregateData =
  (stationId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `/pump-ten-day-data/findDataByStationIdAnfYearNumber?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_TEN_DAY_DATA_BY_STATION_ID,
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
  (aggregateId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-ten-day-data/findDataByAggregateIdAndYearNumber?lang=${lang}&stationId=${aggregateId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_TEN_DAY_DATA_BY_AGGREGATE_ID,
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
  (stationId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-ten-day-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_TEN_DAY_DATA_STATION_ID,
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
  (electricalId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-ten-day-data/findDataByElectricalEnergyId?lang=${lang}&stationId=${electricalId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_TEN_DAY_ELECTRICAL_ENERGY_ID,
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

// * Monthly data
export const getMonthlyAggregateData =
  (stationId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-monthly-data/findDataByStationIdAndYearNumber?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_MONTHLY_DATA_BY_STATION_ID,
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
  (aggregateId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-monthly-data/findDataByAggregateIdAndYearNumber?lang=${lang}&stationId=${aggregateId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_MONTHLY_DATA_BY_AGGREGATE_ID,
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
  (stationId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-monthly-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_MONTHLY_DATA_STATION_ID,
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
  (electricalId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-monthly-data/findDataByElectricalEnergyId?lang=${lang}&stationId=${electricalId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_MONTHLY_ELECTRICAL_ENERGY_ID,
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

// todo  All data
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


// todo Daily
export const getDailyAggregateData =
  (stationId, token, lang, page, perPage, month, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-daily-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${perPage}&perPage=${page}&year=${year}&month=${month}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DAILY_DATA_BY_STATION_ID,
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

export const getDailyAggregateIDData =
  (aggregateId, token, lang, page, perPage, month, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-daily-data/findDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DAILY_DATA_BY_AGGREGATE_ID,
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

export const findDailyElectricityStationId =
  (stationId, token, lang, page, perPage, month, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-weekly-data/findDataByStationId?lang=${lang}&aggregateId=${stationId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
        token
      );

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_WEEKLY_DATA_STATION_ID,
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

export const findDailyDataElectricityId =
  (electricalId, token, lang, page, perPage, month, year) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GLOBALTYPES.LOADING,
          payload: true,
        });

        const res = await getDataApi(
          `electrical-energy-weekly-data/findDataByElectricalEnergyId?lang=${lang}&aggregateId=${electricalId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
          token
        );

        dispatch({
          type: DASHBOARD_ACTIONS_TYPES.FIND_WEEKLY_ELECTRICAL_ENERGY_ID,
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