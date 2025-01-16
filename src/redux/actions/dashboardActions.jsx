/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils";

export const DASHBOARD_ACTIONS_TYPES = {
  FIND_PUMP_LAST_DATA_BY_STATIONS_ID: "FIND_PUMP_LAST_DATA_BY_STATIONS_ID",
  FIND_LAST_DATA_BY_AGGREGATE_ID: "FIND_LAST_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_DATA_BY_STATION_ID: "FIND_ELECTRCITY_DATA_BY_STATION_ID",
  FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID:
    "FIND_LAST_DATA_BY_ELECTIRAL_ENERGY_ID",

  FIND_DATA_BY_STATION_ID: "FIND_DATA_BY_STATION_ID",
  FIND_DATA_BY_AGGREGATE_ID: "FIND_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_DATA_STATION_ID: "FIND_ELECTRCITY_DATA_STATION_ID",
  FIND_ELECTRICAL_ENERGY_ID: "FIND_ELECTRICAL_ENERGY_ID",

  LINE_CHART_DATA_WITH_AGGREGATE_ID: "LINE_CHART_DATA_WITH_AGGREGATE_ID",
  LINE_CHART_DATA_WITH_ELECTY_ID: "LINE_CHART_DATA_WITH_ELECTY_ID",
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

const electryDataType = {
  uz: {
    current1: "Birinchi oqim",
    current2: "Ikkinchi oqim",
    current3: "Uchinchi oqim",
    energyActive: "Faol energiya",
    energyReactive: "Reaktiv energiya",
    powerActive: "Faol quvvat",
    powerReactive: "Reaktiv quvvat",
    voltage1: "Birinchi kuchlanish",
    voltage2: "Ikkinchi kuchlanish",
    voltage3: "Uchinchi kuchlanish",
  },
  ru: {
    current1: "Первый ток",
    current2: "Второй ток",
    current3: "Третий ток",
    energyActive: "Активная энергия",
    energyReactive: "Реактивная энергия",
    powerActive: "Активная мощность",
    powerReactive: "Реактивная мощность",
    voltage1: "Первое напряжение",
    voltage2: "Второе напряжение",
    voltage3: "Третье напряжение",
  },
  en: {
    current1: "First current",
    current2: "Second current",
    current3: "Third current",
    energyActive: "Active energy",
    energyReactive: "Reactive energy",
    powerActive: "Active power",
    powerReactive: "Reactive power",
    voltage1: "First voltage",
    voltage2: "Second voltage",
    voltage3: "Third voltage",
  },
};

const unitTranslations = {
  uz: {
    kwHour: "kVt·soat",
  },
  ru: {
    kwHour: "кВт·ч",
  },
  en: {
    kwHour: "kWh",
  },
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
  ],
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
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

      const data = res.data.data.data;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: aggregateDataType[lang].name1,
            data: data?.map((item) => item.flow),
            unit: "m³/s",
          },
          {
            name: aggregateDataType[lang].name2,
            data: data?.map((item) => item.velocity),
            unit: "m/s",
          },
          {
            name: aggregateDataType[lang].name3,
            data: data?.map((item) => item.volume),
            unit: "m³",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_STATION_ID,
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

      const data = res.data.data.data;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: electryDataType[lang].energyActive,
            data: data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].energyReactive,
            data: data?.map((item) => item.energyReactive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].powerActive,
            data: data?.map((item) => item.powerActive),
            unit: "Kw",
          },
          {
            name: electryDataType[lang].powerReactive,
            data: data?.map((item) => item.powerReactive),
            unit: "Kw",
          },

          {
            name: electryDataType[lang].current1,
            data: data?.map((item) => item.current1),
            unit: "A",
          },
          {
            name: electryDataType[lang].current2,
            data: data?.map((item) => item.current2),
            unit: "A",
          },
          {
            name: electryDataType[lang].current3,
            data: data?.map((item) => item.current3),
            unit: "A",
          },

          {
            name: electryDataType[lang].voltage1,
            data: data?.map((item) => item.voltage1),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage2,
            data: data?.map((item) => item.voltage2),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage3,
            data: data?.map((item) => item.voltage3),
            unit: "V",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
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

      const data = res.data.data.data;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: aggregateDataType[lang].name1,
            data: data?.map((item) => item.flow),
            unit: "m³/s",
          },
          {
            name: aggregateDataType[lang].name2,
            data: data?.map((item) => item.velocity),
            unit: "m/s",
          },
          {
            name: aggregateDataType[lang].name3,
            data: data?.map((item) => item.volume),
            unit: "m³",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_STATION_ID,
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
        `electrical-energy-yesterday-data/findDataByElectricalEnergyId?lang=${lang}&electricalEnergyId=${electricalId}&page=${page}&perPage=${perPage}`,
        token
      );

      const data = res.data.data.data;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: electryDataType[lang].energyActive,
            data: data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].energyReactive,
            data: data?.map((item) => item.energyReactive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].powerActive,
            data: data?.map((item) => item.powerActive),
            unit: "Kw",
          },
          {
            name: electryDataType[lang].powerReactive,
            data: data?.map((item) => item.powerReactive),
            unit: "Kw",
          },

          {
            name: electryDataType[lang].current1,
            data: data?.map((item) => item.current1),
            unit: "A",
          },
          {
            name: electryDataType[lang].current2,
            data: data?.map((item) => item.current2),
            unit: "A",
          },
          {
            name: electryDataType[lang].current3,
            data: data?.map((item) => item.current3),
            unit: "A",
          },

          {
            name: electryDataType[lang].voltage1,
            data: data?.map((item) => item.voltage1),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage2,
            data: data?.map((item) => item.voltage2),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage3,
            data: data?.map((item) => item.voltage3),
            unit: "V",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
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
        `pump-weekly-data/findDataByAggregateIdAndYearMonthNumber?lang=${lang}&aggregateId=${aggregateId}&year=${year}&month=${month}`,
        token
      );

      const data = res.data.data?.aggregateData;

      const weekName = aggregateDataType[lang]?.weekName || "Unknown Week";

      const newData = data?.map((item) => ({
        ...item,
        date: `${item.year}-${item.month}. ${item.week}-${weekName}`,
      }));

      const lineChartData = {
        date: data?.map(
          (item) =>
            `${item.year}-${item.month}. ${item.week}-${aggregateDataType[lang].weekName}`
        ),
        lineData: [
          {
            name: aggregateDataType[lang].name1,
            data: data?.map((item) => item.flow),
            unit: "m³/s",
          },
          {
            name: aggregateDataType[lang].name2,
            data: data?.map((item) => item.velocity),
            unit: "m/s",
          },
          {
            name: aggregateDataType[lang].name3,
            data: data?.map((item) => item.volume),
            unit: "m³",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID,
        payload: newData || [],
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_STATION_ID,
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
        `electrical-energy-weekly-data/findDataByElectricalEnergyId?lang=${lang}&electricalEnergyId=${electricalId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
        token
      );

      const data = res.data.data?.electricalEnergyData;

      const lineChartData = {
        date: data?.map(
          (item) =>
            `${item.year}-${item.month}${" "}${item.week} ${" "} ${
              aggregateDataType[lang].weekName
            }`
        ),
        lineData: [
          {
            name: electryDataType[lang].energyActive,
            data: data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].energyReactive,
            data: data?.map((item) => item.energyReactive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].powerActive,
            data: data?.map((item) => item.powerActive),
            unit: "Kw",
          },
          {
            name: electryDataType[lang].powerReactive,
            data: data?.map((item) => item.powerReactive),
            unit: "Kw",
          },

          {
            name: electryDataType[lang].current1,
            data: data?.map((item) => item.current1),
            unit: "A",
          },
          {
            name: electryDataType[lang].current2,
            data: data?.map((item) => item.current2),
            unit: "A",
          },
          {
            name: electryDataType[lang].current3,
            data: data?.map((item) => item.current3),
            unit: "A",
          },

          {
            name: electryDataType[lang].voltage1,
            data: data?.map((item) => item.voltage1),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage2,
            data: data?.map((item) => item.voltage2),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage3,
            data: data?.map((item) => item.voltage3),
            unit: "V",
          },
        ],
      };

      const newData = data?.map((item) => ({
        ...item,
        date: `${item.year}-${item.month}${" "}${item.week} ${" "} ${
          aggregateDataType[lang].weekName
        }`,
      }));

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
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
        `pump-ten-day-data/findDataByAggregateIdAndYearNumber?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      const data = Array.isArray(res.data.data.data?.aggregateData)
        ? res.data.data.data?.aggregateData[0]?.data
        : [];

      const lineChartData = {
        date: data?.map((item) => item.tenDayNumber),
        lineData: [
          {
            name: aggregateDataType[lang].name1,
            data: data?.map((item) => item.flow),
            unit: "m³/s",
          },
          {
            name: aggregateDataType[lang].name2,
            data: data?.map((item) => item.velocity),
            unit: "m/s",
          },
          {
            name: aggregateDataType[lang].name3,
            data: data?.map((item) => item.volume),
            unit: "m³",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_STATION_ID,
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
        `electrical-energy-ten-day-data/findDataByElectricalEnergyId?lang=${lang}&electricalEnergyId=${electricalId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      const data = res.data.data?.data[0]?.data;
      const dateValue = res.data.data?.data[0];

      const lineChartData = {
        date: data?.map(
          (item) => `${dateValue.year}${" "}${item.tenDayNumber}`
        ),
        lineData: [
          {
            name: electryDataType[lang].energyActive,
            data: data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].energyReactive,
            data: data?.map((item) => item.energyReactive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].powerActive,
            data: data?.map((item) => item.powerActive),
            unit: "Kw",
          },
          {
            name: electryDataType[lang].powerReactive,
            data: data?.map((item) => item.powerReactive),
            unit: "Kw",
          },

          {
            name: electryDataType[lang].current1,
            data: data?.map((item) => item.current1),
            unit: "A",
          },
          {
            name: electryDataType[lang].current2,
            data: data?.map((item) => item.current2),
            unit: "A",
          },
          {
            name: electryDataType[lang].current3,
            data: data?.map((item) => item.current3),
            unit: "A",
          },

          {
            name: electryDataType[lang].voltage1,
            data: data?.map((item) => item.voltage1),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage2,
            data: data?.map((item) => item.voltage2),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage3,
            data: data?.map((item) => item.voltage3),
            unit: "V",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);

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
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
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
        `pump-monthly-data/findDataByAggregateIdAndYearNumber?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      const data = res.data.data;

      const newData = {
        currentPage: data.currentPage,
        nextPages: data.nextPages,
        totalDocuments: data.totalDocuments,
        totalPages: data.totalPages,
        data: data?.data.aggregateData?.map((item) => {
          return {
            id: item.id,
            velocity: item.velocity,
            flow: item.flow,
            volume: item.volume,
            date: `${item.year}- ${months[lang][item.month - 1]}`,
          };
        }),
      };

      const lineChartData = {
        date: data?.data.aggregateData?.map(
          (item) => `${item.year}- ${months[lang][item.month - 1]}`
        ),
        lineData: [
          {
            name: aggregateDataType[lang].name1,
            data: data?.data.aggregateData?.map((item) => item.flow),
            unit: "m³/s",
          },
          {
            name: aggregateDataType[lang].name2,
            data: data?.data.aggregateData?.map((item) => item.velocity),
            unit: "m/s",
          },
          {
            name: aggregateDataType[lang].name3,
            data: data?.data.aggregateData?.map((item) => item.volume),
            unit: "m³",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_STATION_ID,
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
        `electrical-energy-monthly-data/findDataByElectricalEnergyId?lang=${lang}&electricalEnergyId=${electricalId}&page=${page}&perPage=${perPage}&year=${year}`,
        token
      );

      const data = res.data.data?.data?.electricalEnergyData;

      const newData = data.map((item) => ({
        ...item,
        date: `${item.year} ${" "} ${months[lang][item.month - 1]}`,
      }));

      const lineChartData = {
        date: data?.map(
          (item) => `${item.year} ${" "} ${months[lang][item.month - 1]}`
        ),
        lineData: [
          {
            name: electryDataType[lang].energyActive,
            data: data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].energyReactive,
            data: data?.map((item) => item.energyReactive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].powerActive,
            data: data?.map((item) => item.powerActive),
            unit: "Kw",
          },
          {
            name: electryDataType[lang].powerReactive,
            data: data?.map((item) => item.powerReactive),
            unit: "Kw",
          },

          {
            name: electryDataType[lang].current1,
            data: data?.map((item) => item.current1),
            unit: "A",
          },
          {
            name: electryDataType[lang].current2,
            data: data?.map((item) => item.current2),
            unit: "A",
          },
          {
            name: electryDataType[lang].current3,
            data: data?.map((item) => item.current3),
            unit: "A",
          },

          {
            name: electryDataType[lang].voltage1,
            data: data?.map((item) => item.voltage1),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage2,
            data: data?.map((item) => item.voltage2),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage3,
            data: data?.map((item) => item.voltage3),
            unit: "V",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID,
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

// * Done
export const getSelectDateAggregateIDData =
  (aggregateId, token, lang, page, perPage, date) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-all-data/findDataByAggregateIdDate?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}&date=${date}`,
        token
      );

      const data = res.data.data.data;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: aggregateDataType[lang].name1,
            data: data?.map((item) => item.flow),
            unit: "m³/s",
          },
          {
            name: aggregateDataType[lang].name2,
            data: data?.map((item) => item.velocity),
            unit: "m/s",
          },
          {
            name: aggregateDataType[lang].name3,
            data: data?.map((item) => item.volume),
            unit: "m³",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID,
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
// * Done
export const findSelectDateElectricityId =
  (electricalId, token, lang, page, perPage, date) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-all-data/findDataByElectricalEnergyIdAndDate?lang=${lang}&electricalEnergyId=${electricalId}&page=${page}&perPage=${perPage}&date=${date}`,
        token
      );

      const data = res.data.data.data;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: electryDataType[lang].energyActive,
            data: data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].energyReactive,
            data: data?.map((item) => item.energyReactive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].powerActive,
            data: data?.map((item) => item.powerActive),
            unit: "Kw",
          },
          {
            name: electryDataType[lang].powerReactive,
            data: data?.map((item) => item.powerReactive),
            unit: "Kw",
          },

          {
            name: electryDataType[lang].current1,
            data: data?.map((item) => item.current1),
            unit: "A",
          },
          {
            name: electryDataType[lang].current2,
            data: data?.map((item) => item.current2),
            unit: "A",
          },
          {
            name: electryDataType[lang].current3,
            data: data?.map((item) => item.current3),
            unit: "A",
          },

          {
            name: electryDataType[lang].voltage1,
            data: data?.map((item) => item.voltage1),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage2,
            data: data?.map((item) => item.voltage2),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage3,
            data: data?.map((item) => item.voltage3),
            unit: "V",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
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
  (aggregateId, token, lang, page, perPage, month, year) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-daily-data/findDataByAggregateId?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}&month=${month}&year=${year}`,
        token
      );

      const data = res.data.data.data?.aggregateData;

      const lineChartData = {
        date: data?.map((item) => item.date.split("T")[0]),
        lineData: [
          {
            name: aggregateDataType[lang].name1,
            data: data?.map((item) => item.flow),
            unit: "m³/s",
          },
          {
            name: aggregateDataType[lang].name2,
            data: data?.map((item) => item.velocity),
            unit: "m/s",
          },
          {
            name: aggregateDataType[lang].name3,
            data: data?.map((item) => item.volume),
            unit: "m³",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID,
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_STATION_ID,
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
        `electrical-energy-daily-data/findDataByElectricalEnergyId?lang=${lang}&electricalEnergyId=${electricalId}&page=${page}&perPage=${perPage}&year=${year}&month=${month}`,
        token
      );

      const data = res.data.data.data.electricalEnergyData;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: electryDataType[lang].energyActive,
            data: data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].energyReactive,
            data: data?.map((item) => item.energyReactive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].powerActive,
            data: data?.map((item) => item.powerActive),
            unit: "Kw",
          },
          {
            name: electryDataType[lang].powerReactive,
            data: data?.map((item) => item.powerReactive),
            unit: "Kw",
          },

          {
            name: electryDataType[lang].current1,
            data: data?.map((item) => item.current1),
            unit: "A",
          },
          {
            name: electryDataType[lang].current2,
            data: data?.map((item) => item.current2),
            unit: "A",
          },
          {
            name: electryDataType[lang].current3,
            data: data?.map((item) => item.current3),
            unit: "A",
          },

          {
            name: electryDataType[lang].voltage1,
            data: data?.map((item) => item.voltage1),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage2,
            data: data?.map((item) => item.voltage2),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage3,
            data: data?.map((item) => item.voltage3),
            unit: "V",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID,
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

// todo Date Range
export const getRangeAggregateData =
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
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

export const getRangeAggregateIDData =
  (aggregateId, token, lang, page, perPage, startDate, endDate) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `pump-all-data/findDataByAggregateIdAndDateRange?lang=${lang}&aggregateId=${aggregateId}&page=${page}&perPage=${perPage}&startDate=${startDate}&endDate=${endDate}`,
        token
      );

      const data = res.data.data.data;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[0]),
        lineData: [
          {
            name: aggregateDataType[lang].name1,
            data: data?.map((item) => item.flow),
            unit: "m³/s",
          },
          {
            name: aggregateDataType[lang].name2,
            data: data?.map((item) => item.velocity),
            unit: "m/s",
          },
          {
            name: aggregateDataType[lang].name3,
            data: data?.map((item) => item.volume),
            unit: "m³",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_AGGREGATE_ID,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_AGGREGATE_ID,
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

export const findRangeElectricityStationId =
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
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRCITY_DATA_STATION_ID,
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

export const findRangeDataElectricityId =
  (electricalId, token, lang, page, perPage, startDate, endDate) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `electrical-energy-all-data/findDataByElectricalEnergyIdAndDateRange?lang=${lang}&electricalEnergyId=${electricalId}&page=${page}&perPage=${perPage}&startDate=${startDate}&endDate=${endDate}`,
        token
      );

      const data = res.data.data.data;

      const lineChartData = {
        date: data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: electryDataType[lang].energyActive,
            data: data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].energyReactive,
            data: data?.map((item) => item.energyReactive),
            unit: unitTranslations[lang].kwHour,
          },
          {
            name: electryDataType[lang].powerActive,
            data: data?.map((item) => item.powerActive),
            unit: "Kw",
          },
          {
            name: electryDataType[lang].powerReactive,
            data: data?.map((item) => item.powerReactive),
            unit: "Kw",
          },

          {
            name: electryDataType[lang].current1,
            data: data?.map((item) => item.current1),
            unit: "A",
          },
          {
            name: electryDataType[lang].current2,
            data: data?.map((item) => item.current2),
            unit: "A",
          },
          {
            name: electryDataType[lang].current3,
            data: data?.map((item) => item.current3),
            unit: "A",
          },

          {
            name: electryDataType[lang].voltage1,
            data: data?.map((item) => item.voltage1),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage2,
            data: data?.map((item) => item.voltage2),
            unit: "V",
          },
          {
            name: electryDataType[lang].voltage3,
            data: data?.map((item) => item.voltage3),
            unit: "V",
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_DATA_WITH_ELECTY_ID,
        payload: lineChartData,
      });
      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_ELECTRICAL_ENERGY_ID,
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
