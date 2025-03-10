import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils";

export const REPORTS_TYPES = {
  GET_ALL_STATIONS: "GET_ALL_STATIONS",
  GET_STATION_TODAY_ALL_DATA_BY_STATION_ID:
    "GET_STATION_TODAY_ALL_DATA_BY_STATION_ID",
  GET_PUMP_TODAY_DATA_BY_STATION_ID: "GET_PUMP_TODAY_DATA_BY_STATION_ID",
  GET_ALL_PUMP_TODAY_DATA_BY_STATION_ID: "GET_ALL_PUMP_TODAY_DATA_BY_STATION_ID",
  GET_STATION_YESTEDAY_ALL_DATA_BY_STATION_ID:
    "GET_STATION_YESTEDAY_ALL_DATA_BY_STATION_ID",
  GET_STATION_DAILY_ALL_DATA_BY_STATION_ID:
    "GET_STATION_DAILY_ALL_DATA_BY_STATION_ID",
  GET_STATION_WEEKLY_ALL_DATA_BY_STATION_ID:
    "GET_STATION_WEEKLY_ALL_DATA_BY_STATION_ID",
  GET_STATION_TEN_DAY_ALL_DATA_BY_STATION_ID:
    "GET_STATION_TEN_DAY_ALL_DATA_BY_STATION_ID",
  GET_STATION_MONTHLY_ALL_DATA_BY_STATION_ID:
    "GET_STATION_MONTHLY_ALL_DATA_BY_STATION_ID",
  GET_STATION_CHOSEN_DATE_ALL_DATA_BY_STATION_ID:
    "GET_STATION_CHOSEN_DATE_ALL_DATA_BY_STATION_ID",
  GET_STATION_DATE_RANGE_ALL_DATA_BY_STATION_ID:
    "GET_STATION_DATE_RANGE_ALL_DATA_BY_STATION_ID",
  GET_PUMP_YESTEDAY_DATA_BY_STATION_ID: "GET_PUMP_YESTEDAY_DATA_BY_STATION_ID",
  GET_ALL_PUMP_YESTEDAY_DATA_BY_STATION_ID: "GET_ALL_PUMP_YESTEDAY_DATA_BY_STATION_ID",
  GET_PUMP_DAILY_DATA_BY_STATION_ID: "GET_PUMP_DAILY_DATA_BY_STATION_ID",
  GET_ALL_PUMP_DAILY_DATA_BY_STATION_ID: "GET_ALL_PUMP_DAILY_DATA_BY_STATION_ID",
  GET_PUMP_WEEKLY_DATA_BY_STATION_ID: "GET_PUMP_WEEKLY_DATA_BY_STATION_ID",
  GET_ALL_PUMP_WEEKLY_DATA_BY_STATION_ID: "GET_ALL_PUMP_WEEKLY_DATA_BY_STATION_ID",
  GET_PUMP_TEN_DAY_DATA_BY_STATION_ID: "GET_PUMP_TEN_DAY_DATA_BY_STATION_ID",
  GET_ALL_PUMP_TEN_DAY_DATA_BY_STATION_ID: "GET_ALL_PUMP_TEN_DAY_DATA_BY_STATION_ID",
  GET_PUMP_MONTHLY_DATA_BY_STATION_ID: "GET_PUMP_MONTHLY_DATA_BY_STATION_ID",
  GET_ALL_PUMP_MONTHLY_DATA_BY_STATION_ID: "GET_ALL_PUMP_MONTHLY_DATA_BY_STATION_ID",
  GET_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID:
    "GET_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID",
  GET_ALL_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID:
    "GET_ALL_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID",
  GET_PUMP_DATE_RANGE_DATA_BY_STATION_ID:
    "GET_PUMP_DATE_RANGE_DATA_BY_STATION_ID",
  GET_ALL_PUMP_DATE_RANGE_DATA_BY_STATION_ID:
    "GET_ALL_PUMP_DATE_RANGE_DATA_BY_STATION_ID",
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

const months = {
  uz: [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
    "hafta",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "week",
  ],
  ru: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
    "неделя",
  ],
};

