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
  FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL:
    "FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL",
  FIND_DATA_BY_AGGREGATE_ID: "FIND_DATA_BY_AGGREGATE_ID",
  FIND_ELECTRCITY_DATA_STATION_ID: "FIND_ELECTRCITY_DATA_STATION_ID",
  FIND_ELECTRICAL_ENERGY_ID: "FIND_ELECTRICAL_ENERGY_ID",

  LINE_CHART_DATA_WITH_AGGREGATE_ID: "LINE_CHART_DATA_WITH_AGGREGATE_ID",
  LINE_CHART_DATA_WITH_ELECTY_ID: "LINE_CHART_DATA_WITH_ELECTY_ID",
  LINE_CHART_ALL_DATA: "LINE_CHART_ALL_DATA",
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

const allDataType = {
  uz: {
    name1: "Umumiy suv hajmi",
    name2: "Umumiy sariflangan energiya",
  },
  ru: {
    name1: "Общий объем воды",
    name2: "Общее количество потребленной энергии",
  },
  en: {
    name1: "Total water volume",
    name2: "Total energy consumed",
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

const monthNames = {
  uz: {
    Yanvar: 1,
    Fevral: 2,
    Mart: 3,
    Aprel: 4,
    May: 5,
    Iyun: 6,
    Iyul: 7,
    Avgust: 8,
    Sentabr: 9,
    Oktabr: 10,
    Noyabr: 11,
    Dekabr: 12,
  },
  en: {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  },
  ru: {
    Январь: 1,
    Февраль: 2,
    Март: 3,
    Апрель: 4,
    Май: 5,
    Июнь: 6,
    Июль: 7,
    Август: 8,
    Сентябрь: 9,
    Октябрь: 10,
    Ноябрь: 11,
    Декабрь: 12,
  },
};

const daysValues = {
  uz: [
    "Birinchi o'n kunlik",
    "Ikkinchi o'n kunlik",
    "Uchunchi o'n kunlik",
    "To'rtinchi o'n kunlik",
  ],
  en: [
    "The first ten days",
    "Second ten days",
    "Third decade",
    "Fourth decade",
  ],
  ru: [
    "Первые десять дней",
    "Вторая декада",
    "Третье десятилетие",
    "Четвертая декада",
  ],
};

const processAndCombineData = (pumpData, electricalData, lang) => {
  const aggregateData = (data, typeKey, valueKey) => {
    return data.reduce((map, item) => {
      item[typeKey]?.forEach((entry) => {
        const date =
          entry.date?.split("T")[0] ||
          entry.date ||
          `${months[lang][entry?.month - 1]} ${
            entry?.week ? String(entry?.week) : " "
          }${" "}${entry?.week ? aggregateDataType[lang]?.weekName : " "}`;

        if (!map[date]) {
          map[date] = { total: 0 };
        }

        map[date].total += entry[valueKey] || 0;
      });

      return map;
    }, {});
  };

  const pumpDataMap = aggregateData(pumpData, "aggregateData", "volume");

  const electricalDataMap = aggregateData(
    electricalData,
    "electricalEnergyData",
    "energyActive"
  );

  const allDates = new Set([
    ...Object.keys(pumpDataMap),
    ...Object.keys(electricalDataMap),
  ]);

  const combinedData = Array.from(allDates).map((date) => ({
    date,
    totalVolume: +(pumpDataMap[date]?.total || 0)?.toFixed(2),
    totalEnergyActive: +(electricalDataMap[date]?.total || 0)?.toFixed(2),
    key: Math.random(),
  }));

  combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return combinedData;
};

const mergeDataByDate = (pumpData, electricalData, lang) => {
  const roundValuesInObject = (obj) => {
    const roundedObject = {};
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "number") {
        roundedObject[key] = +value?.toFixed(2);
      } else if (Array.isArray(value)) {
        roundedObject[key] = value.map(roundValuesInObject);
      } else if (typeof value === "object" && value !== null) {
        roundedObject[key] = roundValuesInObject(value);
      } else {
        roundedObject[key] = value;
      }
    }
    return roundedObject;
  };

  const formatExpandData = (data, typeKey, typeValues) =>
    data?.map((item) => {
      const values = item[typeValues]?.map((value) => {
        const formattedDate =
          value.date?.split("T")[0] ||
          value.date ||
          `${value?.year || " "}${" "}${months[lang][value?.month - 1]} ${
            value?.week ? String(value?.week) : " "
          }${" "}${value?.week ? aggregateDataType[lang]?.weekName : " "}`;

        return {
          ...value,
          date: formattedDate,
        };
      });

      return roundValuesInObject({
        key: item[typeKey]?.id,
        values: values || [],
      });
    }) || [];

  const formatDataSource = (data, typeKey, defaultName) =>
    data?.map((item) => ({
      name: item[typeKey]?.name || defaultName,
      key: item[typeKey]?.id,
      dataType: typeKey,
    })) || [];

  const pumpExpandData = formatExpandData(
    pumpData,
    "aggregate",
    "aggregateData"
  );

  const electricalExpandData = formatExpandData(
    electricalData,
    "electricalEnergy",
    "electricalEnergyData"
  );

  const dataSource = [
    ...formatDataSource(pumpData, "aggregate", "Pump"),
    ...formatDataSource(electricalData, "electricalEnergy", "Electrical"),
  ];

  return {
    dataSource,
    expandData: [...pumpExpandData, ...electricalExpandData],
  };
};

