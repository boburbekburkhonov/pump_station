/** @format */

import React, { useEffect, useCallback, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button, Card, Col, Input, Modal, Pagination, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ThunderboltOutlined,
  PoweroffOutlined,
  BulbOutlined,
  DashboardOutlined,
  NodeIndexOutlined,
  ClockCircleOutlined,
  SearchOutlined,
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

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [colSpan, setColSpan] = useState(8);
  const [count, setCount] = useState(1);
  const [oneStationLastData, setOneStationLastData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;

    dispatch(
      findInMapsLastData(lang, token, current, pageSize, undefined, status)
    );
    dispatch(findLastStationsData(lang, token));
  }, [dispatch, token, i18n.language, current, pageSize, count, status]);

  useEffect(() => {
    fetchAllData();

    const handleLanguageChange = () => fetchAllData();
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [fetchAllData, current, pageSize, i18n]);

  useEffect(() => {
    if (stationsId) {
      localStorage.setItem("localStationsId", JSON.stringify([...stationsId]));
    }
  }, [stationsId]);

  // Sahifadagi maksimal card sonini hisoblash
  const calculatePageSize = () => {
    const screenHeight = window.innerHeight;
    const navbarHeight = 160; // Navbar + pagination balandligi
    const availableHeight = screenHeight - navbarHeight;

    const estimatedRows = Math.floor(availableHeight / 220); // Har qator taxminan 200px
    const estimatedColumns = Math.floor(window.innerWidth / 400); // Har card 300px kenglikka ega deb hisoblaymiz
    const newPageSize = estimatedRows * estimatedColumns;

    setPageSize(newPageSize > 0 ? newPageSize : 1);
    setCount(count + 1);
  };

  // Ekran o'lchamiga qarab Col span o'zgaradi
  const updateColSpan = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 576) {
      setColSpan(24); // 1 ustun
    } else if (screenWidth < 992) {
      setColSpan(12); // 2 ustun
    } else {
      setColSpan(8); // 3 ustun
    }
  };

  useEffect(() => {
    calculatePageSize();
    updateColSpan();
    window.addEventListener("resize", calculatePageSize);
    window.addEventListener("resize", updateColSpan);
    return () => {
      window.removeEventListener("resize", calculatePageSize);
      window.removeEventListener("resize", updateColSpan);
    };
  }, [current, pageSize]);

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

    setCurrent(page);
    setPageSize(size);
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

  const handleInput = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchLastData = () => {
    const lang = i18n.language;

    if (searchText.length != 0) {
      dispatch(
        findInMapsLastData(
          lang,
          token,
          undefined,
          undefined,
          searchText,
          status
        )
      );
    }
  };

  if (stationsLoading || loading)
    return (
      <section className="data_main_sections">
        <Loading />
      </section>
    );

  const sortPagination = (item) => {
    const findHaveElectricity = item.data?.find(
      (e) => e.haveElectricalEnergy == true
    );

    if (findHaveElectricity == undefined) {
      return 1;
    } else {
      return item.totalDocuments;
    }
  };

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
        <h2>Stansiya qidirish</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        >
          <form
            style={{
              maxWidth: "480px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              paddingTop: "10px",
            }}
            onSubmit={handleSearchLastData}
          >
            <Input
              addonBefore={<SearchOutlined />}
              placeholder="Qidirish..."
              value={searchText}
              onChange={handleInput}
            />

            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              onClick={() => handleSearchLastData()}
            >
              Qidirish
            </Button>
          </form>

          <div className="filters_wrapper_btn">
            <Button
              style={{
                marginLeft: "10px",
                background: status == "" ? "#405FF2" : "#F4F8FF",
                color: status == "" ? "#fff" : "#000",
                border: status == "" ? "none" : "2px solid #000",
              }}
              type="primary"
              onClick={() => {
                setCurrent(1);
                setPageSize(6);
                setStatus("");
                setSearchText("");
              }}
            >
              <i className="fas fa-list icon"></i>{" "}
              {
                t("dashboardPageData.cardData", {
                  returnObjects: true,
                })[0]?.status
              }
            </Button>
            <Button
              style={{
                marginLeft: "10px",
                background: status == "true" ? "#28a745" : "#F4F8FF",
                color: status == "true" ? "#fff" : "#000",
                border: status == "true" ? "none" : "2px solid #000",
              }}
              type="primary"
              onClick={() => {
                setCurrent(1);
                setPageSize(6);
                setStatus("true");
                setSearchText("");
              }}
            >
              <i className="fas fa-check-circle icon"></i>{" "}
              {
                t("dashboardPageData.cardData", {
                  returnObjects: true,
                })[1]?.status
              }
            </Button>
            <Button
              style={{
                marginLeft: "10px",
                background: status == "false" ? "#dc3545" : "#F4F8FF",
                color: status == "false" ? "#fff" : "#000",
                border: status == "false" ? "none" : "2px solid #000",
              }}
              type="primary"
              onClick={() => {
                setCurrent(1);
                setPageSize(6);
                setStatus("false");
                setSearchText("");
              }}
            >
              <i className="fas fa-times-circle icon"></i>{" "}
              {
                t("dashboardPageData.cardData", {
                  returnObjects: true,
                })[2]?.status
              }
            </Button>
          </div>
        </div>

        <div>
          {stationsMap?.data?.length == 0 ||
          sortPagination(stationsMap) == 1 ? (
            <div
              style={{
                height: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmptyCard />
            </div>
          ) : (
            <>
              <Row
                className="all_stations_data_main_section"
                gutter={[16, 16]}
                justify="start"
              >
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
                    <Col
                      key={index}
                      span={colSpan}
                      style={{
                        maxWidth: "450px",
                        width: "100%",
                      }}
                    >
                      {item.haveElectricalEnergy ? (
                        <Card
                          key={index}
                          type="inner"
                          className="data_paga_card_element"
                          style={{
                            background: colors.blurBgColor2,
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
                                filter:
                                  theme === "light" ? "invert(0)" : "invert(1)",
                              }}
                              className="save_action_data"
                              src={
                                item.selectionDashboard
                                  ? CheckBookmark
                                  : UnCheckBookmark
                              }
                              alt="Images"
                              onClick={() =>
                                handleChangeSelectStationData(item?.id)
                              }
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
                      ) : (
                        ""
                      )}
                    </Col>
                  );
                })}
              </Row>

              <Pagination
                className="data_pagination_info"
                current={current}
                onChange={handlePaginationChange}
                total={sortPagination(stationsMap)}
                pageSize={pageSize}
                align="end"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ElectrPage;
