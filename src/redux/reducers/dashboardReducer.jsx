/** @format */

import { DASHBOARD_DATAS } from "../actions/dashboard";

const initialState = {
  userInformationById: [],
  statisticData: [],
  statisticDataForOrganization: [],
  statisticDataForAdmin: [],
  statisticDataForLineChart: [],
  volumeAndEnergyData: [],
  stationsId: [],
  loadingStatistic: true,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_DATAS.GET_USER_INFORMATION_BY_ID:
      return {
        ...state,
        userInformationById: action.payload,
      };
    case DASHBOARD_DATAS.UPDATED_USER_INFORMATION_BY_ID:
      return {
        ...state,
        updatedUserInformationById: action.payload,
      };
    case DASHBOARD_DATAS.GET_COUNT_STATIONS_STATISTICS:
      return {
        ...state,
        statisticData: action.payload,
      };
    case DASHBOARD_DATAS.GET_COUNT_STATIONS_STATISTICS_FOR_ORGANIZATION:
      return {
        ...state,
        statisticDataForOrganization: action.payload,
      };
    case DASHBOARD_DATAS.GET_VOLUME_AND_ENERGY_DATA:
      return {
        ...state,
        volumeAndEnergyData: action.payload,
      };
    case DASHBOARD_DATAS.GET_VOLUME_AND_ENERGY_DATA_BY_GROUPSTATION:
      return {
        ...state,
        statisticDataForLineChart: action.payload,
      };
    case DASHBOARD_DATAS.GET_STATISTIC_DATA_LOADING:
      return {
        ...state,
        loadingStatistic: action.payload,
      };
    case DASHBOARD_DATAS.GET_COUNT_STATIONS_STATISTICS_FOR_ADMIN:
      return {
        ...state,
        statisticDataForAdmin: action.payload,
      };
    case DASHBOARD_DATAS.FIND_ALL_STATIONS_ID:
      return {
        ...state,
        stationsId: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
