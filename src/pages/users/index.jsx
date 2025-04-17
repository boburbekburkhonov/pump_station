import { Button, Modal, Select, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllRegionId } from "../../redux/actions/regionActions";
import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  GoogleOutlined,
  LockOutlined,
  PhoneOutlined,
  PlusSquareOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import { postDataApi } from "../../utils";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getAllUsers, getRoles } from "../../redux/actions/userActions";
import { getAllDistrictDataByRegionId } from "../../redux/actions/districtActions";
import { getAllOrganizationsDataByRegionId } from "../../redux/actions/organizationActions";

function Users() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.alert);
  const token = localStorage.getItem("access_token");
  const { allUsers, allRoles } = useSelector((state) => state.user);
  const { regions } = useSelector((state) => state.region);
  const { districtsByRegionId } = useSelector((state) => state.district);
  const { organizationsByRegionId } = useSelector(
    (state) => state.organization
  );
  const [openResponsive, setOpenResponsive] = useState(false);
  const [oneRegionForUpdate, setOneRegionForUpdate] = useState({});
  const [oneRegionForDelete, setOneRegionForDelete] = useState({});
  const [openResponsiveForUpdata, setOpenResponsiveForUpdata] = useState(false);
  const [openResponsiveForDelete, setOpenResponsiveForDelete] = useState(false);
  const [regionNameUz, setRegionNameUz] = useState("");
  const [regionLon, setRegionLon] = useState("");
  const [regionLang, setRegionLang] = useState("");
  const [selectRegionId, setSelectRegionId] = useState(0);
  const [selectRoleId, setSelectRoleId] = useState(0);
  const [selectDistrictId, setSelectDistrictId] = useState(0);
  const [selectOrganizationId, setSelectOrganizationId] = useState(0);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;

    dispatch(getAllUsers(lang, token, pageData.page, pageData.perPage));
    dispatch(getAllRegionId(lang, token, 1, 20));
    dispatch(getRoles(lang, token));
  }, [dispatch, token, i18n.language, pageData, count]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n, count]);

  useEffect(() => {
    const lang = i18n.language;

    dispatch(
      getAllDistrictDataByRegionId(
        lang,
        token,
        regions[selectRegionId]?.id == undefined
          ? 1
          : regions[selectRegionId]?.id
      )
    );
    dispatch(
      getAllOrganizationsDataByRegionId(
        lang,
        token,
        regions[selectRegionId]?.id == undefined
          ? 1
          : regions[selectRegionId]?.id
      )
    );
  }, [selectRegionId]);

  useEffect(() => {
    if (oneRegionForUpdate) {
      setUserName(oneRegionForUpdate.name || "");
      setUserUsername(oneRegionForUpdate.username || "");
      setUserPhone(oneRegionForUpdate.phone || "");
      setUserEmail(oneRegionForUpdate.email || "");
    }
  }, [oneRegionForUpdate]);

  const handlePaginationChange = useCallback((page, size) => {
    setPageData({
      page,
      perPage: size,
    });
  });

  const createUser = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const regionId = regions[selectRegionId]?.id;
    const districtId = districtsByRegionId[selectDistrictId]?.id;
    const organizationId = organizationsByRegionId[selectOrganizationId]?.id;
    const roleId = allRoles[selectRoleId]?.id;

    try {
      const data = {
        name: formData.get("user_name"),
        username: formData.get("user_username"),
        password: formData.get("user_password"),
        phone: formData.get("user_phone"),
        roleId: roleId,
        email: formData.get("user_email"),
        regionId: regionId,
        districtId: districtId,
        organizationId: organizationId,
      };

      const res = await postDataApi(`users/create`, data, token);

      if (res.status == 201) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            success: res.data.message,
          },
        });
        setOpenResponsive(false);
        setSelectRegionId(0);
        setSelectRoleId(0);
        setSelectDistrictId(0);
        setSelectOrganizationId(0);
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

  const updateUser = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const regionId = regions[selectRegionId]?.id;
    const districtId = districtsByRegionId[selectDistrictId]?.id;
    const organizationId = organizationsByRegionId[selectOrganizationId]?.id;
    const roleId = allRoles[selectRoleId]?.id;

    try {
      const data = {
        id: oneRegionForUpdate.id,
        name: formData.get("user_name_for_update"),
        username: formData.get("user_username_for_update"),
        phone: formData.get("user_phone_for_update"),
        roleId: roleId,
        email: formData.get("user_email_for_update"),
        regionId: regionId,
        districtId: districtId,
        organizationId: organizationId,
      };

      const res = await postDataApi(`users/update`, data, token);

      if (res.status == 201) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            success: res.data.message,
          },
        });
        setCount(count + 1);
        setOpenResponsiveForUpdata(false);
        setSelectRegionId(0);
        setSelectRoleId(0);
        setSelectDistrictId(0);
        setSelectOrganizationId(0);
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

  const deleteUser = async () => {
    try {
      const lang = i18n.language;

      const data = {
        id: oneRegionForDelete.id,
      };

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
    const foundRoleIndex = allRoles.findIndex((e) => e.id == item.roleId);
    setSelectRoleId(foundRoleIndex);
    setSelectRegionId(item.regionId - 1);
  };

  const handleEditClickForDelete = async (item) => {
    setOneRegionForDelete(item);
  };

  const columns = [
    {
      title: "Foydalanuvchi nomi",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    // {
    //   title: 'Foydalanuvchining logini',
    //   dataIndex: "username",
    //   key: "username",
    //   align: "center",
    // },
    {
      title: "Telefon raqam",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    // {
    //   title: 'Email',
    //   dataIndex: "email",
    //   key: "email",
    //   align: "center",
    // },
    {
      title: "Foydalanuvchi turi",
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => role?.name || "-",
    },
    {
      title: "Viloyat nomi",
      dataIndex: "regionName",
      key: "regionName",
      align: "center",
    },
    {
      title: "Tuman nomi",
      dataIndex: "districtName",
      key: "districtName",
      align: "center",
    },
    {
      title: "Tashkilot nomi",
      dataIndex: "organizationName",
      key: "organizationName",
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
          onSubmit={createUser}
          style={{
            paddingTop: "30px",
          }}
        >
          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Foydalanuvchi nomi</label>
              <div className="modal_region-input-icon">
                <span>
                  <UserOutlined />
                </span>
                <input name="user_name" type="text" placeholder="" required />
              </div>
            </div>
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>
                Foydalanuvchining logini
              </label>
              <div className="modal_region-input-icon">
                <span>
                  <UserOutlined />
                </span>
                <input
                  name="user_username"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>
                Foydalanuvchining paroli
              </label>
              <div className="modal_region-input-icon">
                <span>
                  <LockOutlined />
                </span>
                <input
                  name="user_password"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>
                Foydalanuvchining telefon raqami
              </label>
              <div className="modal_region-input-icon">
                <span>
                  <PhoneOutlined />
                </span>
                <input name="user_phone" type="tel" placeholder="" required />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Foydalanuvchi turi</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  minWidth: 341,
                }}
                value={selectRoleId}
                className="reports_sort_select"
                options={
                  allRoles.length != undefined
                    ? allRoles?.map((item, index) => ({
                        value: index,
                        label: item.name,
                      }))
                    : ""
                }
                onChange={(key, option) => {
                  setSelectRoleId(key);
                }}
              />
            </div>
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Foydalanuvchi email</label>
              <div className="modal_region-input-icon">
                <span>
                  <GoogleOutlined />
                </span>
                <input name="user_email" type="email" placeholder="" required />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Viloyat</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  minWidth: 341,
                }}
                value={selectRegionId}
                className="reports_sort_select"
                options={[
                  ...regions.map((item, index) => ({
                    value: index,
                    label: item.name,
                  })),
                ]}
                onChange={(key, option) => {
                  setSelectRegionId(key);
                }}
              />
            </div>
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Tuman</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  minWidth: 341,
                }}
                value={selectDistrictId}
                className="reports_sort_select"
                options={
                  districtsByRegionId.length > 0
                    ? districtsByRegionId.map((item, index) => ({
                        value: index,
                        label: item.name,
                      }))
                    : [
                        {
                          value: "no_data",
                          label: "Ma'lumot mavjud emas",
                          disabled: true,
                        },
                      ]
                }
                onChange={(key, option) => {
                  setSelectDistrictId(key);
                }}
              />
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Tashkilot</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  minWidth: 341,
                }}
                value={selectOrganizationId}
                className="reports_sort_select"
                options={
                  organizationsByRegionId.length > 0
                    ? organizationsByRegionId.map((item, index) => ({
                        value: index,
                        label: item.name,
                      }))
                    : [
                        {
                          value: "no_data",
                          label: "Ma'lumot mavjud emas",
                          disabled: true,
                        },
                      ]
                }
                onChange={(key, option) => {
                  setSelectOrganizationId(key);
                }}
              />
            </div>
            <div className="modal_region-form-group"></div>
          </div>

          <div className="modal_region-actions">
            <button
              type="button"
              className="modal_region-btn modal_region-btn-cancel"
              onClick={() => {
                setOpenResponsive(false);
                setSelectRegionId(0);
                setSelectRoleId(0);
                setSelectDistrictId(0);
                setSelectOrganizationId(0);
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
          onSubmit={updateUser}
        >
          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Foydalanuvchi nomi</label>
              <div className="modal_region-input-icon">
                <span>
                  <UserOutlined />
                </span>
                <input
                  name="user_name_for_update"
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>
                Foydalanuvchining logini
              </label>
              <div className="modal_region-input-icon">
                <span>
                  <UserOutlined />
                </span>
                <input
                  name="user_username_for_update"
                  type="text"
                  placeholder=""
                  required
                  value={userUsername}
                  onChange={(e) => setUserUsername(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Foydalanuvchi email</label>
              <div className="modal_region-input-icon">
                <span>
                  <GoogleOutlined />
                </span>
                <input
                  name="user_email_for_update"
                  type="email"
                  placeholder=""
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>
                Foydalanuvchining telefon raqami
              </label>
              <div className="modal_region-input-icon">
                <span>
                  <PhoneOutlined />
                </span>
                <input
                  name="user_phone_for_update"
                  type="tel"
                  placeholder=""
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Foydalanuvchi turi</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  minWidth: 341,
                }}
                value={selectRoleId}
                className="reports_sort_select"
                options={
                  allRoles.length != undefined
                    ? allRoles?.map((item, index) => ({
                        value: index,
                        label: item.name,
                      }))
                    : ""
                }
                onChange={(key, option) => {
                  setSelectRoleId(key);
                }}
              />
            </div>

            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Viloyat</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  minWidth: 341,
                }}
                value={selectRegionId}
                className="reports_sort_select"
                options={[
                  ...regions.map((item, index) => ({
                    value: index,
                    label: item.name,
                  })),
                ]}
                onChange={(key, option) => {
                  setSelectRegionId(key);
                }}
              />
            </div>
          </div>

          <div className="modal_region-form-row">
            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Tuman</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  minWidth: 341,
                }}
                value={selectDistrictId}
                className="reports_sort_select"
                options={
                  districtsByRegionId.length > 0
                    ? districtsByRegionId.map((item, index) => ({
                        value: index,
                        label: item.name,
                      }))
                    : [
                        {
                          value: "no_data",
                          label: "Ma'lumot mavjud emas",
                          disabled: true,
                        },
                      ]
                }
                onChange={(key, option) => {
                  setSelectDistrictId(key);
                }}
              />
            </div>

            <div className="modal_region-form-group">
              <label style={{ color: colors.text }}>Tashkilot</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  maxWidth: 341,
                  width: "100%",
                }}
                value={selectOrganizationId}
                className="reports_sort_select"
                options={
                  organizationsByRegionId.length > 0
                    ? organizationsByRegionId.map((item, index) => ({
                        value: index,
                        label: item.name,
                      }))
                    : [
                        {
                          value: "no_data",
                          label: "Ma'lumot mavjud emas",
                          disabled: true,
                        },
                      ]
                }
                onChange={(key, option) => {
                  setSelectOrganizationId(key);
                }}
              />
            </div>
          </div>

          <div className="modal_region-actions">
            <button
              type="button"
              className="modal_region-btn modal_region-btn-cancel"
              onClick={() => {
                setOpenResponsiveForUpdata(false);
                setSelectRegionId(0);
                setSelectRoleId(0);
                setSelectDistrictId(0);
                setSelectOrganizationId(0);
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
            <h2>{t("region.item6")}</h2>
          </div>
          <div className="modal_delete-body">
            <p>
              <strong>
                {oneRegionForDelete.name} {t("region.item7")}
              </strong>
            </p>
            <p className="modal_delete-warning">⚠ {t("region.item8")}</p>
          </div>
          <div className="modal_delete-footer">
            <button
              className="modal_delete-cancel"
              onClick={() => {
                setOpenResponsiveForDelete(false);
              }}
            >
              {t("stationsPageData.cancelButtonModal")}
            </button>
            <button
              className="modal_delete-confirm"
              onClick={() => deleteUser()}
            >
              {" "}
              {t("region.item9")}
            </button>
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
        <h2>Foydalanuvchilar ro'yhati</h2>

        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          size="large"
          onClick={() => setOpenResponsive(true)}
        >
          Foydalanuvchi yaratish
        </Button>
      </div>

      <Table
        style={{ width: "100%" }}
        scroll={{ x: "max-content", y: 90 * 9 }}
        columns={columns}
        dataSource={allUsers.usersData}
        pagination={{
          current: pageData.page,
          pageSize: pageData.perPage,
          total: allUsers.totalDocuments,
          onChange: handlePaginationChange,
          style: {
            padding: "0 0.75rem",
          },
        }}
      />
    </div>
  );
}

export default Users;
