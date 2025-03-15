/** @format */
import React, { useCallback, useEffect, useState, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Card } from "antd";
import { EyeFilled } from "@ant-design/icons";

import { getAllStationsData } from "../../redux/actions/stationsActions";

import TableComponent from "../../components/tableComponent";
import "../../pages/data/index.css";

function ViewStationModal({
  status,
  districtId,
  isOpenStationModal,
  closeModal,
}) {
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
      status: status,
      districtId: districtId ? districtId : "",
    };

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

    const paginationParams = {
      lang,
      page,
      perPage: size,
      search: "",
      regionId: "",
      organizationId: "",
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

  return (
    <Modal
      key="stations_by_status_modal"
      title={t("stationsPageData.cancelButtonModal")}
      open={isOpenStationModal}
      centered
      onCancel={closeModal}
      onOk={closeModal}
      cancelText={t("stationsPageData.cancelButtonModal")}
      style={{
        color: colors.textColor,
      }}
      className="stations_status_more_modal"
    >
      <div
        style={{
          background: colors.layoutBackground,
        }}
        className="stations_status_body_container"
      >
        {loading ? (
          <Card
            style={{
              width: "100%",
              height: 600,
            }}
            loading={loading}
          />
        ) : (
          <TableComponent
            columns={columnsUser}
            dataSource={dataSource}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPage={stationsData.totalDocuments}
            handlePaginationChange={handlePaginationChange}
          />
        )}
      </div>
    </Modal>
  );
}

export default memo(ViewStationModal);
