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
import moreInfo from "../../assets/info.png";
import "./index.css";

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
  BgColorsOutlined,
  DotChartOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import {
  getAllStationsId,
  getStatisticsDashboard,
  getVolumeAndEnergyDataByGroupStation,
} from "../../redux/actions/dashboard";
import "../dashboard/index.css";
import { findLastStationsData } from "../../redux/actions/stationsActions";
import { getIcon } from "../../data";
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
import ViewMoreStationModal from "../../components/viewMoreStationModal";
import { useNavigate } from "react-router-dom";
import StatisticsLineChart from "../../components/googleLineChart";
import { isString } from "highcharts";

const STATISTIC_CARDS_CHUNK = 3;
const STATISTIC_CARDS_CHUNK_NEXT = 7;

const StatisticCard = ({
  icon,
  status,
  countValue,
  cardStyle,
  onChangeModalData,
}) => (
  <Card
    bordered={false}
    style={cardStyle}
    type="inner"
    onClick={onChangeModalData}
    className="dashbord_card_element"
  >
    {icon}
    <div>
      <p>{status}</p>
      <h3>{countValue}</h3>
    </div>
  </Card>
);

const ViewMoreLastData = memo(
  ({ openModalData, closeModal, colors, data, t }) => {
    return (
      <Modal
        key="aggregate_modal"
        title={data.name}
        open={openModalData}
        centered
        onCancel={closeModal}
        onOk={closeModal}
        cancelText={t("stationsPageData.cancelButtonModal")}
        style={{
          color: colors.textColor,
        }}
        className="dashboard_view_more_modal"
      >
        <div className="dashboard_view_more_modal_container">
          <h2>
            {t("dashboardPageData.lastStationsData.stationsMoreInfoAgirgate")}
          </h2>
          <div className="dashboard_view_more_modal_info">
            {data?.aggregate?.map((item, index) => (
              <div
                key={index}
                className="dashboard_view_more_modal_card"
                style={{
                  background: colors.background,
                  boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
                }}
              >
                <div className="dashboard_view_more_modal_card_item">
                  <div className="normal_flex_card">
                    <FormOutlined
                      style={{
                        color: "#11A9FF",
                      }}
                      className="dashboard_last_data_icons"
                    />

                    <h4>
                      {t("dashboardPageData.lastStationsData.agrigateName")}:
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.name}
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
                    <h4>
                      {t("dashboardPageData.lastStationsData.aggrigateCode")}:{" "}
                    </h4>
                  </div>

                  <h4 className="dashboard_view_more_import_data">
                    {item.code}
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
                    {item.workingStatus
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
                    <h4>
                      {t("dashboardPageData.lastStationsData.agrigateSpeed")}:{" "}
                    </h4>
                  </div>
                  <h4 className="dashboard_view_more_import_data">
                    {item.pumpLastData?.velocity}{" "}
                    {t(
                      "dashboardPageData.lastStationsData.aggrigateSpeedConst"
                    )}
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
                      {t(
                        "dashboardPageData.lastStationsData.aggrigateTotalFlow"
                      )}
                      :{" "}
                    </h4>
                  </div>
                  <h4 className="dashboard_view_more_import_data">
                    {item.pumpLastData?.todayTotalFlow} m³
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

                <div className="dashboard_view_more_modal_card_item">
                  <div className="normal_flex_card">
                    <FieldTimeOutlined
                      style={{
                        color: "#11A9FF",
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

          {data?.electricalEnergyLastData?.length > 0 ? (
            <>
              <h2>
                {t("dashboardPageData.lastStationsData.stationsMoreInfoElectr")}
              </h2>
              <div className="dashboard_electr_modal_info">
                {data?.electricalEnergyLastData?.map((item, index) => (
                  <div
                    key={index}
                    className="dashboard_view_more_modal_card"
                    style={{
                      background: colors.background,
                      boxShadow: `0 0 5px 2px ${colors.boxShadow}`,
                    }}
                  >
                    <div className="dashboard_view_more_electr_card">
                      {/* row */}
                      <div className="dashboard_view_more_modal_card_item 1">
                        <div className="normal_flex_card">
                          <FormOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryName"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.name}
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 2">
                        <div className="normal_flex_card">
                          <QrcodeOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryCode"
                            )}
                            :{" "}
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.code}
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 3">
                        <div className="normal_flex_card">
                          <SettingOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.aggrigateTitle"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className="dashboard_view_more_import_data">
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

                      <div className="dashboard_view_more_modal_card_item 4">
                        <div className="normal_flex_card">
                          <ThunderboltOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryVolt"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.voltage1} V
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 5">
                        <div className="normal_flex_card">
                          <BulbOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryAmper"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.current1} A
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 6">
                        <div className="normal_flex_card">
                          <PoweroffOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.powerActive"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.powerActive} Kw
                        </h4>
                      </div>

                      {/* row */}

                      <div className="dashboard_view_more_modal_card_item 7">
                        <div className="normal_flex_card">
                          <ThunderboltOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryVolt"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.voltage2} V
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 8">
                        <div className="normal_flex_card">
                          <BulbOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryAmper"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.current2} A
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 9">
                        <div className="normal_flex_card">
                          <PoweroffOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.powerReactive"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.powerReactive} Kw
                        </h4>
                      </div>

                      {/* row */}

                      <div className="dashboard_view_more_modal_card_item 10">
                        <div className="normal_flex_card">
                          <ThunderboltOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryVolt"
                            )}
                            :
                          </h4>
                        </div>
                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.voltage3} V
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 11">
                        <div className="normal_flex_card">
                          <BulbOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.electryAmper"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.current3} A
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 12">
                        <div className="normal_flex_card">
                          <PieChartFilled
                            style={{
                              color: "#11A9FF",
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
                          {t(
                            "dashboardPageData.lastStationsData.energyValueView"
                          )}
                        </h4>
                      </div>

                      {/* row */}

                      <div className="dashboard_view_more_modal_card_item 13">
                        <div className="normal_flex_card">
                          <DashboardOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.energyActive"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.energyActive}{" "}
                          {t(
                            "dashboardPageData.lastStationsData.energyValueView"
                          )}
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 14">
                        <div className="normal_flex_card">
                          <LineChartOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.powerActive"
                            )}
                            :{" "}
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.powerActive} Kw
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 15">
                        <div className="normal_flex_card">
                          <PieChartFilled
                            style={{
                              color: "#11A9FF",
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
                          {t(
                            "dashboardPageData.lastStationsData.energyValueView"
                          )}
                        </h4>
                      </div>

                      {/* row */}

                      <div className="dashboard_view_more_modal_card_item 16">
                        <div className="normal_flex_card">
                          <DashboardOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.energyReactive"
                            )}
                            :
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.energyReactive}{" "}
                          {t(
                            "dashboardPageData.lastStationsData.energyValueView"
                          )}
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 17">
                        <div className="normal_flex_card">
                          <LineChartOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.powerReactive"
                            )}
                            :{" "}
                          </h4>
                        </div>

                        <h4 className="dashboard_view_more_import_data">
                          {item.electricalEnergyLastData.powerReactive} Kw
                        </h4>
                      </div>

                      <div className="dashboard_view_more_modal_card_item 18">
                        <div className="normal_flex_card">
                          <FieldTimeOutlined
                            style={{
                              color: "#11A9FF",
                            }}
                            className="dashboard_last_data_icons"
                          />
                          <h4>
                            {t(
                              "dashboardPageData.lastStationsData.aggrigateTime"
                            )}
                            :{" "}
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
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    );
  }
);

