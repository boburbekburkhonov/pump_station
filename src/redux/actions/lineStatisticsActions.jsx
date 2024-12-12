/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils";

const translations = {
  uz: {
    agrigate: "Agrigat qiymati",
    meter: "Hisoblagich qiymati",
  },
  ru: {
    agrigate: "Значение агрегата",
    meter: "Значение счетчика",
  },
  en: {
    agrigate: "Aggregate value",
    meter: "Elektr value",
  },
};

export const LINE_STATISTIC_DATA_TYPES = {
  FIND_TODAY_LINE_STATISTICS_DATA: "FIND_TODAY_LINE_STATISTICS_DATA",
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
      const chartData = data.energyToday.flatMap((item, index) => {
        const date = item.date.split(" ")[1];
        return [
          {
            name: translations[lang].meter,
            date: date,
            value: item.energyActive,
          },
          {
            name: translations[lang].agrigate,
            date: date,
            value: data.volumeToday[index].volume,
          },
        ];
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_TODAY_LINE_STATISTICS_DATA,
        payload: chartData,
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
      const chartData = data.energyYesterday.flatMap((item, index) => {
        const date = item.date.split(" ")[1];
        return [
          {
            name: translations[lang].meter,
            date: date,
            value: item.energyActive,
          },
          {
            name: translations[lang].agrigate,
            date: date,
            value: data.volumeYesterday[index].volume,
          },
        ];
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_YESTERDAY_LINE_STATISTICS_DATA,
        payload: chartData,
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

      const { energyThisWeek, volumeThisWeek } = res.data.data;

      const chartData = energyThisWeek.flatMap((item, index) => [
        {
          name: translations[lang].meter,
          date: selectedWeekDays[index],
          value: item.energyActive,
        },
        {
          name: translations[lang].agrigate,
          date: selectedWeekDays[index],
          value: volumeThisWeek[index].volume,
        },
      ]);

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_WEEKLY_LINE_STATISTICS_DATA,
        payload: chartData,
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

      const { energyThisMonth, volumeThisMonth } = res.data.data;

      const chartData = energyThisMonth.flatMap((item, index) => {
        const [year, day, month] = item.date.split("T")[0].split("-");
        const monthName =
          months[lang]?.[Number(month) - 1] || months.en[Number(month) - 1];

        return [
          {
            name: translations[lang].meter,
            date: monthName,
            value: item.energyActive,
          },
          {
            name: translations[lang].agrigate,
            date: monthName,
            value: volumeThisMonth[index].volume,
          },
        ];
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_MONTHLY_LINE_STATISTICS_DATA,
        payload: chartData,
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

      const chartData = energyThisYear.flatMap((item, index) => {
        const monthName =
          months[lang]?.[item.month - 1] || months.en[item.month - 1];
        return [
          {
            name: translations[lang].meter,
            date: monthName,
            value: item.energyActive,
          },
          {
            name: translations[lang].agrigate,
            date: monthName,
            value: volumeThisYear[index].volume,
          },
        ];
      });

      dispatch({
        type: LINE_STATISTIC_DATA_TYPES.FIND_YEAR_LINE_STATISTICS_DATA,
        payload: chartData,
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