const daysValues = {
  uz: ["1-o'n kunlik", "2-o'n kunlik", "3-o'n kunlik", "4-o'n kunlik"],
  en: ["1 ten days", "2 ten days", "3 decade", "4 decade"],
  ru: ["1 десять дней", "2 декада", "3 десятилетие", "4 декада"],
};

const aggregateDataType = {
  uz: {
    name1: "Oqim tezligi",
    name2: "Tezlik",
    name3: "Suv Hajmi",
    weekName: "Hafta",
  },
  ru: {
    name1: "Скорость потока",
    name2: "Скорость",
    name3: "Объем",
    weekName: "Неделя",
  },
  en: {
    name1: "Flow rate",
    name2: "Velocity",
    name3: "Volume",
    weekName: "Week",
  },
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
      const data = res.data.data
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const resultData = [];

      data.forEach((e) => [
        resultData.push({
          date: e.date.split(" ")[1],
          volume: e.volume,
          energyActive: e.energyActive,
        }),
      ]);

      dispatch({
        type: REPORTS_TYPES.GET_STATION_TODAY_ALL_DATA_BY_STATION_ID,
        payload: resultData,
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
      const data = res.data.data.data;

      data.forEach((aggregate) => {
        aggregate.aggregateData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      });

      const resultData = [];

      data.forEach((e) => {
        const data = {
          name: e.aggregate.name,
          aggregateData: e.aggregateData,
          lineChartData: {
            date: e.aggregateData?.map((item) => item.date.split(" ")[1]),
            lineData: [
              {
                name: aggregateDataType[lang].name1,
                data: e.aggregateData?.map((item) => item.flow),
                unit: "m³/s",
              },
              {
                name: aggregateDataType[lang].name2,
                data: e.aggregateData?.map((item) => item.velocity),
                unit: "m/s",
              },
              {
                name: aggregateDataType[lang].name3,
                data: e.aggregateData?.map((item) => item.volume),
                unit: "m³",
              },
            ],
          },
        };

        resultData.push(data);
      });

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_TODAY_DATA_BY_STATION_ID,
        payload: resultData,
      });

      dispatch({
        type: REPORTS_TYPES.GET_ALL_PUMP_TODAY_DATA_BY_STATION_ID,
        payload: res.data.data.data,
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

export const getStationYesterdayAllDataByStationId =
  (lang, token, stationId) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findYesterdayDataAllByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );
      const data = res.data.data
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const resultData = [];

      data.forEach((e) => [
        resultData.push({
          date: e.date.split(" ")[1],
          volume: e.volume,
          energyActive: e.energyActive,
        }),
      ]);

      dispatch({
        type: REPORTS_TYPES.GET_STATION_YESTEDAY_ALL_DATA_BY_STATION_ID,
        payload: resultData,
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
      const data = res.data.data.data;

      data.forEach((aggregate) => {
        aggregate.aggregateData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      });

      const resultData = [];

      data.forEach((e) => {
        const data = {
          name: e.aggregate.name,
          aggregateData: e.aggregateData,
          lineChartData: {
            date: e.aggregateData?.map((item) => item.date.split(" ")[1]),
            lineData: [
              {
                name: aggregateDataType[lang].name1,
                data: e.aggregateData?.map((item) => item.flow),
                unit: "m³/s",
              },
              {
                name: aggregateDataType[lang].name2,
                data: e.aggregateData?.map((item) => item.velocity),
                unit: "m/s",
              },
              {
                name: aggregateDataType[lang].name3,
                data: e.aggregateData?.map((item) => item.volume),
                unit: "m³",
              },
            ],
          },
        };

        resultData.push(data);
      });

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_YESTEDAY_DATA_BY_STATION_ID,
        payload: resultData,
      });

      dispatch({
        type: REPORTS_TYPES.GET_ALL_PUMP_YESTEDAY_DATA_BY_STATION_ID,
        payload: res.data.data.data,
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

export const getStationDailyAllDataByStationId =
  (lang, token, stationId, year, month) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findDailyDataAllByStationId?lang=${lang}&stationId=${stationId}&year=${year}&month=${month}`,
        token
      );
      const data = res.data.data
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      dispatch({
        type: REPORTS_TYPES.GET_STATION_DAILY_ALL_DATA_BY_STATION_ID,
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
      const data = res.data.data.data;

      data.forEach((aggregate) => {
        aggregate.aggregateData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      });

      const resultData = [];

      data.forEach((e) => {
        const data = {
          name: e.aggregate.name,
          aggregateData: e.aggregateData,
          lineChartData: {
            date: e.aggregateData?.map((item) => item.date.split("T")[0]),
            lineData: [
              {
                name: aggregateDataType[lang].name1,
                data: e.aggregateData?.map((item) =>
                  Number(item.flow.toFixed(2))
                ),
                unit: "m³/s",
              },
              {
                name: aggregateDataType[lang].name2,
                data: e.aggregateData?.map((item) =>
                  Number(item.velocity.toFixed(2))
                ),
                unit: "m/s",
              },
              {
                name: aggregateDataType[lang].name3,
                data: e.aggregateData?.map((item) =>
                  Number(item.volume.toFixed(2))
                ),
                unit: "m³",
              },
            ],
          },
        };

        resultData.push(data);
      });

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_DAILY_DATA_BY_STATION_ID,
        payload: resultData,
      });

      dispatch({
        type: REPORTS_TYPES.GET_ALL_PUMP_DAILY_DATA_BY_STATION_ID,
        payload: res.data.data.data,
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

export const getStationWeeklyAllDataByStationId =
  (lang, token, stationId, year, month) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findWeeklyDataAllByStationId?lang=${lang}&stationId=${stationId}&year=${year}&month=${month}`,
        token
      );
      const data = res.data.data
        .slice()
        .sort((a, b) => new Date(b.week) - new Date(a.week));

      const resultData = [];

      data.forEach((e) => [
        resultData.push({
          date: `${months[lang][e?.month - 1]} ${e.week} ${months[lang][12]}`,
          volume: e.volume,
          energyActive: e.energyActive,
        }),
      ]);

      dispatch({
        type: REPORTS_TYPES.GET_STATION_WEEKLY_ALL_DATA_BY_STATION_ID,
        payload: resultData,
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
      const data = res.data.data.data;

      data.forEach((aggregate) => {
        aggregate.aggregateData.sort(
          (a, b) => new Date(b.week) - new Date(a.week)
        );
      });

      const resultData = [];

      data.forEach((e) => {
        const data = {
          name: e.aggregate.name,
          aggregateData: e.aggregateData,
          lineChartData: {
            date: e.aggregateData?.map((item) => `${months[lang][item.month - 1]} ${item.week} ${months[lang][12]}`),
            lineData: [
              {
                name: aggregateDataType[lang].name1,
                data: e.aggregateData?.map((item) =>
                  Number(item.flow.toFixed(2))
                ),
                unit: "m³/s",
              },
              {
                name: aggregateDataType[lang].name2,
                data: e.aggregateData?.map((item) =>
                  Number(item.velocity.toFixed(2))
                ),
                unit: "m/s",
              },
              {
                name: aggregateDataType[lang].name3,
                data: e.aggregateData?.map((item) =>
                  Number(item.volume.toFixed(2))
                ),
                unit: "m³",
              },
            ],
          },
        };

        resultData.push(data);
      });

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_WEEKLY_DATA_BY_STATION_ID,
        payload: resultData,
      });

      dispatch({
        type: REPORTS_TYPES.GET_ALL_PUMP_WEEKLY_DATA_BY_STATION_ID,
        payload: res.data.data.data,
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

export const getStationtTenDayAllDataByStationId =
  (lang, token, stationId, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findTenDayDataAllByStationId?lang=${lang}&stationId=${stationId}&year=${year}`,
        token
      );
      const data = res.data.data
        .slice()
        .sort((a, b) => new Date(b.month) - new Date(a.month));

      const resultData = [];

      data.forEach((e) => [
        resultData.push({
          date: `${months[lang][e?.month - 1]} ${
            daysValues[lang][e.tenDayNumber - 1]
          }`,
          volume: e.volume,
          energyActive: e.energyActive,
        }),
      ]);

      dispatch({
        type: REPORTS_TYPES.GET_STATION_TEN_DAY_ALL_DATA_BY_STATION_ID,
        payload: resultData,
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
      const data = res.data.data.data;

      let formattedData = data.map(record => ({
        name: record.aggregate.name,
        aggregateData: record.aggregateData.flatMap(monthData =>
            monthData.dataMonth.map(entry => ({
                ...entry,
                month: monthData.month
            }))
        )
    }));

      formattedData.forEach((aggregate) => {
        aggregate.aggregateData.sort(
          (a, b) => new Date(b.month) - new Date(a.month)
        );
      });

      const resultData = [];

      formattedData.forEach((e) => {
        const data = {
          name: e.name,
          aggregateData: e.aggregateData,
          lineChartData: {
            date: e.aggregateData?.map((item) => `${months[lang][item.month - 1]} ${
              daysValues[lang][item.tenDayNumber - 1]
            }`),
            lineData: [
              {
                name: aggregateDataType[lang].name1,
                data: e.aggregateData?.map((item) =>
                  Number(item.flow.toFixed(2))
                ),
                unit: "m³/s",
              },
              {
                name: aggregateDataType[lang].name2,
                data: e.aggregateData?.map((item) =>
                  Number(item.velocity.toFixed(2))
                ),
                unit: "m/s",
              },
              {
                name: aggregateDataType[lang].name3,
                data: e.aggregateData?.map((item) =>
                  Number(item.volume.toFixed(2))
                ),
                unit: "m³",
              },
            ],
          },
        };

        resultData.push(data);
      });

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_TEN_DAY_DATA_BY_STATION_ID,
        payload: resultData,
      });

      dispatch({
        type: REPORTS_TYPES.GET_ALL_PUMP_TEN_DAY_DATA_BY_STATION_ID,
        payload: res.data.data.data,
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

export const getStationtMonthlyAllDataByStationId =
  (lang, token, stationId, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findMonthlyDataAllByStationId?lang=${lang}&stationId=${stationId}&year=${year}`,
        token
      );
      const data = res.data.data
        .slice()
        .sort((a, b) => new Date(b.month) - new Date(a.month));

      const resultData = [];

      data.forEach((e) => [
        resultData.push({
          date: `${months[lang][e?.month - 1]}`,
          volume: e.volume,
          energyActive: e.energyActive,
        }),
      ]);

      dispatch({
        type: REPORTS_TYPES.GET_STATION_MONTHLY_ALL_DATA_BY_STATION_ID,
        payload: resultData,
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
      const data = res.data.data.data;

      data.forEach((aggregate) => {
        aggregate.aggregateData.sort(
          (a, b) => new Date(b.month) - new Date(a.month)
        );
      });

      const resultData = [];

      data.forEach((e) => {
        const data = {
          name: e.aggregate.name,
          aggregateData: e.aggregateData,
          lineChartData: {
            date: e.aggregateData?.map((item) => `${months[lang][item.month - 1]}`),
            lineData: [
              {
                name: aggregateDataType[lang].name1,
                data: e.aggregateData?.map((item) =>
                  Number(item.flow.toFixed(2))
                ),
                unit: "m³/s",
              },
              {
                name: aggregateDataType[lang].name2,
                data: e.aggregateData?.map((item) =>
                  Number(item.velocity.toFixed(2))
                ),
                unit: "m/s",
              },
              {
                name: aggregateDataType[lang].name3,
                data: e.aggregateData?.map((item) =>
                  Number(item.volume.toFixed(2))
                ),
                unit: "m³",
              },
            ],
          },
        };

        resultData.push(data);
      });

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_MONTHLY_DATA_BY_STATION_ID,
        payload: resultData,
      });

      dispatch({
        type: REPORTS_TYPES.GET_ALL_PUMP_MONTHLY_DATA_BY_STATION_ID,
        payload: res.data.data.data,
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

export const getStationtChosenDateAllDataByStationId =
  (lang, token, stationId, date) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findDateDataAllByStationId?lang=${lang}&stationId=${stationId}&date=${date}`,
        token
      );
      const data = res.data.data
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const resultData = [];

      data.forEach((e) => [
        resultData.push({
          date: e.date.split(" ")[1],
          volume: e.volume,
          energyActive: e.energyActive,
        }),
      ]);

      dispatch({
        type: REPORTS_TYPES.GET_STATION_CHOSEN_DATE_ALL_DATA_BY_STATION_ID,
        payload: resultData,
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
      const data = res.data.data.data;

      data.forEach((aggregate) => {
        aggregate.aggregateData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      });

      const resultData = [];

      data.forEach((e) => {
        const data = {
          name: e.aggregate.name,
          aggregateData: e.aggregateData,
          lineChartData: {
            date: e.aggregateData?.map((item) => item.date),
            lineData: [
              {
                name: aggregateDataType[lang].name1,
                data: e.aggregateData?.map((item) =>
                  Number(item.flow.toFixed(2))
                ),
                unit: "m³/s",
              },
              {
                name: aggregateDataType[lang].name2,
                data: e.aggregateData?.map((item) =>
                  Number(item.velocity.toFixed(2))
                ),
                unit: "m/s",
              },
              {
                name: aggregateDataType[lang].name3,
                data: e.aggregateData?.map((item) =>
                  Number(item.volume.toFixed(2))
                ),
                unit: "m³",
              },
            ],
          },
        };

        resultData.push(data);
      });

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID,
        payload: resultData,
      });

      dispatch({
        type: REPORTS_TYPES.GET_ALL_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID,
        payload: res.data.data.data,
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
export const getStationtDateRangeAllDataByStationId =
  (lang, token, stationId, start, end) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findDateRangeDataAllByStationId?lang=${lang}&stationId=${stationId}&startDate=${start}&endDate=${end}`,
        token
      );
      const data = res.data.data
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const resultData = [];

      data.forEach((e) => [
        resultData.push({
          date: e.date,
          volume: e.volume,
          energyActive: e.energyActive,
        }),
      ]);

      dispatch({
        type: REPORTS_TYPES.GET_STATION_DATE_RANGE_ALL_DATA_BY_STATION_ID,
        payload: resultData,
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
      const data = res.data.data.data;

      data.forEach((aggregate) => {
        aggregate.aggregateData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      });

      const resultData = [];

      data.forEach((e) => {
        const data = {
          name: e.aggregate.name,
          aggregateData: e.aggregateData,
          lineChartData: {
            date: e.aggregateData?.map((item) => item.date),
            lineData: [
              {
                name: aggregateDataType[lang].name1,
                data: e.aggregateData?.map((item) =>
                  Number(item.flow.toFixed(2))
                ),
                unit: "m³/s",
              },
              {
                name: aggregateDataType[lang].name2,
                data: e.aggregateData?.map((item) =>
                  Number(item.velocity.toFixed(2))
                ),
                unit: "m/s",
              },
              {
                name: aggregateDataType[lang].name3,
                data: e.aggregateData?.map((item) =>
                  Number(item.volume.toFixed(2))
                ),
                unit: "m³",
              },
            ],
          },
        };

        resultData.push(data);
      });

      dispatch({
        type: REPORTS_TYPES.GET_PUMP_DATE_RANGE_DATA_BY_STATION_ID,
        payload: resultData,
      });

      dispatch({
        type: REPORTS_TYPES.GET_ALL_PUMP_DATE_RANGE_DATA_BY_STATION_ID,
        payload: res.data.data.data,
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
