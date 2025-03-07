import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getStatisticsDashboardForAdmin } from "../../redux/actions/dashboard";
import {
  getAllStations,
  getElectricalEnergyChosenDateDataByStationId,
  getElectricalEnergyDailyDataByStationId,
  getElectricalEnergyMonthlyDataByStationId,
  getElectricalEnergyTenDayDataByStationId,
  getElectricalEnergyTodayDataByStationId,
  getElectricalEnergyWeeklyDataByStationId,
  getElectricalEnergyYesterdayDataByStationId,
  getPumpChosenDateDataByStationId,
  getPumpDailyDataByStationId,
  getPumpDateRangeDataByStationId,
  getPumpMonthlyDataByStationId,
  getPumpTenDayDataByStationId,
  getPumpTodayDataByStationId,
  getPumpWeeklyDataByStationId,
  getPumpYesterdayDataByStationId,
  getStationTodayAllDataByStationId,
} from "../../redux/actions/reports";
import dayjs from "dayjs";
import { DatePicker, Modal, Pagination, Select, Table } from "antd";
import "./index.css";
import { BeatLoader } from "react-spinners";
import xlsImage from "../../assets/xls.d451c295.png";
import pdfImage from "../../assets/pdf.jpg";
import EmptyCard from "../../components/emptyCard";
import {
  findDailyDataElectricityId,
  findMonthlyDataElectricityId,
  findSelectDateElectricityId,
  findTenDayDataElectricityId,
  findTodayDataElectricityId,
  findWeeklyDataElectricityId,
  findYesterdayDataElectricityId,
  getDailyAggregateIDData,
  getMonthlyAggregateIDData,
  getSelectDateAggregateIDData,
  getTenDayAggregateIDData,
  getTodayAggregateIDData,
  getWeeklyAggregateIDData,
  getYesterdayAggregateIDData,
} from "../../redux/actions/dashboardActions";
import SolarEmploymentChart from "../../components/googleNewPieChart";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import moment from "moment";
import { getIcon } from "../../data";
import { q } from "framer-motion/client";
import { AppstoreOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Loading from "../../components/loading";

const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
function Reports() {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const { statisticDataForAdmin } = useSelector((state) => state.dashboard);
  const { colors } = useSelector((state) => state.theme);
  const {
    allStations,
    stationAllDataByStationId,
    todayDataByStationId,
    yesterdayDataByStationId,
    dailyDataByStationId,
    weeklyDataByStationId,
    tenDayDataByStationId,
    monthlyDataByStationId,
    chosenDateDataByStationId,
    dateRangeDataByStationId,
    electricalEnergyTodayDataByStationId,
    electricalEnergyYesterdayDataByStationId,
    electricalEnergyDailyDataByStationId,
    electricalEnergyWeeklyDataByStationId,
    electricalEnergyTenDayDataByStationId,
    electricalEnergyMonthlyDataByStationId,
    electricalEnergyChosenDateDataByStationId,
  } = useSelector((state) => state.reports);
  const { pumpLineChartData, electryLineChartData } = useSelector(
    (state) => state.pumps
  );
  const [selectDataType, setSelectDataType] = useState(0);
  const [selectDataTypeForStation, setSelectDataTypeForStation] = useState(0);
  const [selectValueData, setSelectValueData] = useState(0);
  const [selectValueDataForLineChart, setSelectValueDataForLineChart] =
    useState(0);
  const [
    selectValueElectricalEnergyDataForLineChart,
    setSelectValueElectricalEnergyDataForLineChart,
  ] = useState(0);
  const [selectValueDataElectricalEnergy, setSelectValueDataElectricalEnergy] =
    useState(0);
  const [daylyDate, setDaylyDate] = useState(dayjs());
  const [selectValueForSearch, setSelectValueForSearch] = useState("volume");
  const [
    selectValueElectricalEnergyForSearch,
    setSelectValueElectricalEnergyForSearch,
  ] = useState("voltage1");
  const [reportTableHeading, setReportTableHeading] = useState({});
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [pageDataStationsForModal, setPageDataStationsForModal] = useState({
    page: 1,
    perPage: 10,
  });
  const [pageDataForElectricalEnergy, setPageDataForElectricalEnergy] = useState({
    page: 1,
    perPage: 10,
  });
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const [stationNameTotalInformation, setStationNameTotalInformation] = useState("");
  const { loading } = useSelector((state) => state.alert);
  const [open, setOpen] = useState(false);
  const [allStationsForModal, setAllStationsForModal] = useState(allStations);
  const accessToken = localStorage.getItem("access_token");
  const role = localStorage.getItem("roles");

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;

    dispatch(getStatisticsDashboardForAdmin(lang, accessToken));
    dispatch(getAllStations(lang, accessToken));
  }, [dispatch, accessToken, i18n.language]);

  useEffect(() => {
    fetchAllData();

    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);

  const dateForChosenDate = `${daylyDate.year()}-${
    String(daylyDate.month() + 1).length == 1
      ? `0${daylyDate.month() + 1}`
      : daylyDate.month() + 1
  }-${
    String(daylyDate.date()).length == 1
      ? `0${daylyDate.date()}`
      : daylyDate.date()
  }`;

  const startDate = dateRange[0].format("YYYY-MM-DD");
  const endDate = dateRange[1].format("YYYY-MM-DD");

  const findAllStationByActiveOrNotActive = (item) => {
    setPageDataStationsForModal({
      page: 1,
      perPage: 10
    })
    if(item == 0){
      const processedData = allStations.map((station) => ({
        key: station.id,
        name: station.name,
        devicePhoneNum: station.devicePhoneNum,
        district: station.district,
        organization: station.organization,
        region: station.region,
        status: station.status,
        location: station.location,
      }));

      setAllStationsForModal(processedData);
    } else if(item == 1){
      const activeStations = allStations.filter(e => e.status == true)
      const processedData = activeStations.map((station) => ({
        key: station.id,
        name: station.name,
        devicePhoneNum: station.devicePhoneNum,
        district: station.district,
        organization: station.organization,
        region: station.region,
        status: station.status,
        location: station.location,
      }));
      setAllStationsForModal(processedData);
    } else if(item == 2){
      const notActiveStations = allStations.filter(e => e.status != true)
      const processedData = notActiveStations.map((station) => ({
        key: station.id,
        name: station.name,
        devicePhoneNum: station.devicePhoneNum,
        district: station.district,
        organization: station.organization,
        region: station.region,
        status: station.status,
        location: station.location,
      }));
      setAllStationsForModal(processedData);
    }
  }

  const findStationBySort = useCallback(
    (e) => {
      e.preventDefault();
      const lang = i18n.language;
      const selectedStationForSort = allStations[selectDataTypeForStation]?.id;
      setReportTableHeading({
        title: t("dataPagesInformation.selectButtonNames", {
          returnObjects: true,
        })[selectDataType].title,
        index: selectDataType,
      });
      const aggregateIdForLineChart =
        allStations[selectDataTypeForStation]?.aggregate[0]?.id;
      const electricalEnergyIdForLineChart =
        allStations[selectDataTypeForStation]?.electricalEnergy[0]?.id;
      setSelectValueDataForLineChart(0);
      setSelectValueElectricalEnergyDataForLineChart(0);
      setPageData({page: 1, perPage: 10})
      setPageDataForElectricalEnergy({page: 1, perPage: 10})
      setStationNameTotalInformation(allStations[selectDataTypeForStation]?.name)
      switch (selectDataType) {
        case 0:
          dispatch(
            getStationTodayAllDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
            )
          );
          dispatch(
            getPumpTodayDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageData.page,
              pageData.perPage
            )
          );
          dispatch(
            getTodayAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24
            )
          );
          dispatch(
            findTodayDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24
            )
          );
          dispatch(
            getElectricalEnergyTodayDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage
            )
          );
          break;
        case 1:
          dispatch(
            getPumpYesterdayDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageData.page,
              pageData.perPage
            )
          );
          dispatch(
            getYesterdayAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24
            )
          );
          dispatch(
            findYesterdayDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24
            )
          );
          dispatch(
            getElectricalEnergyYesterdayDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage
            )
          );
          break;
        case 2:
          dispatch(
            getPumpDailyDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageData.page,
              pageData.perPage,
              daylyDate.year(),
              daylyDate.month() + 1
            )
          );
          dispatch(
            getDailyAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24,
              daylyDate.month() + 1,
              daylyDate.year()
            )
          );
          dispatch(
            findDailyDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              daylyDate.month() + 1,
              daylyDate.year()
            )
          );
          dispatch(
            getElectricalEnergyDailyDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage,
              daylyDate.year(),
              daylyDate.month() + 1
            )
          );
          break;
          case 3:
          dispatch(
            getPumpWeeklyDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageData.page,
              pageData.perPage,
              daylyDate.year(),
              daylyDate.month() + 1
            )
          );
          dispatch(
            getWeeklyAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              daylyDate.month() + 1,
              daylyDate.year()
            )
          );
          dispatch(
            findWeeklyDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              daylyDate.month() + 1,
              daylyDate.year()
            )
          );
          dispatch(
            getElectricalEnergyWeeklyDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage,
              daylyDate.year(),
              daylyDate.month() + 1
            )
          );
          break;
        case 4:
          dispatch(
            getPumpTenDayDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageData.page,
              pageData.perPage,
              daylyDate.year()
            )
          );
          dispatch(
            getTenDayAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24,
              daylyDate.year()
            )
          );
          dispatch(
            findTenDayDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              daylyDate.year()
            )
          );
          dispatch(
            getElectricalEnergyTenDayDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage,
              daylyDate.year()
            )
          );
          break;
        case 5:
          dispatch(
            getPumpMonthlyDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageData.page,
              pageData.perPage,
              daylyDate.year()
            )
          );
          dispatch(
            getMonthlyAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24,
              daylyDate.year()
            )
          );
          dispatch(
            findMonthlyDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              daylyDate.year()
            )
          );
          dispatch(
            getElectricalEnergyMonthlyDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage,
              daylyDate.year()
            )
          );
          break;
        case 6:
          dispatch(
            getPumpChosenDateDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageData.page,
              pageData.perPage,
              dateForChosenDate
            )
          );
          dispatch(
            getSelectDateAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24,
              dateForChosenDate
            )
          );
          dispatch(
            findSelectDateElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              dateForChosenDate
            )
          );
          dispatch(
            getElectricalEnergyChosenDateDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage,
              dateForChosenDate
            )
          );
          break;
        case 7:
          dispatch(
            getPumpDateRangeDataByStationId(
              lang,
              accessToken,
              selectedStationForSort,
              pageData.page,
              pageData.perPage,
              startDate,
              endDate
            )
          );
          // dispatch(
          //   getSelectDateAggregateIDData(
          //     aggregateIdForLineChart,
          //     accessToken,
          //     lang,
          //     pageData.page,
          //     24,
          //     dateForChosenDate
          //   )
          // );
          // dispatch(
          //   findSelectDateElectricityId(
          //     electricalEnergyIdForLineChart,
          //     accessToken,
          //     lang,
          //     pageData.page,
          //     24,
          //     dateForChosenDate
          //   )
          // );
          // dispatch(
          //   getElectricalEnergyChosenDateDataByStationId(
          //     lang,
          //     accessToken,
          //     selectedStationForSort,
          //     pageData.page,
          //     pageData.perPage,
          //     dateForChosenDate
          //   )
          // );
          break;
        default:
          break;
      }
    },
    [
      i18n.language,
      accessToken,
      pageData.page,
      pageData.perPage,
      pageDataForElectricalEnergy.page,
      pageDataForElectricalEnergy.perPage,
      selectDataTypeForStation,
      selectDataType,
      selectValueDataForLineChart,
      daylyDate,
    ]
  );

  const columnsTotalStationInformation = [
    {
      title: t("dataPagesInformation.dataTableInformation.dataDate"),
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 250,
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataVolume"),
      dataIndex: "volume",
      key: "volume",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.energyActive"),
      dataIndex: "energyActive",
      key: "energyActive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.energyReactive"),
      dataIndex: "energyReactive",
      key: "energyReactive",
      align: "center",
    }
  ]

  const columnsTotalAggregateInformation = [
    {
      title: t("dashboardPageData.lastStationsData.agrigateName"),
      dataIndex: "agrigateName",
      key: "agrigateName",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataVolume"),
      dataIndex: "volume",
      key: "volume",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataVelocity"),
      dataIndex: "velocity",
      key: "velocity",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataFlow"),
      dataIndex: "flow",
      key: "flow",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataDate"),
      dataIndex: "date",
      key: "date",
      align: "center",
    },
  ]

  const columnsTotalOneAggregateInformation = [
    {
      title: t("dataPagesInformation.dataTableInformation.dataDate"),
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataVolume"),
      dataIndex: "volume",
      key: "volume",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataVelocity"),
      dataIndex: "velocity",
      key: "velocity",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataFlow"),
      dataIndex: "flow",
      key: "flow",
      align: "center",
    }
  ]

  const columnsTotalElectricalEnergyInformation = [
    {
      title: t("dashboardPageData.lastStationsData.electryName"),
      dataIndex: "electryName",
      key: "electryName",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 1",
      dataIndex: "voltage1",
      key: "voltage1",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 1",
      dataIndex: "current1",
      key: "current1",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 2",
      dataIndex: "voltage2",
      key: "voltage2",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 2",
      dataIndex: "current2",
      key: "current2",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 3",
      dataIndex: "voltage3",
      key: "voltage3",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 3",
      dataIndex: "current3",
      key: "current3",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.powerActive"),
      dataIndex: "powerActive",
      key: "powerActive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.powerReactive"),
      dataIndex: "powerReactive",
      key: "powerReactive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.energyActive"),
      dataIndex: "energyActive",
      key: "energyActive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.energyReactive"),
      dataIndex: "energyReactive",
      key: "energyReactive",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataDate"),
      dataIndex: "date",
      key: "date",
      align: "center",
    },
  ]

  const columnsTotalOneElectricalEnergyInformation = [
    {
      title: t("dataPagesInformation.dataTableInformation.dataDate"),
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 1",
      dataIndex: "voltage1",
      key: "voltage1",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 1",
      dataIndex: "current1",
      key: "current1",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 2",
      dataIndex: "voltage2",
      key: "voltage2",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 2",
      dataIndex: "current2",
      key: "current2",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 3",
      dataIndex: "voltage3",
      key: "voltage3",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 3",
      dataIndex: "current3",
      key: "current3",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.powerActive"),
      dataIndex: "powerActive",
      key: "powerActive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.powerReactive"),
      dataIndex: "powerReactive",
      key: "powerReactive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.energyActive"),
      dataIndex: "energyActive",
      key: "energyActive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.energyReactive"),
      dataIndex: "energyReactive",
      key: "energyReactive",
      align: "center",
    }
  ]

  const columnsUser = [
    {
      title: t("dataPagesInformation.dataTableInformation.dataVolume"),
      dataIndex: "volume",
      key: "volume",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataVelocity"),
      dataIndex: "velocity",
      key: "velocity",
      align: "center",
    },
    {
      title: t("dataPagesInformation.dataTableInformation.dataFlow"),
      dataIndex: "flow",
      key: "flow",
      align: "center",
    },
  ];

  const columnsElectricalEnergy = [
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 1",
      dataIndex: "voltage1",
      key: "voltage1",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 1",
      dataIndex: "current1",
      key: "current1",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 2",
      dataIndex: "voltage2",
      key: "voltage2",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 2",
      dataIndex: "current2",
      key: "current2",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryVolt") + " 3",
      dataIndex: "voltage3",
      key: "voltage3",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.electryAmper") + " 3",
      dataIndex: "current3",
      key: "current3",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.powerActive"),
      dataIndex: "powerActive",
      key: "powerActive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.powerReactive"),
      dataIndex: "powerReactive",
      key: "powerReactive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.energyActive"),
      dataIndex: "energyActive",
      key: "energyActive",
      align: "center",
    },
    {
      title: t("dashboardPageData.lastStationsData.energyReactive"),
      dataIndex: "energyReactive",
      key: "energyReactive",
      align: "center",
    },
  ];

  const valueTodayTable = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];

  const getTableDate = () => {
    const date = new Date();
    if (reportTableHeading.index == 0) {
      return date;
    } else if (reportTableHeading.index == 1) {
      date.setDate(date.getDate() - 1);
      return date;
    }
  };

  const isEmptyData = () => {
    if (reportTableHeading.index == 0) {
      if (
        todayDataByStationId.totalPages == 0 ||
        !todayDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 1) {
      if (
        yesterdayDataByStationId.totalPages == 0 ||
        !yesterdayDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 2) {
      if (
        dailyDataByStationId.totalPages == 0 ||
        !dailyDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 3) {
      if (
        weeklyDataByStationId.totalPages == 0 ||
        !weeklyDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 4) {
      if (
        tenDayDataByStationId.totalPages == 0 ||
        !tenDayDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 5) {
      if (
        monthlyDataByStationId.totalPages == 0 ||
        !monthlyDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 6) {
      if (
        chosenDateDataByStationId.totalPages == 0 ||
        !chosenDateDataByStationId.data?.length
      ) {
        return true;
      }
    } else {
      return true;
    }
  };

  const isEmptyDataElectricalEnergy = () => {
    if (reportTableHeading.index == 0) {
      if (
        electricalEnergyTodayDataByStationId.totalPages == 0 ||
        !electricalEnergyTodayDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 1) {
      if (
        electricalEnergyYesterdayDataByStationId.totalPages == 0 ||
        !electricalEnergyYesterdayDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 2) {
      if (
        electricalEnergyDailyDataByStationId.totalPages == 0 ||
        !electricalEnergyDailyDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 3) {
      if (
        electricalEnergyWeeklyDataByStationId.totalPages == 0 ||
        !electricalEnergyWeeklyDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 4) {
      if (
        electricalEnergyTenDayDataByStationId.totalPages == 0 ||
        !electricalEnergyTenDayDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 5) {
      if (
        electricalEnergyMonthlyDataByStationId.totalPages == 0 ||
        !electricalEnergyMonthlyDataByStationId.data?.length
      ) {
        return true;
      }
    } else if (reportTableHeading.index == 6) {
      if (
        electricalEnergyChosenDateDataByStationId.totalPages == 0 ||
        !electricalEnergyChosenDateDataByStationId.data?.length
      ) {
        return true;
      }
    } else {
      return true;
    }
  };

  const findElectricalEnergySelectValue = (key) => {
    if (key == 0) {
      return "voltage1";
    } else if (key == 1) {
      return "current1";
    } else if (key == 2) {
      return "voltage2";
    } else if (key == 3) {
      return "current2";
    } else if (key == 4) {
      return "voltage3";
    } else if (key == 5) {
      return "current3";
    } else if (key == 6) {
      return "powerActive";
    } else if (key == 7) {
      return "powerReactive";
    } else if (key == 8) {
      return "energyActive";
    } else if (key == 9) {
      return "energyReactive";
    }
  };

  const findSortTypeDateForLineChartAggregateName = () => {
    if (reportTableHeading.index == 0) {
      return todayDataByStationId;
    } else if (reportTableHeading.index == 1) {
      return yesterdayDataByStationId;
    } else if (reportTableHeading.index == 2) {
      return dailyDataByStationId;
    } else if (reportTableHeading.index == 3) {
      return weeklyDataByStationId;
    } else if (reportTableHeading.index == 4) {
      return tenDayDataByStationId;
    } else if (reportTableHeading.index == 5) {
      return monthlyDataByStationId;
    } else if (reportTableHeading.index == 6) {
      return chosenDateDataByStationId;
    }
  };

  const findSortTypeDateForLineChartElectricalEnergyName = () => {
    if (reportTableHeading.index == 0) {
      return electricalEnergyTodayDataByStationId;
    } else if (reportTableHeading.index == 1) {
      return electricalEnergyYesterdayDataByStationId;
    } else if (reportTableHeading.index == 2) {
      return electricalEnergyDailyDataByStationId;
    } else if (reportTableHeading.index == 3) {
      return electricalEnergyWeeklyDataByStationId;
    } else if (reportTableHeading.index == 4) {
      return electricalEnergyTenDayDataByStationId;
    } else if (reportTableHeading.index == 5) {
      return electricalEnergyMonthlyDataByStationId;
    } else if (reportTableHeading.index == 6) {
      return electricalEnergyChosenDateDataByStationId;
    }
  };

  const findAggregateDataByAggregateId = useCallback(
    (key) => {
      const lang = i18n.language;

      const aggregateIdForLineChart =
        allStations[selectDataTypeForStation]?.aggregate[key]?.id;

      switch (selectDataType) {
        case 0:
          dispatch(
            getTodayAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              pageData.perPage
            )
          );
          break;
        case 1:
          dispatch(
            getYesterdayAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              pageData.perPage
            )
          );
          break;
        case 2:
          dispatch(
            getDailyAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24,
              daylyDate.month() + 1,
              daylyDate.year()
            )
          );
          break;
        case 3:
          dispatch(
            getWeeklyAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              daylyDate.month() + 1,
              daylyDate.year()
            )
          );
          break;
        case 4:
          dispatch(
            getTenDayAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24,
              daylyDate.year()
            )
          );
          break;
        case 5:
          dispatch(
            getMonthlyAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24,
              daylyDate.year()
            )
          );
          break;
        case 6:
          dispatch(
            getSelectDateAggregateIDData(
              aggregateIdForLineChart,
              accessToken,
              lang,
              pageData.page,
              24,
              dateForChosenDate
            )
          );
          break;
        default:
          break;
      }
    },
    [i18n.language, selectDataTypeForStation, selectDataType, daylyDate]
  );

  const findElectricalEnergyDataByAggregateId = useCallback(
    (key) => {
      const lang = i18n.language;

      const electricalEnergyIdForLineChart =
        allStations[selectDataTypeForStation]?.electricalEnergy[key]?.id;

      switch (selectDataType) {
        case 0:
          dispatch(
            findTodayDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage
            )
          );
          break;
        case 1:
          dispatch(
            findYesterdayDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              pageDataForElectricalEnergy.perPage
            )
          );
          break;
        case 2:
          dispatch(
            findDailyDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              daylyDate.month() + 1,
              daylyDate.year()
            )
          );
          break;
        case 3:
          dispatch(
            findWeeklyDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              daylyDate.month() + 1,
              daylyDate.year()
            )
          );
          break;
        case 4:
          dispatch(
            findTenDayDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              daylyDate.year()
            )
          );
          break;
        case 5:
          dispatch(
            findMonthlyDataElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              daylyDate.year()
            )
          );
        case 6:
          dispatch(
            findSelectDateElectricityId(
              electricalEnergyIdForLineChart,
              accessToken,
              lang,
              pageDataForElectricalEnergy.page,
              24,
              dateForChosenDate
            )
          );
          break;
        default:
          break;
      }
    },
    [i18n.language, selectDataTypeForStation, selectDataType, daylyDate]
  );

  const dateFormat = "YYYY-MM";
  const lastDateOfMonth = moment()
    .endOf("month")
    .format("YYYY-MM-DD")
    .split("-")[2];

  const valueMonth = [];

  for (let item = 1; item <= lastDateOfMonth; item++) {
    valueMonth.push(String(item).length == 1 ? `0${item}` : item);
  }

  const onChangeDailyData = (date) => {
    if (date) {
      setDaylyDate(date);
    } else {
      setDaylyDate(dayjs());
    }
  };

  const tableRowTenDay = [
    {
      uz: "Yanvar",
      ru: "январь",
      en: "January",
      month: 1,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Fevral",
      ru: "февраль",
      en: "February",
      month: 2,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Mart",
      ru: "март",
      en: "March",
      month: 3,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Aprel",
      ru: "апрель",
      en: "April",
      month: 4,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "May",
      ru: "май",
      en: "May",
      month: 5,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Iyun",
      ru: "июнь",
      en: "June",
      month: 6,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Iyul",
      ru: "июль",
      en: "July",
      month: 7,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Avgust",
      ru: "август",
      en: "August",
      month: 8,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Sentabr",
      ru: "сентябрь",
      en: "September",
      month: 9,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Oktabr",
      ru: "октябрь",
      en: "October",
      month: 10,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Noyabr",
      ru: "ноябрь",
      en: "November",
      month: 11,
      tenDayNumbers: [1, 2, 3],
    },
    {
      uz: "Dekabr",
      ru: "декабрь",
      en: "December",
      month: 12,
      tenDayNumbers: [1, 2, 3],
    },
  ];

  const onChangeDateRange = (date) => {
    if (date) {
      setDateRange(date);
    } else {
      setDateRange(dayjs());
    }
  };

  const findTotalPages = () => {
    if (reportTableHeading.index == 0) {
      return todayDataByStationId;
    } else if (reportTableHeading.index == 1) {
      return yesterdayDataByStationId;
    } else if (reportTableHeading.index == 2) {
      return dailyDataByStationId;
    } else if (reportTableHeading.index == 3) {
      return weeklyDataByStationId;
    } else if (reportTableHeading.index == 4) {
      return tenDayDataByStationId;
    } else if (reportTableHeading.index == 5) {
      return monthlyDataByStationId;
    } else if (reportTableHeading.index == 6) {
      return chosenDateDataByStationId;
    } else if (reportTableHeading.index == 7) {
      return dateRangeDataByStationId;
    }
  };

  const findTotalPagesForElectricalEnergy = () => {
    if (reportTableHeading.index == 0) {
      return electricalEnergyTodayDataByStationId;
    } else if (reportTableHeading.index == 1) {
      return electricalEnergyYesterdayDataByStationId;
    } else if (reportTableHeading.index == 2) {
      return electricalEnergyDailyDataByStationId;
    } else if (reportTableHeading.index == 3) {
      return electricalEnergyWeeklyDataByStationId;
    } else if (reportTableHeading.index == 4) {
      return electricalEnergyTenDayDataByStationId;
    } else if (reportTableHeading.index == 5) {
      return electricalEnergyMonthlyDataByStationId;
    } else if (reportTableHeading.index == 6) {
      return electricalEnergyChosenDateDataByStationId;
    } else if (reportTableHeading.index == 7) {
      return "electricalEnergyChosenDateDataByStationId";
    }
  };

  const returnWeekCount = () =>{
    const weeksData = weeklyDataByStationId.data[0]?.aggregateData
    const resultWeeksForTable = []
    weeksData.forEach(e => {
      if(!resultWeeksForTable.includes(e.week)){
        resultWeeksForTable.push(e.week)
      }
    })

    return resultWeeksForTable.sort()
  }

  const returnWeekCountForElectricalEnergy = () =>{
    const weeksData = electricalEnergyWeeklyDataByStationId.data[0]?.electricalEnergyData
    const resultWeeksForTable = []
    weeksData.forEach(e => {
      if(!resultWeeksForTable.includes(e.week)){
        resultWeeksForTable.push(e.week)
      }
    })

    return resultWeeksForTable.sort()
  }

  const columnsStationsForModalTable = useMemo(
    () => [
      {
        title: t("stationsPageData.table1Data"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("stationsPageData.table2Data"),
        dataIndex: "region",
        key: "region",
        align: "center",
      },
      {
        title: t("stationsPageData.table3Data"),
        dataIndex: "district",
        key: "district",
        align: "center",
      },
      {
        title: t("stationsPageData.table4Data"),
        dataIndex: "organization",
        key: "organization",
        align: "center",
      },
      {
        title: t("stationsPageData.table5Data"),
        dataIndex: "devicePhoneNum",
        key: "devicePhoneNum",
        align: "center",
      },
      {
        title: t("stationsPageData.table8Data"),
        dataIndex: "status",
        key: "haveElectricalEnergy",
        align: "center",
        render: (_, key) => (
          <span
            className={
              key.status ? "active_indicator" : "not_active_indicator"
            }>
            {key.status
              ? t("dataPagesInformation.active_indicator")
              : t("dataPagesInformation.not_active_indicator")}
          </span>
        ),
        width: 120,
      }
    ],
    [t, accessToken]
  );

  const handlePaginationChangeForModal = (page, size) => {
      setPageDataStationsForModal({
        page: page,
        perPage: size
      })
  };
  if ( loading || allStations.length == 0)
    return (
      <section className="data_main_sections">
        <Loading />
      </section>
  );

  return (
    <section className="reports">
      {/* MODAL FOR STATIONS */}
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        className="modalForAllStations"
      >
        <Table
        scroll={{y: "65vh" }}
        columns={columnsStationsForModalTable}
        dataSource={allStationsForModal}
         pagination={{
          current: pageDataStationsForModal.page,
          pageSize: pageDataStationsForModal.perPage,
          total: allStationsForModal.length,
          onChange: handlePaginationChangeForModal,
          style: {
            padding: "0 0.75rem"
          }
        }} />
      </Modal>
      <div className="reports_statistics_wrapper">
        <div className="reports_sort">
          <h2>Stansiya hisobotlarini izlash</h2>

          <div className="reports_sort_select_wrapper">
            <form onSubmit={findStationBySort}>
              <Select
                key={"selects_name"}
                size="large"
                style={{
                  minWidth: 300,
                }}

                value={selectDataTypeForStation}
                className="reports_sort_select"
                options={allStations.map((item, index) => ({
                  value: index,
                  label: item.name,
                }))}
                onChange={(key, option) => setSelectDataTypeForStation(key)}
              />

              <Select
                key={"selects_names"}
                size="large"
                style={{
                  minWidth: 300,
                }}
                value={selectDataType}
                className="reports_sort_select reports_sort_select_day"
                options={t("dataPagesInformation.selectButtonNames", {
                  returnObjects: true,
                }).map((item, index) => ({
                  value: index,
                  label: item.title,
                }))}
                onChange={(key, option) => {
                  setSelectDataType(key);
                  setDaylyDate(dayjs());
                  setDateRange([dayjs(), dayjs()]);
                }}
              />

              {selectDataType == 2 ? (
                <>
                  <DatePicker
                    picker="month"
                    onChange={onChangeDailyData}
                    format={dateFormat}
                    value={daylyDate}
                  />
                </>
              ) :
              selectDataType == 3 ? (
                <>
                  <DatePicker
                    picker="weekly"
                    onChange={onChangeDailyData}
                    format={dateFormat}
                    value={daylyDate}
                  />
                </>
              )
              : selectDataType == 4 ? (
                <DatePicker
                  picker="year"
                  onChange={onChangeDailyData}
                  format="YYYY"
                  value={daylyDate}
                  defaultValue={daylyDate}
                />
              ) : selectDataType == 5 ? (
                <DatePicker
                  picker="year"
                  onChange={onChangeDailyData}
                  format="YYYY"
                  value={daylyDate}
                  defaultValue={daylyDate}
                />
              ) : selectDataType == 6 ? (
                <DatePicker
                  onChange={onChangeDailyData}
                  format="YYYY-MM-DD"
                  value={daylyDate}
                  defaultValue={daylyDate}
                />
              ) : selectDataType == 7 ? (
                <RangePicker
                  onChange={onChangeDateRange}
                  format="YYYY-MM-DD"
                  value={dateRange}
                  defaultValue={dateRange}
                />
              ) : (
                ""
              )}
              <button
                type="submit"
                className="reports_sort_select_wrapper_search-btn"
                style={{
                  marginLeft: "15px",
                }}
              >
                Qidirish
              </button>
            </form>
          </div>
        </div>

        {isEmptyData() ? (
          ""
        ) : (
          <>
            <h2>Barcha stansiyalarning holati</h2>
            <ul className="reports_statistics_wrapper_list">
              <li
                className="reports_statistics_wrapper_item cursor_pointer"
                style={{
                  background: colors.layoutBackground,
                  color: colors.text,
                }}
                onClick={() => {
                  setOpen(true)
                  findAllStationByActiveOrNotActive(0)
                }}
              >
                <div className="reports_statistics_wrapper_item_heading">
                  <div>
                    <p className="reports_statistics_wrapper_item_desc">
                      {role == "674877fbf0a8ec5c59065cb6" ? statisticDataForAdmin.totalStations : statisticDataForAdmin.countStations}
                    </p>
                    <p className="reports_statistics_wrapper_item_desc reports_statistics_wrapper_item_desc_extra_name">
                      {
                        t("dashboardPageData.cardData", { returnObjects: true })[0]
                          .status
                      }
                    </p>
                  </div>

                  <AppstoreOutlined
                    style={{
                        fontSize: "40px",
                        color: "#3652AD"
                    }}
                  />
                </div>
                <span className="reports_statistics_wrapper_item_span">
                  100%
                </span>
              </li>

              <li
                className="reports_statistics_wrapper_item reports_statistics_wrapper_item_active cursor_pointer"
                style={{
                  background: colors.layoutBackground,
                  color: colors.text,
                }}
                onClick={() => {
                  setOpen(true)
                  findAllStationByActiveOrNotActive(1)
                }}
              >
                <div className="reports_statistics_wrapper_item_heading">
                  <div>
                    <p className="reports_statistics_wrapper_item_desc">
                      {role == "674877fbf0a8ec5c59065cb6" ? statisticDataForAdmin.totalActiveStations : statisticDataForAdmin.countActiveStations}
                    </p>
                    <p className="reports_statistics_wrapper_item_desc reports_statistics_wrapper_item_desc_extra_name">
                      {
                        t("dashboardPageData.cardData", { returnObjects: true })[1]
                          .status
                      }
                    </p>
                  </div>

                  <CheckCircleOutlined
                    style={{
                        fontSize: "40px",
                        color: "limegreen",
                    }}
                  />
                </div>

                <span className="reports_statistics_wrapper_item_span" style={{color: "limegreen"}}>
                  {role == "674877fbf0a8ec5c59065cb6" ? (
                    (statisticDataForAdmin.totalActiveStations * 100) /
                    statisticDataForAdmin.totalStations
                  ).toFixed() : (
                    (statisticDataForAdmin.countActiveStations * 100) /
                    statisticDataForAdmin.countStations
                  ).toFixed()}
                  %
                </span>
              </li>

              <li
                className="reports_statistics_wrapper_item reports_statistics_wrapper_item_not_active cursor_pointer"
                style={{
                  background: colors.layoutBackground,
                  color: colors.text,
                }}
                onClick={() => {
                  setOpen(true)
                  findAllStationByActiveOrNotActive(2)
                }}
              >
                <div className="reports_statistics_wrapper_item_heading">
                  <div>
                    <p className="reports_statistics_wrapper_item_desc">
                      {role == "674877fbf0a8ec5c59065cb6" ? statisticDataForAdmin.totalInactiveStations : statisticDataForAdmin.countInactiveStations}
                    </p>
                    <p className="reports_statistics_wrapper_item_desc reports_statistics_wrapper_item_desc_extra_name">
                      {
                        t("dashboardPageData.cardData", { returnObjects: true })[2]
                          .status
                      }
                    </p>
                  </div>

                  <ExclamationCircleOutlined
                      style={{
                          fontSize: "40px",
                          color: "red"
                      }}
                  />
                </div>

                <span className="reports_statistics_wrapper_item_span" style={{color: "red"}}>
                  {role == "674877fbf0a8ec5c59065cb6" ? (
                    (statisticDataForAdmin.totalInactiveStations * 100) /
                    statisticDataForAdmin.totalStations
                  ).toFixed() : ((statisticDataForAdmin.countInactiveStations * 100) /
                  statisticDataForAdmin.countStations
                ).toFixed()}
                  %
                </span>
              </li>
            </ul>
          </>
        )}

        <div
          className="reports_table"
          style={{
            background: colors.layoutBackground,
            color: colors.text,
          }}
        >
        {loading ? (
            <BeatLoader
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "33vh",
              }}
              size={25}
              color={"#3652AD"}
            />
          ) : isEmptyData() ? (
            ""
          ) : (
            <>
            <div className="reports_table_station_total_information">
              <div className="reports_table_heading_righthand_wrapper">
                <h2 className="reports_table_heading" >
                  <span className="reports_table_heading_span" style={{textTransform: "uppercase"}}>
                    {stationNameTotalInformation}{" "}
                  </span>
                  stansiya umumiy ma'lumotlari
                </h2>

                <div className="reports_table_heading_righthand_wrapper">
                    <img
                      className="reports_table_heading_righthand_xls_image cursor_pointer"
                      src={xlsImage}
                      alt="xlsImage"
                      width={40}
                      height={38}
                    />
                    <img
                    className="cursor_pointer"
                      src={pdfImage}
                      alt="xlsImage"
                      width={30}
                      height={37}
                    />
                </div>
              </div>

              <div className="reports_table_station_total_information_table_wrapper">
                <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{
                    maxWidth: "1000px",
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <thead>
                    <tr>
                        {
                          columnsTotalStationInformation.map((e, i) => {
                            return(
                              <th
                                style={{
                                      fontSize: "15px",
                                }}
                                key={i}
                              >
                              {e.title}
                            </th>
                            )
                          })
                        }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      stationAllDataByStationId.map((e, i) => {
                        return (
                          <tr key={i}>
                        <td
                          style={{
                          fontSize: "15px",
                          textAlign: "center",
                          }}
                        >
                          {e.date}
                        </td>
                        <td
                          style={{
                          fontSize: "15px",
                          textAlign: "center",
                          }}
                        >
                          {e.volume}
                        </td>
                        <td
                          style={{
                          fontSize: "15px",
                          textAlign: "center",
                          }}
                        >
                          {e.energyActive}
                        </td>
                        <td
                          style={{
                          fontSize: "15px",
                          textAlign: "center",
                          }}
                        >
                          19
                        </td>
                    </tr>
                        )
                      })
                    }
                  </tbody>
              </table>
              </div>
            </div>

          <div className="reports_table_station_total_aggregate_information">
            <div className="reports_table_heading_righthand_wrapper">
              <h2 className="reports_table_heading" >
                <span className="reports_table_heading_span" style={{textTransform: "uppercase"}}>
                  {stationNameTotalInformation}{" "}
                </span>
                stansiya agrigatlarining umumiy ma'lumotlari
              </h2>

              <div className="reports_table_heading_righthand_wrapper">
                      <img
                        className="reports_table_heading_righthand_xls_image cursor_pointer"
                        src={xlsImage}
                        alt="xlsImage"
                        width={40}
                        height={38}
                      />
                      <img
                    className="cursor_pointer"
                        src={pdfImage}
                        alt="xlsImage"
                        width={30}
                        height={37}
                      />
              </div>
            </div>

            <div className="reports_table_station_total_information_table_wrapper">
              <table
                border="1"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  maxWidth: "1000px",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                      {
                        columnsTotalAggregateInformation.map((e, i) => {
                          return(
                            <th
                              style={{
                                    fontSize: "15px",
                              }}
                              key={i}
                            >
                            {e.title}
                          </th>
                          )
                        })
                      }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        Agregat 4
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        Agregat 2
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        Agregat 3
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        Agregat 1
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                  </tr>
                </tbody>
            </table>
            </div>

            {/* LINE CHART */}
          <div
            className="reports_aggrigate_line_chart_wrapper"
            style={{
              background: colors.layoutBackground,
              color: colors.text,
            }}
          >
            {loading ? (
              <BeatLoader
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "33vh",
                }}
                size={25}
                color={"#3652AD"}
              />
            ) : isEmptyData() ? (
              ""
            ) : (
              <>
                <div className="reports_aggrigate_line_chart_heading_wrapper">
                  <div className="reports_aggrigate_line_chart_righthand_wrapper">
                    <Select
                      size="large"
                      style={{
                        minWidth: 200,
                      }}
                      value={selectValueDataForLineChart}
                      options={findSortTypeDateForLineChartAggregateName()?.data?.map(
                        (item, index) => ({
                          value: index,
                          label: item.aggregate.name,
                        })
                      )}
                      onChange={(key, option) => {
                        setSelectValueDataForLineChart(key);
                        findAggregateDataByAggregateId(key);
                      }}
                    />

                    <img
                      className="reports_table_heading_righthand_xls_image cursor_pointer"
                      src={xlsImage}
                      alt="xlsImage"
                      width={40}
                      height={38}
                    />
                    <img
                      className="cursor_pointer"
                      src={pdfImage}
                      alt="xlsImage"
                      width={30}
                      height={37}
                    />
                  </div>
                </div>

                {pumpLineChartData?.date?.length > 0 ? (
                  <SolarEmploymentChart
                    data={pumpLineChartData}
                    theme={colors}
                    lineStatus={true}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>

          </div>

          <div className="reports_table_station_total_aggregate_information">
            <div className="reports_table_heading_righthand_wrapper">
              <h2 className="reports_table_heading" >
                <span className="reports_table_heading_span" style={{textTransform: "uppercase"}}>
                  {stationNameTotalInformation}{" "}
                </span>
                stansiya elektr energiyalarining umumiy ma'lumotlari
              </h2>

              <div className="reports_table_heading_righthand_wrapper">
                <img
                  className="reports_table_heading_righthand_xls_image cursor_pointer"
                  src={xlsImage}
                  alt="xlsImage"
                  width={40}
                  height={38}
                />
                <img
                  className="cursor_pointer"
                  src={pdfImage}
                  alt="xlsImage"
                  width={30}
                  height={37}
                />
              </div>
            </div>

            <div className="reports_table_station_total_information_table_wrapper">
              <table
                border="1"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  maxWidth: "1000px",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                      {
                        columnsTotalElectricalEnergyInformation.map((e, i) => {
                          return(
                            <th
                              style={{
                                    fontSize: "15px",
                              }}
                              key={i}
                            >
                            {e.title}
                          </th>
                          )
                        })
                      }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        Elektr hisoblagich
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        Elektr hisoblagich
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        Elektr hisoblagich
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        Elektr hisoblagich
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                  </tr>
                </tbody>
            </table>

            {/* LINE CHART */}
            <div
              className="reports_aggrigate_line_chart_wrapper"
              style={{
                background: colors.layoutBackground,
                color: colors.text,
              }}
            >
              {loading ? (
                <BeatLoader
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "33vh",
                  }}
                  size={25}
                  color={"#3652AD"}
                />
              ) : isEmptyData() ? (
                ""
              ) : (
                <>
                  <div className="reports_aggrigate_line_chart_heading_wrapper">
                    <div className="reports_aggrigate_line_chart_righthand_wrapper">
                      <Select
                        size="large"
                        style={{
                          minWidth: 200,
                        }}
                        value={selectValueDataForLineChart}
                        options={findSortTypeDateForLineChartAggregateName()?.data?.map(
                          (item, index) => ({
                            value: index,
                            label: item.aggregate.name,
                          })
                        )}
                        onChange={(key, option) => {
                          setSelectValueDataForLineChart(key);
                          findAggregateDataByAggregateId(key);
                        }}
                      />

                      <img
                        className="reports_table_heading_righthand_xls_image cursor_pointer"
                        src={xlsImage}
                        alt="xlsImage"
                        width={40}
                        height={38}
                      />
                      <img
                        className="cursor_pointer"
                        src={pdfImage}
                        alt="xlsImage"
                        width={30}
                        height={37}
                      />
                    </div>
                  </div>

                  {pumpLineChartData?.date?.length > 0 ? (
                    <SolarEmploymentChart
                      data={pumpLineChartData}
                      theme={colors}
                      lineStatus={true}
                    />
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            </div>
          </div>

          <div className="reports_table_station_total_aggregate_information">
           <div className="reports_table_heading_righthand_wrapper">
            <h2 className="reports_table_heading" >
                <span className="reports_table_heading_span" style={{textTransform: "uppercase"}}>
                Agregat 4
                </span>
                <span style={{textTransform: 'lowercase'}}>
                {" "}{reportTableHeading.title}
                </span>
              </h2>

              <div className="reports_table_heading_righthand_wrapper">
                <img
                  className="reports_table_heading_righthand_xls_image cursor_pointer"
                  src={xlsImage}
                  alt="xlsImage"
                  width={40}
                  height={38}
                />
                <img
                className="cursor_pointer"
                  src={pdfImage}
                  alt="xlsImage"
                  width={30}
                  height={37}
                />
              </div>
           </div>

            <div className="reports_table_station_total_information_table_wrapper">
            <table
                border="1"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  maxWidth: "1000px",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                      {
                        columnsTotalOneAggregateInformation.map((e, i) => {
                          return(
                            <th
                              style={{
                                    fontSize: "15px",
                              }}
                              key={i}
                            >
                            {e.title}
                          </th>
                          )
                        })
                      }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                </tbody>
            </table>

            {/* LINE CHART */}
            <div
              className="reports_aggrigate_line_chart_wrapper"
              style={{
                background: colors.layoutBackground,
                color: colors.text,
              }}
            >
              {loading ? (
                <BeatLoader
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "33vh",
                  }}
                  size={25}
                  color={"#3652AD"}
                />
              ) : isEmptyData() ? (
                ""
              ) : (
                <>
                  <div className="reports_aggrigate_line_chart_heading_wrapper">
                    <div className="reports_aggrigate_line_chart_righthand_wrapper">
                      <img
                        className="reports_table_heading_righthand_xls_image cursor_pointer"
                        src={xlsImage}
                        alt="xlsImage"
                        width={40}
                        height={38}
                      />
                      <img
                        className="cursor_pointer"
                        src={pdfImage}
                        alt="xlsImage"
                        width={30}
                        height={37}
                      />
                    </div>
                  </div>

                  {pumpLineChartData?.date?.length > 0 ? (
                    <SolarEmploymentChart
                      data={pumpLineChartData}
                      theme={colors}
                      lineStatus={true}
                    />
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            </div>
          </div>

          <div className="reports_table_station_total_aggregate_information">
            <div className="reports_table_heading_righthand_wrapper">
              <h2 className="reports_table_heading" >
                <span className="reports_table_heading_span" style={{textTransform: "uppercase"}}>
                Agregat 1
                </span>
                <span style={{textTransform: 'lowercase'}}>
                {" "}{reportTableHeading.title}
                </span>
              </h2>

              <div className="reports_table_heading_righthand_wrapper">
                <img
                  className="reports_table_heading_righthand_xls_image cursor_pointer"
                  src={xlsImage}
                  alt="xlsImage"
                  width={40}
                  height={38}
                />
                <img
                className="cursor_pointer"
                  src={pdfImage}
                  alt="xlsImage"
                  width={30}
                  height={37}
                />
              </div>
            </div>

            <div className="reports_table_station_total_information_table_wrapper">
            <table
                border="1"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  maxWidth: "1000px",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                      {
                        columnsTotalOneAggregateInformation.map((e, i) => {
                          return(
                            <th
                              style={{
                                    fontSize: "15px",
                              }}
                              key={i}
                            >
                            {e.title}
                          </th>
                          )
                        })
                      }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                </tbody>
            </table>

            {/* LINE CHART */}
            <div
              className="reports_aggrigate_line_chart_wrapper"
              style={{
                background: colors.layoutBackground,
                color: colors.text,
              }}
            >
              {loading ? (
                <BeatLoader
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "33vh",
                  }}
                  size={25}
                  color={"#3652AD"}
                />
              ) : isEmptyData() ? (
                ""
              ) : (
                <>
                  <div className="reports_aggrigate_line_chart_heading_wrapper">
                    <div className="reports_aggrigate_line_chart_righthand_wrapper">
                      <img
                        className="reports_table_heading_righthand_xls_image cursor_pointer"
                        src={xlsImage}
                        alt="xlsImage"
                        width={40}
                        height={38}
                      />
                      <img
                        className="cursor_pointer"
                        src={pdfImage}
                        alt="xlsImage"
                        width={30}
                        height={37}
                      />
                    </div>
                  </div>

                  {pumpLineChartData?.date?.length > 0 ? (
                    <SolarEmploymentChart
                      data={pumpLineChartData}
                      theme={colors}
                      lineStatus={true}
                    />
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            </div>
          </div>

          <div className="reports_table_station_total_aggregate_information">
            <div className="reports_table_heading_righthand_wrapper">
              <h2 className="reports_table_heading" >
                <span className="reports_table_heading_righthand_wrapper"name="reports_table_heading_span" style={{textTransform: "uppercase"}}>
                Elektr hisoblagich
                </span>
                <span style={{textTransform: 'lowercase'}}>
                {" "}{reportTableHeading.title}
                </span>
              </h2>

              <div className="reports_table_heading_righthand_wrapper">
                <img
                  className="reports_table_heading_righthand_xls_image cursor_pointer"
                  src={xlsImage}
                  alt="xlsImage"
                  width={40}
                  height={38}
                />
                <img
                className="cursor_pointer"
                  src={pdfImage}
                  alt="xlsImage"
                  width={30}
                  height={37}
                />
              </div>
            </div>

            <div className="reports_table_station_total_information_table_wrapper">
            <table
                border="1"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  maxWidth: "1000px",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                      {
                        columnsTotalOneElectricalEnergyInformation.map((e, i) => {
                          return(
                            <th
                              style={{
                                fontSize: "15px",
                              }}
                              key={i}
                            >
                            {e.title}
                          </th>
                          )
                        })
                      }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                  <tr>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        2025-01-24
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        42
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        12
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                      <td
                        style={{
                        fontSize: "15px",
                        textAlign: "center",
                        }}
                      >
                        19
                      </td>
                  </tr>
                </tbody>
            </table>

            {/* LINE CHART */}
            <div
              className="reports_aggrigate_line_chart_wrapper"
              style={{
                background: colors.layoutBackground,
                color: colors.text,
              }}
            >
              {loading ? (
                <BeatLoader
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "33vh",
                  }}
                  size={25}
                  color={"#3652AD"}
                />
              ) : isEmptyData() ? (
                ""
              ) : (
                <>
                  <div className="reports_aggrigate_line_chart_heading_wrapper">
                    <div className="reports_aggrigate_line_chart_righthand_wrapper">
                      <img
                        className="reports_table_heading_righthand_xls_image cursor_pointer"
                        src={xlsImage}
                        alt="xlsImage"
                        width={40}
                        height={38}
                      />
                      <img
                        className="cursor_pointer"
                        src={pdfImage}
                        alt="xlsImage"
                        width={30}
                        height={37}
                      />
                    </div>
                  </div>

                  {pumpLineChartData?.date?.length > 0 ? (
                    <SolarEmploymentChart
                      data={pumpLineChartData}
                      theme={colors}
                      lineStatus={true}
                    />
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            </div>
          </div>
            </>
          )}

          {loading ? (
            <BeatLoader
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "33vh",
              }}
              size={25}
              color={"#3652AD"}
            />
          ) : isEmptyData() ? (
            <EmptyCard />
          ) : (
            <>
              <div className="reports_table_heading_wrapper">
                <h2 className="reports_table_heading">
                  Stansiya agrigatlarining{" "}
                  <span className="reports_table_heading_span">
                    {reportTableHeading.title}
                  </span>
                </h2>

                <div className="reports_table_heading_righthand_wrapper">
                  <Select
                    size="large"
                    style={{
                      minWidth: 200,
                    }}
                    value={selectValueData}
                    className=""
                    options={columnsUser.map((item, index) => ({
                      value: index,
                      label: item.title,
                    }))}
                    onChange={(key, option) => {
                      setSelectValueData(key);
                      setSelectValueForSearch(
                        key == 0 ? "volume" : key == 1 ? "velocity" : "flow"
                      );
                    }}
                  />

                  <img
                    className="reports_table_heading_righthand_xls_image cursor_pointer"
                    src={xlsImage}
                    alt="xlsImage"
                    width={40}
                    height={38}
                  />
                  <img
                    className="cursor_pointer"
                    src={pdfImage}
                    alt="xlsImage"
                    width={30}
                    height={37}
                  />
                </div>
              </div>

              {reportTableHeading.index == 0 ? (
                //! TODAY REPORT
                <>
                  <table
                    border="1"
                    cellPadding="0"
                    cellSpacing="0"
                    style={{
                      maxWidth: "1000px",
                      width: "100%",
                      margin: "auto",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          rowSpan="2"
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          T/R
                        </th>
                        <th
                          rowSpan="2"
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          Stansiya nomi
                        </th>
                        <th
                          colSpan="24"
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          {getTableDate().toISOString().substring(0, 10)}
                        </th>
                      </tr>
                      <tr>
                        {valueTodayTable.map((r, l) => {
                          return (
                            <th
                              key={l}
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              {r}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {todayDataByStationId.data?.map((item, index) => {
                        return (
                            <tr className="tr0" key={index}>
                              <td
                                style={{
                                  fontSize: "15px",
                                  textAlign: "center",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td>
                                <div
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "15px",
                                    }}
                                  >
                                    {item.aggregate.name}
                                  </span>
                                </div>
                              </td>
                              {valueTodayTable.map((d, w) => {
                                const existedValue = item.aggregateData?.find(
                                  (a) => a.date.split(" ")[1].split(":")[0] == d
                                );

                                if (existedValue) {
                                  return (
                                    <td
                                      key={w}
                                      style={{
                                        fontSize: "15px",
                                        textAlign: "center",
                                      }}
                                    >
                                      {Number(
                                        existedValue[selectValueForSearch]
                                      )}
                                    </td>
                                  );
                                } else {
                                  return (
                                    <td
                                      key={w}
                                      style={{
                                        fontSize: "15px",
                                        textAlign: "center",
                                      }}
                                    >
                                      -
                                    </td>
                                  );
                                }
                              })}
                            </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageData.page} total={findTotalPages().totalPages} onChange={(page, size) => setPageData({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 1 ? (
                //! YESTERDAY REPORT
                <>
                <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="24"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {getTableDate().toISOString().substring(0, 10)}
                      </th>
                    </tr>
                    <tr>
                      {valueTodayTable.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {yesterdayDataByStationId.data?.map((item, index) => {
                      return (
                        <tr className="tr0" key={index}>
                          <td
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            <div
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                {item.aggregate.name}
                              </span>
                            </div>
                          </td>
                          {valueTodayTable.map((d, w) => {
                            const existedValue = item.aggregateData?.find(
                              (a) => a.date.split(" ")[1].split(":")[0] == d
                            );

                            if (existedValue) {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  {Number(existedValue[selectValueForSearch])}
                                </td>
                              );
                            } else {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  -
                                </td>
                              );
                            }
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageData.page} total={findTotalPages().totalPages} onChange={(page, size) => setPageData({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 2 ? (
                //! DAILY REPORT
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan={lastDateOfMonth}
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {daylyDate.year()}-
                        {String(daylyDate.month() + 1).length == 1
                          ? `0${daylyDate.month() + 1}`
                          : daylyDate.month() + 1}
                      </th>
                    </tr>
                    <tr>
                      {valueMonth.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {dailyDataByStationId.data?.map((item, index) => {
                      return (
                        <tr className="tr0" key={index}>
                          <td
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            <div
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                {item.aggregate.name}
                              </span>
                            </div>
                          </td>
                          {valueMonth.map((d, w) => {
                            const existedValue = item.aggregateData?.find(
                              (a) => a.date.split("-")[2]?.split("T")[0] == d
                            );

                            if (existedValue) {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  {Number(
                                    existedValue[selectValueForSearch]
                                  ).toFixed(1)}
                                </td>
                              );
                            } else {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  -
                                </td>
                              );
                            }
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageData.page} total={findTotalPages().totalPages} onChange={(page, size) => setPageData({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 3 ? (
                //! WEEKLY REPORT
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan={lastDateOfMonth}
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {daylyDate.year()}-
                        {String(daylyDate.month() + 1).length == 1
                          ? `0${daylyDate.month() + 1}`
                          : daylyDate.month() + 1}
                      </th>
                    </tr>
                    <tr>
                      {returnWeekCount().map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {daylyDate.year()}-
                        {String(daylyDate.month() + 1).length == 1
                          ? `0${daylyDate.month() + 1}`
                          : daylyDate.month() + 1} {r}-hafta
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyDataByStationId.data?.map((item, index) => {
                      return (
                        <tr className="tr0" key={index}>
                          <td
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            <div
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                {item.aggregate.name}
                              </span>
                            </div>
                          </td>
                          {returnWeekCount().map((d, w) => {
                            const existedValue = item.aggregateData?.find(
                              (a) => a.week == d
                            );

                            if (existedValue) {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  {Number(
                                    existedValue[selectValueForSearch]
                                  ).toFixed(1)}
                                </td>
                              );
                            } else {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  -
                                </td>
                              );
                            }
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageData.page} total={findTotalPages().totalPages} onChange={(page, size) => setPageData({page: page, perPage: size})}/>
                </>
              )
              : reportTableHeading.index == 4 ? (
                //! TEN DAY REPORT
                <>
                <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1100px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="3"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="3"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="36"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {daylyDate.year()}
                      </th>
                    </tr>
                    <tr>
                      {tableRowTenDay.map((r, l) => {
                        return (
                          <th
                            key={l}
                            colSpan="3"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r[i18n.language]}
                          </th>
                        );
                      })}
                    </tr>
                    <tr>
                      {tableRowTenDay.map((r, l) => {
                        return (
                          <>
                            <th
                              key={1}
                              colSpan="1"
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              1
                            </th>
                            <th
                              key={2}
                              colSpan="1"
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              2
                            </th>
                            <th
                              key={3}
                              colSpan="1"
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              3
                            </th>
                          </>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tenDayDataByStationId.data?.map((item, index) => {
                      return (
                        <tr className="tr0" key={index}>
                          <td
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            <div
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                {item.aggregate.name}
                              </span>
                            </div>
                          </td>
                          {tableRowTenDay.map((d, w) => {
                            const existedMonthValue = item.aggregateData?.find(
                              (a) => a.month == d.month
                            );

                            if (existedMonthValue) {
                              let result = [];
                              for (let s of d.tenDayNumbers) {
                                const find = existedMonthValue.dataMonth.find(
                                  (m) => m.tenDayNumber == s
                                );
                                result.push(find == undefined ? "-" : find);
                              }
                              return result.map((t, k) => {
                                return (
                                  <td
                                    key={k}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {t != "-"
                                      ? Number(t[selectValueForSearch]).toFixed(
                                          1
                                        )
                                      : t}
                                  </td>
                                );
                              });
                            } else {
                              return d.tenDayNumbers.map((s, p) => {
                                return (
                                  <td
                                    key={p}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    -
                                  </td>
                                );
                              });
                            }
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageData.page} total={findTotalPages().totalPages} onChange={(page, size) => setPageData({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 5 ? (
                //! MONTHLY REPORT
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="24"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {daylyDate.year()}
                      </th>
                    </tr>
                    <tr>
                      {tableRowTenDay.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r[i18n.language]}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyDataByStationId.data?.map((item, index) => {
                      return (
                        <tr className="tr0" key={index}>
                          <td
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            <div
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                {item.aggregate.name}
                              </span>
                            </div>
                          </td>
                          {tableRowTenDay.map((d, w) => {
                            const existedValue = item.aggregateData.find(
                              (a) => a.month == w + 1
                            );
                            if (existedValue) {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  {Number(
                                    existedValue[selectValueForSearch]
                                  ).toFixed(1)}
                                </td>
                              );
                            } else {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  -
                                </td>
                              );
                            }
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageData.page} total={findTotalPages().totalPages} onChange={(page, size) => setPageData({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 6 ? (
                //! CHOSEN DATE REPORT
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="24"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {dateForChosenDate}
                      </th>
                    </tr>
                    <tr>
                      {valueTodayTable.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {chosenDateDataByStationId.data?.map((item, index) => {
                      return (
                        <tr className="tr0" key={index}>
                          <td
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            <div
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                {item.aggregate.name}
                              </span>
                            </div>
                          </td>
                          {valueTodayTable.map((d, w) => {
                            const existedValue = item.aggregateData?.find(
                              (a) => a.date.split(" ")[1].split(":")[0] == d
                            );

                            if (existedValue) {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  {Number(existedValue[selectValueForSearch])}
                                </td>
                              );
                            } else {
                              return (
                                <td
                                  key={w}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  -
                                </td>
                              );
                            }
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageData.page} total={findTotalPages().totalPages} onChange={(page, size) => setPageData({page: page, perPage: size})}/>
                </>
              ) : (
                ""
              )}
            </>
          )}
          {/* LINE CHART */}
          <div
            className="reports_aggrigate_line_chart_wrapper"
            style={{
              background: colors.layoutBackground,
              color: colors.text,
            }}
          >
            {loading ? (
              <BeatLoader
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "33vh",
                }}
                size={25}
                color={"#3652AD"}
              />
            ) : isEmptyData() ? (
              ""
            ) : (
              <>
                <div className="reports_aggrigate_line_chart_heading_wrapper">
                  <div className="reports_aggrigate_line_chart_righthand_wrapper">
                    <Select
                      size="large"
                      style={{
                        minWidth: 200,
                      }}
                      value={selectValueDataForLineChart}
                      options={findSortTypeDateForLineChartAggregateName()?.data?.map(
                        (item, index) => ({
                          value: index,
                          label: item.aggregate.name,
                        })
                      )}
                      onChange={(key, option) => {
                        setSelectValueDataForLineChart(key);
                        findAggregateDataByAggregateId(key);
                      }}
                    />

                    <img
                      className="reports_table_heading_righthand_xls_image cursor_pointer"
                      src={xlsImage}
                      alt="xlsImage"
                      width={40}
                      height={38}
                    />
                    <img
                      className="cursor_pointer"
                      src={pdfImage}
                      alt="xlsImage"
                      width={30}
                      height={37}
                    />
                  </div>
                </div>

                {pumpLineChartData?.date?.length > 0 ? (
                  <SolarEmploymentChart
                    data={pumpLineChartData}
                    theme={colors}
                    lineStatus={true}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>

          {loading ? (
            <BeatLoader
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "33vh",
              }}
              size={25}
              color={"#3652AD"}
            />
          ) : isEmptyDataElectricalEnergy() ? (
            " "
          ) : (
            <>
              <div className="reports_table_electrical_heading_wrapper">
                <h2>
                  Stansiya elektr energiyalarining{" "}
                  <span className="reports_table_heading_span">
                    {reportTableHeading.title}
                  </span>
                </h2>

                <div className="reports_table_heading_righthand_wrapper">
                  <Select
                    size="large"
                    style={{
                      minWidth: 200,
                    }}
                    value={selectValueDataElectricalEnergy}
                    options={columnsElectricalEnergy.map((item, index) => ({
                      value: index,
                      label: item.title,
                    }))}
                    onChange={(key, option) => {
                      setSelectValueDataElectricalEnergy(key);
                      setSelectValueElectricalEnergyForSearch(
                        findElectricalEnergySelectValue(key)
                      );
                    }}
                  />

                  <img
                    className="reports_table_heading_righthand_xls_image cursor_pointer"
                    src={xlsImage}
                    alt="xlsImage"
                    width={40}
                    height={38}
                  />
                  <img
                    className="cursor_pointer"
                    src={pdfImage}
                    alt="xlsImage"
                    width={30}
                    height={37}
                  />
                </div>
              </div>
              {reportTableHeading.index == 0 ? (
                //! TODAY REPORT ELECTRICAL ENERGY
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="24"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {getTableDate().toISOString().substring(0, 10)}
                      </th>
                    </tr>
                    <tr>
                      {valueTodayTable.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {electricalEnergyTodayDataByStationId.data?.map(
                      (item, index) => {
                        return (
                          <tr className="tr0" key={index}>
                            <td
                              style={{
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td>
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  {item.electricalEnergy.name}
                                </span>
                              </div>
                            </td>
                            {valueTodayTable.map((d, w) => {
                              const existedValue =
                                item.electricalEnergyData?.find(
                                  (a) => a.date.split(" ")[1].split(":")[0] == d
                                );

                              if (existedValue) {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {Number(
                                      existedValue[
                                        selectValueElectricalEnergyForSearch
                                      ]
                                    )}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    -
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageDataForElectricalEnergy.page} total={findTotalPagesForElectricalEnergy().totalPages} onChange={(page, size) => setPageDataForElectricalEnergy({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 1 ? (
                //! YESTERDAY REPORT ELECTRICAL ENERGY
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="24"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {getTableDate().toISOString().substring(0, 10)}
                      </th>
                    </tr>
                    <tr>
                      {valueTodayTable.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {electricalEnergyYesterdayDataByStationId.data?.map(
                      (item, index) => {
                        return (
                          <tr className="tr0" key={index}>
                            <td
                              style={{
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td>
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  {item.electricalEnergy.name}
                                </span>
                              </div>
                            </td>
                            {valueTodayTable.map((d, w) => {
                              const existedValue =
                                item.electricalEnergyData?.find(
                                  (a) => a.date.split(" ")[1].split(":")[0] == d
                                );

                              if (existedValue) {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {Number(
                                      existedValue[
                                        selectValueElectricalEnergyForSearch
                                      ]
                                    )}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    -
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageDataForElectricalEnergy.page} total={findTotalPagesForElectricalEnergy().totalPages} onChange={(page, size) => setPageDataForElectricalEnergy({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 2 ? (
                //! DAILY REPORT ELECTRICAL ENERGY
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan={lastDateOfMonth}
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {daylyDate.year()}-
                        {String(daylyDate.month() + 1).length == 1
                          ? `0${daylyDate.month() + 1}`
                          : daylyDate.month() + 1}
                      </th>
                    </tr>
                    <tr>
                      {valueMonth.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {electricalEnergyDailyDataByStationId.data?.map(
                      (item, index) => {
                        return (
                          <tr className="tr0" key={index}>
                            <td
                              style={{
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td>
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  {item.electricalEnergy?.name}
                                </span>
                              </div>
                            </td>
                            {valueMonth.map((d, w) => {
                              const existedValue =
                                item.electricalEnergyData?.find(
                                  (a) =>
                                    a.date.split("-")[2]?.split("T")[0] == d
                                );

                              if (existedValue) {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {Number(
                                      existedValue[
                                        selectValueElectricalEnergyForSearch
                                      ]
                                    ).toFixed(1)}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    -
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageDataForElectricalEnergy.page} total={findTotalPagesForElectricalEnergy().totalPages} onChange={(page, size) => setPageDataForElectricalEnergy({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 3 ? (
                //! WEEKLY REPORT ELECTRICAL ENERGY
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="24"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                         {daylyDate.year()}-
                        {String(daylyDate.month() + 1).length == 1
                          ? `0${daylyDate.month() + 1}`
                          : daylyDate.month() + 1}
                      </th>
                    </tr>
                    <tr>
                      {returnWeekCountForElectricalEnergy().map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                           {daylyDate.year()}-
                        {String(daylyDate.month() + 1).length == 1
                          ? `0${daylyDate.month() + 1}`
                          : daylyDate.month() + 1} {r}-hafta
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {electricalEnergyWeeklyDataByStationId.data?.map(
                      (item, index) => {
                        return (
                          <tr className="tr0" key={index}>
                            <td
                              style={{
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td>
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  {item.electricalEnergy.name}
                                </span>
                              </div>
                            </td>
                            {returnWeekCountForElectricalEnergy().map((d, w) => {
                              const existedValue =
                                item.electricalEnergyData?.find(
                                  (a) => a.week == d
                                );

                              if (existedValue) {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {Number(
                                      existedValue[
                                        selectValueElectricalEnergyForSearch
                                      ]
                                    ).toFixed(1)}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    -
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageDataForElectricalEnergy.page} total={findTotalPagesForElectricalEnergy().totalPages} onChange={(page, size) => setPageDataForElectricalEnergy({page: page, perPage: size})}/>
                </>
              )
              : reportTableHeading.index == 4 ? (
                //! TEN DAY REPORT ELECTRICAL ENERGY
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1100px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="3"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="3"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="36"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {daylyDate.year()}
                      </th>
                    </tr>
                    <tr>
                      {tableRowTenDay.map((r, l) => {
                        return (
                          <th
                            key={l}
                            colSpan="3"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r[[i18n.language]]}
                          </th>
                        );
                      })}
                    </tr>
                    <tr>
                      {tableRowTenDay.map((r, l) => {
                        return (
                          <>
                            <th
                              key={l}
                              colSpan="1"
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              1
                            </th>
                            <th
                              key={l}
                              colSpan="1"
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              2
                            </th>
                            <th
                              key={l}
                              colSpan="1"
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              3
                            </th>
                          </>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {electricalEnergyTenDayDataByStationId.data?.map(
                      (item, index) => {
                        return (
                          <tr className="tr0" key={index}>
                            <td
                              style={{
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td>
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  {item.electricalEnergy?.name}
                                </span>
                              </div>
                            </td>
                            {tableRowTenDay.map((d, w) => {
                              const existedMonthValue =
                                item.electricalEnergyData?.find(
                                  (a) => a.month == d.month
                                );

                              if (existedMonthValue) {
                                let result = [];
                                for (let s of d.tenDayNumbers) {
                                  const find = existedMonthValue.dataMonth.find(
                                    (m) => m.tenDayNumber == s
                                  );
                                  result.push(find == undefined ? "-" : find);
                                }
                                return result.map((t, k) => {
                                  return (
                                    <td
                                      key={k}
                                      style={{
                                        fontSize: "15px",
                                        textAlign: "center",
                                      }}
                                    >
                                      {t != "-"
                                        ? Number(
                                            t[
                                              selectValueElectricalEnergyForSearch
                                            ]
                                          ).toFixed(1)
                                        : t}
                                    </td>
                                  );
                                });
                              } else {
                                return d.tenDayNumbers.map((s, p) => {
                                  return (
                                    <td
                                      key={p}
                                      style={{
                                        fontSize: "15px",
                                        textAlign: "center",
                                      }}
                                    >
                                      -
                                    </td>
                                  );
                                });
                              }
                            })}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageDataForElectricalEnergy.page} total={findTotalPagesForElectricalEnergy().totalPages} onChange={(page, size) => setPageDataForElectricalEnergy({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 5 ? (
                //! MONTHLY REPORT ELECTRICAL ENERGY
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="24"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {daylyDate.year()}
                      </th>
                    </tr>
                    <tr>
                      {tableRowTenDay.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r[i18n.language]}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {electricalEnergyMonthlyDataByStationId.data?.map(
                      (item, index) => {
                        return (
                          <tr className="tr0" key={index}>
                            <td
                              style={{
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td>
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  {item.electricalEnergy.name}
                                </span>
                              </div>
                            </td>
                            {tableRowTenDay.map((d, w) => {
                              const existedValue =
                                item.electricalEnergyData.find(
                                  (a) => a.month == w + 1
                                );
                              if (existedValue) {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {Number(
                                      existedValue[
                                        selectValueElectricalEnergyForSearch
                                      ]
                                    ).toFixed(1)}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    -
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageDataForElectricalEnergy.page} total={findTotalPagesForElectricalEnergy().totalPages} onChange={(page, size) => setPageDataForElectricalEnergy({page: page, perPage: size})}/>
                </>
              ) : reportTableHeading.index == 6 ? (
                //! CHOSEN DATE REPORT ELECTRICAL ENERGY
                <>
                  <table
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        T/R
                      </th>
                      <th
                        rowSpan="2"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Stansiya nomi
                      </th>
                      <th
                        colSpan="24"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {dateForChosenDate}
                      </th>
                    </tr>
                    <tr>
                      {valueTodayTable.map((r, l) => {
                        return (
                          <th
                            key={l}
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {r}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {electricalEnergyChosenDateDataByStationId.data?.map(
                      (item, index) => {
                        return (
                          <tr className="tr0" key={index}>
                            <td
                              style={{
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td>
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  {item.electricalEnergy.name}
                                </span>
                              </div>
                            </td>
                            {valueTodayTable.map((d, w) => {
                              const existedValue =
                                item.electricalEnergyData?.find(
                                  (a) => a.date.split(" ")[1].split(":")[0] == d
                                );

                              if (existedValue) {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {Number(
                                      existedValue[
                                        selectValueElectricalEnergyForSearch
                                      ]
                                    )}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={w}
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "center",
                                    }}
                                  >
                                    -
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <Pagination style={{marginTop: "10px"}} align="center" defaultCurrent={pageDataForElectricalEnergy.page} total={findTotalPagesForElectricalEnergy().totalPages} onChange={(page, size) => setPageDataForElectricalEnergy({page: page, perPage: size})}/>
                </>
              ) : (
                ""
              )}
            </>
          )}

          {/* LINE CHART */}
          {loading ? (
            <BeatLoader
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "33vh",
              }}
              size={25}
              color={"#3652AD"}
            />
          ) : isEmptyDataElectricalEnergy() ? (
            ""
          ) : (
            <>
              <div className="reports_aggrigate_line_chart_heading_wrapper">
                {/* <h2>
                  Stansiya elektr energiyalarining{" "}
                  <span className="reports_table_heading_span">
                    {reportTableHeading.title}
                  </span>
                </h2> */}

                <div className="reports_aggrigate_line_chart_righthand_wrapper">
                  <Select
                    size="large"
                    style={{
                      minWidth: 200,
                    }}
                    value={selectValueElectricalEnergyDataForLineChart}
                    options={findSortTypeDateForLineChartElectricalEnergyName().data?.map(
                      (item, index) => ({
                        value: index,
                        label: item.electricalEnergy?.name,
                      })
                    )}
                    onChange={(key, option) => {
                      setSelectValueElectricalEnergyDataForLineChart(key);
                      findElectricalEnergyDataByAggregateId(key);
                    }}
                  />

                  <img
                    className="reports_table_heading_righthand_xls_image cursor_pointer"
                    src={xlsImage}
                    alt="xlsImage"
                    width={40}
                    height={38}
                  />
                  <img
                    className="cursor_pointer"
                    src={pdfImage}
                    alt="xlsImage"
                    width={30}
                    height={37}
                  />
                </div>
              </div>

              {electryLineChartData?.date?.length > 0 ? (
                <SolarEmploymentChart
                  data={electryLineChartData}
                  theme={colors}
                  lineStatus={true}
                />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Reports;
