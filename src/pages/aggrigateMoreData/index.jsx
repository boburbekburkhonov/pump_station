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
  getYesterdayAggregateIDData,
  getTodayAggregateIDData,
  getDailyAggregateIDData,
  getWeeklyAggregateIDData,
  getTenDayAggregateIDData,
  getMonthlyAggregateIDData,
  getSelectDateAggregateIDData,
  getRangeAggregateIDData,
  findAggregateById,
  getYearlyAggregateIDData,
} from "../../redux/actions/dashboardActions";
import Loading from "../../components/loading";
import "../dashboard/index.css";
import "./index.css";
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
import { NineThSections } from "../../components/aggregateOrElectricalAnchorItem";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM";

const daysValues = {
  uz: ["1 o'n kunlik", "2 o'n kunlik", "3 o'n kunlik", "4 o'n kunlik"],
  en: ["1 ten days", "2 ten days", "3 decade", "4 decade"],
  ru: ["1 десять дней", "2 декада", "3 десятилетие", "4 декада"],
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

const AggrigateMoreData = memo(() => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const params = useParams();
  const token = localStorage.getItem("access_token");
  const lang = i18n.language;

  const { loading } = useSelector((state) => state.alert);
  const { colors, theme } = useSelector((state) => state.theme);
  const { pumpIdData, pumpLineChartData, foundAggregateById } = useSelector(
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
            getTodayAggregateIDData(
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
            getYesterdayAggregateIDData(
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
            getDailyAggregateIDData(
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
          dispatch(getWeeklyAggregateIDData(id, token, lang, month + 1, year));
          break;
        case "section5":
          dispatch(
            getTenDayAggregateIDData(
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
            getMonthlyAggregateIDData(
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
            getYearlyAggregateIDData(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage
            )
          );
          break;
        case "section8":
          dispatch(
            getSelectDateAggregateIDData(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              selectDay
            )
          );
          break;
        case "section9":
          dispatch(
            getRangeAggregateIDData(
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
    dispatch(findAggregateById(params.id, token, lang));
  }, []);

  const columnsUser = useMemo(
    () => [
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
    <section
      className="more_info_sections"
      style={{
        background: colors.layoutBackground,
        minHeight: "90vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#405FF2" }}>
          {t("dashboardPageData.lastStationsData.agrigateName")}:
        </h2>
        <h2 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {foundAggregateById.name}
        </h2>
      </div>

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
            Array.isArray(pumpIdData.data)
              ? pumpIdData.data?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key1-${index}`,
                  volume: item.volume,
                  velocity: item.velocity,
                  flow: item.flow,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
          }}
          dispatch={dispatch}
        />
      )}

      {activeSection === "section2" && !isPending && (
        <SecondSections
          columns={columnsUser}
          dataSource={
            Array.isArray(pumpIdData.data)
              ? pumpIdData.data?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key2-${index}`,
                  volume: item.volume,
                  velocity: item.velocity,
                  flow: item.flow,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
          }}
          dispatch={dispatch}
        />
      )}

      {activeSection === "section3" && !isPending && (
        <ThirdSections
          columns={columnsUser}
          dataSource={
            Array.isArray(pumpIdData.data)
              ? pumpIdData.data.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key3-${index}`,
                  date: item.date?.split("T")[0] || item.date,
                  volume: item.volume?.toFixed(2),
                  velocity: item.velocity?.toFixed(2),
                  flow: item.flow?.toFixed(2),
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
            month: daylyDate.month(),
            year: daylyDate.year(),
          }}
          dispatch={dispatch}
        />
      )}

      {activeSection === "section4" && !isPending && (
        <FourThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(pumpIdData)
              ? pumpIdData?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key4-${index}`,
                  date: item.date?.split("T")[0] || item.date,
                  volume: item.volume?.toFixed(2),
                  velocity: item.velocity?.toFixed(2),
                  flow: item.flow?.toFixed(2),
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
            month: daylyDate.month(),
            year: daylyDate.year(),
          }}
          dispatch={dispatch}
        />
      )}

      {activeSection === "section5" && !isPending && (
        <FiveThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(pumpIdData)
              ? pumpIdData?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key5-${index}`,
                  date: `${months[lang][item.month - 1]} ${
                    daysValues[lang][item.tenDayNumber - 1]
                  }`,
                  volume: item.volume?.toFixed(2),
                  velocity: item.velocity?.toFixed(2),
                  flow: item.flow?.toFixed(2),
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
            year: daylyDate.year(),
          }}
          dispatch={dispatch}
        />
      )}

      {activeSection === "section6" && !isPending && (
        <SixThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(pumpIdData?.data)
              ? pumpIdData.data?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key6-${index}`,
                  date: item.date,
                  volume: item.volume?.toFixed(2),
                  velocity: item.velocity?.toFixed(2),
                  flow: item.flow?.toFixed(2),
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
            year: daylyDate.year(),
          }}
          dispatch={dispatch}
        />
      )}

      {activeSection === "section7" && !isPending && (
        <SevenThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(pumpIdData)
              ? pumpIdData?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key7-${index}`,
                  date: item.year,
                  volume: item.volume,
                  velocity: item.velocity,
                  flow: item.flow,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData?.length}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
          }}
          dispatch={dispatch}
        />
      )}

      {activeSection === "section8" && !isPending && (
        <EightThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(pumpIdData?.data)
              ? pumpIdData.data?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key7-${index}`,
                  date: item.date,
                  volume: item.volume,
                  velocity: item.velocity,
                  flow: item.flow,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
            date: daylyDate.format("YYYY-MM-DD")
          }}
          dispatch={dispatch}
        />
      )}

      {activeSection === "section9" && !isPending && (
        <NineThSections
          columns={columnsUser}
          dataSource={
            Array.isArray(pumpIdData?.data)
              ? pumpIdData.data?.map((item, index) => ({
                  ...item,
                  key: item.id || `temp-key8-${index}`,
                  date: item.date,
                  volume: item.volume,
                  velocity: item.velocity,
                  flow: item.flow,
                }))
              : []
          }
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData?.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
          lineChartData={pumpLineChartData}
          onChange={onChangeDateRange}
          dateFormat={dateFormat}
          valueInput={dateRange}
          excelData={{
            lang: lang,
            token: token,
            aggregateId: params.id,
            aggregateName: foundAggregateById.name,
            date: daylyDate.format("YYYY-MM-DD"),
            startDate: dateRange[0].format("YYYY-MM-DD"),
            endDate: dateRange[1].format("YYYY-MM-DD")
          }}
          dispatch={dispatch}
        />
      )}
    </section>
  );
});

export default AggrigateMoreData;
