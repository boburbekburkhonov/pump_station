/** @format */

import React, {
  useEffect,
  useState,
  useCallback,
  memo,
  useTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  EnvironmentOutlined,
  TeamOutlined,
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
} from "@ant-design/icons";
import { Select, DatePicker } from "antd";
import moment from "moment";

import { getLastAggregateData } from "../../redux/actions/dashboardActions";
import { getAllStationsId } from "../../redux/actions/dashboard";

import "./index.css";
import "../dashboard/index.css";

const { RangePicker } = DatePicker;

const AggregateCardData = memo(({ item, index, changeData }) => {
  const { t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);

  function formatDate(inputDate) {
    if(!inputDate) {
      return null
    }
    const [year, hours] = inputDate.split("T")
    const [hour, minuts, seconds] = hours.split(":")

    const formattedDate = `${year} ${hour}:${minuts}:${seconds.split(".")[0]}`

    return formattedDate;
  }

  return (
    <div
      key={index}
      onClick={() => changeData(item?.pumpLastData?.aggregateId)}
      className='dashboard_view_more_modal_card data_card_custom_style'
      style={{
        background: colors.background,
        boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
      }}>
      <div className='dashboard_view_more_modal_card_item'>
        <div className='normal_flex_card'>
          <FormOutlined
            style={{
              color: "#11A9FF",
            }}
            className='dashboard_last_data_icons'
          />

          <h4>{t("dashboardPageData.lastStationsData.agrigateName")}:</h4>
        </div>

        <h4 className='dashboard_view_more_import_data'>{item.name}</h4>
      </div>

      <div className='dashboard_view_more_modal_card_item'>
        <div className='normal_flex_card'>
          <QrcodeOutlined
            style={{
              color: "#3652AD",
            }}
            className='dashboard_last_data_icons'
          />
          <h4>{t("dashboardPageData.lastStationsData.aggrigateCode")}: </h4>
        </div>

        <h4 className='dashboard_view_more_import_data'>{item.code}</h4>
      </div>

      <div className='dashboard_view_more_modal_card_item'>
        <div className='normal_flex_card'>
          <SettingOutlined
            style={{
              color: "#F76500",
            }}
            className='dashboard_last_data_icons'
          />
          <h4>{t("dashboardPageData.lastStationsData.aggrigateTitle")}: </h4>
        </div>
        <h4 className='dashboard_view_more_import_data'>
          {item.workingStatus
            ? t("dashboardPageData.lastStationsData.agrigateStatus")
            : t("dashboardPageData.lastStationsData.agrigateStatus2")}
        </h4>
      </div>

      <div className='dashboard_view_more_modal_card_item'>
        <div className='normal_flex_card'>
          <AreaChartOutlined
            style={{
              color: "#00AB6A",
            }}
            className='dashboard_last_data_icons'
          />
          <h4>{t("dashboardPageData.lastStationsData.agrigateSpeed")}: </h4>
        </div>
        <h4 className='dashboard_view_more_import_data'>
          {item.pumpLastData?.velocity}{" "}
          {t("dashboardPageData.lastStationsData.aggrigateSpeedConst")}
        </h4>
      </div>

      <div className='dashboard_view_more_modal_card_item'>
        <div className='normal_flex_card'>
          <NodeIndexOutlined
            style={{
              color: "#85A1D0",
            }}
            className='dashboard_last_data_icons'
          />
          <h4>
            {t("dashboardPageData.lastStationsData.aggrigateTotalFlow")}:{" "}
          </h4>
        </div>
        <h4 className='dashboard_view_more_import_data'>
          {item.pumpLastData?.todayTotalFlow} m³
        </h4>
      </div>

      <div className='dashboard_view_more_modal_card_item'>
        <div className='normal_flex_card'>
          <ExperimentOutlined
            style={{
              color: "#FF9445",
            }}
            className='dashboard_last_data_icons'
          />
          <h4>
            {t("dashboardPageData.lastStationsData.aggrigateTotalVolume")}:{" "}
          </h4>
        </div>
        <h4 className='dashboard_view_more_import_data'>
          {item.pumpLastData?.totalsVolume} m³
        </h4>
      </div>

      <div className='dashboard_view_more_modal_card_item'>
        <div className='normal_flex_card'>
          <FieldTimeOutlined
            style={{
              color: "#FB0015",
            }}
            className='dashboard_last_data_icons'
          />
          <h4>{t("dashboardPageData.lastStationsData.aggrigateTime")}: </h4>
        </div>

        <h4 className='dashboard_view_more_import_data'>
          {formatDate(item.pumpLastData?.date)}
        </h4>
      </div>
    </div>
  );
});

function DataPage() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { stationsId } = useSelector((state) => state.dashboard);
  const { pumpLastData } = useSelector((state) => state.pumps);
  const { i18n, t } = useTranslation();

  const token = localStorage.getItem("access_token");
  const [stationSelectId, setStationSelectId] = useState("");
  const [selectAggregateId, setSelectAggregateId] = useState(null);
  const [selectDataType, setSelectDataType] = useState(0);
  const [dates, setDates] = useState([moment().subtract(1, "days"), moment()]);

  console.log(selectAggregateId);

  const [isPending, startTransition] = useTransition();

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;
    dispatch(getAllStationsId(lang, token));
  }, [dispatch, token, i18n.language]);

  useEffect(() => {
    fetchAllData();
    const handleLanguageChange = fetchAllData;
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [fetchAllData, i18n]);

  useEffect(() => {
    if (!stationsId || stationsId.length === 0) return;

    setStationSelectId(stationsId[0].id);
  }, [stationsId]);

  useEffect(() => {
    if (stationSelectId) {
      startTransition(() => {
        dispatch(getLastAggregateData(stationSelectId, token, i18n.language));
      });
    }
  }, [dispatch, token, stationSelectId, i18n.language]);

  const changeDataAggrigateData = (changeId) => {
    setSelectAggregateId(changeId);
  };

  const onDateChange = (dates, dateStrings) => {
    setDates(dateStrings);
  };

  return (
    <section className='main_data_sections'>
      <div
        style={{
          background: colors.layoutBackground,
        }}
        className='data_pump_head_controller_section'>
        <Select
          key={"selects_names"}
          size='large'
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

        <Select
          key={"stations_names"}
          size='large'
          value={stationSelectId}
          className='select_input_stations'
          options={stationsId.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(key, option) => setStationSelectId(key)}
        />

        <RangePicker
          placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
          onChange={onDateChange}
        />
      </div>

      <div
        className='data_pump_main_body_cards'
        style={{
          background: colors.layoutBackground,
        }}>
        <h1>{t("stationsPageData.stationsDataHeader")}</h1>
        <h2>{t("dataPagesInformation.dataPagesTitle")}</h2>
        <div className='data_pump_main_body_container'>
          {pumpLastData?.aggregate?.map((item, index) => (
            <AggregateCardData
              key={index}
              item={item}
              index={index}
              changeData={changeDataAggrigateData}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DataPage;
