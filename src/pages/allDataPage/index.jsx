/** @format */

import React, { useEffect, useCallback, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button, Card, Modal, Pagination } from "antd";
import moreInfo from "../../assets/info.png";

import {
  NodeIndexOutlined,
  AreaChartOutlined,
  ExperimentOutlined,
  PieChartFilled,
  LineChartOutlined,
  DotChartOutlined,
  BgColorsOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import "./index.css";
import "../dashboard/index.css";
import {
  createNewLastDataStation,
  findInMapsLastData,
} from "../../redux/actions/stationsActions";
import Loading from "../../components/loading/index";
import CheckBookmark from "../../assets/bookmark.svg";
import UnCheckBookmark from "../../assets/bookmarkCheck.svg";
import { useNavigate } from "react-router-dom";

function AllDatapPage() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const { colors, theme } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.alert);
  const { stationsMap, stationsLoading, stationsId } = useSelector(
    (state) => state.stations
  );
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [localStationsId, setLocalStationsId] = useState([...stationsId]);
  const [modalOpen, setModalOpen] = useState(false);
  const [oneStationLastData, setOneStationLastData] = useState();

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;
    const { page, perPage } = pageData;

    dispatch(findInMapsLastData(lang, token, page, perPage));
  }, [dispatch, token, i18n.language, pageData]);

  useEffect(() => {
    fetchAllData();

    const handleLanguageChange = () => fetchAllData();
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [fetchAllData, i18n]);

  useEffect(() => {
    if (stationsId) {
      setLocalStationsId([...stationsId]);
    }
  }, [stationsId]);

  const filterStationsId = (id) => localStationsId.includes(id);

  const handleChangeSelectStationData = (id) => {
    const userId = Cookies.get("userId");
    const lang = i18n.language;

    let existingIds = [...localStationsId];

    if (existingIds.includes(id)) {
      existingIds = existingIds.filter((existingId) => existingId !== id);
    } else {
      existingIds = [...existingIds, id];
    }

    setLocalStationsId(existingIds);

    dispatch(
      createNewLastDataStation(
        lang,
        {
          userId,
          stationsIdList: existingIds,
        },
        token
      )
    );
  };

  const handlePaginationChange = (page, size) => {
    const lang = i18n.language;

    dispatch(findInMapsLastData(lang, token, page, size));

    setPageData({
      page: page,
      perPage: size,
    });
  };

  const handleOpenModal = (id) => {
    navigate(`/all/data/infos/${id}`);
  };

  const findOneStationById = (id) => {
    const foundStation = stationsMap.data?.find((e) => e.id == id);
    setOneStationLastData(foundStation);
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

  if (stationsLoading || loading)
    return (
      <section className="data_main_sections">
        <Loading />
      </section>
    );

  return (
    <section className="all_stations_data_view">
      {/* MODAL */}
      <Modal
        title={
          <div
            style={{
              color: "#405FF2",
              textAlign: "center",
              borderBottom: "3px solid rgb(209, 209, 209)",
              paddingBottom: "15px",
              fontWeight: '600'
            }}
          >
           {`${oneStationLastData?.name} ${t("dashboardPageData.filterTitle").split(' ').slice(2).join(' ')}`}
          </div>
        }
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setModalOpen(false)}>
            OK
          </Button>,
        ]}
        styles={{ body: { maxHeight: "60vh", overflowY: "scroll", display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', justifyContent: 'center', placeItems: 'center', gap: '15px', paddingTop: '15px'} }}
        width='60vw'
      >
        {oneStationLastData?.aggregate.map((e, i) => {
          return (
            <div className="modal_aggregate_wrapper" key={i}>
              <div className="modal_aggregate_wrapper_item modal_aggregate_wrapper_item_name">
                <h2 className="modal_aggregate_wrapper_item_name_heading">
                  {t("dashboardPageData.lastStationsData.agrigateName")}:
                </h2>

                <p className="modal_aggregate_wrapper_item_name_desc">
                  {e?.name}
                </p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <AreaChartOutlined
                    style={{
                      color: colors.textColor,
                    }}
                    className="dashboard_last_data_icons"
                  />

                  <h2>{t("dashboardPageData.lastStationsData.agrigateVolume")}:</h2>
                </div>

                <p>{e.pumpLastData?.volume} m³</p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <LineChartOutlined
                    style={{
                      color: colors.textColor,
                    }}
                    className="dashboard_last_data_icons"
                  />

                  <h2>{t("dashboardPageData.lastStationsData.agrigateVelocity")}:</h2>
                </div>

                <p>{e.pumpLastData?.velocity} m/s</p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <ExperimentOutlined
                    style={{
                      color: colors.textColor,
                    }}
                    className="dashboard_last_data_icons"
                  />

                  <h2>{t("dashboardPageData.lastStationsData.agrigateSpeed")}:</h2>
                </div>

                <p>{e.pumpLastData?.flow} m³/s</p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <BgColorsOutlined
                    style={{
                      color: colors.textColor,
                    }}
                    className="dashboard_last_data_icons"
                  />

                  <h2>{t("dashboardPageData.lastStationsData.agrigateDailyVolume")}:</h2>
                </div>

                <p>{e.pumpLastData?.todayTotalFlow} m³</p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <DotChartOutlined
                    style={{
                      color: colors.textColor,
                    }}
                    className="dashboard_last_data_icons"
                  />

                  <h2>{t("dashboardPageData.lastStationsData.agrigateTotalsVolume")}:</h2>
                </div>

                <p>{e.pumpLastData?.totalsVolume} m³</p>
              </div>

              <div className="modal_aggregate_wrapper_item">
                <div className="modal_aggregate_wrapper_item_left_wrapper">
                  <ClockCircleOutlined
                    style={{
                      color: colors.textColor,
                    }}
                    className="dashboard_last_data_icons"
                  />

                  <h2>{t("dashboardPageData.lastStationsData.aggrigateTime")}:</h2>
                </div>

                <p>{fixDate(e.pumpLastData?.date)}</p>
              </div>
            </div>
          );
        })}
      </Modal>

      <div className="header_all_stations_data">
        <h1>{t("dataPagesInformation.allStationsDataHead")}</h1>
      </div>

      <div
        style={{
          background: colors.layoutBackground,
        }}
        className="all_stations_data_stations_info"
      >
        <div className="all_stations_data_main_section">
          {stationsMap?.data?.map((item, index) => {
            const allAgrigateData = item.aggregate?.reduce(
              (acc, itemAg) => {
                const totalsVolume = itemAg?.pumpLastData?.totalsVolume;
                const velocity = itemAg?.pumpLastData?.velocity;

                return {
                  totalsVolume:
                    acc.totalsVolume +
                    (totalsVolume ? +totalsVolume : 0) /
                      item?.aggregate?.length,
                  velocity:
                    acc.velocity +
                    (velocity ? +velocity : 0) / item?.aggregate?.length,
                };
              },
              { totalsVolume: 0, velocity: 0 }
            ) || { totalsVolume: 0, velocity: 0 };

            const allElectrData = item.electricalEnergyLastData?.reduce(
              (acc, itemAg) => {
                const energyActiveTotal =
                  itemAg?.electricalEnergyLastData?.energyActiveTotal;

                return {
                  energyActiveTotal:
                    acc.energyActiveTotal +
                    (energyActiveTotal ? +energyActiveTotal : 0) /
                      item?.electricalEnergyLastData?.length,
                };
              },
              { energyActiveTotal: 0 }
            ) || { energyActiveTotal: 0 };

            return (
              <Card
                key={index}
                type="inner"
                className="all_stations_data_paga_card_element"
                style={{
                  background: colors.blurBgColor2,
                  maxWidth: "360px",
                }}
              >
                <div
                  className="all_stations_data_page_card_header"
                  style={{
                    borderBottom: `3px solid ${
                      item.status ? "#40C057" : "red"
                    }`,
                  }}
                >
                  <img
                    style={{
                      filter: theme === "light" ? "invert(0)" : "invert(1)",
                    }}
                    className="save_action_data"
                    src={
                      filterStationsId(item?.id)
                        ? CheckBookmark
                        : UnCheckBookmark
                    }
                    alt="Images"
                    onClick={() => handleChangeSelectStationData(item?.id)}
                  />

                  <h1>{item.name}</h1>

                  {/* <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {item.status ? (
                      <span className="active_indicator">
                        {t("dataPagesInformation.active_indicator")}
                      </span>
                    ) : (
                      <span className="not_active_indicator">
                        {t("dataPagesInformation.not_active_indicator")}
                      </span>
                    )}
                  </div> */}

                  <img
                    className="more_info__action_data"
                    src={moreInfo}
                    alt="moreInfo"
                    width={25}
                    height={25}
                    onClick={() => {
                      findOneStationById(item.id);
                      setModalOpen(true);
                    }}
                  />
                </div>

                <div className="all_stations_data_page_aggrigate_container">
                  <div
                    className="all_stations_data_page_aggrigate_card_item"
                    style={{
                      backgroundColor: colors.backgroundColor,
                    }}
                  >
                    {/* <div className='all_stations_data_page_aggrigate_card_item_header_wrapper'>
                      <h3>
                        {t("dataPagesInformation.allStationsAgrigateTitle")}
                      </h3>
                    </div> */}

                    <div className="all_stations_data_page_aggrigate_item">
                      <div className="all_stations_data_item">
                        <div className="normal_flex_card">
                          <AreaChartOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dataPagesInformation.allStationsAggrigatetotalsVolume"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className="all_stations_data_item_import_data">
                          {allAgrigateData.totalsVolume?.toFixed(2)} m³
                        </h4>
                      </div>

                      <div className="all_stations_data_item">
                        <div className="normal_flex_card">
                          <ExperimentOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dataPagesInformation.allStationsAggrigatetotalsFlow"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className="all_stations_data_item_import_data">
                          {allAgrigateData.velocity?.toFixed(2)}{" "}
                          {t(
                            "dashboardPageData.lastStationsData.aggrigateSpeedConst"
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div
                    className="all_stations_data_page_aggrigate_card_item"
                    style={{
                      backgroundColor: colors.backgroundColor,
                    }}
                  >
                    {/* <div className='all_stations_data_page_aggrigate_card_item_header_wrapper'>
                      <h3>
                        {t("dataPagesInformation.allStationsElectrTitle")}
                      </h3>
                    </div> */}

                    <div className="all_stations_data_page_aggrigate_item">
                      <div className="all_stations_data_item">
                        <div className="normal_flex_card">
                          <NodeIndexOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dataPagesInformation.allStationsElektrActiveEnergy"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className="all_stations_data_item_import_data">
                          {allElectrData.energyActiveTotal} kw
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="primary"
                  onClick={() => handleOpenModal(item.id)}
                  style={{
                    marginTop: 10,
                    width: "100%",
                  }}
                >
                  {t("stationsPageData.table14Data")}
                </Button>
              </Card>
            );
          })}
        </div>

        <Pagination
          current={pageData.page}
          onChange={handlePaginationChange}
          total={stationsMap?.totalDocuments}
          pageSize={pageData.perPage}
          align="end"
        />
      </div>
    </section>
  );
}

export default memo(AllDatapPage);
