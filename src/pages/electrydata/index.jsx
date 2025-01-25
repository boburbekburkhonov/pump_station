/** @format */

import React, {
  useEffect,
  useCallback,
  useState,
  memo,
  useTransition,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button, Card, Modal, Pagination } from "antd";
import { Link } from "react-router-dom";
import {
  ArrowRightOutlined,
  FormOutlined,
  QrcodeOutlined,
  SettingOutlined,
  FieldTimeOutlined,
  ThunderboltOutlined,
  PoweroffOutlined,
  BulbOutlined,
  LineChartOutlined,
  DashboardOutlined,
  PieChartFilled,
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
import { formatDate } from "../../utils/inputElementHandler";
import Loading from "../../components/loading/index";
import CheckBookmark from "../../assets/bookmark.svg";
import UnCheckBookmark from "../../assets/bookmarkCheck.svg";

const ViewMoreModal = memo(({ openModalData, closeModal, modalData, t, colors }) => {

  return (
    <Modal
      key='aggregate_modal'
      title={false}
      open={openModalData}
      centered
      onCancel={closeModal}
      footer={null}
      style={{
        color: colors.textColor,
      }}
      className='dashboard_view dashboard_view_extra_name'>
      <div className='dashboard_view_more_modal_card'>
        <div
          className='dashboard_view_more_modal_card dashboard_view_more_modal_card_extra_name'
          style={{
            background: colors.background,
            boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
          }}>
          <div className='dashboard_view_more_electr_card'>
            <div className='dashboard_view_more_modal_card_item 1'>
              <div className='normal_flex_card'>
                <FormOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />

                <h4>{t("dashboardPageData.lastStationsData.electryName")}:</h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.name}
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 2'>
              <div className='normal_flex_card'>
                <QrcodeOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>{t("dashboardPageData.lastStationsData.electryCode")}: </h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.code}
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 3'>
              <div className='normal_flex_card'>
                <SettingOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>
                  {t("dashboardPageData.lastStationsData.aggrigateTitle")}:{" "}
                </h4>
              </div>
              <h4 className='dashboard_view_more_import_data'>
                {modalData.workingStatus
                  ? t("dashboardPageData.lastStationsData.agrigateStatus")
                  : t("dashboardPageData.lastStationsData.agrigateStatus2")}
              </h4>
            </div>

            {/* row */}

            <div className='dashboard_view_more_modal_card_item 4'>
              <div className='normal_flex_card'>
                <ThunderboltOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>{t("dashboardPageData.lastStationsData.electryVolt")}:</h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.voltage1} V
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 5'>
              <div className='normal_flex_card'>
                <BulbOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />

                <h4>{t("dashboardPageData.lastStationsData.electryAmper")}:</h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.current1} A
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 6'>
              <div className='normal_flex_card'>
                <PoweroffOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />

                <h4>{t("dashboardPageData.lastStationsData.powerActive")}:</h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.powerActive} Kw
              </h4>
            </div>

            {/* row */}

            <div className='dashboard_view_more_modal_card_item 7'>
              <div className='normal_flex_card'>
                <ThunderboltOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />

                <h4>{t("dashboardPageData.lastStationsData.electryVolt")}:</h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.voltage2} V
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 8'>
              <div className='normal_flex_card'>
                <BulbOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>{t("dashboardPageData.lastStationsData.electryAmper")}:</h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.current2} A
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 9'>
              <div className='normal_flex_card'>
                <PoweroffOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>
                  {t("dashboardPageData.lastStationsData.powerReactive")}:
                </h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.powerReactive} Kw
              </h4>
            </div>

            {/* row */}

            <div className='dashboard_view_more_modal_card_item 10'>
              <div className='normal_flex_card'>
                <ThunderboltOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>{t("dashboardPageData.lastStationsData.electryVolt")}:</h4>
              </div>
              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.voltage3} V
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 11'>
              <div className='normal_flex_card'>
                <BulbOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>{t("dashboardPageData.lastStationsData.electryAmper")}:</h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.current3} A
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 12'>
              <div className='normal_flex_card'>
                <PieChartFilled
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />

                <h4>
                  {t("dashboardPageData.lastStationsData.energyActiveTotal")}:
                </h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.energyActiveTotal}{" "}
                {t("dashboardPageData.lastStationsData.energyValueView")}
              </h4>
            </div>

            {/* row */}

            <div className='dashboard_view_more_modal_card_item 13'>
              <div className='normal_flex_card'>
                <DashboardOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>{t("dashboardPageData.lastStationsData.energyActive")}:</h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.energyActive}{" "}
                {t("dashboardPageData.lastStationsData.energyValueView")}
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 14'>
              <div className='normal_flex_card'>
                <LineChartOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>{t("dashboardPageData.lastStationsData.powerActive")}: </h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.powerActive} Kw
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 15'>
              <div className='normal_flex_card'>
                <PieChartFilled
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>
                  {t("dashboardPageData.lastStationsData.energyReactiveTotal")}:{" "}
                </h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.energyReactiveTotal}{" "}
                {t("dashboardPageData.lastStationsData.energyValueView")}
              </h4>
            </div>

            {/* row */}

            <div className='dashboard_view_more_modal_card_item 16'>
              <div className='normal_flex_card'>
                <DashboardOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>
                  {t("dashboardPageData.lastStationsData.energyReactive")}:
                </h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.energyReactive}{" "}
                {t("dashboardPageData.lastStationsData.energyValueView")}
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 17'>
              <div className='normal_flex_card'>
                <LineChartOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>
                  {t("dashboardPageData.lastStationsData.powerReactive")}:{" "}
                </h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {modalData.electricalEnergyLastData?.powerReactive} Kw
              </h4>
            </div>

            <div className='dashboard_view_more_modal_card_item 18'>
              <div className='normal_flex_card'>
                <FieldTimeOutlined
                  style={{
                    color: "#11A9FF",
                  }}
                  className='dashboard_last_data_icons'
                />
                <h4>
                  {t("dashboardPageData.lastStationsData.aggrigateTime")}:{" "}
                </h4>
              </div>

              <h4 className='dashboard_view_more_import_data'>
                {formatDate(modalData.electricalEnergyLastData?.date)}
              </h4>
            </div>
          </div>
          <div className='data_page_aggrigate_item_child_row'>
            <Button
              onClick={closeModal}
              type='default'
              style={{
                width: "110px",
              }}>
              {t("stationsPageData.cancelButtonModal")}
            </Button>
            <Link
              to={`/electrical/infos/${modalData?.electricalEnergyLastData?.electricalEnergyId}`}
              className='read_more_data_page_card'
              style={{
                width: "170px",
              }}>
              {t("stationsPageData.table14Data")}
              <ArrowRightOutlined className='read_more_data_page_card_button' />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
});

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
    perPage: 9,
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
      <section className='data_main_sections'>
        <Loading />
      </section>
    );

  return (
    <section className='data_main_sections'>
      <div className='data_main_header'>
        <h1>{t("dataPagesInformation.dataHeaderTitle")}</h1>
      </div>

      <div
        style={{
          background: colors.layoutBackground,
        }}
        className='data_page_main_stations_info_container'>
        <div className='data_page_main_stations_info'>
          {stationsMap?.data?.map((item, index) => (
            <Card key={index} type='inner' className='data_paga_card_element'>
              <div className='data_page_card_header'>
                <h1>{item.name}</h1>

                <div
                  style={{
                    display: "flex",
                  }}>
                  {item.status ? (
                    <span className='active_indicator'>
                      {t("dataPagesInformation.active_indicator")}
                    </span>
                  ) : (
                    <span className='not_active_indicator'>
                      {t("dataPagesInformation.not_active_indicator")}
                    </span>
                  )}

                  <img
                    style={{
                      filter: theme === "light" ? "invert(0)" : "invert(1)",
                    }}
                    className='save_action_data'
                    src={
                      filterStationsId(item?.id)
                        ? CheckBookmark
                        : UnCheckBookmark
                    }
                    alt='Images'
                    onClick={() => handleChangeSelectStationData(item?.id)}
                  />
                </div>
              </div>

              <div className='data_page_aggrigate_container'>
                {item.electricalEnergyLastData?.map((itemAg, indexAg) => (
                  <div
                    className='data_page_aggrigate_card_item'
                    key={indexAg}
                    onClick={() => handleOpenModal(itemAg)}>
                    <div className='data_page_aggrigate_card_item_header_wrapper'>
                      <h3>{itemAg.name}</h3>
                      {itemAg.workingStatus ? (
                        <span className='active_indicator'>
                          {t("dataPagesInformation.active_indicator")}
                        </span>
                      ) : (
                        <span className='not_active_indicator'>
                          {t("dataPagesInformation.not_active_indicator")}
                        </span>
                      )}
                    </div>
                    <div className='data_page_aggrigate_item'>
                      <div className='dashboard_view_more_modal_card_item'>
                        <div className='normal_flex_card'>
                          <ThunderboltOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className='dashboard_last_data_icons'
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryVolt"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className='dashboard_view_more_import_data'>
                          {itemAg.electricalEnergyLastData.voltage1} V
                        </h4>
                      </div>

                      <div className='dashboard_view_more_modal_card_item dashboard_view_more_modal_card_item_extra_name'>
                        <div className='normal_flex_card'>
                          <BulbOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className='dashboard_last_data_icons'
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryAmper"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className='dashboard_view_more_import_data'>
                          {itemAg.electricalEnergyLastData.current1} A
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
          align='end'
        />
      </div>

      <ViewMoreModal
        openModalData={openModalData}
        closeModal={handleCloseModal}
        modalData={modalData}
        colors={colors}
        t={t}
      />
    </section>
  );
}

export default ElectrPage;
