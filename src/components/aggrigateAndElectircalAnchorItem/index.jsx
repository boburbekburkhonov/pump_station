/** @format */

import React, { memo } from "react";
import { DatePicker, Button } from "antd";
import Excel from "../../assets/xls.d451c295.png";
import TableComponent from "../tableComponent";
import SolarEmploymentChart from "../googleNewPieChart";
import TableAggrigateAndElectryData from "../aggrigateAndElectricalTable";

const { RangePicker } = DatePicker;

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
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[0].title
          }
        </h1>

        <div className='header_more_aggregate_data'>
          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}>
            Umumiy ma'lumot
          </Button>

          <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}>
            To'liq ma'lumot
          </Button>

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
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

      {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )}
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
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[1].title
          }
        </h1>

        <div className='header_more_aggregate_data'>
          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}>
            Umumiy ma'lumot
          </Button>

          <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}>
            To'liq ma'lumot
          </Button>

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
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

      {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )}
    </div>
  )
);

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
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {valueInput.format("YYYY-MM")}
          {"\t"}
          {t("dataPagesInformation.dateSelectDay")}
          {"\t"}
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[2].title
          }
        </h1>

        <div className='header_more_aggregate_data'>
          <DatePicker
            picker='month'
            onChange={onChange}
            format={dateFormat}
            value={valueInput}
          />

          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}>
            Umumiy ma'lumot
          </Button>

          <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}>
            To'liq ma'lumot
          </Button>

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
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

      {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
        />
      )}
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
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {valueInput.format("YYYY-MM")}
          {"\t"}
          {t("dataPagesInformation.dateSelectDay")}
          {"\t"}
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[3].title
          }
        </h1>

        <div className='header_more_aggregate_data'>
          <DatePicker
            picker='month'
            onChange={onChange}
            format={dateFormat}
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isActiveTable === "all_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("all_data")}>
            Umumiy ma'lumot
          </Button>

          <Button
            type={isActiveTable === "full_data" ? "primary" : "default"}
            onClick={() => changeDataViewType("full_data")}>
            To'liq ma'lumot
          </Button>

          <Button
            type={isActiveTable === "graphic" ? "primary" : "default"}
            onClick={() => changeDataViewType("graphic")}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
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

      {isActiveTable === "full_data" && (
        <TableAggrigateAndElectryData
          expandDataSource={expandDataSource}
          t={t}
          dataSource={dataSource}
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
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {valueInput.format("YYYY")}
          {"\t"}
          {t("dataPagesInformation.dateSelectYear")}
          {"\t"}
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[4].title
          }
        </h1>

        <div className='header_more_aggregate_data'>
          <DatePicker
            picker='year'
            onChange={onChange}
            format='YYYY'
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}>
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
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
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {valueInput.format("YYYY")}
          {"\t"}
          {t("dataPagesInformation.dateSelectYear")}
          {"\t"}
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[5].title
          }
        </h1>

        <div className='header_more_aggregate_data'>
          <DatePicker
            picker='year'
            onChange={onChange}
            format='YYYY'
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}>
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
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
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[6].title
          }
          {"\t"}
          {valueInput.format("YYYY-MM-DD")}
        </h1>

        <div className='header_more_aggregate_data'>
          <DatePicker
            onChange={onChange}
            format='YYYY-MM-DD'
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}>
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
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
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[7].title
          }
          {"\t"}
          {valueInput[0].format("YYYY-MM-DD")}
          {"\t"}
          {"-"}
          {"\t"}
          {valueInput[1].format("YYYY-MM-DD")}
        </h1>

        <div className='header_more_aggregate_data'>
          <RangePicker
            onChange={onChange}
            format='YYYY-MM-DD'
            value={valueInput}
            defaultValue={valueInput}
          />

          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}>
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
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
