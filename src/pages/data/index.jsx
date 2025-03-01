/** @format */

import React, { useEffect, useCallback, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button, Card, Modal, Pagination } from "antd";
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
} from "@ant-design/icons";
import "./index.css";
import "../maps/index.css";
import "../dashboard/index.css";
import {
  createNewLastDataStation,
  findInMapsLastData,
  findLastStationsData,
} from "../../redux/actions/stationsActions";
import { formatDate } from "../../utils/inputElementHandler";
import Loading from "../../components/loading/index";
import { Link, useNavigate } from "react-router-dom";
import CheckBookmark from "../../assets/bookmark.svg";
import UnCheckBookmark from "../../assets/bookmarkCheck.svg";
import EmptyCard from "../../components/emptyCard";

const ViewMoreModal = memo(
  ({ openModalData, closeModal, modalData, colors, t }) => {
    return (
      <Modal
        key="aggregate_modal"
        title={false}
        open={openModalData}
        centered
        onCancel={closeModal}
        footer={null}
        style={{
          color: colors.textColor,
        }}
        className="dashboard_view"
      >
        <div className="dashboard_view_more_modal_card">
          <div className="dashboard_view_more_modal_card_item">
            <div className="normal_flex_card">
              <FormOutlined
                style={{
                  color: "#11A9FF",
                }}
                className="dashboard_last_data_icons"
              />

              <h4>{t("dashboardPageData.lastStationsData.agrigateName")}:</h4>
            </div>

            <h4 className="dashboard_view_more_import_data">
              {modalData.name}
            </h4>
          </div>

          <div className="dashboard_view_more_modal_card_item">
            <div className="normal_flex_card">
              <QrcodeOutlined
                style={{
                  color: "#11A9FF",
                }}
                className="dashboard_last_data_icons"
              />
              <h4>{t("dashboardPageData.lastStationsData.aggrigateCode")}: </h4>
            </div>

            <h4 className="dashboard_view_more_import_data">
              {modalData.code}
            </h4>
          </div>

          <div className="dashboard_view_more_modal_card_item">
            <div className="normal_flex_card">
              <SettingOutlined
                style={{
                  color: "#11A9FF",
                }}
                className="dashboard_last_data_icons"
              />
              <h4>
                {t("dashboardPageData.lastStationsData.aggrigateTitle")}:{" "}
              </h4>
            </div>
            <h4 className="dashboard_view_more_import_data">
              {modalData.workingStatus
                ? t("dashboardPageData.lastStationsData.agrigateStatus")
                : t("dashboardPageData.lastStationsData.agrigateStatus2")}
            </h4>
          </div>

          <div className="dashboard_view_more_modal_card_item">
            <div className="normal_flex_card">
              <AreaChartOutlined
                style={{
                  color: "#11A9FF",
                }}
                className="dashboard_last_data_icons"
              />
              <h4>{t("dashboardPageData.lastStationsData.agrigateSpeed")}: </h4>
            </div>
            <h4 className="dashboard_view_more_import_data">
              {modalData.pumpLastData?.velocity}{" "}
              {t("dashboardPageData.lastStationsData.aggrigateSpeedConst")}
            </h4>
          </div>

          <div className="dashboard_view_more_modal_card_item">
            <div className="normal_flex_card">
              <NodeIndexOutlined
                style={{
                  color: "#11A9FF",
                }}
                className="dashboard_last_data_icons"
              />
              <h4>
                {t("dashboardPageData.lastStationsData.aggrigateTotalFlow")}:{" "}
              </h4>
            </div>
            <h4 className="dashboard_view_more_import_data">
              {modalData.pumpLastData?.todayTotalFlow} m³
            </h4>
          </div>

          <div className="dashboard_view_more_modal_card_item">
            <div className="normal_flex_card">
              <ExperimentOutlined
                style={{
                  color: "#11A9FF",
                }}
                className="dashboard_last_data_icons"
              />
              <h4>
                {t("dashboardPageData.lastStationsData.aggrigateTotalVolume")}:{" "}
              </h4>
            </div>
            <h4 className="dashboard_view_more_import_data">
              {modalData.pumpLastData?.totalsVolume} m³
            </h4>
          </div>

          <div className="dashboard_view_more_modal_card_item">
            <div className="normal_flex_card">
              <FieldTimeOutlined
                style={{
                  color: "#11A9FF",
                }}
                className="dashboard_last_data_icons"
              />
              <h4>{t("dashboardPageData.lastStationsData.aggrigateTime")}: </h4>
            </div>

            <h4 className="dashboard_view_more_import_data">
              {formatDate(modalData.pumpLastData?.date)}
            </h4>
          </div>
          <div className="data_page_aggrigate_item_child_row">
            <Button
              onClick={closeModal}
              type="default"
              style={{
                width: "110px",
              }}
            >
              {t("stationsPageData.cancelButtonModal")}
            </Button>
            <Link
              to={`/agrigate/infos/${modalData?.pumpLastData?.aggregateId}`}
              className="read_more_data_page_card"
              style={{
                width: "170px",
              }}
            >
              {t("stationsPageData.table14Data")}
              <ArrowRightOutlined className="read_more_data_page_card_button" />
            </Link>
          </div>
        </div>
      </Modal>
    );
  }
);

function DataPage() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
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
  // {``}
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
        <h1>{t("dataPagesInformation.dataHeaderTitle")}</h1>
      </div>

      <div
        style={{
          background: colors.layoutBackground,
          minHeight: "85vh",
        }}
        className="data_page_main_stations_info_container"
      >
        <div className="data_page_main_stations_info">
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

                <div className="data_page_aggrigate_container">
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

                      <div className="data_item" style={{ marginTop: "10px" }}>
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
      {/* <ViewMoreModal
        openModalData={openModalData}
        closeModal={handleCloseModal}
        modalData={modalData}
        t={t}
        colors={colors}
      /> */}
    </section>
  );
}

export default DataPage;
