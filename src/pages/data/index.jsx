/** @format */

import React, {
  useEffect,
  useCallback,
  useState,
  memo,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button, Card, Modal, Pagination } from "antd";

import {
  NodeIndexOutlined,
  FormOutlined,
  QrcodeOutlined,
  SettingOutlined,
  AreaChartOutlined,
  ExperimentOutlined,
  FieldTimeOutlined,
  ArrowRightOutlined,
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
import { Link } from "react-router-dom";
import CheckBookmark from "../../assets/bookmark.svg";
import UnCheckBookmark from "../../assets/bookmarkCheck.svg";

const ViewMoreModal = memo(({ openModalData, closeModal, modalData, colors, t }) => {

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

          <h4 className="dashboard_view_more_import_data">{modalData.name}</h4>
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

          <h4 className="dashboard_view_more_import_data">{modalData.code}</h4>
        </div>

        <div className="dashboard_view_more_modal_card_item">
          <div className="normal_flex_card">
            <SettingOutlined
              style={{
                color: "#11A9FF",
              }}
              className="dashboard_last_data_icons"
            />
            <h4>{t("dashboardPageData.lastStationsData.aggrigateTitle")}: </h4>
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
});

function DataPage() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const token = localStorage.getItem("access_token");

  const { colors, theme } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.alert);
  const { stationsMap, stationsLoading, stationsLastData, stationsId } =
    useSelector((state) => state.stations);

  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 6,
  });
  const [openModalData, setOpenModaldata] = useState(false);
  const [modalData, setModalData] = useState({});
  const [localStationsId, setLocalStationsId] = useState([...stationsId]);

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;
    const { page, perPage } = pageData;

    dispatch(findInMapsLastData(lang, token, page, perPage));
    dispatch(findLastStationsData(lang, token));
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

  const handleOpenModal = (data) => {
    setOpenModaldata(true);
    setModalData(data);
  };

  const handleCloseModal = () => {
    setOpenModaldata(false);
    setModalData({});
  };

  if (stationsLoading || loading)
    return (
      <section className="data_main_sections">
        <Loading />
      </section>
    );

  return (
    <section className="data_main_sections">
      <div className="data_main_header">
        <h1>{t("dataPagesInformation.dataHeaderTitle")}</h1>
      </div>

      <div
        style={{
          background: colors.layoutBackground,
        }}
        className="data_page_main_stations_info_container"
      >
        <div className="data_page_main_stations_info">
          {stationsMap?.data?.map((item, index) => (
            <Card key={index} type="inner" className="data_paga_card_element">
              <div className="data_page_card_header">
                <h1>{item.name}</h1>

                <div style={{
                  display: "flex"
                }}>
                  {item.status ? (
                    <span className="active_indicator">{t("dataPagesInformation.active_indicator")}</span>
                  ) : (
                    <span className="not_active_indicator">{t("dataPagesInformation.not_active_indicator")}</span>
                  )}

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
                </div>
              </div>

              <div className="data_page_aggrigate_container">
                {item.aggregate?.map((itemAg, indexAg) => (
                  <div
                    className="data_page_aggrigate_card_item"
                    key={indexAg}
                    onClick={() => handleOpenModal(itemAg)}
                  >
                    <div className="data_page_aggrigate_card_item_header_wrapper">
                      <h3>{itemAg.name}</h3>
                      {itemAg.workingStatus ? (
                        <span className="active_indicator">{t("dataPagesInformation.active_indicator")}</span>
                      ) : (
                        <span className="not_active_indicator">{t("dataPagesInformation.not_active_indicator")}</span>
                      )}
                    </div>
                    <div className="data_page_aggrigate_item">
                      <div className="dashboard_view_more_modal_card_item">
                        <div className="normal_flex_card">
                          <AreaChartOutlined
                            style={{
                              color: colors.textColor,
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
                          {itemAg.pumpLastData?.totalsVolume} m³
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item dashboard_view_more_modal_card_item_extra_name">
                        <div className="normal_flex_card">
                          <ExperimentOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.agrigateSpeed"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className="dashboard_view_more_import_data">
                          {itemAg.pumpLastData?.flow}{" "}
                          {t(
                            "dashboardPageData.lastStationsData.aggrigateSpeedConst"
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Pagination
          current={pageData.page}
          onChange={handlePaginationChange}
          total={stationsMap?.totalDocuments}
          pageSize={pageData.perPage}
          align="end"
        />
      </div>

      <ViewMoreModal
        openModalData={openModalData}
        closeModal={handleCloseModal}
        modalData={modalData}
        t={t}
        colors={colors}
      />
    </section>
  );
}

export default DataPage;
