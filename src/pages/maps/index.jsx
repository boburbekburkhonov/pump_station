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

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Modal */}
      <div className={`modal ${isOpen ? "open" : ""}`} style={{background: colors.layoutBackground}}>
        <div>
          <span className="close-btn" style={{display: 'block', color: colors.text}} onClick={() => setIsOpen(false)}>
            &times;
          </span>
        </div>

        <div className="line_for_modal"></div>

        <div
          className="stations_information_with_maps_page"
          style={{
            background: colors.background,
            boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
          }}
        >
          <div className="stations_maps_header">
            <h1>{dataStations?.name}</h1>
          </div>

          <div className="maps_view_more_info_card_item">
            <div className="normal_flex_card">
              <GlobalOutlined
                style={{
                  color: "#11a9ff",
                }}
                className="dashboard_last_data_icons"
              />

              <h4>{t("stationsPageData.stationsMoreInfo.region")}:</h4>
            </div>

            <h4 className="dashboard_view_more_import_data">
              {dataStations.region}
            </h4>
          </div>

          <div className="maps_view_more_info_card_item">
            <div className="normal_flex_card">
              <EnvironmentOutlined
                style={{
                  color: "#11a9ff",
                }}
                className="dashboard_last_data_icons"
              />

              <h4>{t("stationsPageData.stationsMoreInfo.district")}:</h4>
            </div>

            <h4 className="dashboard_view_more_import_data">
              {dataStations.district}
            </h4>
          </div>

          <div className="maps_view_more_info_card_item">
            <div className="normal_flex_card">
              <HomeOutlined
                style={{
                  color: "#11a9ff",
                }}
                className="dashboard_last_data_icons"
              />

              <h4>{t("stationsPageData.stationsMoreInfo.organization")}:</h4>
            </div>

            <h4 className="dashboard_view_more_import_data">
              {dataStations.organization}
            </h4>
          </div>

          <div className="maps_view_more_info_card_item">
            <div className="normal_flex_card">
              <PhoneOutlined
                style={{
                  color: "#11a9ff",
                }}
                className="dashboard_last_data_icons"
              />

              <h4>{t("stationsPageData.stationsMoreInfo.devicePhoneNum")}:</h4>
            </div>

            <h4 className="dashboard_view_more_import_data">
              {dataStations.devicePhoneNum}
            </h4>
          </div>
        </div>

        <h2 className="map_drower_header">
          {t("dashboardPageData.lastStationsData.stationsMoreInfoAgirgate")}
        </h2>
        <div className="maps_view_more_info">
          {dataStations?.aggregate?.map((item, index) => (
            <div
              key={index}
              className="maps_view_more_info_card"
              style={{
                background: colors.background,
                boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
              }}
            >
              <div className="maps_view_more_info_card_item">
                <div className="normal_flex_card">
                  <FormOutlined
                    style={{
                      color: "#11a9ff",
                    }}
                    className="dashboard_last_data_icons"
                  />

                  <h4>
                    {t("dashboardPageData.lastStationsData.agrigateName")}:
                  </h4>
                </div>

                <h4 className="dashboard_view_more_import_data">{item.name}</h4>
              </div>

              <div className="maps_view_more_info_card_item">
                <div className="normal_flex_card">
                  <QrcodeOutlined
                    style={{
                      color: "#11a9ff",
                    }}
                    className="dashboard_last_data_icons"
                  />
                  <h4>
                    {t("dashboardPageData.lastStationsData.aggrigateCode")}:{" "}
                  </h4>
                </div>

                <h4 className="dashboard_view_more_import_data">{item.code}</h4>
              </div>

              <div className="maps_view_more_info_card_item">
                <div className="normal_flex_card">
                  <SettingOutlined
                    style={{
                      color: "#11a9ff",
                    }}
                    className="dashboard_last_data_icons"
                  />
                  <h4>
                    {t("dashboardPageData.lastStationsData.aggrigateTitle")}:{" "}
                  </h4>
                </div>
                <h4 className="dashboard_view_more_import_data">
                  {item.workingStatus
                    ? t("dashboardPageData.lastStationsData.agrigateStatus")
                    : t("dashboardPageData.lastStationsData.agrigateStatus2")}
                </h4>
              </div>

              <div className="maps_view_more_info_card_item">
                <div className="normal_flex_card">
                  <AreaChartOutlined
                    style={{
                      color: "#11a9ff",
                    }}
                    className="dashboard_last_data_icons"
                  />
                  <h4>
                    {t("dashboardPageData.lastStationsData.agrigateSpeed")}:{" "}
                  </h4>
                </div>
                <h4 className="dashboard_view_more_import_data">
                  {item.pumpLastData?.velocity}{" "}
                  {t("dashboardPageData.lastStationsData.aggrigateSpeedConst")}
                </h4>
              </div>

              <div className="maps_view_more_info_card_item">
                <div className="normal_flex_card">
                  <NodeIndexOutlined
                    style={{
                      color: "#11a9ff",
                    }}
                    className="dashboard_last_data_icons"
                  />
                  <h4>
                    {t("dashboardPageData.lastStationsData.aggrigateTotalFlow")}
                    :{" "}
                  </h4>
                </div>
                <h4 className="dashboard_view_more_import_data">
                  {item.pumpLastData?.todayTotalFlow} m³
                </h4>
              </div>

              <div className="maps_view_more_info_card_item">
                <div className="normal_flex_card">
                  <ExperimentOutlined
                    style={{
                      color: "#11a9ff",
                    }}
                    className="dashboard_last_data_icons"
                  />
                  <h4>
                    {t(
                      "dashboardPageData.lastStationsData.aggrigateTotalVolume"
                    )}
                    :{" "}
                  </h4>
                </div>
                <h4 className="dashboard_view_more_import_data">
                  {item.pumpLastData?.totalsVolume} m³
                </h4>
              </div>

              <div className="maps_view_more_info_card_item">
                <div className="normal_flex_card">
                  <FieldTimeOutlined
                    style={{
                      color: "#11a9ff",
                    }}
                    className="dashboard_last_data_icons"
                  />
                  <h4>
                    {t("dashboardPageData.lastStationsData.aggrigateTime")}:{" "}
                  </h4>
                </div>

                <h4 className="dashboard_view_more_import_data">
                  {formatDate(item.pumpLastData?.date)}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <h2 className="map_drower_header">
          {t("dashboardPageData.lastStationsData.stationsMoreInfoElectr")}
        </h2>
        <div className="maps_electr_modal_info">
          {dataStations?.electricalEnergyLastData?.map((item, index) => (
            <div
              key={index}
              className="maps_view_more_info_card"
              style={{
                background: colors.background,
                boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
              }}
            >
              <div className="maps_view_more_electr_card">
                {/* row */}
                <div className="maps_view_more_info_card_item 1">
                  <div className="normal_flex_card">
                    <FormOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />

                    <h4>
                      {t("dashboardPageData.lastStationsData.electryName")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.name}
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 2">
                  <div className="normal_flex_card">
                    <QrcodeOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.electryCode")}:{" "}
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.code}
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 3">
                  <div className="normal_flex_card">
                    <SettingOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.aggrigateTitle")}:{" "}
                    </h4>
                  </div>
                  <h4 className="dashboard_view_more_import_data">
                    {item.workingStatus
                      ? t("dashboardPageData.lastStationsData.agrigateStatus")
                      : t("dashboardPageData.lastStationsData.agrigateStatus2")}
                  </h4>
                </div>

                {/* row */}

                <div className="maps_view_more_info_card_item 4">
                  <div className="normal_flex_card">
                    <ThunderboltOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.electryVolt")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.voltage1} V
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 5">
                  <div className="normal_flex_card">
                    <BulbOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />

                    <h4>
                      {t("dashboardPageData.lastStationsData.electryAmper")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.current1} A
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 6">
                  <div className="normal_flex_card">
                    <PoweroffOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />

                    <h4>
                      {t("dashboardPageData.lastStationsData.powerActive")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.powerActive} Kw
                  </h4>
                </div>

                {/* row */}

                <div className="maps_view_more_info_card_item 7">
                  <div className="normal_flex_card">
                    <ThunderboltOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />

                    <h4>
                      {t("dashboardPageData.lastStationsData.electryVolt")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.voltage2} V
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 8">
                  <div className="normal_flex_card">
                    <BulbOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.electryAmper")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.current2} A
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 9">
                  <div className="normal_flex_card">
                    <PoweroffOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.powerReactive")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.powerReactive} Kw
                  </h4>
                </div>

                {/* row */}

                <div className="maps_view_more_info_card_item 10">
                  <div className="normal_flex_card">
                    <ThunderboltOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.electryVolt")}:
                    </h4>
                  </div>
                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.voltage3} V
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 11">
                  <div className="normal_flex_card">
                    <BulbOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.electryAmper")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.current3} A
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 12">
                  <div className="normal_flex_card">
                    <PieChartFilled
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />

                    <h4>
                      {t(
                        "dashboardPageData.lastStationsData.energyActiveTotal"
                      )}
                      :
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.energyActiveTotal}{" "}
                    {t("dashboardPageData.lastStationsData.energyValueView")}
                  </h4>
                </div>

                {/* row */}

                <div className="maps_view_more_info_card_item 13">
                  <div className="normal_flex_card">
                    <DashboardOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.energyActive")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.energyActive}{" "}
                    {t("dashboardPageData.lastStationsData.energyValueView")}
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 14">
                  <div className="normal_flex_card">
                    <LineChartOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.powerActive")}:{" "}
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.powerActive} Kw
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 15">
                  <div className="normal_flex_card">
                    <PieChartFilled
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t(
                        "dashboardPageData.lastStationsData.energyReactiveTotal"
                      )}
                      :{" "}
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.energyReactiveTotal}{" "}
                    {t("dashboardPageData.lastStationsData.energyValueView")}
                  </h4>
                </div>

                {/* row */}

                <div className="maps_view_more_info_card_item 16">
                  <div className="normal_flex_card">
                    <DashboardOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.energyReactive")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.energyReactive}{" "}
                    {t("dashboardPageData.lastStationsData.energyValueView")}
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 17">
                  <div className="normal_flex_card">
                    <LineChartOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.powerReactive")}:{" "}
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.electricalEnergyLastData.powerReactive} Kw
                  </h4>
                </div>

                <div className="maps_view_more_info_card_item 18">
                  <div className="normal_flex_card">
                    <FieldTimeOutlined
                      style={{
                        color: "#11a9ff",
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <h4>
                      {t("dashboardPageData.lastStationsData.aggrigateTime")}:{" "}
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {formatDate(item.electricalEnergyLastData?.date)}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MapsPage;
