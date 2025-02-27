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

import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

import {
  getYesterdayStationIdData,
  getTodayDataByStationId,
  getDailyStationsIdData,
  getWeeklyStationsIdData,
  getTenDayStationsIdData,
  getMonthlyStationsIdData,
  getSelectStationsIdData,
  getDataRangeStationsIdData,
} from "../../redux/actions/dashboardActions";
import Loading from "../../components/loading";

import "../dashboard/index.css";
import "../aggrigateMoreData/index.css";
import "../allDataPage/index.css";

import {
  FirstSections,
  SecondSections,
  ThirdSections,
  FourThSections,
  FiveThSections,
  SixThSections,
  SevenThSections,
  EightThSections,
} from "../../components/aggrigateAndElectircalAnchorItem";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM";

function AgrigateAndElectricalMoreData() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const params = useParams();
  const token = localStorage.getItem("access_token");

  const { loading } = useSelector((state) => state.alert);
  const { colors, theme } = useSelector((state) => state.theme);
  const { totalValueData, pumpDataWithStationId, lineStationId } = useSelector(
    (state) => state.pumps
  );

  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [activeSection, setActiveSection] = useState("section1");
  const [isActiveTable, setIsActiveTable] = useState("all_data");
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
            getTodayDataByStationId(
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
            getYesterdayStationIdData(
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
            getDailyStationsIdData(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              String(month + 1).padStart(2, "0"),
              year
            )
          );
          break;
        case "section4":
          dispatch(
            getWeeklyStationsIdData(
              id,
              token,
              lang,
              pageData.page,
              pageData.perPage,
              String(month + 1).padStart(2, "0"),
              year
            )
          );
          break;
        case "section5":
          dispatch(
            getTenDayStationsIdData(
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
            getMonthlyStationsIdData(
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
            getSelectStationsIdData(
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
            getDataRangeStationsIdData(
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
  }, [activeSection, i18n.language, params.id, token, daylyDate, dateRange]);

  useEffect(() => {
    changeDataTime();

    const handleLanguageChange = () => changeDataTime();
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [changeDataTime, i18n]);

  const handlePaginationChange = useCallback((page, size) => {
    setPageData({
      page,
      perPage: size,
    });
  });

  const changeDataViewType = (value) => {
    setIsActiveTable(value);
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

  const columnsName = useMemo(
    () => [
      {
        title: t("dataPagesInformation.dataTableInformation.dataDate"),
        dataIndex: "date",
        key: "date",
        align: "center",
        width: 250,
      },
      {
        title: t("dataPagesInformation.dataTableInformation.totalEnergy"),
        dataIndex: "energyActive",
        key: "energyActive",
        align: "center",
      },
      {
        title: t("dataPagesInformation.dataTableInformation.totalValume"),
        dataIndex: "volume",
        key: "volume",
        align: "center",
      },
    ],
    [t]
  );

  if (loading || isPending) {
    return (
      <section className='more_info_sections'>
        <Loading />
      </section>
    );
  }

  return (
    <section
      style={{
        background: colors.layoutBackground,
      }}
      className='more_info_sections'>
      <Anchor
        className='anchor-items-container'
        direction='horizontal'
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
              }}>
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
          expandDataSource={pumpDataWithStationId?.expandData}
          dataSource={pumpDataWithStationId?.dataSource}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          theme={theme}
          lineChartData={lineStationId}
          isActiveTable={isActiveTable}
          totalColumns={columnsName}
          totalDataSource={totalValueData}
          handlePaginationChange={handlePaginationChange}
          page={pageData.page}
          perPage={pageData.perPage}
        />
      )}

      {activeSection === "section2" && !isPending && (
        <SecondSections
          expandDataSource={pumpDataWithStationId?.expandData}
          dataSource={pumpDataWithStationId?.dataSource}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          theme={theme}
          lineChartData={lineStationId}
          isActiveTable={isActiveTable}
          totalColumns={columnsName}
          handlePaginationChange={handlePaginationChange}
          totalDataSource={totalValueData}
        />
      )}

      {activeSection === "section3" && !isPending && (
        <ThirdSections
          expandDataSource={pumpDataWithStationId?.expandData}
          dataSource={pumpDataWithStationId?.dataSource}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          theme={theme}
          lineChartData={lineStationId}
          isActiveTable={isActiveTable}
          totalColumns={columnsName}
          totalDataSource={totalValueData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {activeSection === "section4" && !isPending && (
        <FourThSections
          expandDataSource={pumpDataWithStationId?.expandData}
          dataSource={pumpDataWithStationId?.dataSource}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          theme={theme}
          lineChartData={lineStationId}
          isActiveTable={isActiveTable}
          totalColumns={columnsName}
          totalDataSource={totalValueData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {activeSection === "section5" && !isPending && (
        <FiveThSections
          expandDataSource={pumpDataWithStationId?.expandData}
          dataSource={pumpDataWithStationId?.dataSource}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          theme={theme}
          lineChartData={lineStationId}
          isActiveTable={isActiveTable}
          totalColumns={columnsName}
          totalDataSource={totalValueData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {activeSection === "section6" && !isPending && (
        <SixThSections
          expandDataSource={pumpDataWithStationId?.expandData}
          dataSource={pumpDataWithStationId?.dataSource}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          theme={theme}
          lineChartData={lineStationId}
          isActiveTable={isActiveTable}
          totalColumns={columnsName}
          totalDataSource={totalValueData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {activeSection === "section7" && !isPending && (
        <SevenThSections
          expandDataSource={pumpDataWithStationId?.expandData}
          dataSource={pumpDataWithStationId?.dataSource}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          theme={theme}
          lineChartData={lineStationId}
          isActiveTable={isActiveTable}
          totalColumns={columnsName}
          totalDataSource={totalValueData}
          onChange={onChangeMonthYear}
          dateFormat={dateFormat}
          valueInput={daylyDate}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {activeSection === "section8" && !isPending && (
        <EightThSections
          expandDataSource={pumpDataWithStationId?.expandData}
          dataSource={pumpDataWithStationId?.dataSource}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          theme={theme}
          lineChartData={lineStationId}
          isActiveTable={isActiveTable}
          totalColumns={columnsName}
          totalDataSource={totalValueData}
          dateFormat={dateFormat}
          valueInput={dateRange}
          onChange={onChangeDateRange}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </section>
  );
}

export default memo(AgrigateAndElectricalMoreData);
