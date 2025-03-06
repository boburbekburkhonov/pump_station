/** @format */

import React, { useEffect, useCallback, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button, Card, Modal, Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ThunderboltOutlined,
  PoweroffOutlined,
  BulbOutlined,
  DashboardOutlined,
  NodeIndexOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./index.css";
import "../maps/index.css";
import "../dashboard/index.css";
import "../data/index.css";
import {
  createNewLastDataStation,
  findInMapsLastData,
  findLastStationsData,
} from "../../redux/actions/stationsActions";
import Loading from "../../components/loading/index";
import CheckBookmark from "../../assets/bookmark.svg";
import UnCheckBookmark from "../../assets/bookmarkCheck.svg";
import moreInfo from "../../assets/info.png";
import EmptyCard from "../../components/emptyCard";

function ElectrPage() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const token = localStorage.getItem("access_token");

  const { colors, theme } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.alert);
  const { stationsMap, stationsLoading, stationsLastData, stationsId } =
    useSelector((state) => state.stations);

  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [count, setCount] = useState(1);
  const [oneStationLastData, setOneStationLastData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;
    const { page, perPage } = pageData;

    dispatch(findInMapsLastData(lang, token, page, perPage));
    dispatch(findLastStationsData(lang, token));
  }, [dispatch, token, i18n.language, pageData, count]);

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
      localStorage.setItem("localStationsId", JSON.stringify([...stationsId]));
    }
  }, [stationsId]);

  const handleChangeSelectStationData = (id) => {
    const userId = Cookies.get("userId");
    const lang = i18n.language;
    const local = JSON.parse(localStorage.getItem("localStationsId")) || [];

    let existingIds = [...local];

    if (existingIds.includes(id)) {
      existingIds = existingIds.filter((existingId) => existingId !== id);
    } else {
      existingIds.push(id);
    }

    localStorage.setItem("localStationsId", JSON.stringify(existingIds));

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
    setCount(count + 1);
  };

  const handlePaginationChange = (page, size) => {
    const lang = i18n.language;

    dispatch(findInMapsLastData(lang, token, page, size));

    setPageData({
      page: page,
      perPage: size,
    });
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

  if (stationsLoading || loading)
    return (
      <section className="data_main_sections">
        <Loading />
      </section>
    );

  return (
    <section className="data_main_sections">
      {/* MODAL */}
      <Modal
        title={
          <div
            style={{
              color: "#405FF2",
              textAlign: "center",
              borderBottom: "3px solid rgb(209, 209, 209)",
              paddingBottom: "15px",
              fontWeight: "600",
            }}
          >
            {`${oneStationLastData?.name} ${t("dashboardPageData.filterTitle")
              .split(" ")
              .slice(2)
              .join(" ")}`}
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
        width={
          oneStationLastData?.electricalEnergyLastData[0]
            ?.electricalEnergyLastData == undefined
            ? "30vw"
            : oneStationLastData?.electricalEnergyLastData.length == 1
            ? "22vw"
            : oneStationLastData?.electricalEnergyLastData.length == 2
            ? "40vw"
            : oneStationLastData?.electricalEnergyLastData.length > 2
            ? "60vw"
            : {
                xs: "90vw",
                sm: "80vw",
                md: "70vw",
                lg: "60vw",
                xl: "50vw",
                xxl: "40vw",
              }
        }
        styles={{
          body: {
            maxHeight: "60vh",
            overflowY: "scroll",
          },
        }}
      >
        {oneStationLastData?.electricalEnergyLastData[0]
          ?.electricalEnergyLastData == undefined ? (
          <EmptyCard />
        ) : (
          <>
            <div className="modal_wrapper_of_electr_energy">
              <h2>
                {t(
                  "dashboardPageData.lastStationsData.headingElectrEnergyModal"
                )}
              </h2>

              <div
                className="modal_wrapper_of_body_electy_energy"
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
                {oneStationLastData?.electricalEnergyLastData.map((e, i) => {
                  return (
                    <div
                      className="modal_aggregate_wrapper modal_electr_one_energy_wrapper"
                      key={i}
                      onClick={() =>
                        navigate(
                          `/electrical/infos/${e?.electricalEnergyLastData?.electricalEnergyId}`
                        )
                      }
                    >
                      <div
                        className="modal_aggregate_wrapper_item modal_aggregate_wrapper_item_name"
                        style={{
                          borderBottom: `3px solid ${statusOfAggregateAndElectrEnergy(
                            {
                              workingStatus: e.workingStatus,
                              defectionStatus: e.defectionStatus,
                            }
                          )}`,
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
                          <DashboardOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.energyActive"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.energyActive}{" "}
                          {t(
                            "dashboardPageData.lastStationsData.energyValueView"
                          )}
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <DashboardOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.energyReactive"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.energyReactive}{" "}
                          {t(
                            "dashboardPageData.lastStationsData.energyValueView"
                          )}
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <PoweroffOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.powerActive"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.powerActive} kw
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <ThunderboltOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.electryVoltage1"
                            )}
                            : :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.voltage1} V
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <BulbOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.electryCurrent1"
                            )}
                            : :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.current1} A
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <ThunderboltOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.electryVoltage2"
                            )}
                            : :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.voltage2} V
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <BulbOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.electryCurrent2"
                            )}
                            : :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.current2} A
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <ThunderboltOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.electryVoltage3"
                            )}
                            : :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.voltage3} V
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <BulbOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.electryCurrent3"
                            )}
                            : :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.electricalEnergyLastData?.current3} A
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <ClockCircleOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.aggrigateTime"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {fixDate(e.electricalEnergyLastData?.date)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </Modal>
      <div className="data_main_header">
        <h1>{t("dataPagesInformation.dataHeaderElecrtTitle")}</h1>
      </div>

      <div
        style={{
          background: colors.layoutBackground,
          minHeight: "85vh",
          paddingBottom: "40px",
        }}
        className="data_page_main_stations_info_container"
      >
        <div className="data_page_main_stations_info">
          {stationsMap?.data?.map((item, index) => {
            const allElectrData = item.electricalEnergyLastData?.reduce(
              (acc, itemAg) => {
                const energyActiveTotal =
                  itemAg?.electricalEnergyLastData?.energyActiveTotal;

                const energyReactiveTotal =
                  itemAg?.electricalEnergyLastData?.energyReactiveTotal;

                return {
                  energyActiveTotal:
                    acc.energyActiveTotal +
                    (energyActiveTotal ? +energyActiveTotal : 0) /
                      item?.electricalEnergyLastData?.length,
                  energyReactiveTotal:
                    acc.energyReactiveTotal +
                    (energyReactiveTotal ? +energyReactiveTotal : 0) /
                      item?.electricalEnergyLastData?.length,
                };
              },
              { energyActiveTotal: 0, energyReactiveTotal: 0 }
            ) || { energyActiveTotal: 0, energyReactiveTotal: 0 };

            return (
              <Card
                key={index}
                type="inner"
                className="data_paga_card_element"
                style={{
                  background: colors.blurBgColor2,
                  maxWidth: "360px",
                }}
              >
                <div
                  className="data_page_card_header"
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
                      item.selectionDashboard ? CheckBookmark : UnCheckBookmark
                    }
                    alt="Images"
                    onClick={() => handleChangeSelectStationData(item?.id)}
                  />

                  <h1>{item.name}</h1>

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

                <div
                  className="data_page_aggrigate_container"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    findOneStationById(item.id);
                    setModalOpen(true);
                  }}
                >
                  <div
                    className="all_stations_data_page_aggrigate_card_item"
                    style={{
                      backgroundColor: colors.backgroundColor,
                    }}
                  >
                    <div className="all_stations_data_page_aggrigate_item">
                      <div
                        className="all_stations_data_item"
                        style={{ marginTop: "10px" }}
                      >
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

                      <div
                        className="all_stations_data_item"
                        style={{ marginTop: "12px" }}
                      >
                        <div className="normal_flex_card">
                          <BulbOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dataPagesInformation.allStationsElektrReactiveEnergy"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className="all_stations_data_item_import_data">
                          {allElectrData.energyReactiveTotal} kw
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Pagination
          className="data_pagination_info"
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

export default ElectrPage;
