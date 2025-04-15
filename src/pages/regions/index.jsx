import { Button, Modal, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllRegionId } from "../../redux/actions/regionActions";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import "./index.css";
import { postDataApi } from "../../utils";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

function RegionPages() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.alert);
  const token = localStorage.getItem("access_token");
  const { regionsForRegion } = useSelector((state) => state.region);
  const [openResponsive, setOpenResponsive] = useState(false);
  const [oneRegionForUpdate, setOneRegionForUpdate] = useState({});
  const [oneRegionForDelete, setOneRegionForDelete] = useState({});
  const [openResponsiveForUpdata, setOpenResponsiveForUpdata] = useState(false);
  const [openResponsiveForDelete, setOpenResponsiveForDelete] = useState(false);
  const [regionNameUz, setRegionNameUz] = useState("");
  const [regionLon, setRegionLon] = useState("");
  const [regionLang, setRegionLang] = useState("");
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [count, setCount] = useState(0);

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;

    dispatch(getAllRegionId(lang, token, pageData.page, pageData.perPage));
  }, [dispatch, token, i18n.language, pageData, count]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n, count]);

  useEffect(() => {
    if (oneRegionForUpdate) {
      setRegionNameUz(oneRegionForUpdate.name || "");
      setRegionLon(oneRegionForUpdate.longitude || "");
      setRegionLang(oneRegionForUpdate.latitude || "");
    }
  }, [oneRegionForUpdate]);

  const handlePaginationChange = useCallback((page, size) => {
    setPageData({
      page,
      perPage: size,
    });
  });

  const createRegion = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const lang = i18n.language;

      const data = {
        name: [
          { name: formData.get("name_uz"), code: "uz" },
          { name: formData.get("name_en"), code: "en" },
          { name: formData.get("name_ru"), code: "ru" },
        ],
        latitude: formData.get("latitude"),
        longitude: formData.get("longitude"),
      };

      const res = await postDataApi(`regions/create?lang=${lang}`, data, token);

      if (res.status == 201) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            success: res.data.message,
          },
        });
        setOpenResponsive(false);
        form.reset();
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

  const updateRegion = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const lang = i18n.language;

      const data = {
        id: oneRegionForUpdate.id,
        name: [
          { name: formData.get("name_uz_for_update"), code: "uz" },
          { name: formData.get("name_en_for_update"), code: "en" },
          { name: formData.get("name_ru_for_update"), code: "ru" },
        ],
        latitude: formData.get("latitude_for_update"),
        longitude: formData.get("longitude_for_update"),
      };

      const res = await postDataApi(`regions/update?lang=${lang}`, data, token);

      if (res.status == 201) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            success: res.data.message,
          },
        });
        setCount(count + 1);
        setOpenResponsiveForUpdata(false);
        form.reset();
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

  const deleteRegion = async () => {
    try {
      const lang = i18n.language;

      const data = {
        id: oneRegionForDelete.id
      }

      const res = await postDataApi(`regions/delete?lang=${lang}`, data, token);

      if (res.status == 201) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            success: res.data.message,
          },
        });
        setCount(count + 1);
        setOpenResponsiveForDelete(false);
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

  const handleEditClick = async (item) => {
    setOneRegionForUpdate(item);
    // const regionId = getIdByName(item.region, regions);
    // const districtId = await getRegionIdName(regionId, item.district);
    // const organizationId = getIdByName(item.organization, organizations);

    // const updatedData = {
    //   id: item.key,
    //   name: item.name,
    //   location: item.location,
    //   devicePhoneNum: item.devicePhoneNum,
    //   isIntegration: item.isIntegration,
    //   haveElectricalEnergy: item.haveElectricalEnergy,
    //   regionId,
    //   districtId,
    //   organizationId,
    // };

    // openModal(
    //   { data: updatedData, isEdit: true },
    //   setStationData,
    //   setIsModalVisible,
    //   setIsUpdating
    // );

    // form.setFieldsValue(updatedData);
  };

  const handleEditClickForDelete = async (item) => {
    setOneRegionForDelete(item);
  };

  const columns = [
    {
      title: "Viloyat nomi",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Viloyat kengligi",
      dataIndex: "latitude",
      key: "latitude",
      align: "center",
    },
    {
      title: "Viloyat uzunligi",
      dataIndex: "longitude",
      key: "longitude",
      align: "center",
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
          onClick={async () => {
            handleEditClick(key);
            setOpenResponsiveForUpdata(true);
          }}
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
          onClick={async () => {
            handleEditClickForDelete(key);
            setOpenResponsiveForDelete(true);
          }}
          type="primary"
          danger
          icon={<DeleteOutlined />}
          style={{ boxShadow: "none" }}
        />
      ),
      width: 100,
    },
  ];

  return (
    <div
      style={{
        background: colors.layoutBackground,
        minHeight: "90vh",
        padding: "20px 20px",
      }}
    >
      <Modal
        centered
        open={openResponsive}
        footer={null}
        className="modal_regions"
        closable={true}
        onCancel={() => setOpenResponsive(false)}
      >
        <form
          className="modal_region-content"
          id="regionForm"
          onSubmit={createRegion}
          style={{
            paddingTop: "30px",
          }}
        >
          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label>Viloyat nomi (uz)</label>
              <div className="modal_region-input-icon">
                <span>🇺🇿</span>
                <input
                  name="name_uz"
                  type="text"
                  placeholder="Andijon viloyati"
                  required
                />
              </div>
            </div>
            <div className="modal_region-form-group">
              <label>Viloyat nomi (en)</label>
              <div className="modal_region-input-icon">
                <span>EN</span>
                <input
                  name="name_en"
                  type="text"
                  placeholder="Andijan region"
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label>Viloyat nomi (ru)</label>
              <div className="modal_region-input-icon">
                <span>🇷🇺</span>
                <input
                  name="name_ru"
                  type="text"
                  placeholder="Андижанская область"
                  required
                />
              </div>
            </div>
            <div className="modal_region-form-group">
              <label>Longitude</label>
              <div className="modal_region-input-icon">
                <span>🧭</span>
                <input
                  name="longitude"
                  type="number"
                  placeholder="72.3258..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label>Latitude</label>
              <div className="modal_region-input-icon">
                <span>🧭</span>
                <input
                  name="latitude"
                  type="number"
                  placeholder="40.7918..."
                  required
                />
              </div>
            </div>
            <div className="modal_region-form-group"></div>
          </div>

          <div className="modal_region-actions">
            <button
              type="button"
              className="modal_region-btn modal_region-btn-cancel"
              onClick={() => {
                setOpenResponsive(false);
              }}
            >
              {t("stationsPageData.cancelButtonModal")}
            </button>
            <button
              className="modal_region-btn modal_region-btn-save"
              type="submit"
            >
              {t("stationsPageData.submitButtonModal")}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title={oneRegionForUpdate.name}
        centered
        open={openResponsiveForUpdata}
        footer={null}
        className="modal_regions"
        closable={true}
        onCancel={() => setOpenResponsiveForUpdata(false)}
      >
        <form
          className="modal_region-content"
          id="regionFormForUpdate"
          style={{
            paddingTop: "30px",
          }}
          onSubmit={updateRegion}
        >
          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label>Viloyat nomi (uz)</label>
              <div className="modal_region-input-icon">
                <span>🇺🇿</span>
                <input
                  name="name_uz_for_update"
                  type="text"
                  placeholder="Andijon viloyati"
                  required
                  value={regionNameUz}
                  onChange={(e) => setRegionNameUz(e.target.value)}
                />
              </div>
            </div>
            <div className="modal_region-form-group">
              <label>Viloyat nomi (en)</label>
              <div className="modal_region-input-icon">
                <span>EN</span>
                <input
                  name="name_en_for_update"
                  type="text"
                  placeholder="Andijan region"
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label>Viloyat nomi (ru)</label>
              <div className="modal_region-input-icon">
                <span>🇷🇺</span>
                <input
                  name="name_ru_for_update"
                  type="text"
                  placeholder="Андижанская область"
                  required
                />
              </div>
            </div>
            <div className="modal_region-form-group">
              <label>Longitude</label>
              <div className="modal_region-input-icon">
                <span>🧭</span>
                <input
                  name="longitude_for_update"
                  type="number"
                  placeholder="72.3258..."
                  required
                  value={regionLon}
                  onChange={(e) => setRegionLon(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label>Latitude</label>
              <div className="modal_region-input-icon">
                <span>🧭</span>
                <input
                  name="latitude_for_update"
                  type="number"
                  placeholder="40.7918..."
                  required
                  value={regionLang}
                  onChange={(e) => setRegionLang(e.target.value)}
                />
              </div>
            </div>
            <div className="modal_region-form-group"></div>
          </div>

          <div className="modal_region-actions">
            <button
              type="button"
              className="modal_region-btn modal_region-btn-cancel"
              onClick={() => {
                setOpenResponsiveForUpdata(false);
                setCount(count + 1);
              }}
            >
              {t("stationsPageData.cancelButtonModal")}
            </button>
            <button
              className="modal_region-btn modal_region-btn-save"
              type="submit"
            >
              {t("stationsPageData.submitButtonModal")}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        centered
        open={openResponsiveForDelete}
        footer={null}
        closable={true}
        onCancel={() => setOpenResponsiveForDelete(false)}
      >
        <div className="modal_delete-content">
          <div className="modal_delete-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
              alt="warning"
            />
            <h2>Viloyatni o‘chirish</h2>
          </div>
          <div className="modal_delete-body">
            <p>
              <strong>{oneRegionForDelete.name} o‘chirishga ishonchingiz komilmi?</strong>
            </p>
            <p className="modal_delete-warning">
              ⚠ Bu amalni qayta tiklab bo‘lmaydi.
            </p>
          </div>
          <div className="modal_delete-footer">
            <button className="modal_delete-cancel" onClick={() => {
                setOpenResponsiveForDelete(false);
              }}>{t("stationsPageData.cancelButtonModal")}</button>
            <button className="modal_delete-confirm" onClick={() => deleteRegion()}>O'chirish</button>
          </div>
        </div>
      </Modal>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>{t("region.item1")}</h2>

        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          size="large"
          onClick={() => setOpenResponsive(true)}
        >
          {t("region.item2")}
        </Button>
      </div>

      <Table
        style={{ width: "100%" }}
        scroll={{ x: "max-content", y: 90 * 9 }}
        columns={columns}
        dataSource={regionsForRegion.data}
        pagination={{
          current: pageData.page,
          pageSize: pageData.perPage,
          total: regionsForRegion.totalDocuments,
          onChange: handlePaginationChange,
          style: {
            padding: "0 0.75rem",
          },
        }}
      />
    </div>
  );
}

export default RegionPages;
