import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils";

export const REPORTS_TYPES = {
  GET_ALL_STATIONS: "GET_ALL_STATIONS",
  GET_STATION_TODAY_ALL_DATA_BY_STATION_ID: "GET_STATION_TODAY_ALL_DATA_BY_STATION_ID",
  GET_PUMP_TODAY_DATA_BY_STATION_ID: "GET_PUMP_TODAY_DATA_BY_STATION_ID",
  GET_PUMP_YESTEDAY_DATA_BY_STATION_ID: "GET_PUMP_YESTEDAY_DATA_BY_STATION_ID",
  GET_PUMP_DAILY_DATA_BY_STATION_ID: "GET_PUMP_DAILY_DATA_BY_STATION_ID",
  GET_PUMP_WEEKLY_DATA_BY_STATION_ID: "GET_PUMP_WEEKLY_DATA_BY_STATION_ID",
  GET_PUMP_TEN_DAY_DATA_BY_STATION_ID: "GET_PUMP_TEN_DAY_DATA_BY_STATION_ID",
  GET_PUMP_MONTHLY_DATA_BY_STATION_ID: "GET_PUMP_MONTHLY_DATA_BY_STATION_ID",
  GET_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID:
    "GET_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID",
  GET_PUMP_DATE_RANGE_DATA_BY_STATION_ID:
    "GET_PUMP_DATE_RANGE_DATA_BY_STATION_ID",
  GET_ELECTRICAL_ENERGY_TODAY_DATA_BY_STATION_ID:
    "GET_ELECTRICAL_ENERGY_TODAY_DATA_BY_STATION_ID",
  GET_ELECTRICAL_ENERGY_YESTERDAY_DATA_BY_STATION_ID:
    "GET_ELECTRICAL_ENERGY_YESTERDAY_DATA_BY_STATION_ID",
  GET_ELECTRICAL_ENERGY_DAILY_DATA_BY_STATION_ID:
    "GET_ELECTRICAL_ENERGY_DAILY_DATA_BY_STATION_ID",
  GET_ELECTRICAL_ENERGY_WEEKLY_DATA_BY_STATION_ID:
    "GET_ELECTRICAL_ENERGY_WEEKLY_DATA_BY_STATION_ID",
  GET_ELECTRICAL_ENERGY_TEN_DAY_DATA_BY_STATION_ID:
    "GET_ELECTRICAL_ENERGY_TEN_DAY_DATA_BY_STATION_ID",
  GET_ELECTRICAL_ENERGY_MONTHLY_DATA_BY_STATION_ID:
    "GET_ELECTRICAL_ENERGY_MONTHLY_DATA_BY_STATION_ID",
  GET_ELECTRICAL_ENERGY_CHOSEN_DATE_DATA_BY_STATION_ID:
    "GET_ELECTRICAL_ENERGY_CHOSEN_DATE_DATA_BY_STATION_ID",
};

export const getAllStations = (lang, token) => async (dispatch) => {
  try {
    const res = await getDataApi(`stations/findAll?lang=${lang}`, token);
    const data = res.data.data.data;

    dispatch({
      type: REPORTS_TYPES.GET_ALL_STATIONS,
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

// ! TODAY DATA

export const getStationTodayAllDataByStationId =
  (lang, token, stationId) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findTodayDataAllByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );
      const data = res.data.data.slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))

      dispatch({
        type: REPORTS_TYPES.GET_STATION_TODAY_ALL_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };
export const getPumpTodayDataByStationId =
  (lang, token, stationId, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-today-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_TODAY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

export const getElectricalEnergyTodayDataByStationId =
  (lang, token, stationId, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-today-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_ELECTRICAL_ENERGY_TODAY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

// ! YESTERDAY DATA
export const getPumpYesterdayDataByStationId =
  (lang, token, stationId, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-yesterday-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_YESTEDAY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

export const getElectricalEnergyYesterdayDataByStationId =
  (lang, token, stationId, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-yesterday-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_ELECTRICAL_ENERGY_YESTERDAY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

// ! DAILY DATA
export const getPumpDailyDataByStationId =
  (lang, token, stationId, page, perPage, year, month) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-daily-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}&month=${month}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_DAILY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

export const getElectricalEnergyDailyDataByStationId =
  (lang, token, stationId, page, perPage, year, month) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-daily-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}&month=${month}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_ELECTRICAL_ENERGY_DAILY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

// ! WEEKLY DATA
export const getPumpWeeklyDataByStationId =
  (lang, token, stationId, page, perPage, year, month) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-weekly-data/findDataByStationIdAndYearMonthNumber?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}&month=${month}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_WEEKLY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

  export const getElectricalEnergyWeeklyDataByStationId =
  (lang, token, stationId, page, perPage, year, month) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-weekly-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
        token
      );
      const data = res.data.data;
      console.log(data);

      dispatch({
        type: REPORTS_TYPES.GET_ELECTRICAL_ENERGY_WEEKLY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

// ! TEN DAY DATA

export const getPumpTenDayDataByStationId =
  (lang, token, stationId, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-ten-day-data/findDataByStationIdAnfYearNumber?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_TEN_DAY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

export const getElectricalEnergyTenDayDataByStationId =
  (lang, token, stationId, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-ten-day-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_ELECTRICAL_ENERGY_TEN_DAY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

// ! MONTHLY DATA
export const getPumpMonthlyDataByStationId =
  (lang, token, stationId, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-monthly-data/findDataByStationIdAndYearNumber?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_MONTHLY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

export const getElectricalEnergyMonthlyDataByStationId =
  (lang, token, stationId, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-monthly-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_ELECTRICAL_ENERGY_MONTHLY_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

// ! CHOSEN DATE DATA
export const getPumpChosenDateDataByStationId =
  (lang, token, stationId, page, perPage, date) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-all-data/findDataByStationIdDate?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&date=${date}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

export const getElectricalEnergyChosenDateDataByStationId =
  (lang, token, stationId, page, perPage, date) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-all-data/findDataByStationIdAndDate?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&date=${date}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_ELECTRICAL_ENERGY_CHOSEN_DATE_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };

// ! DATE RANGE DATA
export const getPumpDateRangeDataByStationId =
  (lang, token, stationId, page, perPage, start, end) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-all-data/findDataByStationIdAndDateRange?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&startDate=${start}&endDate=${end}`,
        token
      );
      const data = res.data.data;

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_DATE_RANGE_DATA_BY_STATION_ID,
        payload: data,
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
            error: err.response.data.message || err.response.statusText,
          },
        });
      }
    }
  };
