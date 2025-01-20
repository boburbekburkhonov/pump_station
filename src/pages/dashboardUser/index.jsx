/** @format */

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  useTransition,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Card, Select, Button, Modal } from "antd";
import { formatDate } from "../../utils/inputElementHandler";

import {
  EnvironmentOutlined,
  TeamOutlined,
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
} from "@ant-design/icons";

import {
  getAllStationsId,
  getStatisticsDashboard,
} from "../../redux/actions/dashboard";
import "../dashboard/index.css";
import { findLastStationsData } from "../../redux/actions/stationsActions";
import { iconData } from "../../data";
import {
  findTodayStatisticData,
  findYesterdayStatisticData,
  findWeeklyStatisticData,
  findMonthlyStatisticData,
  findYearsStatisticData,
} from "../../redux/actions/statisticPieActions";
import {
  findTodayLineStatisticData,
  findMonthlyLineStatisticData,
  findYesterdayLineStatisticData,
  findWeeklyLineStatisticData,
  findYearLineStatisticData,
} from "../../redux/actions/lineStatisticsActions";
import PieChart from "../../components/googlePieChart";
import EmptyCard from "../../components/emptyCard";
import SolarEmploymentChart from "../../components/googleNewPieChart";
import ViewStationModal from "../../components/stationsModalStatus/index";

const STATISTIC_CARDS_CHUNK = 3;
const STATISTIC_CARDS_CHUNK_NEXT = 7;

const StatisticCard = memo(
  ({ icon, color, status, countValue, cardStyle, onChangeModalData }) => (
    <Card
      bordered={false}
      style={cardStyle}
      type='inner'
      onClick={onChangeModalData}
      className='dashbord_card_element'>
      <div className='icon_box_card' style={{ background: color.blurBgColor }}>
        {icon}
      </div>

      <div>
        <h3>{countValue}</h3>
        <p>{status}</p>
      </div>
    </Card>
  )
);

