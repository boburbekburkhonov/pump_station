/** @format */

import React, { useCallback, useEffect, useState, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Modal, Select, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
  EyeFilled,
} from "@ant-design/icons";

import "./index.css";
import {
  getAllStationsData,
  createStationsData,
  deleteStationsData,
  updateStationsData,
} from "../../redux/actions/stationsActions";
import Loading from "../../components/loading";
import { getAllRegionId } from "../../redux/actions/regionActions";
import {
  getAllDistrictDataByRegionId,
  getByRegionIdData,
} from "../../redux/actions/districtActions";
import {
  getAllOrganizationsData,
  getAllOrganizationsDataByRegionId,
} from "../../redux/actions/organizationActions";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataApi, postDataApi } from "../../utils";
import {
  handleCheckboxChange,
  handleInputChange,
  handleSelectChange,
  renderOptions,
  openModal,
  closeModal,
  isFormValid,
} from "../../utils/inputElementHandler";

import TableComponent from "../../components/tableComponent";

const initialStationData = {
  name: "",
  regionId: null,
  districtId: null,
  organizationId: null,
  location: "",
  devicePhoneNum: "",
  isIntegration: true,
  haveElectricalEnergy: false,
};

const initialAggregate = {
  name: "",
  stationId: "",
  code: "",
};

