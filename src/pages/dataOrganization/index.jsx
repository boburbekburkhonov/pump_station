/** @format */

import React, { useEffect, useCallback, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button, Card, Col, Input, Modal, Pagination, Row, Select } from "antd";
import moreInfo from "../../assets/info.png";

import {
  NodeIndexOutlined,
  FormOutlined,
  QrcodeOutlined,
  SettingOutlined,
  AreaChartOutlined,
  ExperimentOutlined,
  FieldTimeOutlined,
  ArrowRightOutlined,
  LineChartOutlined,
  BgColorsOutlined,
  DotChartOutlined,
  ClockCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./index.css";
import "../maps/index.css";
import "../dashboard/index.css";
import {
  createNewLastDataStation,
  findInMapsLastData,
  findInMapsLastDataByDistrictId,
  findLastStationsData,
} from "../../redux/actions/stationsActions";
import { formatDate } from "../../utils/inputElementHandler";
import Loading from "../../components/loading/index";
import { Link, useNavigate } from "react-router-dom";
import CheckBookmark from "../../assets/bookmark.svg";
import UnCheckBookmark from "../../assets/bookmarkCheck.svg";
import EmptyCard from "../../components/emptyCard";
import { getByRegionIdData } from "../../redux/actions/districtActions";

function DataPage() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const { colors, theme } = useSelector((state) => state.theme);
  const { districtByRegionId } = useSelector((state) => state.district);
  const { loading } = useSelector((state) => state.alert);
  const {
    stationsMapByDistrictId,
    stationsLoading,
    stationsLastData,
    stationsId,
  } = useSelector((state) => state.stations);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [colSpan, setColSpan] = useState(8);
  const [count, setCount] = useState(1);
  const [oneStationLastData, setOneStationLastData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectDistrictId, setSelectDistrictId] = useState(0);
  const regionId = Cookies.get("regionId");
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;

    const districtId = districtByRegionId[selectDistrictId - 1]?.id;

    dispatch(
      findInMapsLastDataByDistrictId(
        lang,
        token,
        current,
        pageSize,
        districtId == undefined ? "" : districtId,
        undefined,
        status
      )
    );
    dispatch(findLastStationsData(lang, token));
    dispatch(getByRegionIdData(lang, token, regionId));
  }, [dispatch, token, i18n.language, current, pageSize, count, status]);

  const getAllStationsDataByDistrictId = (key) => {
    const lang = i18n.language;
    const districtId = districtByRegionId[key - 1]?.id;

    dispatch(
      findInMapsLastDataByDistrictId(
        lang,
        token,
        current,
        pageSize,
        districtId == undefined ? "" : districtId,
        undefined,
        status
      )
    );
  };

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
    const estimatedColumns = Math.floor(window.innerWidth / 290); // Har card 300px kenglikka ega deb hisoblaymiz
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
    const districtId = districtByRegionId[selectDistrictId - 1]?.id;

    dispatch(
      findInMapsLastDataByDistrictId(
        lang,
        token,
        page,
        size,
        districtId == undefined ? "" : districtId
      )
    );

    setCurrent(page);
    setPageSize(size);
  };

  const findOneStationById = (id) => {
    const foundStation = stationsMapByDistrictId.data?.find((e) => e.id == id);
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
    const districtId = districtByRegionId[selectDistrictId - 1]?.id;

    if (searchText.length != 0) {
      dispatch(
        findInMapsLastDataByDistrictId(
          lang,
          token,
          undefined,
          undefined,
          districtId == undefined ? "" : districtId,
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
            {`${oneStationLastData?.name}`}
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
          oneStationLastData?.aggregate[0]?.pumpLastData == undefined
            ? "30vw"
            : oneStationLastData?.aggregate.length == 1
            ? "22vw"
            : oneStationLastData?.aggregate.length == 2
            ? "40vw"
            : oneStationLastData?.aggregate.length > 2
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
        {oneStationLastData?.aggregate[0]?.pumpLastData == undefined ? (
          <EmptyCard />
        ) : (
          <>
            <div
              className="modal_wrapper_of_aggregate"
              style={{ width: "100%" }}
            >
              <h2>
                {t("dashboardPageData.lastStationsData.headingPumpModal")}
              </h2>
              <div
                className="modal_wrapper_of_body_electr"
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
                {oneStationLastData?.aggregate.map((e, i) => {
                  return (
                    <div
                      className="modal_electr_wrapper modal_electr_wrapper"
                      key={i}
                      onClick={() =>
                        navigate(
                          `/agrigate/infos/${e?.pumpLastData?.aggregateId}`
                        )
                      }
                    >
                      <div
                        className="modal_electr_wrapper_item modal_electr_wrapper_item_name"
                        style={{
                          borderBottom: `3px solid ${statusOfAggregateAndElectrEnergy(
                            {
                              workingStatus: e.workingStatus,
                              defectionStatus: e.defectionStatus,
                            }
                          )}`,
                        }}
                      >
                        <h2 className="modal_electr_wrapper_item_name_heading">
                          {t("dashboardPageData.lastStationsData.agrigateName")}
                          :
                        </h2>

                        <p className="modal_electr_wrapper_item_name_desc">
                          {e?.name}
                        </p>
                      </div>

                      <div className="modal_electr_wrapper_item">
                        <div className="modal_electr_wrapper_item_left_wrapper">
                          <AreaChartOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_electr_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateVolume"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_electr_wrapper_item_desc">
                          {e.pumpLastData?.volume} m³
                        </p>
                      </div>

                      <div className="modal_electr_wrapper_item">
                        <div className="modal_electr_wrapper_item_left_wrapper">
                          <LineChartOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_electr_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateVelocity"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_electr_wrapper_item_desc">
                          {e.pumpLastData?.velocity} m/s
                        </p>
                      </div>

                      <div className="modal_electr_wrapper_item">
                        <div className="modal_electr_wrapper_item_left_wrapper">
                          <ExperimentOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_electr_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateSpeed"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_electr_wrapper_item_desc">
                          {e.pumpLastData?.flow} m³/s
                        </p>
                      </div>

                      <div className="modal_electr_wrapper_item">
                        <div className="modal_electr_wrapper_item_left_wrapper">
                          <BgColorsOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_electr_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateDailyVolume"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_electr_wrapper_item_desc">
                          {e.pumpLastData?.todayTotalFlow} m³
                        </p>
                      </div>

                      <div className="modal_electr_wrapper_item">
                        <div className="modal_electr_wrapper_item_left_wrapper">
                          <DotChartOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_electr_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateTotalsVolume"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_electr_wrapper_item_desc">
                          {e.pumpLastData?.totalsVolume} m³
                        </p>
                      </div>

                      <div className="modal_electr_wrapper_item">
                        <div className="modal_electr_wrapper_item_left_wrapper">
                          <ClockCircleOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_electr_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.aggrigateTime"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_electr_wrapper_item_desc">
                          {fixDate(e.pumpLastData?.date)}
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
        <h1>{t("stationsPageData.stationsInputDestrict")}</h1>
      </div>

      <div
        className="reports_sort_select_wrapper"
        style={{ marginBottom: "10px" }}
      >
        <Select
          key={"selects_name"}
          size="large"
          style={{
            minWidth: 250,
          }}
          value={selectDistrictId}
          className="reports_sort_select"
          options={[
            {
              value: 0,
              label: t("stationsPageData.allDistricts"),
            }, // Qo'shimcha option
            ...districtByRegionId.map((item, index) => ({
              value: index + 1,
              label: item.name,
            })),
          ]}
          onChange={(key, option) => {
            setSelectDistrictId(key);
            getAllStationsDataByDistrictId(key);
            setCurrent(1);
          }}
        />
      </div>

      <div
        style={{
          background: colors.layoutBackground,
          minHeight: "85vh",
        }}
        className="data_page_main_stations_info_container"
      >
        <h2>Stansiya qidirish</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
                setSearchText('')
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
                setSearchText('')
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
                setSearchText('')
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

        <h2
          style={{
            margin: "5px 0",
          }}
        >
          {districtByRegionId[selectDistrictId - 1] == undefined
            ? t("stationsPageData.headingLastAggregateDataByDistrictId")
            : `${districtByRegionId[selectDistrictId - 1]?.name
                .split(" ")
                .slice(
                  0,
                  districtByRegionId[selectDistrictId - 1]?.name.split(" ")
                    .length - 1
                )
                .join(" ")} ${t(
                "stationsPageData.headingLastAggregateDataByOneDistrictId"
              )}`}
        </h2>

        {stationsMapByDistrictId.data?.length == 0 ? (
          <div
            style={{
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EmptyCard />
          </div>
        ) : (
          <>
            <div className="data_page_main_stations_info">
              <Row
                className="all_stations_data_main_section"
                gutter={[16, 16]}
                justify="start"
              >
                {stationsMapByDistrictId?.data?.map((item, index) => {
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

                  return (
                    <Col
                      key={index}
                      span={colSpan}
                      style={{
                        maxWidth: "360px",
                      }}
                    >
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
                            className="more_info__action_data_pump"
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
                            className="data_page_aggrigate_card_item"
                            style={{
                              backgroundColor: colors.backgroundColor,
                            }}
                          >
                            <div className="data_page_aggrigate_item">
                              <div className="data_item">
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
                                <h4 className="data_item_import_data">
                                  {allAgrigateData.totalsVolume?.toFixed(2)} m³
                                </h4>
                              </div>

                              <div
                                className="data_item"
                                style={{ marginTop: "4px" }}
                              >
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
                                <h4 className="data_item_import_data">
                                  {allAgrigateData.velocity?.toFixed(2)}{" "}
                                  {t(
                                    "dashboardPageData.lastStationsData.aggrigateSpeedConst"
                                  )}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>

            <Pagination
              className="data_pagination_info"
              current={current}
              onChange={handlePaginationChange}
              total={stationsMapByDistrictId?.totalDocuments}
              pageSize={pageSize}
              align="end"
            />
          </>
        )}
      </div>
    </section>
  );
}

export default DataPage;
