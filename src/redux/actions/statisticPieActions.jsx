/** @format */

import { getDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const PIE_ACTIONS_TYPES = {
  FIND_TODAY_DATA_STATISTICS: "FIND_TODAY_DATA_STATISTICS",
  FIND_YESTERDAY_DATA_STATISTICS: "FIND_YESTERDAY_DATA_STATISTICS",
  FIND_WEEKLY_DATA_STATISTICS: "FIND_WEEKLY_DATA_STATISTICS",
  FIND_MONTH_DATA_STATISTICS: "FIND_MONTH_DATA_STATISTICS",
  FIND_YEARS_DATA_STATISTICS: "FIND_YEARS_DATA_STATISTICS",
  FIND_LOADING_STATISTICS: "FIND_LOADING_STATISTICS",
  FIRST_PIE_DATA: "FIRST_PIE_DATA",
  SECOND_PIE_DATA: "SECOND_PIE_DATA",
};

const translations = {
  uz: {
    meter: "kvs",
  },
  ru: {
    meter: "кВтч",
  },
  en: {
    meter: "kWh",
  },
};

export const findTodayStatisticData = (lang, token) => async (dispatch) => {
  try {
    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: true,
    });

    const res = await getDataApi(
      `dashboard/getVolumeAndEnergyDataToday?lang=${lang}`,
      token
    );

    const firstPie = res.data.data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.volume,
        unit: "m³",
      };
    });

    const secondPie = res.data.data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.energyActive,
        unit: translations[lang].meter,
      };
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIRST_PIE_DATA,
      payload: firstPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.SECOND_PIE_DATA,
      payload: secondPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_TODAY_DATA_STATISTICS,
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
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: false,
    });
  }
};

export const findYesterdayStatisticData = (lang, token) => async (dispatch) => {
  try {
    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: true,
    });

    const res = await getDataApi(
      `dashboard/getVolumeAndEnergyDataYesterday?lang=${lang}`,
      token
    );
    const data = res.data.data;

    const firstPie = res.data.data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.volume,
        unit: "m³",
      };
    });

    const secondPie = data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.energyActive,
        unit: translations[lang].meter,
      };
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIRST_PIE_DATA,
      payload: firstPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.SECOND_PIE_DATA,
      payload: secondPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_YESTERDAY_DATA_STATISTICS,
      payload: {
        totalVolumeToday: data.totalVolumeYesterday,
        totalEnergyActiveToday: data.totalEnergyActiveYesterday,
        stationData: data.stationData,
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
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: false,
    });
  }
};

export const findWeeklyStatisticData = (lang, token) => async (dispatch) => {
  try {
    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: true,
    });

    const res = await getDataApi(
      `dashboard/getVolumeAndEnergyDataThisWeek?lang=${lang}`,
      token
    );
    const data = res.data.data;

    const firstPie = res.data.data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.volume,
        unit: "m³",
      };
    });

    const secondPie = data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.energyActive,
        unit: translations[lang].meter,
      };
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIRST_PIE_DATA,
      payload: firstPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.SECOND_PIE_DATA,
      payload: secondPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_WEEKLY_DATA_STATISTICS,
      payload: {
        totalVolumeToday: data.totalVolumeThisWeek,
        totalEnergyActiveToday: data.totalEnergyActiveThisWeek,
        stationData: data.stationData,
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
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: false,
    });
  }
};

export const findMonthlyStatisticData = (lang, token) => async (dispatch) => {
  try {
    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: true,
    });

    const res = await getDataApi(
      `dashboard/getVolumeAndEnergyDataThisMonth?lang=${lang}`,
      token
    );

    const data = res.data.data;

    const firstPie = res.data.data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.volume,
        unit: "m³",
      };
    });

    const secondPie = data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.energyActive,
        unit: translations[lang].meter,
      };
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIRST_PIE_DATA,
      payload: firstPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.SECOND_PIE_DATA,
      payload: secondPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_MONTH_DATA_STATISTICS,
      payload: {
        totalVolumeToday: data.totalVolumeThisMonth,
        totalEnergyActiveToday: data.totalEnergyActiveThisMonth,
        stationData: data.stationData,
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
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: false,
    });
  }
};

export const findYearsStatisticData = (lang, token) => async (dispatch) => {
  try {
    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: true,
    });

    const res = await getDataApi(
      `dashboard/getVolumeAndEnergyDataThisYear?lang=${lang}`,
      token
    );

    const data = res.data.data;

    const firstPie = res.data.data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.volume,
        unit: "m³",
      };
    });

    const secondPie = data?.stationData?.map((item) => {
      return {
        name: item.stationName,
        y: item.energyActive,
        unit: translations[lang].meter,
      };
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIRST_PIE_DATA,
      payload: firstPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.SECOND_PIE_DATA,
      payload: secondPie,
    });

    dispatch({
      type: PIE_ACTIONS_TYPES.FIND_YEARS_DATA_STATISTICS,
      payload: {
        totalVolumeToday: data.totalVolumeThisYear,
        totalEnergyActiveToday: data.totalEnergyActiveThisYear,
        stationData: data.stationData,
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
      type: PIE_ACTIONS_TYPES.FIND_LOADING_STATISTICS,
      payload: false,
    });
  }
};
