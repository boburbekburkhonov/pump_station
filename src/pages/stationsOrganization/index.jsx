/** @format */

import React, { useCallback, useEffect, useState, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Anchor, Button, Input } from "antd";
import { EyeFilled, SearchOutlined } from "@ant-design/icons";

import "../stations/index.css";
import {
  findInMapsLastDataByDistrictId,
  findLastStationsData,
  getAllStationsData,
} from "../../redux/actions/stationsActions";
import Loading from "../../components/loading";

import TableComponent from "../../components/tableComponent";
import "../data/index.css";
import EmptyCard from "../../components/emptyCard";
import { getByRegionIdData } from "../../redux/actions/districtActions";
import Cookies from "js-cookie";

const StationsWithOrganization = memo(() => {
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { districtByRegionId } = useSelector((state) => state.district);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { stationsData } = useSelector((state) => state.stations);
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activeSection, setActiveSection] = useState("0");
  const [selectDistrictId, setSelectDistrictId] = useState(0);
  const token = localStorage.getItem("access_token");
  const regionId = Cookies.get("regionId");

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;
    const districtId = districtByRegionId[selectDistrictId - 1]?.id;

    const stationParams = {
      lang,
      page: currentPage,
      perPage: pageSize,
      regionId: undefined,
      districtId: districtId == undefined ? "" : districtId,
      organizationId: undefined,
      search: undefined,
      status: status,
    };

    dispatch(getByRegionIdData(lang, token, regionId));

    dispatch(getAllStationsData(stationParams, token));
  }, [dispatch, token, currentPage, pageSize, i18n.language, status]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);

  useEffect(() => {
    if (stationsData?.data) {
      const processedData = stationsData.data.map((item) => ({
        key: item.id,
        name: item.name,
        devicePhoneNum: item.devicePhoneNum,
        district: item.district,
        haveElectricalEnergy: item.haveElectricalEnergy,
        isIntegration: item.isIntegration,
        organization: item.organization,
        region: item.region,
        status: item.status,
        location: item.location,
      }));
      setDataSource(processedData);
    }
  }, [stationsData]);

  const handlePaginationChange = (page, size) => {
    const lang = i18n.language;
    const districtId = districtByRegionId[selectDistrictId - 1]?.id;

    const paginationParams = {
      lang,
      page,
      perPage: size,
      search: undefined,
      regionId: undefined,
      districtId: districtId == undefined ? "" : districtId,
      organizationId: undefined,
      status: status,
    };

    dispatch(getAllStationsData(paginationParams, token));
    setPageSize(size);
    setCurrentPage(page);
  };

  const columnsUser = useMemo(
    () => [
      {
        title: t("stationsPageData.table1Data"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("stationsPageData.table2Data"),
        dataIndex: "region",
        key: "region",
        align: "center",
      },
      {
        title: t("stationsPageData.table3Data"),
        dataIndex: "district",
        key: "district",
        align: "center",
      },
      {
        title: t("stationsPageData.table4Data"),
        dataIndex: "organization",
        key: "organization",
        align: "center",
      },
      {
        title: t("stationsPageData.table5Data"),
        dataIndex: "devicePhoneNum",
        key: "devicePhoneNum",
        align: "center",
      },
      {
        title: t("stationsPageData.table8Data"),
        dataIndex: "status",
        key: "haveElectricalEnergy",
        align: "center",
        render: (_, key) => (
          <span
            className={key.status ? "active_indicator" : "not_active_indicator"}
          >
            {key.status
              ? t("dataPagesInformation.active_indicator")
              : t("dataPagesInformation.not_active_indicator")}
          </span>
        ),
        width: 100,
      },
      {
        title: t("stationsPageData.table14Data"),
        dataIndex: "haveElectricalEnergy",
        key: "haveElectricalEnergy",
        align: "center",
        render: (_, key) => (
          <Button
            type="primary"
            icon={<EyeFilled />}
            onClick={() => navigate(`/stations/${key.key}`)}
            style={{ boxShadow: "none" }}
          />
        ),
        width: 140,
      },
    ],
    [t, navigate, token]
  );

  const handleInput = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchLastData = () => {
    const lang = i18n.language;
    const districtId = districtByRegionId[selectDistrictId - 1]?.id;

    if (searchText.length != 0) {
      const stationParams = {
        lang,
        page: undefined,
        perPage: undefined,
        search: searchText,
        regionId: undefined,
        districtId: districtId == undefined ? "" : districtId,
        organizationId: undefined,
        status: status,
      };

      dispatch(getAllStationsData(stationParams, token));
    }
  };

  const getAllStationsByDistrictId = (key) => {
    const lang = i18n.language;
    const districtId = districtByRegionId[key - 1]?.id;
    setSearchText("");
    setStatus("");

    const stationParams = {
      lang,
      page: currentPage,
      perPage: pageSize,
      regionId: undefined,
      districtId: districtId == undefined ? "" : districtId,
      organizationId: undefined,
      search: undefined,
      status: status,
    };

    dispatch(getAllStationsData(stationParams, token));
  };

  return (
    <section className="stations_sections">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              background: colors.layoutBackground,
              alignItems: "normal",
              padding: "10px 20px",
            }}
            className="stations_body_container"
          >
            {/* <div className="stations_header_title ">
              <h1>{t("stationsPageData.stationsDataHeader")}</h1>
            </div> */}

            <div className="header_all_stations_data">
              <h1>{t("stationsPageData.stationsInputDestrict")}</h1>
            </div>

            <div
              className="reports_sort_select_wrapper"
              style={{ marginBottom: "5px", marginTop: '10px' }}
            >
              <Anchor
                className="anchor-items-container"
                direction="horizontal"
                items={[
                  {
                    value: 0,
                    label: t("stationsPageData.allDistricts"),
                  }, // Qo'shimcha option
                  ...districtByRegionId.map((item, index) => ({
                    value: index + 1,
                    label: item.name,
                  })),
                ].map((item, index) => ({
                  key: `${index}`,
                  href: `#${index}`,
                  title: (
                    <p
                      style={{
                        color:
                          activeSection === `${index}`
                            ? colors.textWhite
                            : colors.text,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border:
                          activeSection === `${index}`
                            ? "none"
                            : `1px solid ${colors.buttonColor}`,
                        background:
                          activeSection === `${index}`
                            ? colors.buttonColor
                            : "transparent",
                        paddingRight: 10,
                        paddingLeft: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        borderRadius: 5,
                      }}
                    >
                      {item.label}
                    </p>
                  ),
                }))}
                onClick={(e, link) => {
                  e.preventDefault();
                  setActiveSection(link.href.replace("#", ""));
                  getAllStationsByDistrictId(
                    Number(link.href.replace("#", ""))
                  );
                  setSelectDistrictId(Number(link.href.replace("#", "")));
                  setCurrentPage(1);
                }}
              />
            </div>

            <h2 style={{ marginTop: "20px" }}>Stansiya qidirish</h2>

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
                    setCurrentPage(1);
                    setPageSize(10);
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
                    setCurrentPage(1);
                    setPageSize(10);
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
                    setCurrentPage(1);
                    setPageSize(10);
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

            {dataSource.length > 0 ? (
              <TableComponent
                columns={columnsUser}
                dataSource={dataSource}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPage={stationsData.totalDocuments}
                handlePaginationChange={handlePaginationChange}
              />
            ) : (
              <div
                style={{
                  height: "80vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <EmptyCard />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
});

export default StationsWithOrganization;
