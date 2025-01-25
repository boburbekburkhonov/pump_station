/** @format */

import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { findByIdStationsData } from "../../redux/actions/stationsActions";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import {
  LeftCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  IdcardOutlined,
  ApiOutlined,
  BankOutlined,
  GlobalOutlined,
  CloseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import Loading from "../../components/loading";
import "./index.css";
import MapComponent from "../../components/mapLocationComponent";

function StationsInformations() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { stationData } = useSelector((state) => state.stations);

  const token = localStorage.getItem("access_token");

  const fetchAllData = useCallback(() => {
    dispatch(findByIdStationsData(params.id, token, i18n.language));
  }, [dispatch, token, i18n.language]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);

  const lat = stationData?.location?.split("-")[0];
  const lng = stationData?.location?.split("-")[1];

  return (
    <section className='stations_sections'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='stations_item_header_container'>
            <Button
              onClick={() => navigate("/stations")}
              type='primary'
              key='back'
              icon={
                <LeftCircleOutlined
                  style={{
                    fontSize: "18px",
                  }}
                />
              }
            />
          </div>
          <div className='stations_item_data'>
            <Card
              bordered={false}
              style={{
                background: colors.layoutBackground,
              }}
              type='inner'
              className='stations_more_info_container'>
              <h1 className='stations_more_info_header'>{stationData.name}</h1>

              <div className='stations_more_info_card'>
                <div className='stations_more_info_item'>
                  <div
                    style={{
                      background: colors.buttonColor,
                    }}
                    className='squer_card_custom'>
                    <BankOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: colors.textWhite,
                      }}
                    />
                  </div>
                  <h4>
                    {t("stationsPageData.stationsMoreInfo.organization")}:
                  </h4>
                </div>
                <h4>{stationData.organization}</h4>
              </div>

              <div className='stations_more_info_card'>
                <div className='stations_more_info_item'>
                  <div
                    style={{
                      background: colors.buttonColor,
                    }}
                    className='squer_card_custom'>
                    <GlobalOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: colors.textWhite,
                      }}
                    />
                  </div>

                  <h4>{t("stationsPageData.stationsMoreInfo.region")}:</h4>
                </div>
                <h4>{stationData.region}</h4>
              </div>

              <div className='stations_more_info_card'>
                <div className='stations_more_info_item'>
                  <div
                    style={{
                      background: colors.buttonColor,
                    }}
                    className='squer_card_custom'>
                    <EnvironmentOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: colors.textWhite,
                      }}
                    />
                  </div>
                  <h4>{t("stationsPageData.stationsMoreInfo.district")}:</h4>
                </div>
                <h4>{stationData.district}</h4>
              </div>

              <div className='stations_more_info_card'>
                <div className='stations_more_info_item'>
                  <div
                    style={{
                      background: colors.buttonColor,
                    }}
                    className='squer_card_custom'>
                    <PhoneOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: colors.textWhite,
                      }}
                    />
                  </div>
                  <h4>
                    {t("stationsPageData.stationsMoreInfo.devicePhoneNum")}:
                  </h4>
                </div>
                <h4>{stationData.devicePhoneNum}</h4>
              </div>

              <div className='stations_more_info_card'>
                <div className='stations_more_info_item'>
                  <div
                    style={{
                      background: colors.buttonColor,
                    }}
                    className='squer_card_custom'>
                    <ApiOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: colors.textWhite,
                      }}
                    />
                  </div>
                  <h4>
                    {t("stationsPageData.stationsMoreInfo.isIntegration")}:
                  </h4>
                </div>
                <h4>
                  {stationData.isIntegration
                    ? t("stationsPageData.tableData1")
                    : t("stationsPageData.tableData2")}
                </h4>
              </div>

              <div className='stations_more_info_card'>
                <div className='stations_more_info_item'>
                  <div
                    style={{
                      background: colors.buttonColor,
                    }}
                    className='squer_card_custom'>
                    <CheckCircleOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: colors.textWhite,
                      }}
                    />
                  </div>
                  <h4>
                    {t(
                      "stationsPageData.stationsMoreInfo.haveElectricalEnergy"
                    )}
                    :
                  </h4>
                </div>
                <h4>
                  {stationData.haveElectricalEnergy
                    ? t("stationsPageData.tableData1")
                    : t("stationsPageData.tableData2")}
                </h4>
              </div>

              <div className='stations_more_info_card'>
                <div className='stations_more_info_item'>
                  <div
                    style={{
                      background: colors.buttonColor,
                    }}
                    className='squer_card_custom'>
                    <IdcardOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: colors.textWhite,
                      }}
                    />
                  </div>
                  <h4>{t("stationsPageData.stationsMoreInfo.id")}:</h4>
                </div>
                <h4>{stationData.id}</h4>
              </div>
            </Card>

            <div className='map_container_sections'>
              {lat && lng ? (
                <MapComponent
                  title={t("stationsPageData.stationsMoreInfo.location")}
                  lat={parseFloat(lat)}
                  lng={parseFloat(lng)}
                />
              ) : (
                <p>Koordinatalar mavjud emas!</p>
              )}
            </div>
          </div>

          <div className='more_info_header_data'>
            <h2>{t("stationsPageData.stationsMoreInfo.stationsAggrigats")}</h2>
          </div>

          <div className='grid_electr_and_agrigate'>
            {stationData.aggregate?.map((item, index) => (
              <Card
                key={index}
                bordered={false}
                style={{
                  background: colors.layoutBackground,
                }}
                type='inner'>
                <h1 className='stations_more_info_header'>{item.name}</h1>

                <div className='stations_more_info_card'>
                  <div className='stations_more_info_item'>
                    <div
                      style={{
                        background: colors.buttonColor,
                      }}
                      className='squer_card_custom'>
                      <IdcardOutlined
                        style={{
                          fontSize: "1.3rem",
                          color: colors.textWhite,
                        }}
                      />
                    </div>
                    <h4>{t("stationsPageData.stationsMoreInfo.code")}:</h4>
                  </div>
                  <h4>{item.code}</h4>
                </div>

                <div className='stations_more_info_card'>
                  <div className='stations_more_info_item'>
                    <div
                      style={{
                        background: colors.buttonColor,
                      }}
                      className='squer_card_custom'>
                      <CloseCircleOutlined
                        style={{
                          fontSize: "1.3rem",
                          color: colors.textWhite,
                        }}
                      />
                    </div>

                    <h4>
                      {t("stationsPageData.stationsMoreInfo.defectionStatus")}:
                    </h4>
                  </div>

                  <h4>
                    {item.defectionStatus
                      ? t("stationsPageData.tableData1")
                      : t("stationsPageData.tableData2")}
                  </h4>
                </div>

                <div className='stations_more_info_card'>
                  <div className='stations_more_info_item'>
                    <div
                      style={{
                        background: colors.buttonColor,
                      }}
                      className='squer_card_custom'>
                      <PlayCircleOutlined
                        style={{
                          fontSize: "1.3rem",
                          color: colors.textWhite,
                        }}
                      />
                    </div>

                    <h4>
                      {t("stationsPageData.stationsMoreInfo.workingStatus")}:
                    </h4>
                  </div>

                  <h4>
                    {item.workingStatus
                      ? t("dashboardPageData.lastStationsData.agrigateStatus")
                      : t("dashboardPageData.lastStationsData.agrigateStatus2")}
                  </h4>
                </div>
              </Card>
            ))}
          </div>

          <div className='more_info_header_data'>
            <h2>{t("stationsPageData.stationsMoreInfo.stationsElectrs")}</h2>
          </div>

          
          <div className='grid_electr_and_agrigate'>
            {stationData.electricalEnergy?.map((item, index) => (
              <Card
                key={index}
                bordered={false}
                style={{
                  background: colors.layoutBackground,
                }}
                type='inner'>
                <h1 className='stations_more_info_header'>{item.name}</h1>

                <div className='stations_more_info_card'>
                  <div className='stations_more_info_item'>
                    <div
                      style={{
                        background: colors.buttonColor,
                      }}
                      className='squer_card_custom'>
                      <IdcardOutlined
                        style={{
                          fontSize: "1.3rem",
                          color: colors.textWhite,
                        }}
                      />
                    </div>
                    <h4>{t("stationsPageData.stationsMoreInfo.code")}:</h4>
                  </div>
                  <h4>{item.code}</h4>
                </div>

                <div className='stations_more_info_card'>
                  <div className='stations_more_info_item'>
                    <div
                      style={{
                        background: colors.buttonColor,
                      }}
                      className='squer_card_custom'>
                      <CloseCircleOutlined
                        style={{
                          fontSize: "1.3rem",
                          color: colors.textWhite,
                        }}
                      />
                    </div>

                    <h4>
                      {t("stationsPageData.stationsMoreInfo.defectionStatus")}:
                    </h4>
                  </div>

                  <h4>
                    {item.defectionStatus
                      ? t("stationsPageData.tableData1")
                      : t("stationsPageData.tableData2")}
                  </h4>
                </div>

                <div className='stations_more_info_card'>
                  <div className='stations_more_info_item'>
                    <div
                      style={{
                        background: colors.buttonColor,
                      }}
                      className='squer_card_custom'>
                      <PlayCircleOutlined
                        style={{
                          fontSize: "1.3rem",
                          color: colors.textWhite,
                        }}
                      />
                    </div>

                    <h4>
                      {t("stationsPageData.stationsMoreInfo.workingStatus")}:
                    </h4>
                  </div>

                  <h4>
                    {item.workingStatus
                      ? t("dashboardPageData.lastStationsData.agrigateStatus")
                      : t("dashboardPageData.lastStationsData.agrigateStatus2")}
                  </h4>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default StationsInformations;
