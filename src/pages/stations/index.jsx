/** @format */

import React, { useCallback, useEffect, useState, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Modal, Select, Checkbox, Table } from "antd";
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
import { getByRegionIdData } from "../../redux/actions/districtActions";
import { getAllOrganizationsData } from "../../redux/actions/organizationActions";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataApi } from "../../utils";
import { createAggregateData } from "../../redux/actions/aggregateActions";
import { useNavigate } from "react-router-dom";

const initialStationData = {
  name: "",
  regionId: null,
  districtId: null,
  organizationId: null,
  location: "",
  devicePhoneNum: "",
  isIntegration: true,
  haveElectricalEnergy: false,
  codeElectricalEnergy: "",
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

  const [aggregateModal, setAggregateModal] = useState(false);
  const [aggregateData, setAggregateData] = useState(initialAggregate);
  const [aggregateUpdate, setAggregateUpdate] = useState(false);

  const { i18n, t } = useTranslation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { stationsData } = useSelector((state) => state.stations);
  const { regions } = useSelector((state) => state.region);
  const { districtByRegionId } = useSelector((state) => state.district);
  const { organizations } = useSelector((state) => state.organization);

  const token = localStorage.getItem("access_token");

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;
    dispatch(
      getAllStationsData(
        {
          lang,
          page: 1,
          perPage: 10,
          search: "",
          regionId: "",
          organizationId: "",
          status: "",
        },
        token
      )
    );
    dispatch(getAllRegionId(lang, token));
    dispatch(getAllOrganizationsData(lang, token));
  }, [dispatch, token, i18n.language]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);

  useEffect(() => {
    if (stationData.regionId) {
      dispatch(getByRegionIdData(i18n.language, token, stationData.regionId));
    }
  }, [stationData.regionId, i18n.language, dispatch, token]);

  const isFormValid = (data) => {
    const requiredFields = [
      "name",
      "regionId",
      "districtId",
      "organizationId",
      "location",
      "devicePhoneNum",
    ];

    return requiredFields.every((field) => {
      const value = data[field];
      return (
        value !== undefined && value !== null && value.toString().trim() !== ""
      );
    });
  };

  const getIdByName = useCallback((name, list) => {
    const item = list.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    return item ? item.id : 0;
  }, []);

  const getRegionIdName = async (regionId, name) => {
    try {
      const response = await getDataApi(
        `districts/getByRegionId?regionId=${regionId}&lang=${i18n.language}`
      );

      const district = response.data.data.find(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      );

      return district ? district.id : 0;
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error:
            error.response?.message || "An error occurred while fetching data.",
        },
      });

      return 0; // Return 0 in case of an error
    }
  };

  const openModal = (
    data = initialStationData,
    isEdit = false,
    setSendData,
    setModalData,
    setIsUpdateding
  ) => {
    setSendData(data);
    setIsUpdateding(isEdit);
    setModalData(true);
  };

  const closeModal = (data, setSendData, setModalData, setIsUpdateding) => {
    setSendData(data);
    setIsUpdateding(false);
    setModalData(false);
  };

  const handleSubmit = (sendData, sendType) => {
    if (sendType === "stations") {
      if (!isFormValid(sendData)) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: t("stationsPageData.validInputs"),
          },
        });
        return;
      }

      if (isUpdating) {
        dispatch(updateStationsData(sendData, token, i18n.language));
      } else {
        dispatch(createStationsData(sendData, token, i18n.language));
      }

      closeModal(
        initialStationData,
        setStationData,
        setIsModalVisible,
        setIsUpdating
      );
    } else {
      if (aggregateUpdate) {
        dispatch(updateStationsData(sendData, token, i18n.language));
      } else {
        dispatch(createAggregateData(sendData, i18n.language, token));
      }
      closeModal(
        initialAggregate,
        setAggregateData,
        setAggregateModal,
        setAggregateUpdate
      );
    }
  };

  const onClickPhoneNumber = () => {
    setStationData((prevData) => ({
      ...prevData,
      devicePhoneNum: "+998",
    }));
  };

  const handleInputChange = ({ target: { name, value } }, setSendData) => {
    setSendData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = ({ target: { name, checked } }) => {
    setStationData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (value, { name }) => {
    setStationData((prev) => ({ ...prev, [name]: value }));
  };

  const renderOptions = useMemo(
    () => (list) => list.map((item) => ({ value: item.id, label: item.name })),
    []
  );

  const handleEditClick = async (item) => {
    const regionId = getIdByName(item.region, regions);
    const districtId = await getRegionIdName(regionId, item.district);
    const organizationId = getIdByName(item.organization, organizations);

    const updatedData = {
      id: item.key,
      name: item.name,
      location: item.location,
      devicePhoneNum: item.devicePhoneNum,
      isIntegration: item.isIntegration,
      haveElectricalEnergy: item.haveElectricalEnergy,
      codeElectricalEnergy: item.codeElectricalEnergy,
      regionId,
      districtId,
      organizationId,
    };

    openModal(
      updatedData,
      true,
      setStationData,
      setIsModalVisible,
      setIsUpdating
    );
  };

  const columns = [
    {
      title: t("stationsPageData.table1Data"),
      dataIndex: "name",
      key: "name",
      align: "center",
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
          type='primary'
          icon={<EyeFilled />}
          onClick={() => navigate(`/statetions/${key.key}`)}
          style={{
            boxShadow: "none",
          }}
        />
      ),
    },

    {
      title: t("stationsPageData.table9Data"),
      dataIndex: "haveElectricalEnergy",
      key: "haveElectricalEnergy",
      align: "center",
      render: (_, key) => (
        <Button
          type='primary'
          icon={<PlusSquareOutlined />}
          onClick={() =>
            openModal(
              {
                name: "",
                stationId: key.key,
                code: "",
              },
              false,
              setAggregateData,
              setAggregateModal,
              setAggregateUpdate
            )
          }
          style={{
            boxShadow: "none",
          }}
        />
      ),
    },

    {
      title: t("stationsPageData.table13Data"),
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, key) => (
        <Button
          type='primary'
          icon={<PlusSquareOutlined />}
          onClick={() =>
            openModal(
              {
                name: "",
                stationId: key.key,
                code: "",
              },
              false,
              setAggregateData,
              setAggregateModal,
              setAggregateUpdate
            )
          }
          style={{
            boxShadow: "none",
          }}
        />
      ),
    },

    {
      title: t("stationsPageData.table10Data"),
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, key) => (
        <Button
          type='primary'
          icon={<EditOutlined />}
          onClick={async () => handleEditClick(key)}
          style={{
            boxShadow: "none",
          }}
        />
      ),
    },

    {
      title: t("stationsPageData.table11Data"),
      dataIndex: "",
      key: "x",
      align: "center",
      render: (_, key) => (
        <Button
          onClick={() => dispatch(deleteStationsData({ id: key.key }, token))}
          type='primary'
          danger
          icon={<DeleteOutlined />}
          style={{
            boxShadow: "none",
          }}
        />
      ),
    },
  ];

  return (
    <section className='stations_sections'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='stations_header_container'>
            <Button
              type='primary'
              onClick={() =>
                openModal(
                  initialStationData,
                  false,
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
              }}>
              {t("stationsPageData.createStationsButton")}
            </Button>
          </div>

          {stationsData.data?.length > 0 && (
            <div
              style={{
                background: colors.layoutBackground,
              }}
              className='stations_body_container'>
              <div className='stations_header_title '>
                <h1>{t("stationsPageData.stationsDataHeader")}</h1>
              </div>

              <div className='stations_container'>
                <Table
                  style={{
                    width: "100%",
                  }}
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={stationsData?.data?.map((item) => ({
                    key: item.id,
                    name: item.name,
                    codeElectricalEnergy: item.codeElectricalEnergy,
                    devicePhoneNum: item.devicePhoneNum,
                    district: item.district,
                    haveElectricalEnergy: item.haveElectricalEnergy,
                    isIntegration: item.isIntegration,
                    organization: item.organization,
                    region: item.region,
                    status: item.status,
                    location: item.location,
                  }))}
                />
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        title={
          isUpdating
            ? t("stationsPageData.stationsUpdateHeaderModal")
            : t("stationsPageData.createStationsModalHeader")
        }
        open={isModalVisible}
        centered
        onCancel={() =>
          closeModal(
            initialStationData,
            setStationData,
            setIsModalVisible,
            setIsUpdating
          )
        }
        onOk={() => handleSubmit(stationData, "stations")}
        confirmLoading={loading}
        footer={[
          <Button
            key='back'
            danger
            type='primary'
            onClick={() =>
              closeModal(
                initialStationData,
                setStationData,
                setIsModalVisible,
                setIsUpdating
              )
            }>
            {t("stationsPageData.cancelButtonModal")}
          </Button>,

          <Button
            key='submit'
            type='primary'
            onClick={() => handleSubmit(stationData, "stations")}
            loading={loading}>
            {t("stationsPageData.submitButtonModal")}
          </Button>,
        ]}
        style={{
          color: colors.textColor,
        }}
        className='modal_stations'>
        <div className='modal_body_container'>
          <Form
            key={stationData.id || "new"}
            className='create_stations_form'
            name='station_form'
            layout='inline'
            requiredMark='optional'
            onFinish={handleSubmit}>
            <Form.Item
              name='name'
              rules={[{ required: true, message: "Write full name" }]}>
              <Input
                className='stations_inputs'
                name='name'
                value={stationData.name}
                onChange={(e) => handleInputChange(e, setStationData)}
                placeholder={t("stationsPageData.stationsInputName")}
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='location'
              rules={[{ required: true, message: "Write location" }]}>
              <Input
                name='location'
                className='stations_inputs'
                value={stationData.location}
                onChange={(e) => handleInputChange(e, setStationData)}
                placeholder='40.297929-67.948570'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='devicePhoneNum'
              rules={[{ required: true, message: "Write Phone number" }]}>
              <Input
                name='devicePhoneNum'
                className='stations_inputs'
                value={stationData.devicePhoneNum}
                onChange={(e) => handleInputChange(e, setStationData)}
                onClick={onClickPhoneNumber}
                placeholder='+(998)99-999-99-99'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='regionId'
              rules={[{ required: true, message: "Select Region" }]}>
              <Select
                size='large'
                value={stationData.regionId}
                showSearch
                className='select_input_stations'
                placeholder={t("stationsPageData.stationsInputRegion")}
                options={renderOptions(regions)}
                onChange={(value, option) =>
                  handleSelectChange(value, { name: "regionId" })
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item
              name='districtId'
              rules={[{ required: true, message: "Select District" }]}>
              <Select
                size='large'
                value={stationData.districtId}
                showSearch
                className='select_input_stations'
                placeholder={t("stationsPageData.stationsInputDestrict")}
                disabled={!stationData.regionId}
                options={renderOptions(districtByRegionId)}
                onChange={(value, option) =>
                  handleSelectChange(value, { name: "districtId" })
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item
              name='organizationId'
              rules={[{ required: true, message: "Select Organizations" }]}>
              <Select
                size='large'
                value={stationData.organizationId}
                showSearch
                className='select_input_stations'
                placeholder={t("stationsPageData.stationsInputOrganizations")}
                options={renderOptions(organizations)}
                onChange={(value, option) =>
                  handleSelectChange(value, { name: "organizationId" })
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item>
              <Input
                size='large'
                className='stations_inputs'
                name='codeElectricalEnergy'
                onChange={(e) => handleInputChange(e, setStationData)}
                placeholder={t("stationsPageData.stationsInputEnergy")}
                disabled={!stationData.haveElectricalEnergy}
                value={stationData.codeElectricalEnergy}
              />
            </Form.Item>

            <Form.Item>
              <div className='checkbox_container_stations'>
                <div
                  className='electrical_box'
                  style={{
                    border: `2px solid ${colors.textLight}`,
                  }}>
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name='haveElectricalEnergy'
                    checked={stationData.haveElectricalEnergy}>
                    {t("stationsPageData.stationsCheckboxEnergy")}
                  </Checkbox>
                </div>

                <div
                  className='electrical_box'
                  style={{
                    border: `2px solid ${colors.textLight}`,
                  }}>
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name='isIntegration'
                    checked={stationData.isIntegration}>
                    {t("stationsPageData.stationsCheckboxIntegration")}
                  </Checkbox>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal
        title={t("stationsPageData.aggrigateStations")}
        open={aggregateModal}
        centered
        onCancel={() =>
          closeModal(
            initialAggregate,
            setAggregateData,
            setAggregateModal,
            setAggregateUpdate
          )
        }
        onOk={() => handleSubmit(aggregateData, "")}
        confirmLoading={loading}
        footer={[
          <Button
            key='back'
            danger
            type='primary'
            onClick={() =>
              closeModal(
                initialAggregate,
                setAggregateData,
                setAggregateModal,
                setAggregateUpdate
              )
            }>
            {t("stationsPageData.cancelButtonModal")}
          </Button>,

          <Button
            key='submit'
            type='primary'
            onClick={() => handleSubmit(aggregateData, "")}
            loading={loading}>
            {t("stationsPageData.submitButtonModal")}
          </Button>,
        ]}
        style={{
          color: colors.textColor,
        }}
        className='modal_stations'>
        <div className='modal_body_container'>
          <Form
            className='create_stations_form'
            name='station_form'
            initialValues={aggregateData}
            layout='inline'
            requiredMark='optional'>
            <Form.Item>
              <Input
                size='large'
                className='stations_inputs'
                name='name'
                onChange={(e) => handleInputChange(e, setAggregateData)}
                placeholder={t("stationsPageData.stationsInputEnergy")}
                value={aggregateData.name}
              />
            </Form.Item>

            <Form.Item>
              <Input
                size='large'
                className='stations_inputs'
                name='code'
                onChange={(e) => handleInputChange(e, setAggregateData)}
                placeholder={t("stationsPageData.stationsInputEnergy")}
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
