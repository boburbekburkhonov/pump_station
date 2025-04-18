import { Button, Input, Modal, Select, Table } from "antd";
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
  SearchOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import { postDataApi } from "../../utils";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getAllUsers, getRoles } from "../../redux/actions/userActions";
import { getAllDistrictDataByRegionId } from "../../redux/actions/districtActions";
import { getAllOrganizationsDataByRegionId } from "../../redux/actions/organizationActions";
import { getAllStationsData } from "../../redux/actions/stationsActions";
import EmptyCard from "../../components/emptyCard";

function UserJoin() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.alert);
  const token = localStorage.getItem("access_token");
  const { allUsers, allRoles } = useSelector((state) => state.user);
  const { regions } = useSelector((state) => state.region);
  const { stationsData } = useSelector((state) => state.stations);
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
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const fetchAllData = useCallback(() => {
    const lang = i18n.language;

    dispatch(getAllUsers(lang, token, pageData.page, pageData.perPage));
    dispatch(getAllRegionId(lang, token, 1, 20));
  }, [dispatch, token, i18n.language, pageData, count]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n, count]);

  useEffect(() => {
    const lang = i18n.language;

    const data = {
      lang: lang,
      regionId:
        regions[selectRegionId]?.id == undefined
          ? 1
          : regions[selectRegionId]?.id,
    };

    dispatch(getAllStationsData(data, token));
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

  const handleEditClick = async (item) => {
    setOneRegionForUpdate(item);
    const foundRoleIndex = allRoles.findIndex((e) => e.id == item.roleId);
    setSelectRoleId(foundRoleIndex);
    setSelectRegionId(item.regionId - 1);
  };

  const handleSearchUser = () => {
    const lang = i18n.language;

    if (searchText.length != 0) {

      // dispatch(
      //   findInMapsLastData(
      //     lang,
      //     token,
      //     undefined,
      //     undefined,
      //     searchText,
      //     status
      //   ) dispatch(getAllUsers(lang, token, pageData.page, pageData.perPage));
      // );
    }
  };

  const columns = [
    {
      title: "Foydalanuvchi nomi",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
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
      title: t("layoutData.navLink12"),
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, key) => (
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={async () => {
            handleEditClick(key);
            setOpenResponsiveForUpdata(true);
          }}
          style={{ boxShadow: "none" }}
        />
      ),
      width: 105,
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
        open={openResponsiveForUpdata}
        footer={null}
        className="modal_regions"
        closable={true}
        onCancel={() => {
          setOpenResponsiveForUpdata(false);
          setSelectRegionId(0);
        }}
      >
        <h2
          style={{
            marginTop: "30px",
            paddingBottom: "10px",
            borderBottom: "2px solid #405FF2",
            textAlign: "center",
          }}
        >
          {oneRegionForUpdate.name}
        </h2>

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
              <label style={{ color: colors.text }}>{t("users.item14")}</label>

              <Select
                key={"selects_name_region"}
                size="large"
                style={{
                  width: "100%",
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

          <div className="station-group">
            <div className="station-group-title">Stansiyalar ro'yhati:</div>
            <div className="station-list">
              {stationsData.data?.length == 0 ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EmptyCard />
                </div>
              ) : (
                stationsData.data?.map((e, i) => {
                  return (
                    <label className="station-card">
                      <input type="checkbox" name="stations" value={e.id} />
                      {e.name}
                    </label>
                  );
                })
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Jo'natish
          </button>
        </form>
      </Modal>

      <div
        style={{
          display: "flex",
          // alignItems: "center",
          // justifyContent: "space-between",
          flexDirection: 'column',
          marginBottom: "20px",
        }}
      >
        <h2>{t("users.item1")}</h2>

        <form
          style={{
            maxWidth: "480px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingTop: "10px",
          }}
          onSubmit={handleSearchUser}
        >
          <Input
            addonBefore={<SearchOutlined />}
            placeholder="Qidirish..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
            style={{ marginLeft: "10px" }}
            type="primary"
            // onClick={() => handleSearchUser()}
          >
            Qidirish
          </Button>
        </form>
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

export default UserJoin;
