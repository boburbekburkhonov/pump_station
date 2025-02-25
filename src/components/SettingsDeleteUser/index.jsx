import React, { useState } from "react";
import imageProfile from "../../assets/profile.svg";
import imageAlertDelete from "../../assets/alert-delete.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import { postDataApi } from "../../utils";
import { Modal } from "antd";

const SettingsDeleteUser = () => {
  const { userInformationById } = useSelector((state) => state.dashboard);
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const accessToken = localStorage.getItem("access_token");
  const [modalOpen, setModalOpen] = useState(false);

  const deleteUserFunc = async () => {
    try {
      const data = {
        id: userId,
      };

      const res = await postDataApi(`users/delete`, data, accessToken);

      if (res.data.statusCode === 200) {
        window.localStorage.removeItem("roles");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        Cookies.remove("regionId");
        Cookies.remove("districtId");
        Cookies.remove("userId");
        Cookies.remove("login");
        Cookies.remove("code");
        window.location.href = "/";
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

  return (
    <main
      className="settings_right"
      style={{
        background: colors.layoutBackground,
      }}
    >
      {/* MODAL */}
      <Modal
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false)
          deleteUserFunc()
        }}
        onCancel={() => setModalOpen(false)}
        okText={t("settingNavbar.deleteUser.item14")}
        cancelText={t("settingNavbar.deleteUser.item13")}
        okButtonProps={{ style: { backgroundColor: "#dc3545", borderColor: "#dc3545" } }}
      >
        <div className="modal-header w-100" style={{ width: "100%" }}>
          <img
            style={{ display: "flex", margin: "auto", marginBottom: "20px" }}
            width={90}
            height={90}
            src={imageAlertDelete}
            alt="imageAlertDelete"
          />
        </div>
        <div className="modal-body text-center">
          <p
            className="m-0 fs-5"
            style={{
              color: colors.text,
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {t("settingNavbar.deleteUser.item12")}
          </p>
        </div>
      </Modal>

      <div
        className="settings_right_delete_user-page"
        style={{
          background: colors.layoutBackground,
          color: colors.text,
        }}
      >
        <div className="settings_right_delete_user-container">
          <h1>{t("settingNavbar.deleteUser.item2")}</h1>
          <p
            style={{
              color: colors.text,
            }}
          >
            {t("settingNavbar.deleteUser.item3")}
          </p>

          <div
            className="settings_right_delete_user-profile"
            style={{ background: colors.buttonColor, color: "#fff" }}
          >
            <img
              src={imageProfile}
              alt="imageProfile"
              className="settings_right_delete_user-avatar"
              style={{ filter: "invert(1) brightness(10)" }}
            />
            <div className="settings_right_delete_user-details">
              <h2 style={{ color: "#fff" }}> {userInformationById.name}</h2>
              <p className="m-0" style={{ color: "#fff" }}>
                {userInformationById.email}
              </p>
            </div>
          </div>

          <div className="settings_right_delete_user-info">
            <h3 style={{ color: colors.buttonColor }}>
              {t("settingNavbar.deleteUser.item4")}
            </h3>
            <ul>
              <li
                style={{
                  color: colors.text,
                }}
              >
                {t("settingNavbar.deleteUser.item5")}
              </li>
              <li
                style={{
                  color: colors.text,
                }}
              >
                {t("settingNavbar.deleteUser.item6")}
              </li>
              <li
                style={{
                  color: colors.text,
                }}
              >
                {t("settingNavbar.deleteUser.item7")}
              </li>
            </ul>
          </div>

          <div className="settings_right_delete_user-info">
            <h3 style={{ color: colors.buttonColor }}>
              {t("settingNavbar.deleteUser.item8")}
            </h3>
            <p
              style={{
                color: colors.text,
              }}
            >
              {t("settingNavbar.deleteUser.item9")}{" "}
              <span
                onClick={() => {
                  navigate(`/settings/logout`);
                }}
                className="text-primary cursor_pointer"
              >
                {t("settingNavbar.deleteUser.item10")}
              </span>{" "}
              {t("settingNavbar.deleteUser.item11")}
            </p>
          </div>

          <div className="settings_right_delete_user-buttons">
            <button
              className="settings_right_delete_user-delete"
              type="button"
              onClick={() => setModalOpen(true)}
            >
              {t("settingNavbar.deleteUser.item2")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsDeleteUser;