const ViewMoreLastData = memo(({ openModalData, closeModal, colors, data, t }) => {

  return (
    <Modal
      key='aggregate_modal'
      title={data.name}
      open={openModalData}
      centered
      onCancel={closeModal}
      onOk={closeModal}
      cancelText={t("stationsPageData.cancelButtonModal")}
      style={{
        color: colors.textColor,
      }}
      className='dashboard_view_more_modal'>
      <div className='dashboard_view_more_modal_container'>
        <h2>
          {t("dashboardPageData.lastStationsData.stationsMoreInfoAgirgate")}
        </h2>
        <div className='dashboard_view_more_modal_info'>
          {data?.aggregate?.map((item, index) => (
            <div
              key={index}
              className='dashboard_view_more_modal_card'
              style={{
                background: colors.background,
                boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
              }}>
              <div className='dashboard_view_more_modal_card_item'>
                <div className='normal_flex_card'>
                  <FormOutlined
                    style={{
                      color: "#11A9FF",
                    }}
                    className='dashboard_last_data_icons'
                  />

                  <h4>
                    {t("dashboardPageData.lastStationsData.agrigateName")}:
                  </h4>
                </div>

                <h4 className='dashboard_view_more_import_data'>{item.name}</h4>
              </div>

              <div className='dashboard_view_more_modal_card_item'>
                <div className='normal_flex_card'>
                  <QrcodeOutlined
                    style={{
                      color: "#11A9FF",
                    }}
                    className='dashboard_last_data_icons'
                  />
                  <h4>
                    {t("dashboardPageData.lastStationsData.aggrigateCode")}:{" "}
                  </h4>
                </div>

                <h4 className='dashboard_view_more_import_data'>{item.code}</h4>
              </div>

              <div className='dashboard_view_more_modal_card_item'>
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
                  {item.workingStatus
                    ? t("dashboardPageData.lastStationsData.agrigateStatus")
                    : t("dashboardPageData.lastStationsData.agrigateStatus2")}
                </h4>
              </div>

              <div className='dashboard_view_more_modal_card_item'>
                <div className='normal_flex_card'>
                  <AreaChartOutlined
                    style={{
                      color: "#11A9FF",
                    }}
                    className='dashboard_last_data_icons'
                  />
                  <h4>
                    {t("dashboardPageData.lastStationsData.agrigateSpeed")}:{" "}
                  </h4>
                </div>
                <h4 className='dashboard_view_more_import_data'>
                  {item.pumpLastData?.velocity}{" "}
                  {t("dashboardPageData.lastStationsData.aggrigateSpeedConst")}
                </h4>
              </div>

              <div className='dashboard_view_more_modal_card_item'>
                <div className='normal_flex_card'>
                  <NodeIndexOutlined
                    style={{
                      color: "#11A9FF",
                    }}
                    className='dashboard_last_data_icons'
                  />
                  <h4>
                    {t("dashboardPageData.lastStationsData.aggrigateTotalFlow")}
                    :{" "}
                  </h4>
                </div>
                <h4 className='dashboard_view_more_import_data'>
                  {item.pumpLastData?.todayTotalFlow} m³
                </h4>
              </div>

              <div className='dashboard_view_more_modal_card_item'>
                <div className='normal_flex_card'>
                  <ExperimentOutlined
                    style={{
                      color: "#11A9FF",
                    }}
                    className='dashboard_last_data_icons'
                  />
                  <h4>
                    {t(
                      "dashboardPageData.lastStationsData.aggrigateTotalVolume"
                    )}
                    :{" "}
                  </h4>
                </div>
                <h4 className='dashboard_view_more_import_data'>
                  {item.pumpLastData?.totalsVolume} m³
                </h4>
              </div>

              <div className='dashboard_view_more_modal_card_item'>
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
                  {formatDate(item.pumpLastData?.date)}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {data?.electricalEnergyLastData?.length > 0 ? (
          <>
            <h2>
              {t("dashboardPageData.lastStationsData.stationsMoreInfoElectr")}
            </h2>
            <div className='dashboard_electr_modal_info'>
              {data?.electricalEnergyLastData?.map((item, index) => (
                <div
                  key={index}
                  className='dashboard_view_more_modal_card'
                  style={{
                    background: colors.background,
                    boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
                  }}>
                  <div className='dashboard_view_more_electr_card'>
                    {/* row */}
                    <div className='dashboard_view_more_modal_card_item 1'>
                      <div className='normal_flex_card'>
                        <FormOutlined
                          style={{
                            color: "#11A9FF",
                          }}
                          className='dashboard_last_data_icons'
                        />

                        <h4>
                          {t("dashboardPageData.lastStationsData.electryName")}:
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.name}
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
                        <h4>
                          {t("dashboardPageData.lastStationsData.electryCode")}:{" "}
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.code}
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
                          {t(
                            "dashboardPageData.lastStationsData.aggrigateTitle"
                          )}
                          :{" "}
                        </h4>
                      </div>
                      <h4 className='dashboard_view_more_import_data'>
                        {item.workingStatus
                          ? t(
                            "dashboardPageData.lastStationsData.agrigateStatus"
                          )
                          : t(
                            "dashboardPageData.lastStationsData.agrigateStatus2"
                          )}
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
                        <h4>
                          {t("dashboardPageData.lastStationsData.electryVolt")}:
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.voltage1} V
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

                        <h4>
                          {t("dashboardPageData.lastStationsData.electryAmper")}
                          :
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.current1} A
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

                        <h4>
                          {t("dashboardPageData.lastStationsData.powerActive")}:
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.powerActive} Kw
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

                        <h4>
                          {t("dashboardPageData.lastStationsData.electryVolt")}:
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.voltage2} V
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
                        <h4>
                          {t("dashboardPageData.lastStationsData.electryAmper")}
                          :
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.current2} A
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
                          {t(
                            "dashboardPageData.lastStationsData.powerReactive"
                          )}
                          :
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.powerReactive} Kw
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
                        <h4>
                          {t("dashboardPageData.lastStationsData.electryVolt")}:
                        </h4>
                      </div>
                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.voltage3} V
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
                        <h4>
                          {t("dashboardPageData.lastStationsData.electryAmper")}
                          :
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.current3} A
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
                          {t(
                            "dashboardPageData.lastStationsData.energyActiveTotal"
                          )}
                          :
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.energyActiveTotal}{" "}
                        {t(
                          "dashboardPageData.lastStationsData.energyValueView"
                        )}
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
                        <h4>
                          {t("dashboardPageData.lastStationsData.energyActive")}
                          :
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.energyActive}{" "}
                        {t(
                          "dashboardPageData.lastStationsData.energyValueView"
                        )}
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
                        <h4>
                          {t("dashboardPageData.lastStationsData.powerActive")}:{" "}
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.powerActive} Kw
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
                          {t(
                            "dashboardPageData.lastStationsData.energyReactiveTotal"
                          )}
                          :{" "}
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.energyReactiveTotal}{" "}
                        {t(
                          "dashboardPageData.lastStationsData.energyValueView"
                        )}
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
                          {t(
                            "dashboardPageData.lastStationsData.energyReactive"
                          )}
                          :
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.energyReactive}{" "}
                        {t(
                          "dashboardPageData.lastStationsData.energyValueView"
                        )}
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
                          {t(
                            "dashboardPageData.lastStationsData.powerReactive"
                          )}
                          :{" "}
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {item.electricalEnergyLastData.powerReactive} Kw
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
                          {t(
                            "dashboardPageData.lastStationsData.aggrigateTime"
                          )}
                          :{" "}
                        </h4>
                      </div>

                      <h4 className='dashboard_view_more_import_data'>
                        {formatDate(item.electricalEnergyLastData?.date)}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
});

