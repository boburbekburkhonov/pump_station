import { REPORTS_TYPES } from "../actions/reports";

const initialState = {
  allStations: [],
  stationAllDataByStationId: [],
  pumpDataByStationId: [],
  electrEnergyDataByStationId: [],
  todayDataByStationId: [],
  yesterdayDataByStationId: [],
  dailyDataByStationId: [],
  weeklyDataByStationId: [],
  tenDayDataByStationId: [],
  monthlyDataByStationId: [],
  chosenDateDataByStationId: [],
  dateRangeDataByStationId: [],
  electricalEnergyTodayDataByStationId: [],
  electricalEnergyYesterdayDataByStationId: [],
  electricalEnergyDailyDataByStationId: [],
  electricalEnergyWeeklyDataByStationId: [],
  electricalEnergyTenDayDataByStationId: [],
  electricalEnergyMonthlyDataByStationId: [],
  electricalEnergyChosenDateDataByStationId: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORTS_TYPES.GET_ALL_STATIONS:
      return {
        ...state,
        allStations: action.payload,
      };
    case REPORTS_TYPES.GET_STATION_TODAY_ALL_DATA_BY_STATION_ID:
      return {
        ...state,
        stationAllDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_TODAY_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_PUMP_TODAY_DATA_BY_STATION_ID:
      return {
        ...state,
        todayDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_STATION_YESTEDAY_ALL_DATA_BY_STATION_ID:
      return {
        ...state,
        stationAllDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_YESTEDAY_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_PUMP_YESTEDAY_DATA_BY_STATION_ID:
      return {
        ...state,
        yesterdayDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_STATION_DAILY_ALL_DATA_BY_STATION_ID:
      return {
        ...state,
        stationAllDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_DAILY_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_PUMP_DAILY_DATA_BY_STATION_ID:
      return {
        ...state,
        dailyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_STATION_WEEKLY_ALL_DATA_BY_STATION_ID:
      return {
        ...state,
        stationAllDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_WEEKLY_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_PUMP_WEEKLY_DATA_BY_STATION_ID:
      return {
        ...state,
        weeklyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_STATION_TEN_DAY_ALL_DATA_BY_STATION_ID:
      return {
        ...state,
        stationAllDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_TEN_DAY_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_PUMP_TEN_DAY_DATA_BY_STATION_ID:
      return {
        ...state,
        tenDayDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_STATION_MONTHLY_ALL_DATA_BY_STATION_ID:
      return {
        ...state,
        stationAllDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_MONTHLY_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_PUMP_MONTHLY_DATA_BY_STATION_ID:
      return {
        ...state,
        monthlyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_STATION_CHOSEN_DATE_ALL_DATA_BY_STATION_ID:
      return {
        ...state,
        stationAllDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_PUMP_CHOSEN_DATE_DATA_BY_STATION_ID:
      return {
        ...state,
        chosenDateDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_STATION_DATE_RANGE_ALL_DATA_BY_STATION_ID:
      return {
        ...state,
        stationAllDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_DATE_RANGE_DATA_BY_STATION_ID:
      return {
        ...state,
        pumpDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_PUMP_DATE_RANGE_DATA_BY_STATION_ID:
      return {
        ...state,
        dateRangeDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ELECTRICAL_ENERGY_TODAY_DATA_BY_STATION_ID:
      return {
        ...state,
        electrEnergyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_ELECTRICAL_ENERGY_TODAY_DATA_BY_STATION_ID:
      return {
        ...state,
        electricalEnergyTodayDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ELECTRICAL_ENERGY_YESTERDAY_DATA_BY_STATION_ID:
      return {
        ...state,
        electrEnergyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_ELECTRICAL_ENERGY_YESTERDAY_DATA_BY_STATION_ID:
      return {
        ...state,
        electricalEnergyYesterdayDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ELECTRICAL_ENERGY_DAILY_DATA_BY_STATION_ID:
      return {
        ...state,
        electrEnergyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_ELECTRICAL_ENERGY_DAILY_DATA_BY_STATION_ID:
      return {
        ...state,
        electricalEnergyDailyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ELECTRICAL_ENERGY_WEEKLY_DATA_BY_STATION_ID:
      return {
        ...state,
        electrEnergyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_ELECTRICAL_ENERGY_WEEKLY_DATA_BY_STATION_ID:
      return {
        ...state,
        electricalEnergyWeeklyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ELECTRICAL_ENERGY_TEN_DAY_DATA_BY_STATION_ID:
      return {
        ...state,
        electrEnergyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_ELECTRICAL_ENERGY_TEN_DAY_DATA_BY_STATION_ID:
      return {
        ...state,
        electricalEnergyTenDayDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ELECTRICAL_ENERGY_MONTHLY_DATA_BY_STATION_ID:
      return {
        ...state,
        electrEnergyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_ELECTRICAL_ENERGY_MONTHLY_DATA_BY_STATION_ID:
      return {
        ...state,
        electricalEnergyMonthlyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ELECTRICAL_ENERGY_CHOSEN_DATE_DATA_BY_STATION_ID:
      return {
        ...state,
        electrEnergyDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ALL_ELECTRICAL_ENERGY_CHOSEN_DATE_DATA_BY_STATION_ID:
      return {
        ...state,
        electricalEnergyChosenDateDataByStationId: action.payload,
      };
    case REPORTS_TYPES.GET_ELECTRICAL_ENERGY_DATE_RANGE_DATA_BY_STATION_ID:
      return {
        ...state,
        electrEnergyDataByStationId: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
