/** @format */

import React, { useEffect, useCallback, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button, Card, Pagination } from "antd";

import {
  NodeIndexOutlined,
  AreaChartOutlined,
  ExperimentOutlined,
  PieChartFilled,
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
    perPage: 9,
  });
  const [localStationsId, setLocalStationsId] = useState([...stationsId]);

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
    navigate(`/all/data/infos/${id}`)
  };

  if (stationsLoading || loading)
    return (
      <section className='data_main_sections'>
        <Loading />
      </section>
    );

  return (
    <section className='all_stations_data_view'>
      <div className='header_all_stations_data'>
        <h1>{t("dataPagesInformation.allStationsDataHead")}</h1>
      </div>

      <div
        style={{
          background: colors.layoutBackground,
        }}
        className='all_stations_data_stations_info'>
        <div className='all_stations_data_main_section'>
          {stationsMap?.data?.map((item, index) => {
            const allAgrigateData = item.aggregate?.reduce(
              (acc, itemAg) => {
                const totalsVolume = itemAg?.pumpLastData?.totalsVolume;
                const todayTotalFlow = itemAg?.pumpLastData?.todayTotalFlow;

                return {
                  totalsVolume:
                    acc.totalsVolume + (totalsVolume ? +totalsVolume : 0),
                  todayTotalFlow:
                    acc.todayTotalFlow + (todayTotalFlow ? +todayTotalFlow : 0)/item?.aggregate?.length,
                };
              },
              { totalsVolume: 0, todayTotalFlow: 0 }
            ) || { totalsVolume: 0, todayTotalFlow: 0 };

            const allElectrData = item.electricalEnergyLastData?.reduce(
              (acc, itemAg) => {
                const energyActiveTotal =
                  itemAg?.electricalEnergyLastData?.energyActiveTotal;
                const energyReactiveTotal =
                  itemAg?.electricalEnergyLastData?.energyReactiveTotal;

                return {
                  energyActiveTotal:
                    acc.energyActiveTotal +
                    (energyActiveTotal ? +energyActiveTotal : 0),
                  energyReactiveTotal:
                    acc.energyReactiveTotal +
                    (energyReactiveTotal ? +energyReactiveTotal : 0),
                };
              },
              { energyActiveTotal: 0, energyReactiveTotal: 0 }
            ) || { energyActiveTotal: 0, energyReactiveTotal: 0 };

            return (
              <Card
                key={index}
                type='inner'
                className='all_stations_data_paga_card_element'
                style={{
                  background: colors.blurBgColor2,
                }}>
                <div className='all_stations_data_page_card_header'>
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

                <div className='all_stations_data_page_aggrigate_container'>
                  <div
                    className='all_stations_data_page_aggrigate_card_item'
                    style={{
                      backgroundColor: colors.backgroundColor,
                    }}>
                    <div className='all_stations_data_page_aggrigate_card_item_header_wrapper'>
                      <h3>
                        {t("dataPagesInformation.allStationsAgrigateTitle")}
                      </h3>
                    </div>

                    <div className='all_stations_data_page_aggrigate_item'>
                      <div className='all_stations_data_item'>
                        <div className='normal_flex_card'>
                          <AreaChartOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className='dashboard_last_data_icons'
                          />
                          <h4>
                            {t(
                              "dataPagesInformation.allStationsAggrigatetotalsVolume"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className='dashboard_view_more_import_data'>
                          {allAgrigateData.totalsVolume} m³
                        </h4>
                      </div>

                      <div className='all_stations_data_item'>
                        <div className='normal_flex_card'>
                          <ExperimentOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className='dashboard_last_data_icons'
                          />
                          <h4>
                            {t(
                              "dataPagesInformation.allStationsAggrigatetotalsFlow"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className='all_stations_data_item_import_data'>
                          {allAgrigateData.todayTotalFlow?.toFixed(2)  }{" "}
                          {t(
                            "dashboardPageData.lastStationsData.aggrigateSpeedConst"
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div
                    className='all_stations_data_page_aggrigate_card_item'
                    style={{
                      backgroundColor: colors.backgroundColor,
                    }}>
                    <div className='all_stations_data_page_aggrigate_card_item_header_wrapper'>
                      <h3>
                        {t("dataPagesInformation.allStationsElectrTitle")}
                      </h3>
                    </div>

                    <div className='all_stations_data_page_aggrigate_item'>
                      <div className='all_stations_data_item'>
                        <div className='normal_flex_card'>
                          <NodeIndexOutlined
                            style={{
                              color: colors.textColor,
                            }}
                            className='dashboard_last_data_icons'
                          />
                          <h4>
                            {t(
                              "dataPagesInformation.allStationsElektrActiveEnergy"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className='dashboard_view_more_import_data'>
                          {allElectrData.energyActiveTotal} kw
                        </h4>
                      </div>

                      <div className='all_stations_data_item'>
                        <div className='normal_flex_card'>
                          <PieChartFilled
                            style={{
                              color: colors.textColor,
                            }}
                            className='dashboard_last_data_icons'
                          />
                          <h4>
                            {t(
                              "dataPagesInformation.allStationsElektrReactiveEnergy"
                            )}
                            :{" "}
                          </h4>
                        </div>
                        <h4 className='all_stations_data_item_import_data'>
                          {allElectrData.energyReactiveTotal} kw
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type='primary'
                  onClick={() => handleOpenModal(item.id)}
                  style={{
                    marginTop: 10,
                    width: "100%",
                  }}>
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
          align='end'
        />
      </div>
    </section>
  );
}

export default memo(AllDatapPage);