function UserDashboard() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { statisticData, stationsId } = useSelector((state) => state.dashboard);
  const { totalData, loadingData, firstPieData, secondPieData } = useSelector(
    (state) => state.pie
  );
  const { totalLineData, loadingLineData, totalLineElectData } = useSelector(
    (state) => state.line
  );

  const { stationsLoading, stationsLastData } = useSelector(
    (state) => state.stations
  );

  const [selectButtonData, setSelectButtunData] = useState(0);
  const [selectDataType, setSelectDataType] = useState(0);
  const [selectStationsId, setSelectStationsId] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalViewData, setModalViewData] = useState({});
  const [isPending, startTransition] = useTransition();
  const [isPendingLine, startTransitionLine] = useTransition();
  const [selectAggregateLineChart, setSelectAggregateLineChart] =
    useState(true);
  const [isOpenModalStation, setIsOpenModalStation] = useState(false);
  const [isStationsStatus, setIsStationsStatus] = useState("");

  const regionId = Cookies.get("regionId");
  const token = localStorage.getItem("access_token");

  const fetchAllData = useCallback(async () => {
    const lang = i18n.language;

    try {
      await Promise.all([
        dispatch(getStatisticsDashboard(regionId, lang, token)),
        dispatch(findLastStationsData(lang, token)),
        dispatch(getAllStationsId(lang, token)),
        startTransition(() => dispatch(findTodayStatisticData(lang, token))),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch, regionId, token, i18n.language]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);

  useEffect(() => {
    if (!stationsId || stationsId.length === 0) return;

    setSelectStationsId(stationsId[0].id);
  }, [stationsId]);

  useEffect(() => {
    if (selectStationsId) {
      startTransitionLine(() => {
        dispatch(
          findTodayLineStatisticData(i18n.language, selectStationsId, token)
        );
      });
    }
  }, [selectStationsId, dispatch, i18n.language, token]);

  const cardStyle = {
    background: colors.layoutBackground,
    color: colors.text,
  };

  const firstThreeCards = useMemo(
    () =>
      t("dashboardPageData.cardData", { returnObjects: true }).slice(
        0,
        STATISTIC_CARDS_CHUNK
      ),
    [t]
  );

  const secondThreeCards = useMemo(
    () =>
      t("dashboardPageData.cardData", { returnObjects: true }).slice(
        STATISTIC_CARDS_CHUNK,
        STATISTIC_CARDS_CHUNK_NEXT
      ),
    [t]
  );

  const thirdThreeCards = useMemo(
    () =>
      t("dashboardPageData.cardData", { returnObjects: true }).slice(
        STATISTIC_CARDS_CHUNK_NEXT
      ),
    [t]
  );

  const closeModal = () => {
    setIsOpenModal(false);
    setModalViewData({});
  };

  const openModal = (data) => {
    setIsOpenModal(true);
    setModalViewData(data);
  };

  const handleChangeStatistics = (key) => {
    switch (key) {
      case 0:
        startTransition(() => {
          dispatch(findTodayStatisticData(i18n.language, token));
          setSelectButtunData(key);
        });
        break;
      case 1:
        startTransition(() => {
          dispatch(findYesterdayStatisticData(i18n.language, token));
          setSelectButtunData(key);
        });
        break;
      case 2:
        startTransition(() => {
          dispatch(findWeeklyStatisticData(i18n.language, token));
          setSelectButtunData(key);
        });
        break;
      case 3:
        startTransition(() => {
          dispatch(findMonthlyStatisticData(i18n.language, token));
          setSelectButtunData(key);
        });
        break;
      case 4:
        startTransition(() => {
          dispatch(findYearsStatisticData(i18n.language, token));
          setSelectButtunData(key);
        });
        break;
      default:
        console.warn(i18n.t("Invalid statistic key: {{key}}", { key }));
        break;
    }
  };

  const handleChangeLineStatistics = (key) => {
    switch (key) {
      case 0:
        startTransitionLine(() => {
          dispatch(
            findTodayLineStatisticData(i18n.language, selectStationsId, token)
          );
          setSelectDataType(key);
        });
        break;
      case 1:
        startTransitionLine(() => {
          dispatch(
            findYesterdayLineStatisticData(
              i18n.language,
              selectStationsId,
              token
            )
          );
          setSelectDataType(key);
        });
        break;
      case 2:
        startTransitionLine(() => {
          dispatch(
            findWeeklyLineStatisticData(i18n.language, selectStationsId, token)
          );
          setSelectDataType(key);
        });
        break;
      case 3:
        startTransitionLine(() => {
          dispatch(
            findMonthlyLineStatisticData(i18n.language, selectStationsId, token)
          );
          setSelectDataType(key);
        });
        break;
      case 4:
        startTransitionLine(() => {
          dispatch(
            findYearLineStatisticData(i18n.language, selectStationsId, token)
          );
          setSelectDataType(key);
        });
        break;
      default:
        console.warn(i18n.t("Invalid statistic key: {{key}}", { key }));
        break;
    }
  };

  const handleOpenStatusStations = (index) => {
    setIsOpenModalStation(true);
    const newStationStatus = index === 0 ? "" : index === 1 ? true : false;

    setIsStationsStatus(newStationStatus);
  };

  return (
    <section className='global_sections_style'>
      <div className='user_dashboard_content_container'>
        <div className='first_all_stations_statistic_cards'>
          {firstThreeCards.map((item, index) => (
            <StatisticCard
              key={index}
              icon={iconData[index]}
              color={colors}
              status={item.status}
              countValue={`${statisticData[index]}`}
              cardStyle={cardStyle}
              onChangeModalData={() => handleOpenStatusStations(index)}
            />
          ))}
        </div>
      </div>

      <div className='filter_container_dashboard'>
        <h1>{t("dashboardPageData.titleStationsDetails1")}</h1>
      </div>

      <div className='card_container_dashboard'>
        {secondThreeCards.map((item, index) => (
          <StatisticCard
            key={index + STATISTIC_CARDS_CHUNK}
            icon={iconData[index + STATISTIC_CARDS_CHUNK]}
            color={colors}
            status={item.status}
            countValue={`${statisticData[index + STATISTIC_CARDS_CHUNK]}`}
            cardStyle={cardStyle}
            onChangeModalData={() => handleOpenStatusStations(index)}
          />
        ))}
      </div>

      <div className='filter_container_dashboard'>
        <h1>{t("dashboardPageData.titleStationsDetails2")}</h1>
      </div>

      <div className='card_container_dashboard'>
        {thirdThreeCards.map((item, index) => (
          <StatisticCard
            key={index + STATISTIC_CARDS_CHUNK_NEXT}
            icon={iconData[index + STATISTIC_CARDS_CHUNK_NEXT]}
            color={colors}
            status={item.status}
            countValue={`${statisticData[index + STATISTIC_CARDS_CHUNK_NEXT]}`}
            cardStyle={cardStyle}
            onChangeModalData={() => handleOpenStatusStations(index)}
          />
        ))}
      </div>

      <div className='filter_container_dashboard'>
        <h1>{t("dashboardPageData.filterTitle")}</h1>
      </div>

      <div className='last_stations_data_container'>
        <div className='last_stations_data_cards'>
          {!stationsLoading &&
            stationsLastData.map((item, index) => (
              <Card
                bordered={false}
                style={{
                  background: colors.layoutBackground,
                  color: colors.text,
                }}
                key={index}
                type='inner'
                className='dashboard_last_data_card'>
                <div className='dashboard_last_data_card_header'>
                  <h2>{item.name}</h2>
                </div>

                <div className='dashboard_last_data_info_stations'>
                  <div className='normal_flex_card'>
                    <EnvironmentOutlined
                      style={{}}
                      className='dashboard_last_data_icons'
                    />
                    <p>{item.region}</p>
                  </div>

                  <div className='normal_flex_card'>
                    <TeamOutlined className='dashboard_last_data_icons' />
                    <p>{item.organization}</p>
                  </div>
                </div>

                <div className='dashboard_last_data_values_container'>
                  <div className='dashboard_last_data_values_card'>
                    {item.aggregate?.slice(0, 3).map((itemAg, indexAg) => (
                      <div className='dashboard_last_data_values' key={indexAg}>
                        <p>{itemAg.name}</p>

                        <p>{itemAg.pumpLastData?.totalsVolume} m³</p>
                      </div>
                    ))}
                  </div>
                  <hr
                    style={{
                      borderColor: "#405FF2",
                    }}
                  />
                  <div className='dashboard_last_data_values_card'>
                    {item.electricalEnergyLastData?.map((itemAg, indexAg) => (
                      <div className='dashboard_last_data_values' key={indexAg}>
                        <p>{itemAg.name}</p>

                        <p>
                          {itemAg.electricalEnergyLastData.energyActiveTotal}{" "}
                          {t(
                            "dashboardPageData.lastStationsData.energyValueView"
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='dashboard_last_data_button'>
                  <div
                    style={{
                      width: "100%",
                      padding: "10px",
                    }}>
                    <Button
                      onClick={() => openModal(item)}
                      className='dashboard_last_data_button'
                      type='primary'>
                      {t("stationsPageData.table14Data")}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      <div
        className='dashboard_statistic_datas'
        style={{
          background: colors.layoutBackground,
        }}>
        {loadingData || isPending ? (
          <Card
            style={{
              width: "100%",
              height: 700,
            }}
            loading={loadingData}
          />
        ) : (
          <>
            <div className='filter_container_dashboard'>
              <h1>
                {
                  t("dashboardPageData.filterTitle2", { returnObjects: true })[
                    selectButtonData
                  ]?.title
                }
              </h1>

              <div className='filter_select_box'>
                <Select
                  size='large'
                  value={selectButtonData}
                  className='select_input_stations'
                  options={t("dashboardPageData.filterCardData", {
                    returnObjects: true,
                  }).map((item, index) => ({
                    value: index,
                    label: item.title,
                  }))}
                  onChange={(key, option) => handleChangeStatistics(key)}
                />
              </div>
            </div>

            <div className='dashboard_pie_chart_container'>
              <div className='dashboard_pie_chart_card'>
                {secondPieData && (
                  <PieChart
                    theme={colors}
                    data={secondPieData}
                    centerText={`${totalData?.totalEnergyActiveToday || 0}\n${t(
                      "dashboardPageData.lastStationsData.energyValueView"
                    )}`}
                    title={t("dashboardPageData.statisticsTitle2")}
                  />
                )}
              </div>

              <div className='dashboard_pie_chart_card'>
                {firstPieData && (
                  <PieChart
                    theme={colors}
                    data={firstPieData}
                    centerText={`${totalData?.totalVolumeToday || 0}\nm³`}
                    title={t("dashboardPageData.statisticsTitle1")}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        style={{
          background: colors.layoutBackground,
        }}
        className='dashboard_secont_chart_container'>
        {loadingLineData || isPendingLine ? (
          <Card
            style={{
              width: "100%",
              height: 600,
            }}
            loading={loadingLineData}
          />
        ) : (
          <>
            <div className='filter_container_dashboard'>
              <h1>
                {
                  t("dashboardPageData.filterTitle2", { returnObjects: true })[
                    selectDataType
                  ]?.title
                }
              </h1>

              <div className='filter_select_box'>
                <Button
                  type='primary'
                  size='large'
                  onClick={() =>
                    setSelectAggregateLineChart(!selectAggregateLineChart)
                  }>
                  {selectAggregateLineChart
                    ? totalLineData.name
                    : totalLineElectData.name}
                </Button>
                <Select
                  size='large'
                  value={selectDataType}
                  className='select_input_stations'
                  options={t("dashboardPageData.filterCardData", {
                    returnObjects: true,
                  }).map((item, index) => ({
                    value: index,
                    label: item.title,
                  }))}
                  onChange={(key, option) => handleChangeLineStatistics(key)}
                />

                <Select
                  size='large'
                  value={selectStationsId}
                  className='select_input_stations'
                  options={stationsId.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  onChange={(key, option) => setSelectStationsId(key)}
                />
              </div>
            </div>
            {totalLineData?.data?.length ? (
              <SolarEmploymentChart
                theme={colors}
                data={
                  selectAggregateLineChart
                    ? totalLineData
                    : totalLineElectData || []
                }
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <EmptyCard />
              </div>
            )}
          </>
        )}
      </div>

      <ViewMoreLastData
        colors={colors}
        openModalData={isOpenModal}
        closeModal={closeModal}
        data={modalViewData}
        t={t}
      />

      <ViewStationModal
        status={isStationsStatus}
        isOpenStationModal={isOpenModalStation}
        closeModal={() => setIsOpenModalStation(false)}
      />
    </section>
  );
}

export default UserDashboard;
