/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Drawer } from "antd";
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
  BgColorsOutlined,
  DotChartOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import MapWithPolygon from "../../components/mapComponent";
import { formatDate } from "../../utils/inputElementHandler";

import "./index.css";
import {
  findInMapsLastData,
  findMyLocationsPolygon,
} from "../../redux/actions/stationsActions";
import Loading from "../../components/loading";

function MapsPage() {
  const dispatch = useDispatch();
  const { stationsMap, stationsPolygon, stationsLoading } = useSelector(
    (state) => state.stations
  );
  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const token = localStorage.getItem("access_token");
  const districtId = Cookies.get("districtId");
  const [dataStations, setDataStations] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 1000,
  });

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;
    const { page, perPage } = pageData;

    dispatch(findInMapsLastData(lang, token, page, perPage));
    dispatch(findMyLocationsPolygon(lang, districtId, token));
  }, [dispatch, token, districtId, i18n.language, pageData]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);

  if (loading || stationsLoading) {
    return (
      <section className="map_container">
        <Loading />
      </section>
    );
  }

  if (!stationsPolygon?.pointsPolygon) {
    return (
      <section className="map_container">
        <p>Map data could not be loaded. Please try again later.</p>
      </section>
    );
  }

  const showDrawer = (data) => {
    setIsOpen(true);
    setDataStations(data);
  };

  const statusOfAggregateAndElectrEnergy = (status) => {
    if (status.workingStatus == false) {
      return "red";
    } else if (
      status.workingStatus == true &&
      status.defectionStatus == false
    ) {
      return "#40C057";
    } else {
      return "#E0C040";
    }
  };

  const fixDate = (time) => {
    const nowDate = new Date();
    const fixedTime = new Date(time);
    fixedTime.setHours(fixedTime.getHours() - 5);

    const date = `${fixedTime.getDate()}.${
      fixedTime.getMonth() + 1
    }.${fixedTime.getFullYear()} ${fixedTime.getHours()}:${
      String(fixedTime.getMinutes()).length == 1
        ? "0" + fixedTime.getMinutes()
        : fixedTime.getMinutes()
    }`;

    const hourOnly = `${fixedTime.getHours()}:${
      String(fixedTime.getMinutes()).length == 1
        ? "0" + fixedTime.getMinutes()
        : fixedTime.getMinutes()
    }`;

    return nowDate.getMonth() + 1 == fixedTime.getMonth() + 1 &&
      nowDate.getDate() == fixedTime.getDate()
      ? hourOnly
      : date;
  };

  return (
    <section
      className="map_container"
      style={{ position: "relative", width: "100%", height: "88vh" }}
    >
      <MapWithPolygon
        data={stationsPolygon}
        onClickMyLocations={showDrawer}
        stationData={stationsMap}
      />

      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Modal */}
      <div
        className={`modal ${isOpen ? "open" : ""}`}
        style={{ background: colors.layoutBackground }}
      >
        <div>
          <span
            className="close-btn"
            style={{ display: "block", color: colors.text }}
            onClick={() => setIsOpen(false)}
          >
            &times;
          </span>
        </div>

        <div className="line_for_modal"></div>

        <h2 className="map_drower_header">
          {t("dashboardPageData.lastStationsData.stationsMoreInfoAgirgate")}
        </h2>
        <div className="maps_view_more_info">
          {dataStations?.aggregate?.map((e, i) => (
            <div
              className="modal_aggregate_wrapper"
              key={i}
              style={{
                background: colors.background,
                boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
                color: colors.text,
              }}
            >
              <div
                className="modal_aggregate_wrapper_item modal_aggregate_wrapper_item_name"
                style={{
                  borderBottom: `3px solid ${statusOfAggregateAndElectrEnergy({
                    workingStatus: e.workingStatus,
                    defectionStatus: e.defectionStatus,
                  })}`,
                }}
              >
                <h2 className="modal_aggregate_wrapper_item_name_heading">
                  {t("dashboardPageData.lastStationsData.agrigateName")}:
                </h2>

                <p className="modal_aggregate_wrapper_item_name_desc">
                  {e?.name}
                </p>
              </div>

              {e.pumpLastData == undefined ? (
                <h3
                  style={{
                    fontWeight: 400,
                    marginTop: '25px',
                    textAlign: 'center'
                  }}
                >
                  {t("dashboardPageData.emptyData")}...
                </h3>
              ) : (
                <>
                  <div className="modal_aggregate_wrapper_item">
                    <div className="modal_aggregate_wrapper_item_left_wrapper">
                      <AreaChartOutlined className="dashboard_last_data_icons" />

                      <h2
                        className="modal_aggregate_wrapper_item_heading"
                        style={{ color: colors.text }}
                      >
                        {t("dashboardPageData.lastStationsData.agrigateVolume")}
                        :
                      </h2>
                    </div>

                    <p
                      className="modal_aggregate_wrapper_item_desc"
                      style={{ color: colors.text }}
                    >
                      {e.pumpLastData?.volume} m³
                    </p>
                  </div>

                  <div className="modal_aggregate_wrapper_item">
                    <div className="modal_aggregate_wrapper_item_left_wrapper">
                      <LineChartOutlined className="dashboard_last_data_icons" />

                      <h2
                        className="modal_aggregate_wrapper_item_heading"
                        style={{ color: colors.text }}
                      >
                        {t(
                          "dashboardPageData.lastStationsData.agrigateVelocity"
                        )}
                        :
                      </h2>
                    </div>

                    <p
                      className="modal_aggregate_wrapper_item_desc"
                      style={{ color: colors.text }}
                    >
                      {e.pumpLastData?.velocity} m/s
                    </p>
                  </div>

                  <div className="modal_aggregate_wrapper_item">
                    <div className="modal_aggregate_wrapper_item_left_wrapper">
                      <ExperimentOutlined className="dashboard_last_data_icons" />

                      <h2
                        className="modal_aggregate_wrapper_item_heading"
                        style={{ color: colors.text }}
                      >
                        {t("dashboardPageData.lastStationsData.agrigateSpeed")}:
                      </h2>
                    </div>

                    <p
                      className="modal_aggregate_wrapper_item_desc"
                      style={{ color: colors.text }}
                    >
                      {e.pumpLastData?.flow} m³/s
                    </p>
                  </div>

                  <div className="modal_aggregate_wrapper_item">
                    <div className="modal_aggregate_wrapper_item_left_wrapper">
                      <BgColorsOutlined className="dashboard_last_data_icons" />

                      <h2
                        className="modal_aggregate_wrapper_item_heading"
                        style={{ color: colors.text }}
                      >
                        {t(
                          "dashboardPageData.lastStationsData.agrigateDailyVolume"
                        )}
                        :
                      </h2>
                    </div>

                    <p
                      className="modal_aggregate_wrapper_item_desc"
                      style={{ color: colors.text }}
                    >
                      {e.pumpLastData?.todayTotalFlow} m³
                    </p>
                  </div>

                  <div className="modal_aggregate_wrapper_item">
                    <div className="modal_aggregate_wrapper_item_left_wrapper">
                      <DotChartOutlined className="dashboard_last_data_icons" />

                      <h2
                        className="modal_aggregate_wrapper_item_heading"
                        style={{ color: colors.text }}
                      >
                        {t(
                          "dashboardPageData.lastStationsData.agrigateTotalsVolume"
                        )}
                        :
                      </h2>
                    </div>

                    <p
                      className="modal_aggregate_wrapper_item_desc"
                      style={{ color: colors.text }}
                    >
                      {e.pumpLastData?.totalsVolume} m³
                    </p>
                  </div>

                  <div className="modal_aggregate_wrapper_item">
                    <div className="modal_aggregate_wrapper_item_left_wrapper">
                      <ClockCircleOutlined className="dashboard_last_data_icons" />

                      <h2
                        className="modal_aggregate_wrapper_item_heading"
                        style={{ color: colors.text }}
                      >
                        {t("dashboardPageData.lastStationsData.aggrigateTime")}:
                      </h2>
                    </div>

                    <p
                      className="modal_aggregate_wrapper_item_desc"
                      style={{ color: colors.text }}
                    >
                      {fixDate(e.pumpLastData?.date)}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <h2 className="map_drower_header">
          {t("dashboardPageData.lastStationsData.stationsMoreInfoElectr")}
        </h2>
        <div className="maps_electr_modal_info">
          {dataStations?.electricalEnergyLastData?.map((e, i) => (
            <div
              className="modal_aggregate_wrapper"
              key={i}
              style={{
                background: colors.background,
                boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
                color: colors.text,
              }}
            >
              <div
                className="modal_aggregate_wrapper_item modal_aggregate_wrapper_item_name"
                style={{
                  borderBottom: `3px solid ${statusOfAggregateAndElectrEnergy({
                    workingStatus: e.workingStatus,
                    defectionStatus: e.defectionStatus,
                  })}`,
                }}
              >
                <h2 className="modal_aggregate_wrapper_item_name_heading">
                  {t("dashboardPageData.lastStationsData.electryName")}:
                </h2>

                <p className="modal_aggregate_wrapper_item_name_desc">
                  {e?.name}
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <DashboardOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.energyActive")}:
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.energyActive}{" "}
                  {t("dashboardPageData.lastStationsData.energyValueView")}
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <DashboardOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.energyReactive")}:
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.energyReactive}{" "}
                  {t("dashboardPageData.lastStationsData.energyValueView")}
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <PoweroffOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.powerActive")}:
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.powerActive} kw
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <ThunderboltOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.electryVoltage1")}: :
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.voltage1} V
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <BulbOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.electryCurrent1")}: :
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.current1} A
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <ThunderboltOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.electryVoltage2")}: :
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.voltage2} V
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <BulbOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.electryCurrent2")}: :
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.current2} A
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <ThunderboltOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.electryVoltage3")}: :
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.voltage3} V
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <BulbOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.electryCurrent3")}: :
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {e.electricalEnergyLastData?.current3} A
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <ClockCircleOutlined className="dashboard_last_data_icons" />

                  <h2
                    className="modal_aggregate_wrapper_item_heading"
                    style={{ color: colors.text }}
                  >
                    {t("dashboardPageData.lastStationsData.aggrigateTime")}:
                  </h2>
                </div>

                <p
                  className="modal_aggregate_wrapper_item_desc"
                  style={{ color: colors.text }}
                >
                  {fixDate(e.electricalEnergyLastData?.date)}
                </p>
              </div>
            </div>
            // <div
            //   key={index}
            //   className="maps_view_more_info_card"
            //   style={{
            //     background: colors.background,
            //     boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
            //   }}
            // >
            //   <div className="maps_view_more_electr_card">
            //     {/* row */}
            //     <div className="maps_view_more_info_card_item 1">
            //       <div className="normal_flex_card">
            //         <FormOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />

            //         <h4>
            //           {t("dashboardPageData.lastStationsData.electryName")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.name}
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 2">
            //       <div className="normal_flex_card">
            //         <QrcodeOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.electryCode")}:{" "}
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.code}
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 3">
            //       <div className="normal_flex_card">
            //         <SettingOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.aggrigateTitle")}:{" "}
            //         </h4>
            //       </div>
            //       <h4 className="dashboard_view_more_import_data">
            //         {item.workingStatus
            //           ? t("dashboardPageData.lastStationsData.agrigateStatus")
            //           : t("dashboardPageData.lastStationsData.agrigateStatus2")}
            //       </h4>
            //     </div>

            //     {/* row */}

            //     <div className="maps_view_more_info_card_item 4">
            //       <div className="normal_flex_card">
            //         <ThunderboltOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.electryVolt")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.voltage1} V
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 5">
            //       <div className="normal_flex_card">
            //         <BulbOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />

            //         <h4>
            //           {t("dashboardPageData.lastStationsData.electryAmper")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.current1} A
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 6">
            //       <div className="normal_flex_card">
            //         <PoweroffOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />

            //         <h4>
            //           {t("dashboardPageData.lastStationsData.powerActive")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.powerActive} Kw
            //       </h4>
            //     </div>

            //     {/* row */}

            //     <div className="maps_view_more_info_card_item 7">
            //       <div className="normal_flex_card">
            //         <ThunderboltOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />

            //         <h4>
            //           {t("dashboardPageData.lastStationsData.electryVolt")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.voltage2} V
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 8">
            //       <div className="normal_flex_card">
            //         <BulbOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.electryAmper")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.current2} A
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 9">
            //       <div className="normal_flex_card">
            //         <PoweroffOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.powerReactive")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.powerReactive} Kw
            //       </h4>
            //     </div>

            //     {/* row */}

            //     <div className="maps_view_more_info_card_item 10">
            //       <div className="normal_flex_card">
            //         <ThunderboltOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.electryVolt")}:
            //         </h4>
            //       </div>
            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.voltage3} V
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 11">
            //       <div className="normal_flex_card">
            //         <BulbOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.electryAmper")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.current3} A
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 12">
            //       <div className="normal_flex_card">
            //         <PieChartFilled
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />

            //         <h4>
            //           {t(
            //             "dashboardPageData.lastStationsData.energyActiveTotal"
            //           )}
            //           :
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.energyActiveTotal}{" "}
            //         {t("dashboardPageData.lastStationsData.energyValueView")}
            //       </h4>
            //     </div>

            //     {/* row */}

            //     <div className="maps_view_more_info_card_item 13">
            //       <div className="normal_flex_card">
            //         <DashboardOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.energyActive")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.energyActive}{" "}
            //         {t("dashboardPageData.lastStationsData.energyValueView")}
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 14">
            //       <div className="normal_flex_card">
            //         <LineChartOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.powerActive")}:{" "}
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.powerActive} Kw
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 15">
            //       <div className="normal_flex_card">
            //         <PieChartFilled
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t(
            //             "dashboardPageData.lastStationsData.energyReactiveTotal"
            //           )}
            //           :{" "}
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.energyReactiveTotal}{" "}
            //         {t("dashboardPageData.lastStationsData.energyValueView")}
            //       </h4>
            //     </div>

            //     {/* row */}

            //     <div className="maps_view_more_info_card_item 16">
            //       <div className="normal_flex_card">
            //         <DashboardOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.energyReactive")}:
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.energyReactive}{" "}
            //         {t("dashboardPageData.lastStationsData.energyValueView")}
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 17">
            //       <div className="normal_flex_card">
            //         <LineChartOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.powerReactive")}:{" "}
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {item.electricalEnergyLastData.powerReactive} Kw
            //       </h4>
            //     </div>

            //     <div className="maps_view_more_info_card_item 18">
            //       <div className="normal_flex_card">
            //         <FieldTimeOutlined
            //           style={{
            //             color: "#11a9ff",
            //           }}
            //           className="dashboard_last_data_icons"
            //         />
            //         <h4>
            //           {t("dashboardPageData.lastStationsData.aggrigateTime")}:{" "}
            //         </h4>
            //       </div>

            //       <h4 className="dashboard_view_more_import_data">
            //         {formatDate(item.electricalEnergyLastData?.date)}
            //       </h4>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MapsPage;
