/** @format */

import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useTransition,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Anchor } from "antd";
import dayjs from "dayjs";

import {
  findTodayDataElectricityId,
  findYesterdayDataElectricityId,
  findDailyDataElectricityId,
  findWeeklyDataElectricityId,
  findTenDayDataElectricityId,
  findMonthlyDataElectricityId,
  findSelectDateElectricityId,
  findRangeDataElectricityId,
  findElectrEnergyById,
} from "../../redux/actions/dashboardActions";
import Loading from "../../components/loading";
import "../dashboard/index.css";
import "../aggrigateMoreData/index.css";
import {
  FirstSections,
  SecondSections,
  ThirdSections,
  FourThSections,
  FiveThSections,
  SixThSections,
  SevenThSections,
  EightThSections,
} from "../../components/aggregateOrElectricalAnchorItem";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM";

const daysValues = {
  uz: [
    "1 o'n kunlik",
    "2 o'n kunlik",
    "3 o'n kunlik",
    "4 o'n kunlik",
  ],
  en: [
    "1 ten days",
    "2 ten days",
    "3 decade",
    "4 decade",
  ],
  ru: [
    "1 десять дней",
    "2 декада",
    "3 десятилетие",
    "4 декада",
  ],
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

const ElectricalMoreData = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const params = useParams();
  const token = localStorage.getItem("access_token");
  const lang = i18n.language;

  const { loading } = useSelector((state) => state.alert);
  const { colors, theme } = useSelector((state) => state.theme);
  const { electryLineChartData, electryIdData, foundElectryById } = useSelector(
    (state) => state.pumps
  );

  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [activeSection, setActiveSection] = useState("section1");
  const [isActiveGraphic, setIsActiveGraphic] = useState(false);
  const [daylyDate, setDaylyDate] = useState(dayjs());
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const [isPending, setUseTransition] = useTransition();

  const changeDataTime = useCallback(() => {
    const lang = i18n.language;
    const id = params.id;
    const month = daylyDate.month();
    const year = daylyDate.year();
    const selectDay = daylyDate.format("YYYY-MM-DD");
    const startDate = dateRange[0].format("YYYY-MM-DD");
    const endDate = dateRange[1].format("YYYY-MM-DD");

    setUseTransition(() => {
      switch (activeSection) {
        case "section1":
          dispatch(
            findTodayDataElectricityId(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage
            )
          );
          break;
        case "section2":
          dispatch(
            findYesterdayDataElectricityId(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage
            )
          );
          break;
        case "section3":
          dispatch(
            findDailyDataElectricityId(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              month,
              year
            )
          );
          break;
        case "section4":
          dispatch(
            findWeeklyDataElectricityId(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              month + 1,
              year
            )
          );
          break;
        case "section5":
          dispatch(
            findTenDayDataElectricityId(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              year
            )
          );
          break;
        case "section6":
          dispatch(
            findMonthlyDataElectricityId(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              year
            )
          );
          break;
        case "section7":
          dispatch(
            findSelectDateElectricityId(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              selectDay
            )
          );
          break;
        case "section8":
          dispatch(
            findRangeDataElectricityId(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              startDate,
              endDate
            )
          );
          break;
        default:
          break;
      }
    });
  }, [
    activeSection,
    i18n.language,
    params.id,
    token,
    pageData.page,
    pageData.perPage,
    daylyDate,
    dateRange,
  ]);

  useEffect(() => {
    changeDataTime();

    const handleLanguageChange = () => changeDataTime();
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [changeDataTime, i18n]);

  useEffect(() => {
    dispatch(findElectrEnergyById(params.id, token, lang));
  }, []);

  const columnsUser = useMemo(
    () => [
      {
        title: t("dataPagesInformation.dataTableInformation.dataDate"),
        dataIndex: "date",
        key: "date",
        align: "center",
        width: 200,
      },
      // * Active reactive now
      {
        title: `${t(
          "dashboardPageData.lastStationsData.energyActive"
        )}${" "} (${t("dashboardPageData.lastStationsData.energyValueView")})`,
        dataIndex: "energyActive",
        key: "energyActive",
        align: "center",
      },
      {
        title: `${t(
          "dashboardPageData.lastStationsData.energyReactive"
        )}${" "} (${t("dashboardPageData.lastStationsData.energyValueView")})`,
        dataIndex: "energyReactive",
        key: "energyReactive",
        align: "center",
      },
      // *Active reactive power
      {
        title: `${t(
          "dashboardPageData.lastStationsData.powerActive"
        )}${" "} (Kw)`,
        dataIndex: "powerActive",
        key: "powerActive",
        align: "center",
      },
      {
        title: `${t(
          "dashboardPageData.lastStationsData.powerReactive"
        )}${" "} (Kw)`,
        dataIndex: "powerReactive",
        key: "powerReactive",
        align: "center",
      },
      // * Amper 3
      {
        title: `${t(
          "dashboardPageData.lastStationsData.electryAmper"
        )}${" "} 1 (A)`,
        dataIndex: "current1",
        key: "current1",
        align: "center",
      },
      {
        title: `${t(
          "dashboardPageData.lastStationsData.electryAmper"
        )}${" "} 2 (A)`,
        dataIndex: "current2",
        key: "current2",
        align: "center",
      },
      {
        title: `${t(
          "dashboardPageData.lastStationsData.electryAmper"
        )}${" "} 3 (A)`,
        dataIndex: "current3",
        key: "current3",
        align: "center",
      },
      // * Volt 3
      {
        title: `${t(
          "dashboardPageData.lastStationsData.electryVolt"
        )}${" "} 1 (V)`,
        dataIndex: "current1",
        key: "voltage1",
        align: "center",
      },
      {
        title: `${t(
          "dashboardPageData.lastStationsData.electryVolt"
        )}${" "} 2 (V)`,
        dataIndex: "voltage2",
        key: "voltage2",
        align: "center",
      },
      {
        title: `${t(
          "dashboardPageData.lastStationsData.electryVolt"
        )}${" "} 3 (V)`,
        dataIndex: "voltage3",
        key: "voltage3",
        align: "center",
      },
    ],
    [t]
  );

  const handlePaginationChange = useCallback((page, size) => {
    setPageData({
      page,
      perPage: size,
    });
  });

  const changeDataViewType = (value) => {
    setIsActiveGraphic(value);
  };

  const onChangeMonthYear = (date) => {
    if (date) {
      setDaylyDate(date);
    } else {
      setDaylyDate(dayjs());
    }
  };

  const onChangeDateRange = (date) => {
    if (date) {
      setDateRange(date);
    } else {
      setDateRange(dayjs());
    }
  };

  if (loading || isPending) {
    return (
      <section className="more_info_sections">
        <Loading />
      </section>
    );
  }

  return (
    <section className="more_info_sections">
      <Anchor
        className="anchor-items-container"
        direction="horizontal"
        items={t("dataPagesInformation.selectButtonNames", {
          returnObjects: true,
        }).map((item, index) => ({
          key: `section-${index + 1}`,
          href: `#section${index + 1}`,
          title: (
            <p
              style={{
                color:
                  activeSection === `section${index + 1}`
                    ? colors.textWhite
                    : colors.text,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border:
                  activeSection === `section${index + 1}`
                    ? "none"
                    : `1px solid ${colors.buttonColor}`,
                background:
                  activeSection === `section${index + 1}`
                    ? colors.buttonColor
                    : "transparent",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 5,
              }}
            >
              {item.title}
            </p>
          ),
        }))}
        onClick={(e, link) => {
          e.preventDefault();
          setActiveSection(link.href.replace("#", ""));
        }}
      />

      {activeSection === "section1" && !isPending && (
        <FirstSections
          columns={columnsUser}
          dataSource={
            Array.isArray(electryIdData.data)
              ? electryIdData.data?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key1-${index}`,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={electryIdData.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={electryLineChartData}
          electryName={{ code: "electr", name: foundElectryById.name }}
        />
      )}

      {activeSection === "section2" && !isPending && (
        <SecondSections
          columns={columnsUser}
          dataSource={
            Array.isArray(electryIdData.data)
              ? electryIdData.data?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key2-${index}`,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={electryIdData.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={electryLineChartData}
          electryName={{ code: "electr", name: foundElectryById.name }}
        />
      )}
      {activeSection === "section3" && !isPending && (
        <ThirdSections
          columns={columnsUser}
          dataSource={
            Array.isArray(electryIdData)
              ? electryIdData.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key3-${index}`,
                  date: item.date?.split("T")[0] || item.date,
                  current1: item.current1?.toFixed(2),
                  current2: item.current2?.toFixed(2),
                  current3: item.current3?.toFixed(2),
                  energyActive: item.energyActive?.toFixed(2),
                  energyReactive: item.energyReactive?.toFixed(2),
                  powerActive: item.powerActive?.toFixed(2),
                  powerReactive: item.powerReactive?.toFixed(2),
                  voltage1: item.voltage1?.toFixed(2),
                  voltage2: item.voltage2?.toFixed(2),
                  voltage3: item.voltage3?.toFixed(2),
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={electryIdData.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={electryLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          electryName={{ code: "electr", name: foundElectryById.name }}
        />
      )}
      {activeSection === "section4" && !isPending && (
        <FourThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(electryIdData)
              ? electryIdData?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key4-${index}`,
                  current1: item.current1?.toFixed(2),
                  current2: item.current2?.toFixed(2),
                  current3: item.current3?.toFixed(2),
                  energyActive: item.energyActive?.toFixed(2),
                  energyReactive: item.energyReactive?.toFixed(2),
                  powerActive: item.powerActive?.toFixed(2),
                  powerReactive: item.powerReactive?.toFixed(2),
                  voltage1: item.voltage1?.toFixed(2),
                  voltage2: item.voltage2?.toFixed(2),
                  voltage3: item.voltage3?.toFixed(2),
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={electryIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={electryLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          electryName={{ code: "electr", name: foundElectryById.name }}
        />
      )}
      {activeSection === "section5" && !isPending && (
        <FiveThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(electryIdData)
              ? electryIdData?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key5-${index}`,
                  date: `${months[lang][item.month - 1]} ${
                    daysValues[lang][item.tenDayNumber - 1]
                  }`,
                  current1: item.current1?.toFixed(2),
                  current2: item.current2?.toFixed(2),
                  current3: item.current3?.toFixed(2),
                  energyActive: item.energyActive?.toFixed(2),
                  energyReactive: item.energyReactive?.toFixed(2),
                  powerActive: item.powerActive?.toFixed(2),
                  powerReactive: item.powerReactive?.toFixed(2),
                  voltage1: item.voltage1?.toFixed(2),
                  voltage2: item.voltage2?.toFixed(2),
                  voltage3: item.voltage3?.toFixed(2),
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={electryIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={electryLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          electryName={{ code: "electr", name: foundElectryById.name }}
        />
      )}
      {activeSection === "section6" && !isPending && (
        <SixThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(electryIdData)
              ? electryIdData?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key6-${index}`,
                  date: item.date,
                  current1: item.current1?.toFixed(2),
                  current2: item.current2?.toFixed(2),
                  current3: item.current3?.toFixed(2),
                  energyActive: item.energyActive?.toFixed(2),
                  energyReactive: item.energyReactive?.toFixed(2),
                  powerActive: item.powerActive?.toFixed(2),
                  powerReactive: item.powerReactive?.toFixed(2),
                  voltage1: item.voltage1?.toFixed(2),
                  voltage2: item.voltage2?.toFixed(2),
                  voltage3: item.voltage3?.toFixed(2),
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={electryIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={electryLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          electryName={{ code: "electr", name: foundElectryById.name }}
        />
      )}
      {activeSection === "section7" && !isPending && (
        <SevenThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(electryIdData)
              ? electryIdData?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key7-${index}`,
                  date: item.date,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={electryIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={electryLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          electryName={{ code: "electr", name: foundElectryById.name }}
        />
      )}
      {activeSection === "section8" && !isPending && (
        <EightThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(electryIdData)
              ? electryIdData?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key8-${index}`,
                  date: item.date,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={electryIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={electryLineChartData}
          onChange={onChangeDateRange}
          dateFormat={dateFormat}
          valueInput={dateRange}
          electryName={{ code: "electr", name: foundElectryById.name }}
        />
      )}
    </section>
  );
};

export default memo(ElectricalMoreData);
