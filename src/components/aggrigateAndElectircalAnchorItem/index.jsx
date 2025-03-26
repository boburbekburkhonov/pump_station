/** @format */

import React, { memo } from "react";
import { DatePicker, Button } from "antd";
import Excel from "../../assets/xls.d451c295.png";
import TableComponent from "../tableComponent";
import SolarEmploymentChart from "../googleNewPieChart";
import TableAggrigateAndElectryData from "../aggrigateAndElectricalTable";
import { useTranslation } from "react-i18next";
import {
  exportExcelDailyDataByStationId,
  exportExcelDataRangeDataByStationId,
  exportExcelMonthlyDataByStationId,
  exportExcelSelectStationsDataByStationId,
  exportExcelTenDayDataByStationId,
  exportExcelTodayDataByStationId,
  exportExcelWeeklyDataByStationId,
  exportExcelYearlyDataByStationId,
  exportExcelYesterdayDataByStationId,
} from "../../redux/actions/dashboardActions";
import { useDispatch } from "react-redux";

const { RangePicker } = DatePicker;

const downloadDataByExcelFile = (selectedData, info, dispatch, typeSave) => {
  switch (selectedData) {
    case "today":
      dispatch(
        exportExcelTodayDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          typeSave
        )
      );
      break;
    case "yesterday":
      dispatch(
        exportExcelYesterdayDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          typeSave
        )
      );
      break;
    case "daily":
      dispatch(
        exportExcelDailyDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          info.month,
          info.year,
          typeSave
        )
      );
    case "weekly":
      dispatch(
        exportExcelWeeklyDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          info.month,
          info.year,
          typeSave
        )
      );
      break;
    case "tenDay":
      dispatch(
        exportExcelTenDayDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          info.year,
          typeSave
        )
      );
      break;
    case "monthly":
      dispatch(
        exportExcelMonthlyDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          info.year,
          typeSave
        )
      );
      break;
    case "yearly":
      dispatch(
        exportExcelYearlyDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          typeSave
        )
      );
      break;
    case "selectedDate":
      dispatch(
        exportExcelSelectStationsDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          info.date,
          typeSave
        )
      );
      break;
    case "dataRange":
      dispatch(
        exportExcelDataRangeDataByStationId(
          info.stationId,
          info.token,
          info.lang,
          info.stationName,
          info.startDate,
          info.endDate,
          typeSave
        )
      );
      break;
    default:
      break;
  }
};

const FirstSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[0].title
          }
        </h1>

        <div className="header_more_aggregate_data">
          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>

          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "today",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[0].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}
      {/*
      {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
);

const SecondSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[1].title
          }
        </h1>

        <div className="header_more_aggregate_data">
          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "yesterday",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[1].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {/* {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
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
    "yil",
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
    "year",
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
    "год",
  ],
};

const fixDateHeading = (time) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const monthYear = Number(time.split("-")[0]);
  const monthNumber = Number(time.split("-")[1]);
  const month = months[lang][monthNumber - 1];

  return `${monthYear} ${months[lang][12]} ${month}`;
};

const fixDateHeadingForDateRange = (time) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const monthYear = Number(time.split("-")[0]);
  const monthNumber = Number(time.split("-")[1]);
  const monthDate = Number(time.split("-")[2]);
  const month = months[lang][monthNumber - 1];

  return `${monthYear} ${months[lang][12]} ${monthDate} ${month}`;
};

const ThirdSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    onChange,
    dateFormat,
    valueInput,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[2].title
          }
          {"\t"}({"\t"}
          {fixDateHeading(valueInput.format("YYYY-MM"))}
          {"\t"})
        </h1>

        <div className="header_more_aggregate_data">
          <DatePicker
            picker="month"
            onChange={onChange}
            format={dateFormat}
            value={valueInput}
          />

          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "daily",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[2].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {/* {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
);

const FourThSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    onChange,
    dateFormat,
    valueInput,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[3].title
          }
          {"\t"}({"\t"}
          {fixDateHeading(valueInput.format("YYYY-MM"))}
          {"\t"})
        </h1>

        <div className="header_more_aggregate_data">
          <DatePicker
            picker="month"
            onChange={onChange}
            format={dateFormat}
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "weekly",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[3].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {/* {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
);

const FiveThSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    onChange,
    valueInput,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {valueInput.format("YYYY")}
          {"\t"}-{"\t"}
          {t("dataPagesInformation.dateSelectYear")}
          {"\t"}
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[4].title
          }
        </h1>

        <div className="header_more_aggregate_data">
          <DatePicker
            picker="year"
            onChange={onChange}
            format="YYYY"
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "tenDay",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[4].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {/* {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
);

const SixThSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    onChange,
    valueInput,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {valueInput.format("YYYY")}
          {"\t"}-{"\t"}
          {t("dataPagesInformation.dateSelectYear")}
          {"\t"}
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[5].title
          }
        </h1>

        <div className="header_more_aggregate_data">
          <DatePicker
            picker="year"
            onChange={onChange}
            format="YYYY"
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "monthly",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[5].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {/* {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
);

const SevenThSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    onChange,
    valueInput,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {valueInput.format("YYYY")}
          {"\t"}-{"\t"}
          {t("dataPagesInformation.dateSelectYear")}
          {"\t"}
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[6].title
          }
        </h1>

        <div className="header_more_aggregate_data">
          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "yearly",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[6].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {/* {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
);

const EightThSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    onChange,
    valueInput,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[7].title
          }
          {"\t"}({"\t"}
          {fixDateHeadingForDateRange(valueInput.format("YYYY-MM-DD"))}
          {"\t"})
        </h1>

        <div className="header_more_aggregate_data">
          <DatePicker
            onChange={onChange}
            format="YYYY-MM-DD"
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "selectedDate",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[7].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {/* {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
);

const NineThSections = memo(
  ({
    dataSource,
    expandDataSource,
    colors,
    t,
    changeDataViewType,
    lineChartData,
    isActiveTable,
    totalColumns,
    totalDataSource,
    handlePaginationChange,
    page,
    perPage,
    valueInput,
    onChange,
    dateFormat,
    excelData,
    dispatch,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        className="header_more_aggregate_data"
        style={{ marginBottom: "15px" }}
      >
        <h1 className="head_title_data" style={{ margin: "0" }}>
          {
            t(
              isActiveTable === "all_data"
                ? "dataPagesInformation.selectAllDataButtonNames"
                : isActiveTable === "full_data"
                ? "dataPagesInformation.selectMoreDataButtonNames"
                : "dataPagesInformation.selectGraphicDataButtonNames",
              {
                returnObjects: true,
              }
            )[8].title
          }
        </h1>

        <div className="header_more_aggregate_data">
          <RangePicker
            onChange={onChange}
            format="YYYY-MM-DD"
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}
          >
            {t("dataPagesInformation.dataTypeButton1")}
          </Button>

          {/* <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}
          >
            {t("dataPagesInformation.dataTypeButton2")}
          </Button> */}

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img
              alt="download_excel"
              src={Excel}
              onClick={() => {
                downloadDataByExcelFile(
                  "dataRange",
                  excelData,
                  dispatch,
                  t("dataPagesInformation.selectAllDataButtonNames", {
                    returnObjects: true,
                  })[8].title
                );
              }}
            />
          </span>
        </div>
      </div>

      {isActiveTable === "graphic" && lineChartData && (
        <SolarEmploymentChart
          data={lineChartData}
          theme={colors}
          lineStatus={true}
        />
      )}

      {isActiveTable === "all_data" && (
        <TableComponent
          columns={totalColumns}
          dataSource={totalDataSource}
          currentPage={page}
          pageSize={perPage}
          totalPage={totalDataSource?.length || 0}
          handlePaginationChange={handlePaginationChange}
        />
      )}

      {/* {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )} */}
    </div>
  )
);

export {
  FirstSections,
  SecondSections,
  ThirdSections,
  FourThSections,
  FiveThSections,
  SixThSections,
  SevenThSections,
  EightThSections,
  NineThSections,
};
