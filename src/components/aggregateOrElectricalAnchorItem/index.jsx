/** @format */

import React, { memo } from "react";
import { DatePicker, Button } from "antd";
import Excel from "../../assets/xls.d451c295.png";
import TableComponent from "../tableComponent";
import SolarEmploymentChart from "../googleNewPieChart";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

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

const FirstSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    lineChartData,
    electryName,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#405FF2" }}>
          {electryName.code == "aggregate"
            ? `${t("dashboardPageData.lastStationsData.agrigateName")}:`
            : `${t("dashboardPageData.lastStationsData.electryName")}:`}
        </h1>

        <h1 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {electryName.name}
        </h1>
      </div>
      <div className="header_more_aggregate_data">
        <h1 className="head_title_data">
          {
            t("dataPagesInformation.selectMoreDataButtonNames", {
              returnObjects: true,
            })[0].title
          }
        </h1>

        <div className="header_more_aggregate_data">
          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}
          >
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt="download_excel" src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        lineChartData && (
          <SolarEmploymentChart
            data={lineChartData}
            theme={colors}
            lineStatus={true}
          />
        )
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </div>
  )
);

const SecondSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    lineChartData,
    electryName,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#405FF2" }}>
          {electryName.code == "aggregate"
            ? `${t("dashboardPageData.lastStationsData.agrigateName")}:`
            : `${t("dashboardPageData.lastStationsData.electryName")}:`}
        </h1>

        <h1 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {electryName.name}
        </h1>
      </div>
      <div className="header_more_aggregate_data">
        <h1 className="head_title_data">
          {
            t("dataPagesInformation.selectMoreDataButtonNames", {
              returnObjects: true,
            })[1].title
          }
        </h1>

        <div className="header_more_aggregate_data">
          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}
          >
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt="download_excel" src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        lineChartData && (
          <SolarEmploymentChart
            data={lineChartData}
            theme={colors}
            lineStatus={true}
          />
        )
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </div>
  )
);

const ThirdSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    lineChartData,
    onChange,
    dateFormat,
    valueInput,
    electryName,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#405FF2" }}>
          {electryName.code == "aggregate"
            ? `${t("dashboardPageData.lastStationsData.agrigateName")}:`
            : `${t("dashboardPageData.lastStationsData.electryName")}:`}
        </h1>

        <h1 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {electryName.name}
        </h1>
      </div>
      <div className="header_more_aggregate_data">
        <h1 className="head_title_data">
          {
            t("dataPagesInformation.selectMoreDataButtonNames", {
              returnObjects: true,
            })[2].title
          }{" "}
          ({fixDateHeading(valueInput.format("YYYY-MM"))})
        </h1>

        <div className="header_more_aggregate_data">
          <DatePicker
            picker="month"
            onChange={onChange}
            format={dateFormat}
            value={valueInput}
          />

          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}
          >
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt="download_excel" src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        lineChartData && (
          <SolarEmploymentChart
            data={lineChartData}
            theme={colors}
            lineStatus={true}
          />
        )
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </div>
  )
);

const FourThSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    lineChartData,
    onChange,
    dateFormat,
    valueInput,
    electryName,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#405FF2" }}>
          {electryName.code == "aggregate"
            ? `${t("dashboardPageData.lastStationsData.agrigateName")}:`
            : `${t("dashboardPageData.lastStationsData.electryName")}:`}
        </h1>

        <h1 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {electryName.name}
        </h1>
      </div>
      <div className="header_more_aggregate_data">
        <h1 className="head_title_data">
          {
            t("dataPagesInformation.selectMoreDataButtonNames", {
              returnObjects: true,
            })[3].title
          }
          {"\t"}({fixDateHeading(valueInput.format("YYYY-MM"))})
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
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}
          >
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt="download_excel" src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        lineChartData && (
          <SolarEmploymentChart
            data={lineChartData}
            theme={colors}
            lineStatus={true}
          />
        )
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </div>
  )
);

const FiveThSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    lineChartData,
    onChange,
    valueInput,
    electryName,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#405FF2" }}>
          {electryName.code == "aggregate"
            ? `${t("dashboardPageData.lastStationsData.agrigateName")}:`
            : `${t("dashboardPageData.lastStationsData.electryName")}:`}
        </h1>

        <h1 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {electryName.name}
        </h1>
      </div>
      <div className="header_more_aggregate_data">
        <h1 className="head_title_data">
          {valueInput.format("YYYY")}
          {"\t"}-{"\t"}
          {t("dataPagesInformation.dateSelectYear")}
          {"\t"}
          {
            t("dataPagesInformation.selectMoreDataButtonNames", {
              returnObjects: true,
            })[4].title
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
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}
          >
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt="download_excel" src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        lineChartData && (
          <SolarEmploymentChart
            data={lineChartData}
            theme={colors}
            lineStatus={true}
          />
        )
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </div>
  )
);

const SixThSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    lineChartData,
    onChange,
    dateFormat,
    valueInput,
    electryName,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#405FF2" }}>
          {electryName.code == "aggregate"
            ? `${t("dashboardPageData.lastStationsData.agrigateName")}:`
            : `${t("dashboardPageData.lastStationsData.electryName")}:`}
        </h1>

        <h1 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {electryName.name}
        </h1>
      </div>
      <div className="header_more_aggregate_data">
        <h1 className="head_title_data">
          {valueInput.format("YYYY")}
          {"\t"}-{"\t"}
          {t("dataPagesInformation.dateSelectYear")}
          {"\t"}
          {
            t("dataPagesInformation.selectMoreDataButtonNames", {
              returnObjects: true,
            })[5].title
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
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}
          >
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt="download_excel" src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        lineChartData && (
          <SolarEmploymentChart
            data={lineChartData}
            theme={colors}
            lineStatus={true}
          />
        )
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </div>
  )
);

const SevenThSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    lineChartData,
    onChange,
    dateFormat,
    valueInput,
    electryName,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#405FF2" }}>
          {electryName.code == "aggregate"
            ? `${t("dashboardPageData.lastStationsData.agrigateName")}:`
            : `${t("dashboardPageData.lastStationsData.electryName")}:`}
        </h1>

        <h1 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {electryName.name}
        </h1>
      </div>
      <div className="header_more_aggregate_data">
        <h1 className="head_title_data">
          {
            t("dataPagesInformation.selectMoreDataButtonNames", {
              returnObjects: true,
            })[6].title
          }
          {"\t"}({fixDateHeadingForDateRange(valueInput.format("YYYY-MM-DD"))})
        </h1>

        <div className="header_more_aggregate_data">
          <DatePicker
            onChange={onChange}
            format="YYYY-MM-DD"
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}
          >
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt="download_excel" src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        lineChartData && (
          <SolarEmploymentChart
            data={lineChartData}
            theme={colors}
            lineStatus={true}
          />
        )
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </div>
  )
);

const EightThSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    lineChartData,
    onChange,
    dateFormat,
    valueInput,
    electryName,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className="pump_selected_data_with_today"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#405FF2" }}>
          {electryName.code == "aggregate"
            ? `${t("dashboardPageData.lastStationsData.agrigateName")}:`
            : `${t("dashboardPageData.lastStationsData.electryName")}:`}
        </h1>

        <h1 style={{ color: "#405FF2", marginLeft: "10px" }}>
          {electryName.name}
        </h1>
      </div>
      <div className="header_more_aggregate_data">
        <h1 className="head_title_data">
          {
            t("dataPagesInformation.selectMoreDataButtonNames", {
              returnObjects: true,
            })[7].title
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
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}
          >
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}
          >
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt="download_excel" src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        lineChartData && (
          <SolarEmploymentChart
            data={lineChartData}
            theme={colors}
            lineStatus={true}
          />
        )
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
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
};
