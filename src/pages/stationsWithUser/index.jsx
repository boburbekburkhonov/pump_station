/** @format */

import React, { useCallback, useEffect, useState, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { EyeFilled } from "@ant-design/icons";

import "../stations/index.css";
import { getAllStationsData } from "../../redux/actions/stationsActions";
import Loading from "../../components/loading";

import TableComponent from "../../components/tableComponent";
import '../data/index.css'

const StationsWithUser = memo(() => {
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { stationsData } = useSelector((state) => state.stations);

  const token = localStorage.getItem("access_token");

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;

    const stationParams = {
      lang,
      page: currentPage,
      perPage: pageSize,
      search: "",
      regionId: "",
      organizationId: "",
      status: "",
    };

    dispatch(getAllStationsData(stationParams, token));
  }, [dispatch, token, currentPage, pageSize, i18n.language]);

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

    const paginationParams = {
      lang,
      page,
      perPage: size,
      search: "",
      regionId: "",
      organizationId: "",
      status: "",
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
            className={
              key.status ? "active_indicator" : "not_active_indicator"
            }>
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
            type='primary'
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

  return (
    <section className='stations_sections'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {stationsData.data?.length > 0 && (
            <div
              style={{
                background: colors.layoutBackground,
              }}
              className='stations_body_container'>
              <div className='stations_header_title '>
                <h1>{t("stationsPageData.stationsDataHeader")}</h1>
              </div>

              <TableComponent
                columns={columnsUser}
                dataSource={dataSource}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPage={stationsData.totalDocuments}
                handlePaginationChange={handlePaginationChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
});

export default StationsWithUser;