const processAndCombineDataTenDays = (pumpData, electricalData, lang) => {
  const processData = (data, typeKey, valueKey) => {
    const dataMap = {};

    data.forEach((items) => {
      items[typeKey]?.forEach((item) => {
        item?.dataMonth.forEach((entry) => {
          const date = `${months[lang][item.month - 1]} ${
            daysValues[lang][entry.tenDayNumber - 1] || "-"
          }`;

          if (!dataMap[date]) {
            dataMap[date] = 0;
          }

          dataMap[date] += entry[valueKey] || 0;
        });
      });
    });

    return dataMap;
  };

  const pumpDataMap = processData(pumpData, "aggregateData", "volume");
  const electricalDataMap = processData(
    electricalData,
    "electricalEnergyData",
    "energyActive"
  );

  const allDates = new Set([
    ...Object.keys(pumpDataMap),
    ...Object.keys(electricalDataMap),
  ]);

  const combinedData = Array.from(allDates).map((date) => ({
    date,
    totalVolume: +(pumpDataMap[date] || 0)?.toFixed(2),
    totalEnergyActive: +(electricalDataMap[date] || 0)?.toFixed(2),
    key: Math.random(),
  }));

  combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return combinedData;
};

const mergeDataByDateTenDays = (pumpData, electricalData, lang) => {
  const roundValuesInObject = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(roundValuesInObject);
    }
    if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          typeof value === "number"
            ? +value?.toFixed(2)
            : roundValuesInObject(value),
        ])
      );
    }
    return obj;
  };

  const formatExpandData = (data, typeKey, dataKey) =>
    data?.map((items) => {
      const values =
        items[dataKey]?.flatMap((entry) =>
          entry.dataMonth?.map((value) => ({
            ...value,
            date: `${months[lang][entry.month - 1]} ${
              daysValues[lang][value.tenDayNumber - 1] || "-"
            }`,
          }))
        ) || [];

      return roundValuesInObject({
        key: items[typeKey]?.id,
        values,
      });
    }) || [];

  const formatDataSource = (data, typeKey, defaultName) =>
    data?.map((item) => ({
      name: item[typeKey]?.name || defaultName,
      key: item[typeKey]?.id,
      dataType: typeKey,
    })) || [];

  const pumpExpandData = formatExpandData(
    pumpData,
    "aggregate",
    "aggregateData"
  );
  const electricalExpandData = formatExpandData(
    electricalData,
    "electricalEnergy",
    "electricalEnergyData"
  );

  const dataSource = [
    ...formatDataSource(pumpData, "aggregate", "Pump"),
    ...formatDataSource(electricalData, "electricalEnergy", "Electrical"),
  ];

  return {
    dataSource,
    expandData: [...pumpExpandData, ...electricalExpandData],
  };
};