const Stations = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stationData, setStationData] = useState(initialStationData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();

  const [aggregateModal, setAggregateModal] = useState(false);
  const [aggregateData, setAggregateData] = useState(initialAggregate);
  const [aggregateUpdate, setAggregateUpdate] = useState(false);

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { stationsData } = useSelector((state) => state.stations);
  const { regions } = useSelector((state) => state.region);
  const { districtsByRegionId } = useSelector((state) => state.district);
  const { organizations, organizationsByRegionId } = useSelector(
    (state) => state.organization
  );

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
    dispatch(getAllRegionId(lang, token));
    // dispatch(getAllOrganizationsData(lang, token));
  }, [dispatch, token, currentPage, pageSize, i18n.language]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);

  useEffect(() => {
    const lang = i18n.language;

    dispatch(
      getAllDistrictDataByRegionId(
        lang,
        token,
        stationData.regionId == null ? "1" : stationData.regionId
      )
    );
    dispatch(
      getAllOrganizationsDataByRegionId(
        lang,
        token,
        stationData.regionId == null ? "1" : stationData.regionId
      )
    );
  }, [stationData.regionId]);

  // useEffect(() => {
  //   if (stationData.regionId) {
  //     dispatch(getByRegionIdData(i18n.language, token, stationData.regionId));
  //   }
  // }, [stationData.regionId, i18n.language, dispatch, token]);

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

  // const getIdByName = useCallback((name, list) => {
  //   if (!name || !list?.length) return 0;
  //   const item = list.find(
  //     (item) => item.name.toLowerCase() === name.toLowerCase()
  //   );
  //   return item?.id || 0;
  // }, []);

  // const getRegionIdName = useCallback(
  //   async (regionId, name) => {
  //     if (!regionId || !name) return 0;

  //     try {
  //       const response = await getDataApi(
  //         `districts/getByRegionId?regionId=${regionId}&lang=${i18n.language}`
  //       );

  //       const district = response.data.data.find(
  //         (item) => item.name.toLowerCase() === name.toLowerCase()
  //       );
  //       return district?.id || 0;
  //     } catch (error) {
  //       const errorMessage =
  //         error.response?.message || t("error.fetchDistricts");
  //       dispatch({
  //         type: GLOBALTYPES.ALERT,
  //         payload: { error: errorMessage },
  //       });
  //       return 0;
  //     }
  //   },
  //   [dispatch, i18n.language]
  // );

  const clearFormFileds = () => {
    form.resetFields();
  };

  const createStation = async () => {
    const lang = i18n.language;
    try {
      const res = await postDataApi(`stations/create?lang=${lang}`, stationData, token);

      if (res.status == 201) {
        console.log(res , 1);

        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            success: res.data.message,
          },
        });
        setIsModalVisible(false);
        clearFormFileds();
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response?.data.message,
        },
      });
    }
  };

  // const handleSubmit = useCallback(
  //   (sendData) => {
  //     if (
  //       !isFormValid({
  //         data: sendData,
  //         requiredFields: [
  //           "name",
  //           "regionId",
  //           "districtId",
  //           "organizationId",
  //           "location",
  //           "devicePhoneNum",
  //         ],
  //       })
  //     ) {
  //       dispatch({
  //         type: GLOBALTYPES.ALERT,
  //         payload: { error: t("stationsPageData.validInputs") },
  //       });
  //       return;
  //     }

  //     if (isUpdating) {
  //       dispatch(updateStationsData(sendData, token, i18n.language));
  //     } else {
  //       dispatch(createStationsData(sendData, token, i18n.language));
  //     }

  //     closeModal(
  //       { data: initialStationData },
  //       setStationData,
  //       setIsModalVisible,
  //       setIsUpdating,
  //       clearFormFileds
  //     );
  //   },
  //   [aggregateUpdate, isUpdating, dispatch, token, i18n.language, closeModal]
  // );

  // const onClickPhoneNumber = useCallback(() => {
  //   setStationData((prevData) => ({ ...prevData, devicePhoneNum: "+998" }));
  // }, []);

  // const handleEditClick = async (item) => {
  //   const regionId = getIdByName(item.region, regions);
  //   const districtId = await getRegionIdName(regionId, item.district);
  //   const organizationId = getIdByName(item.organization, organizations);

  //   const updatedData = {
  //     id: item.key,
  //     name: item.name,
  //     location: item.location,
  //     devicePhoneNum: item.devicePhoneNum,
  //     isIntegration: item.isIntegration,
  //     haveElectricalEnergy: item.haveElectricalEnergy,
  //     regionId,
  //     districtId,
  //     organizationId,
  //   };

  //   openModal(
  //     { data: updatedData, isEdit: true },
  //     setStationData,
  //     setIsModalVisible,
  //     setIsUpdating
  //   );

  //   form.setFieldsValue(updatedData);
  // };

  const columns = useMemo(
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
        title: t("stationsPageData.table14Data"),
        dataIndex: "haveElectricalEnergy",
        key: "haveElectricalEnergy",
        align: "center",
        render: (_, key) => (
          <Button
            type="primary"
            icon={<EyeFilled />}
            onClick={() => navigate(`/statetions/${key.key}`)}
            style={{ boxShadow: "none" }}
          />
        ),
        width: 140,
      },
      {
        title: t("stationsPageData.table9Data"),
        dataIndex: "haveElectricalEnergy",
        key: "haveElectricalEnergy",
        align: "center",
        render: (_, key) => (
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={() =>
              openModal(
                {
                  data: { name: "", stationId: key.key, code: "" },
                  isEdit: false,
                },
                setAggregateData,
                setAggregateModal,
                setAggregateUpdate
              )
            }
            style={{ boxShadow: "none" }}
          />
        ),
        width: 120,
      },
      {
        title: t("stationsPageData.table13Data"),
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (_, key) => (
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={() =>
              openModal(
                { name: "", stationId: key.key, code: "" },
                false,
                setAggregateData,
                setAggregateModal,
                setAggregateUpdate
              )
            }
            style={{ boxShadow: "none" }}
          />
        ),
        width: 120,
      },
      {
        title: t("stationsPageData.table10Data"),
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (_, key) => (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={async () => handleEditClick(key)}
            style={{ boxShadow: "none" }}
          />
        ),
        width: 105,
      },
      {
        title: t("stationsPageData.table11Data"),
        dataIndex: "",
        key: "x",
        align: "center",
        render: (_, key) => (
          <Button
            onClick={() => dispatch(deleteStationsData({ id: key.key }, token))}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            style={{ boxShadow: "none" }}
          />
        ),
        width: 100,
      },
    ],
    [
      t,
      navigate,
      openModal,
      setAggregateData,
      setAggregateModal,
      setAggregateUpdate,
      dispatch,
      deleteStationsData,
      token,
    ]
  );

  return (
    <section className="stations_sections">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="stations_header_container">
            <Button
              type="primary"
              onClick={() =>
                openModal(
                  { data: initialStationData, isEdit: false },
                  setStationData,
                  setIsModalVisible,
                  setIsUpdating
                )
              }
              style={{
                background: colors.buttonColor,
                color: colors.textWhite,
                fontWeight: "bold",
                border: "none",
                boxShadow: `0 2px 0 ${colors.boxShadow}`,
              }}
            >
              {t("stationsPageData.createStationsButton")}
            </Button>
          </div>

          {stationsData.data?.length > 0 && (
            <div
              style={{
                background: colors.layoutBackground,
              }}
              className="stations_body_container"
            >
              <div className="stations_header_title ">
                <h1>{t("stationsPageData.stationsDataHeader")}</h1>
              </div>

              <TableComponent
                columns={columns}
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

      <Modal
        key="stations_modal"
        title={
          isUpdating
            ? t("stationsPageData.stationsUpdateHeaderModal")
            : t("stationsPageData.createStationsModalHeader")
        }
        open={isModalVisible}
        centered
        onCancel={() =>
          closeModal(
            { data: initialStationData },
            setStationData,
            setIsModalVisible,
            setIsUpdating,
            clearFormFileds
          )
        }
        // onOk={() => handleSubmit(stationData, "stations")}
        confirmLoading={loading}
        footer={[]}
        style={{
          color: colors.textColor,
        }}
        className="modal_stations"
      >
        <div className="modal_body_container">
          <Form
            form={form}
            key={stationData.id || "new"}
            className="create_stations_form"
            name="station_form"
            layout="inline"
            requiredMark="optional"
            onFinish={createStation}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Write full name" }]}
            >
              <Input
                className="stations_inputs"
                name="name"
                value={stationData.name}
                onChange={(e) => handleInputChange(e, setStationData)}
                placeholder={t("stationsPageData.stationsInputName")}
                required
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="location"
              rules={[{ required: true, message: "Write location" }]}
            >
              <Input
                name="location"
                className="stations_inputs"
                value={stationData.location}
                onChange={(e) => handleInputChange(e, setStationData)}
                placeholder="40.297929-67.948570"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="devicePhoneNum"
              rules={[{ required: true, message: "Write Phone number" }]}
            >
              <Input
                name="devicePhoneNum"
                className="stations_inputs"
                value={stationData.devicePhoneNum}
                onChange={(e) => handleInputChange(e, setStationData)}
                // onClick={onClickPhoneNumber}
                placeholder="+(998)99-999-99-99"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="regionId"
              rules={[{ required: true, message: "Select Region" }]}
            >
              <Select
                size="large"
                value={stationData.regionId}
                showSearch
                className="select_input_stations"
                placeholder={t("stationsPageData.stationsInputRegion")}
                options={renderOptions(regions)}
                onChange={(value, option) =>
                  handleSelectChange(
                    value,
                    { name: "regionId" },
                    setStationData
                  )
                }
              />
            </Form.Item>

            <Form.Item
              name="districtId"
              rules={[{ required: true, message: "Select District" }]}
            >
              <Select
                size="large"
                value={stationData.districtId}
                showSearch
                className="select_input_stations"
                placeholder={t("stationsPageData.stationsInputDestrict")}
                options={renderOptions(districtsByRegionId)}
                onChange={(value, option) =>
                  handleSelectChange(
                    value,
                    { name: "districtId" },
                    setStationData
                  )
                }
              />
            </Form.Item>

            <Form.Item
              name="organizationId"
              rules={[{ required: true, message: "Select Organizations" }]}
            >
              <Select
                size="large"
                value={stationData.organizationId}
                showSearch
                className="select_input_stations"
                placeholder={t("stationsPageData.stationsInputOrganizations")}
                options={renderOptions(organizationsByRegionId)}
                onChange={(value, option) =>
                  handleSelectChange(
                    value,
                    { name: "organizationId" },
                    setStationData
                  )
                }
              />
            </Form.Item>

            <Form.Item>
              <div
                className="electrical_box"
                style={{
                  border: `2px solid ${colors.textLight}`,
                }}
              >
                <Checkbox
                  onChange={(value, option) =>
                    handleCheckboxChange(value, setStationData)
                  }
                  name="isIntegration"
                >
                  {t("stationsPageData.stationsCheckboxIntegration")}
                </Checkbox>
              </div>
            </Form.Item>

            <Form.Item>
              <div
                className="electrical_box"
                style={{
                  border: `2px solid ${colors.textLight}`,
                }}
              >
                <Checkbox
                  onChange={(value, option) =>
                    handleCheckboxChange(value, setStationData)
                  }
                  name="haveElectricalEnergy"
                >
                  {t("stationsPageData.stationsCheckboxEnergy")}
                </Checkbox>
              </div>
            </Form.Item>

            <div style={{ marginLeft: "auto", marginTop: "10px" }}>
              <Button
                key="back"
                danger
                type="primary"
                onClick={() =>
                  closeModal(
                    { data: initialStationData },
                    setStationData,
                    setIsModalVisible,
                    setIsUpdating,
                    clearFormFileds
                  )
                }
              >
                {t("stationsPageData.cancelButtonModal")}
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                htmlType="submit"
                type="primary"
                // onClick={() => createStation()}
                loading={loading}
              >
                {t("stationsPageData.submitButtonModal")}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        key="energy_modal"
        title={t("stationsPageData.energyStations")}
        open={aggregateModal}
        centered
        onCancel={() =>
          closeModal(
            initialAggregate,
            setAggregateData,
            setAggregateModal,
            setAggregateUpdate,
            false
          )
        }
        onOk={() => handleSubmit(aggregateData, "")}
        confirmLoading={loading}
        footer={[
          <Button
            key="back"
            danger
            type="primary"
            onClick={() =>
              closeModal(
                initialAggregate,
                setAggregateData,
                setAggregateModal,
                setAggregateUpdate,
                false
              )
            }
          >
            {t("stationsPageData.cancelButtonModal")}
          </Button>,

          <Button
            key="submit"
            type="primary"
            onClick={() => handleSubmit(aggregateData, "")}
            loading={loading}
          >
            {t("stationsPageData.submitButtonModal")}
          </Button>,
        ]}
        style={{
          color: colors.textColor,
        }}
        className="modal_stations"
      >
        <div className="modal_body_container">
          <Form
            key="aggegate_create"
            className="create_stations_form"
            name="electrical_form"
            initialValues={aggregateData}
            layout="inline"
            requiredMark="optional"
          >
            <Form.Item>
              <Input
                size="large"
                className="stations_inputs"
                name="name"
                onChange={(e) => handleInputChange(e, setAggregateData)}
                placeholder={t("stationsPageData.stationsEnergyNameInput")}
                value={aggregateData.name}
              />
            </Form.Item>

            <Form.Item>
              <Input
                size="large"
                className="stations_inputs"
                name="code"
                onChange={(e) => handleInputChange(e, setAggregateData)}
                placeholder={t("stationsPageData.stationsEnerdyCode")}
                value={aggregateData.code}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </section>
  );
});

export default Stations;