function UserDashboard() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { colors, theme } = useSelector((state) => state.theme);
  const {
    statisticData,
    stationsId,
    loadingStatistic,
    statisticDataForLineChart,
  } = useSelector((state) => state.dashboard);
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
  const [isOpenMoreViewData, setIsOpenMoreViewData] = useState(false);
  const [getSelectStationDate, setGetSelectStationData] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [oneStationLastData, setOneStationLastData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSquareButton, setActiveSquareButton] = useState(0);
  const [activePieButton, setActivePieButton] = useState(0);
  const [activeLineButton, setActiveLineButton] = useState(0);

  const regionId = Cookies.get("regionId");
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const fetchAllData = useCallback(async () => {
    const lang = i18n.language;

    try {
      startTransition(async () => {
        await Promise.all([
          dispatch(getStatisticsDashboard(regionId, lang, token)),
          dispatch(findLastStationsData(lang, token)),
          dispatch(getAllStationsId(lang, token)),
          dispatch(findTodayStatisticData(lang, token)),
          dispatch(getVolumeAndEnergyDataByGroupStation(lang, token, "today")),
        ]);
      });
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
    if (!selectStationsId) return;

    const statisticsFetchers = {
      0: findTodayLineStatisticData,
      1: findYesterdayLineStatisticData,
      2: findWeeklyLineStatisticData,
      3: findMonthlyLineStatisticData,
      4: findYearLineStatisticData,
    };

    const fetcher = statisticsFetchers[selectDataType];

    if (fetcher) {
      startTransitionLine(() => {
        dispatch(fetcher(i18n.language, selectStationsId, token));
      });
    } else {
      console.warn(
        i18n.t("Invalid statistic key: {{key}}", { key: selectDataType })
      );
    }
  }, [selectDataType, selectStationsId, dispatch, i18n.language, token]);

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
    setSelectDataType(key);
  };

  const handleOpenStatusStations = useCallback((index) => {
    setIsOpenModalStation(true);
    const newStationStatus = index === 0 ? "" : index === 1 ? true : false;

    setIsStationsStatus(newStationStatus);
  }, []);

  const sortStationId = (stationName) => {
    const station = totalData?.stationData?.find(
      (item) => item.stationName === stationName
    );
    return station;
  };

  const handleViewMoreStationData = (stationName, selecteColor) => {
    const stationId = sortStationId(stationName);
    setGetSelectStationData(stationId);
    setIsOpenMoreViewData(true);
    setSelectedColor(selecteColor);
  };

  const handleCloseViewModal = () => {
    setIsOpenMoreViewData(false);
  };

  const findOneStationById = (id) => {
    const foundStation = stationsLastData?.find((e) => e.id == id);
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

  const handleOpenModal = (id) => {
    navigate(`/all/data/infos/${id}`);
  };

  const handleVolumeAndEnergyDataByGroupStation = (key) => {
    switch (key) {
      case 0:
        dispatch(
          getVolumeAndEnergyDataByGroupStation(i18n.language, token, "today")
        );
        break;
      case 1:
        dispatch(
          getVolumeAndEnergyDataByGroupStation(
            i18n.language,
            token,
            "yesterday"
          )
        );
        break;
      case 2:
        dispatch(
          getVolumeAndEnergyDataByGroupStation(i18n.language, token, "week")
        );
        break;
      case 3:
        dispatch(
          getVolumeAndEnergyDataByGroupStation(i18n.language, token, "month")
        );
        break;
      case 4:
        dispatch(
          getVolumeAndEnergyDataByGroupStation(i18n.language, token, "year")
        );
        break;
      default:
        break;
    }
  };

  const sortDataLineChart = (data) => {
    const date = [];
    const dataVolume = [];
    const dataEnergyActive = [];
    const months = {
      uz: [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr",
        "hafta",
      ],
      en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        "week",
      ],
      ru: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
        "неделя",
      ],
    };

    data.forEach((e) => {
      if (activeSquareButton == 0) {
        date.push(typeof e?.date != "number" ? e?.date?.split(" ")[1] : "");
      } else if (activeSquareButton == 1) {
        date.push(typeof e?.date != "number" ? e?.date?.split(" ")[1] : "");
      } else if (activeSquareButton == 2) {
        date.push(typeof e?.date != "number" ? e?.date?.split("T")[0] : "");
      } else if (activeSquareButton == 3) {
        date.push(typeof e?.date != "number" ? e?.date?.split("T")[0] : "");
      } else if (activeSquareButton == 4) {
        date.push(months[i18n.language][e.date - 1]);
      }
      dataVolume.push(e.volume);
      dataEnergyActive.push(e.energyActive);
    });

    return {
      date: date,
      volume: dataVolume,
      energyActive: dataEnergyActive,
    };
  };

  return (
    <section className="global_sections_style">
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
                className="modal_wrapper_of_body_aggregate"
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px",
                }}
              >
                {oneStationLastData?.aggregate.map((e, i) => {
                  return (
                    <div className="modal_aggregate_wrapper" key={i}>
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
                          {t("dashboardPageData.lastStationsData.agrigateName")}
                          :
                        </h2>

                        <p className="modal_aggregate_wrapper_item_name_desc">
                          {e?.name}
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <AreaChartOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateVolume"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.pumpLastData?.volume} m³
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <LineChartOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateVelocity"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.pumpLastData?.velocity} m/s
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <ExperimentOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateSpeed"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.pumpLastData?.flow} m³/s
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <BgColorsOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateDailyVolume"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.pumpLastData?.todayTotalFlow} m³
                        </p>
                      </div>

                      <div className="modal_aggregate_wrapper_item">
                        <div className="modal_aggregate_wrapper_item_left_wrapper">
                          <DotChartOutlined
                            style={{
                              color: "#000000",
                            }}
                            className="dashboard_last_data_icons"
                          />

                          <h2 className="modal_aggregate_wrapper_item_heading">
                            {t(
                              "dashboardPageData.lastStationsData.agrigateTotalsVolume"
                            )}
                            :
                          </h2>
                        </div>

                        <p className="modal_aggregate_wrapper_item_desc">
                          {e.pumpLastData?.totalsVolume} m³
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
                          {fixDate(e.pumpLastData?.date)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

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
                }}
              >
                {oneStationLastData?.electricalEnergyLastData.map((e, i) => {
                  return (
                    <div className="modal_aggregate_wrapper" key={i}>
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

      {loadingStatistic ? (
        <Card
          style={{
            width: "100%",
            height: 600,
          }}
          loading={loadingStatistic}
        />
      ) : (
        <>
          <div className="user_dashboard_content_container">
            <div className="first_all_stations_statistic_cards">
              {firstThreeCards.map((item, index) => (
                <StatisticCard
                  key={index}
                  icon={getIcon(index, item.color)}
                  color={colors}
                  status={item.status}
                  countValue={`${statisticData[index]}`}
                  cardStyle={cardStyle}
                  onChangeModalData={handleOpenStatusStations.bind(null, index)}
                />
              ))}
            </div>
          </div>

          <div className="filter_container_dashboard">
            <h1>{t("dashboardPageData.titleStationsDetails1")}</h1>
          </div>

          <div className="card_container_dashboard">
            {secondThreeCards.map((item, index) => (
              <StatisticCard
                key={index + STATISTIC_CARDS_CHUNK}
                icon={getIcon(index + STATISTIC_CARDS_CHUNK, item.color)}
                color={colors}
                status={item.status}
                countValue={`${statisticData[index + STATISTIC_CARDS_CHUNK]}`}
                cardStyle={cardStyle}
                onChangeModalData={handleOpenStatusStations.bind(null, index)}
              />
            ))}
          </div>

          <div className="filter_container_dashboard">
            <h1>{t("dashboardPageData.titleStationsDetails2")}</h1>
          </div>

          <div className="card_container_dashboard">
            {thirdThreeCards.map((item, index) => (
              <StatisticCard
                key={index + STATISTIC_CARDS_CHUNK_NEXT}
                icon={getIcon(index + STATISTIC_CARDS_CHUNK_NEXT, item.color)}
                color={colors}
                status={item.status}
                countValue={`${
                  statisticData[index + STATISTIC_CARDS_CHUNK_NEXT]
                }`}
                cardStyle={cardStyle}
                onChangeModalData={handleOpenStatusStations.bind(null, index)}
              />
            ))}
          </div>
        </>
      )}

      <div className="filter_container_dashboard">
        {stationsLastData.length != 0 ? (
          <h1>{t("dashboardPageData.filterTitle")}</h1>
        ) : (
          ""
        )}
      </div>

      <div className="last_stations_data_container">
        <div className="last_stations_data_cards">
          {!stationsLoading &&
            stationsLastData.map((item, index) => {
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
                    background: colors.layoutBackground,
                    maxWidth: "400px",
                  }}
                >
                  <div
                    className="all_stations_data_page_card_header_dashboard"
                    style={{
                      borderBottom: `3px solid ${
                        item.status ? "#40C057" : "red"
                      }`,
                    }}
                  >
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
                    <h1
                      className="m-0"
                      style={{ textAlign: "center", margin: "0", padding: "0" }}
                    >
                      {item.name}
                    </h1>
                  </div>

                  <div className="all_stations_data_page_aggrigate_container">
                    <div
                      className="all_stations_data_page_aggrigate_card_item"
                      style={{
                        backgroundColor: colors.backgroundColor,
                      }}
                    >
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
                            {allElectrData.energyActiveTotal}{" "}
                            {String(
                              t(
                                "dashboardPageData.lastStationsData.energyValueView"
                              )
                            ).toLowerCase()}
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
      </div>

      <div
        className="dashboard_statistic_datas"
        style={{
          background: colors.layoutBackground,
        }}
      >
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
            <div
              className="filter_container_dashboard"
              style={{
                marginBottom: "50px",
              }}
            >
              <h1>
                {t("dashboardPageData.lineChartDataHeading")}{" "}
                {String(
                  t("dashboardPageData.filterTitle2", { returnObjects: true })[
                    activeSquareButton
                  ]?.title
                ).toLowerCase()}
              </h1>

              <div className="filter_select_box">
                {t("dashboardPageData.filterCardData", {
                  returnObjects: true,
                }).map((item, index) => {
                  return (
                    <Button
                      key={index}
                      type={activeSquareButton == index ? "primary" : "default"}
                      size="large"
                      onClick={() => {
                        handleVolumeAndEnergyDataByGroupStation(index);
                        setActiveSquareButton(index);
                      }}
                    >
                      {item.title}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="">
              <StatisticsLineChart
                theme={colors}
                data={sortDataLineChart(statisticDataForLineChart)}
              />
            </div>
          </>
        )}
      </div>

      <div
        className="dashboard_statistic_datas"
        style={{
          background: colors.layoutBackground,
          marginTop: "20px",
        }}
      >
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
            <div className="filter_container_dashboard">
              <h1>
                {
                  t("dashboardPageData.filterTitle2", { returnObjects: true })[
                    selectButtonData
                  ]?.title
                }
              </h1>

              <div className="filter_select_box">
                {t("dashboardPageData.filterCardData", {
                  returnObjects: true,
                }).map((item, index) => {
                  return (
                    <Button
                      key={index}
                      type={activePieButton == index ? "primary" : "default"}
                      size="large"
                      onClick={() => {
                        setActivePieButton(index);
                        handleChangeStatistics(index);
                      }}
                    >
                      {item.title}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="dashboard_pie_chart_container">
              <div className="dashboard_pie_chart_card">
                {firstPieData && (
                  <PieChart
                    theme={colors}
                    data={firstPieData}
                    centerText={`${
                      totalData?.totalVolumeToday != 0
                        ? Number(totalData?.totalVolumeToday).toFixed(2)
                        : totalData?.totalVolumeToday || 0
                    }\nm³`}
                    title={t("dashboardPageData.statisticsTitle1")}
                    handleonIsOpenStationModal={handleViewMoreStationData}
                  />
                )}
              </div>

              <div className="dashboard_pie_chart_card">
                {secondPieData && (
                  <PieChart
                    theme={colors}
                    data={secondPieData}
                    centerText={`${
                      totalData?.totalEnergyActiveToday != 0
                        ? Number(totalData?.totalEnergyActiveToday).toFixed(2)
                        : totalData?.totalEnergyActiveToday || 0
                    }\n${t(
                      "dashboardPageData.lastStationsData.energyValueView"
                    )}`}
                    title={t("dashboardPageData.statisticsTitle2")}
                    handleonIsOpenStationModal={handleViewMoreStationData}
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
        className="dashboard_secont_chart_container"
      >
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
            <div className="filter_container_dashboard">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Select
                  size="large"
                  value={selectStationsId}
                  className="select_input_stations"
                  options={stationsId.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  onChange={(key, option) => setSelectStationsId(key)}
                />

                <h1 style={{ marginLeft: "15px" }}>
                  {String(
                    t("dashboardPageData.filterTitle2", {
                      returnObjects: true,
                    })[selectDataType]?.title
                  ).toLowerCase()}
                </h1>
              </div>

              <div className="filter_select_box">
                <Button
                  type={selectAggregateLineChart ? "primary" : "default"}
                  size="large"
                  onClick={() => setSelectAggregateLineChart(true)}
                >
                  {t("dashboardPageData.buttonAggregate")}
                </Button>

                <Button
                  type={!selectAggregateLineChart ? "primary" : "default"}
                  size="large"
                  onClick={() => setSelectAggregateLineChart(false)}
                >
                  {t("dashboardPageData.buttonElectr")}
                </Button>

                <div
                  style={{
                    width: "2.2px",
                    height: "40px",
                    background: "rgb(205 205 205)",
                  }}
                ></div>

                <div className="filter_select_box">
                  {t("dashboardPageData.filterCardData", {
                    returnObjects: true,
                  }).map((item, index) => {
                    return (
                      <Button
                        key={index}
                        type={activeLineButton == index ? "primary" : "default"}
                        size="large"
                        onClick={() => {
                          setActiveLineButton(index);
                          handleChangeLineStatistics(index);
                        }}
                      >
                        {item.title}
                      </Button>
                    );
                  })}
                </div>
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
                }}
              >
                <EmptyCard />
              </div>
            )}
          </>
        )}
      </div>

      {isOpenModal && (
        <ViewMoreLastData
          colors={colors}
          openModalData={isOpenModal}
          closeModal={closeModal}
          data={modalViewData}
          t={t}
        />
      )}

      {isOpenModalStation && (
        <ViewStationModal
          status={isStationsStatus}
          isOpenStationModal={isOpenModalStation}
          closeModal={() => setIsOpenModalStation(false)}
        />
      )}

      {isOpenMoreViewData && (
        <ViewMoreStationModal
          openModalData={isOpenMoreViewData}
          closeModal={handleCloseViewModal}
          selectStationId={getSelectStationDate}
          t={t}
          colors={colors}
          selectedColor={selectedColor}
        />
      )}
    </section>
  );
}

export default UserDashboard;