// * Today Data With Stations Id
export const getTodayDataByStationId =
  (stationId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });
      const resTotalData = await getDataApi(
        `stations/findTodayDataAllByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      const resAggregateData = await getDataApi(
        `pump-today-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );

      const resElecrtEnergyData = await getDataApi(
        `electrical-energy-today-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );

      const dataSource = [];
      const expandedData = [];

      resAggregateData.data.data.data.forEach((e) => {
        dataSource.push({
          name: e.aggregate.name,
          key: e.aggregate.id,
          dataType: "aggregate",
        });

        expandedData.push({
          key: e.aggregate.id,
          values: e.aggregateData,
        });
      });

      resElecrtEnergyData.data.data.data.forEach((e) => {
        dataSource.push({
          name: e.electricalEnergy.name,
          key: e.electricalEnergy.id,
          dataType: "electricalEnergy",
        });

        expandedData.push({
          key: e.electricalEnergy.id,
          values: e.electricalEnergyData,
        });
      });

      const dataByDate = {
        dataSource: dataSource,
        expandData: expandedData,
      };

      const lineChartData = {
        date: resTotalData.data.data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: allDataType[lang].name1,
            data: resTotalData.data.data?.map((item) => item.volume),
            unit: "m³",
          },
          {
            name: allDataType[lang].name2,
            data: resTotalData.data.data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL,
        payload: resTotalData.data.data,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
        payload: dataByDate,
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.statusText ||
        "Network Error";
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: errorMessage },
      });
    } finally {
      dispatch({ type: GLOBALTYPES.LOADING, payload: false });
    }
  };

// * Yesterday Data With Stations Id
export const getYesterdayStationIdData =
  (stationId, token, lang, page, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const resTotalData = await getDataApi(
        `stations/findYesterdayDataAllByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      const resAggregateData = await getDataApi(
        `pump-yesterday-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );

      const resElecrtEnergyData = await getDataApi(
        `electrical-energy-yesterday-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}`,
        token
      );

      const dataSource = [];
      const expandedData = [];

      resAggregateData.data.data.data.forEach((e) => {
        dataSource.push({
          name: e.aggregate.name,
          key: e.aggregate.id,
          dataType: "aggregate",
        });

        expandedData.push({
          key: e.aggregate.id,
          values: e.aggregateData,
        });
      });

      resElecrtEnergyData.data.data.data.forEach((e) => {
        dataSource.push({
          name: e.electricalEnergy.name,
          key: e.electricalEnergy.id,
          dataType: "electricalEnergy",
        });

        expandedData.push({
          key: e.electricalEnergy.id,
          values: e.electricalEnergyData,
        });
      });

      const dataByDate = {
        dataSource: dataSource,
        expandData: expandedData,
      };

      const lineChartData = {
        date: resTotalData.data.data?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: allDataType[lang].name1,
            data: resTotalData.data.data?.map((item) => item.volume),
            unit: "m³",
          },
          {
            name: allDataType[lang].name2,
            data: resTotalData.data.data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL,
        payload: resTotalData.data.data,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
        payload: dataByDate,
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.statusText ||
        "Network Error";
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: errorMessage },
      });
    } finally {
      dispatch({ type: GLOBALTYPES.LOADING, payload: false });
    }
  };

// * Daily Data With Stations Id
export const getDailyStationsIdData =
  (stationId, token, lang, page, perPage, month, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const resTotalData = await getDataApi(
        `stations/findDailyDataAllByStationId?lang=${lang}&stationId=${stationId}&year=${year}&month=${month}`,
        token
      );

      const resAggregateData = await getDataApi(
        `pump-daily-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}&month=${month}`,
        token
      );

      const resElecrtEnergyData = await getDataApi(
        `electrical-energy-daily-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}&month=${month}`,
        token
      );

      const dataSource = [];
      const expandedData = [];

      resAggregateData.data.data.data.forEach((e) => {
        dataSource.push({
          name: e.aggregate.name,
          key: e.aggregate.id,
          dataType: "aggregate",
        });

        expandedData.push({
          key: e.aggregate.id,
          values: e.aggregateData,
        });
      });

      resElecrtEnergyData.data.data.data.forEach((e) => {
        dataSource.push({
          name: e.electricalEnergy.name,
          key: e.electricalEnergy.id,
          dataType: "electricalEnergy",
        });

        expandedData.push({
          key: e.electricalEnergy.id,
          values: e.electricalEnergyData,
        });
      });

      const dataByDate = {
        dataSource: dataSource,
        expandData: expandedData,
      };

      const lineChartData = {
        date: resTotalData.data.data?.map((item) => item.date.split("T")[0]),
        lineData: [
          {
            name: allDataType[lang].name1,
            data: resTotalData.data.data?.map((item) => item.volume),
            unit: "m³",
          },
          {
            name: allDataType[lang].name2,
            data: resTotalData.data.data?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL,
        payload: resTotalData.data.data,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
        payload: dataByDate,
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.statusText ||
        "Network Error";
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: errorMessage },
      });
    } finally {
      dispatch({ type: GLOBALTYPES.LOADING, payload: false });
    }
  };

// * Weekly Data With Stations Id
export const getWeeklyStationsIdData =
  (stationId, token, lang, page, perPage, month, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const resTotalData = await getDataApi(
        `stations/findWeeklyDataAllByStationId?lang=${lang}&stationId=${stationId}&month=${month}&year=${year}`,
        token
      );

      const resAggregateData = await getDataApi(
        `pump-weekly-data/findDataByStationIdAndYearMonthNumber?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}&month=${month}`,
        token
      );

      const resElecrtEnergyData = await getDataApi(
        `electrical-energy-weekly-data/findDataByStationId?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}&month=${month}`,
        token
      );

      const dataByDate = mergeDataByDate(
        resAggregateData.data.data.data,
        resElecrtEnergyData.data.data.data,
        lang
      );

      const resultTotalData = [];

      resTotalData.data.data.forEach((e) => {
        resultTotalData.push({
          date: `${months[lang][e.month - 1]} ${e.week} ${months[lang][12]}`,
          volume: e.volume,
          energyActive: e.energyActive,
        });
      });

      const lineChartData = {
        date: resultTotalData?.map((item) => item.date),
        lineData: [
          {
            name: allDataType[lang].name1,
            data: resultTotalData?.map((item) => item.volume),
            unit: "m³",
          },
          {
            name: allDataType[lang].name2,
            data: resultTotalData?.map((item) => item.energyActive),
            unit: unitTranslations[lang].kwHour,
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL,
        payload: resultTotalData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
        payload: dataByDate,
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

// * Ten days Data With Stations Id
export const getTenDayStationsIdData =
  (stationId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const createEndpoint = (basePath) =>
        `${basePath}?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`;

      const [res1, res2] = await Promise.all([
        getDataApi(
          createEndpoint("pump-ten-day-data/findDataByStationIdAnfYearNumber"),
          token
        ),
        getDataApi(
          createEndpoint("electrical-energy-ten-day-data/findDataByStationId"),
          token
        ),
      ]);

      const pumpData = res1.data.data.data;
      const electricalData = res2.data.data.data;

      const combinedData = processAndCombineDataTenDays(
        pumpData,
        electricalData,
        lang
      );

      const dataByDate = mergeDataByDateTenDays(pumpData, electricalData, lang);

      const lineChartData = {
        date: combinedData?.map((item) => item.date.split(" ")[1]),
        lineData: [
          {
            name: allDataType[lang].name1,
            data: combinedData?.map((item) => item.totalVolume),
            unit: "m³",
          },
          {
            name: allDataType[lang].name2,
            data: combinedData?.map((item) => item.totalEnergyActive),
            unit: unitTranslations[lang].kwHour,
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL,
        payload: combinedData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
        payload: dataByDate,
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

// * Monthly Data With Stations Id
export const getMonthlyStationsIdData =
  (stationId, token, lang, page, perPage, year) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const createEndpoint = (basePath) =>
        `${basePath}?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&year=${year}`;

      const [res1, res2] = await Promise.all([
        getDataApi(
          createEndpoint("pump-monthly-data/findDataByStationIdAndYearNumber"),
          token
        ),
        getDataApi(
          createEndpoint("electrical-energy-monthly-data/findDataByStationId"),
          token
        ),
      ]);

      const pumpData = res1.data.data.data;
      const electricalData = res2.data.data.data;

      const combinedData = processAndCombineData(
        pumpData,
        electricalData,
        lang
      );

      const dataByDate = mergeDataByDate(pumpData, electricalData, lang);

      const lineChartData = {
        date: combinedData?.map((item) => item.date),
        lineData: [
          {
            name: allDataType[lang].name1,
            data: combinedData?.map((item) => item.totalVolume),
            unit: "m³",
          },
          {
            name: allDataType[lang].name2,
            data: combinedData?.map((item) => item.totalEnergyActive),
            unit: unitTranslations[lang].kwHour,
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL,
        payload: combinedData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
        payload: dataByDate,
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

// * Select Data With Stations Id
export const getSelectStationsIdData =
  (stationId, token, lang, page, perPage, date) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const createEndpoint = (basePath) =>
        `${basePath}?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&date=${date}`;

      const [res1, res2] = await Promise.all([
        getDataApi(
          createEndpoint("pump-all-data/findDataByAggregateIdDate"),
          token
        ),
        getDataApi(
          createEndpoint(
            "electrical-energy-all-data/findDataByStationIdAndDate"
          ),
          token
        ),
      ]);

      const pumpData = res1.data.data.data;
      const electricalData = res2.data.data.data;

      const combinedData = processAndCombineData(
        pumpData,
        electricalData,
        lang
      );

      const dataByDate = mergeDataByDate(pumpData, electricalData, lang);

      const lineChartData = {
        date: combinedData?.map((item) => item.date),
        lineData: [
          {
            name: allDataType[lang].name1,
            data: combinedData?.map((item) => item.totalVolume),
            unit: "m³",
          },
          {
            name: allDataType[lang].name2,
            data: combinedData?.map((item) => item.totalEnergyActive),
            unit: unitTranslations[lang].kwHour,
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL,
        payload: combinedData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
        payload: dataByDate,
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

// * Data Range Data With Stations Id
export const getDataRangeStationsIdData =
  (stationId, token, lang, page, perPage, startDate, endDate) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const createEndpoint = (basePath) =>
        `${basePath}?lang=${lang}&stationId=${stationId}&page=${page}&perPage=${perPage}&startDate=${startDate}&endDate=${endDate}`;

      const [res1, res2] = await Promise.all([
        getDataApi(
          createEndpoint("pump-all-data/findDataByStationIdAndDateRange"),
          token
        ),
        getDataApi(
          createEndpoint(
            "electrical-energy-all-data/findDataByStationIdAndDateRange"
          ),
          token
        ),
      ]);

      const pumpData = res1.data.data.data;
      const electricalData = res2.data.data.data;

      const combinedData = processAndCombineData(
        pumpData,
        electricalData,
        lang
      );

      const dataByDate = mergeDataByDate(pumpData, electricalData, lang);

      const lineChartData = {
        date: combinedData?.map((item) => item.date),
        lineData: [
          {
            name: allDataType[lang].name1,
            data: combinedData?.map((item) => item.totalVolume),
            unit: "m³",
          },
          {
            name: allDataType[lang].name2,
            data: combinedData?.map((item) => item.totalEnergyActive),
            unit: unitTranslations[lang].kwHour,
          },
        ],
      };

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.LINE_CHART_ALL_DATA,
        payload: lineChartData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_BY_STATIONID_AGGRIGATE_ELECTRICAL,
        payload: combinedData,
      });

      dispatch({
        type: DASHBOARD_ACTIONS_TYPES.FIND_DATA_BY_STATION_ID,
        payload: dataByDate,
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
        date: `${months[lang][item.month - 1]}${" "}${item.week}-${
          aggregateDataType[lang].weekName
        }`,
      }));

      const lineChartData = {
        date: data?.map(
          (item) =>
            `${months[lang][item.month - 1]}${" "}${item.week}-${
              aggregateDataType[lang].weekName
            }`
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
        date: `${months[lang][item.month - 1]}${" "}${item.week}-${
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

      console.log(res.data.data);

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
