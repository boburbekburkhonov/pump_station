/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils";

const translations = {
  uz: {
    agrigate: "Agrigat qiymati",
    meter: "Hisoblagich qiymati",
    meter2: "kvs"
  },
  ru: {
    agrigate: "Значение агрегата",
    meter: "Значение счетчика",
    meter2: "кВтч"
  },
  en: {
    agrigate: "Aggregate value",
    meter: "Elektr value",
    meter2: "kWh",
  },
};

export const LINE_STATISTIC_DATA_TYPES = {
  FIND_TODAY_LINE_STATISTICS_DATA: "FIND_TODAY_LINE_STATISTICS_DATA",
  FIND_TODAY_LINE_STATISTICS_DATA2: "FIND_TODAY_LINE_STATISTICS_DATA2",
  FIND_YESTERDAY_LINE_STATISTICS_DATA: "FIND_YESTERDAY_LINE_STATISTICS_DATA",
  FIND_WEEKLY_LINE_STATISTICS_DATA: "FIND_WEEKLY_LINE_STATISTICS_DATA",
  FIND_MONTHLY_LINE_STATISTICS_DATA: "FIND_MONTHLY_LINE_STATISTICS_DATA",
  FIND_YEAR_LINE_STATISTICS_DATA: "FIND_YEAR_LINE_STATISTICS_DATA",
  FIND_LINE_STATISTIC_LOADING: "FIND_LINE_STATISTIC_LOADING",
};

export const findTodayLineStatisticData =
  (lang, stationId, token) => async (dispatch) => {
    try {
      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `dashboard/getVolumeAndEnergyDataTodayByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      const data = res.data.data;

      const newAgrigateValue = {
        name: translations[lang].agrigate,
        date: data.volumeToday.map((item) => item.date.split(" ")[1]),
        data: data.volumeToday.map((item) => item.volume),
        unit: "m³",
      };

      const newElectricalValue = {
        name: translations[lang].meter,
        date: data.energyToday.map((item) => item.date.split(" ")[1]),
        data: data.energyToday.map((item) => item.energyActive),
        unit: translations[lang].meter2,
      };

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA,
        payload: newAgrigateValue,
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA2,
        payload: newElectricalValue,
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
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: false,
      });
    }
  };

export const findYesterdayLineStatisticData =
  (lang, stationId, token) => async (dispatch) => {
    try {
      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `dashboard/getVolumeAndEnergyDataYesterdayByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      const data = res.data.data;

      const newAgrigateValue = {
        name: translations[lang].agrigate,
        date: data.volumeYesterday.map((item) => item.date.split(" ")[1]),
        data: data.volumeYesterday.map((item) => item.volume),
        unit: "m³",
      };

      const newElectricalValue = {
        name: translations[lang].agrigate,
        date: data.energyYesterday.map((item) => item.date.split(" ")[1]),
        data: data.energyYesterday.map((item) => item.energyActive),
        unit: translations[lang].meter2,
      };

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_YESTERDAY_LINE_STATISTICS_DATA,
        payload: newAgrigateValue,
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA2,
        payload: newElectricalValue,
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
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: false,
      });
    }
  };

export const findWeeklyLineStatisticData =
  (lang, stationId, token) => async (dispatch) => {
    try {
      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `dashboard/getVolumeAndEnergyDataThisWeekByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      const weekDays = {
        uz: [
          "Dushanba",
          "Seshanba",
          "Chorshanba",
          "Payshanba",
          "Juma",
          "Shanba",
          "Yakshanba",
        ],
        en: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        ru: [
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
          "Воскресенье",
        ],
      };

      const selectedWeekDays = weekDays[lang];
      if (!selectedWeekDays) {
        throw new Error(
          "Invalid language code. Please provide a valid `lang` value."
        );
      }

      const { energyThisWeek = [], volumeThisWeek = [] } = res.data.data;

      const newAggregateValue = {
        name: translations[lang]?.agrigate || "Aggregate",
        date: selectedWeekDays,
        data: volumeThisWeek.map((item) => item.volume),
        unit: "m³",
      };

      const newElectricalValue = {
        name: translations[lang]?.electrical || "Electrical",
        date: selectedWeekDays,
        data: energyThisWeek.map((item) => item.energyActive),
        unit: translations[lang].meter2,
      };

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_YESTERDAY_LINE_STATISTICS_DATA,
        payload: newAggregateValue,
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA2,
        payload: newElectricalValue,
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error:
            err.response?.data?.message ||
            err.response?.statusText ||
            "Network Error",
        },
      });
    } finally {
      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: false,
      });
    }
  };

export const findMonthlyLineStatisticData =
  (lang, stationId, token) => async (dispatch) => {
    try {
      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `dashboard/getVolumeAndEnergyDataThisMonthByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

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

      const filterMonthName = (item) => {
        const [year, month, day] = item.date.split("T")[0].split("-");
        return `${
          months[lang]?.[Number(month) - 1] || months.en[Number(month) - 1]
        } ${day}`;
      };

      const { energyThisMonth, volumeThisMonth } = res.data.data;

      const newAgrigateValue = {
        name: translations[lang].agrigate,
        date: volumeThisMonth.map((item) => filterMonthName(item)),
        data: volumeThisMonth.map((item) => item.volume),
        unit: "m³",
      };

      const newElectricalValue = {
        name: translations[lang].agrigate,
        date: energyThisMonth.map((item) => filterMonthName(item)),
        data: energyThisMonth.map((item) => item.energyActive),
        unit: translations[lang].meter2,
      };

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_YESTERDAY_LINE_STATISTICS_DATA,
        payload: newAgrigateValue,
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA2,
        payload: newElectricalValue,
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
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: false,
      });
    }
  };

export const findYearLineStatisticData =
  (lang, stationId, token) => async (dispatch) => {
    try {
      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `dashboard/getVolumeAndEnergyDataThisYearByStationId?lang=${lang}&stationId=${stationId}`,
        token
      );

      const { energyThisYear, volumeThisYear } = res.data.data;

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

      const selectLanguageMongth = months[lang]

      const newAgrigateValue = {
        name: translations[lang].agrigate,
        date: volumeThisYear.map((item) => selectLanguageMongth[item.month - 1]),
        data: volumeThisYear.map((item) => item.volume),
        unit: "m³",
      };

      const newElectricalValue = {
        name: translations[lang].agrigate,
        date: energyThisYear.map((item) => selectLanguageMongth[item.month- 1]),
        data: energyThisYear.map((item) => item.energyActive),
        unit: translations[lang].meter2,
      };

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_YESTERDAY_LINE_STATISTICS_DATA,
        payload: newAgrigateValue,
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA2,
        payload: newElectricalValue,
      });
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
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
        type: LINE_STATISTIC_DATA_TYPES.FIND_LINE_STATISTIC_LOADING,
        payload: false,
      });
    }
  };
