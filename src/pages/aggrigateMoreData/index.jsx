/** @format */

import React, { memo, useCallback, useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Select, DatePicker } from "antd";

import {
  NodeIndexOutlined,
  FormOutlined,
  QrcodeOutlined,
  SettingOutlined,
  AreaChartOutlined,
  ExperimentOutlined,
  FieldTimeOutlined,
  ThunderboltOutlined,
  PoweroffOutlined,
  BulbOutlined,
  LineChartOutlined,
  DashboardOutlined,
  PieChartFilled,
  HomeOutlined,
  GlobalOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import {
  getLastAggregateIDData,
  getTodayAggregateIDData,
} from "../../redux/actions/dashboardActions";
import Loading from "../../components/loading";
import "../dashboard/index.css";
import "./index.css";
import TableComponent from "../../components/tableComponent";

const { RangePicker } = DatePicker;

const AggrigateMoreData = memo(() => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const params = useParams();
  const token = localStorage.getItem("access_token");

  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { pumpLastIdData, pumpIdData } = useSelector((state) => state.pumps);

  const [dates, setDates] = useState([moment().subtract(1, "days"), moment()]);
  const [selectDataType, setSelectDataType] = useState(0);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 9,
  });

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;
    const id = params.id;

    dispatch(getLastAggregateIDData(id, token, lang));
    dispatch(
      getTodayAggregateIDData(id, token, lang, pageData.page, pageData.perPage)
    );
  }, [dispatch, token, i18n.language, params, pageData]);

  useEffect(() => {
    fetchAllData();

    const handleLanguageChange = () => fetchAllData();
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [fetchAllData, i18n]);

  function formatDate(inputDate) {
    const formatDate = new Date(inputDate).toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatDate;
  }

  const onDateChange = (dates, dateStrings) => {
    setDates(dateStrings);
  };

  const columnsUser = useMemo(
    () => [
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
    ],
    [t]
  );

  const handlePaginationChange = useCallback((page, size) => {
    setPageData({
      page,
      perPage: size,
    });
  });

  if (loading) {
    return (
      <section className='more_info_sections'>
        <Loading />
      </section>
    );
  }

  return (
    <section className='more_info_sections'>
      <div className='pump_data_view_more_header'>
        <div className='pump_data_main_header'>

        </div>

        <div className='pump_data_view_more_header_selected'>
          <Select
            key={"selects_names"}
            size='large'
            style={{
              minWidth: 300,
            }}
            value={selectDataType}
            className='select_input_stations'
            options={t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            }).map((item, index) => ({
              value: index,
              label: item.title,
            }))}
            onChange={(key, option) => setSelectDataType(key)}
          />

          <RangePicker
            style={{
              minWidth: 400,
            }}
            size='large'
            placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
            onChange={onDateChange}
          />
        </div>
      </div>

      <div
        style={{
          background: colors.layoutBackground,
        }}
        className='pump_selected_data_with_today'>
        <h1 className="head_title_data">
          {t("dataPagesInformation.selectButtonNames", {
            returnObjects: true,
          })[0].title}
        </h1>
        <TableComponent
          columns={columnsUser}
          dataSource={pumpIdData.data}
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData.totalDocuments}
          handlePaginationChange={handlePaginationChange}
        />
      </div>
    </section>
  );
});

export default AggrigateMoreData;
