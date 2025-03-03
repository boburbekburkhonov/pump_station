import React, { useState } from "react";
import imageProfile from "../../assets/user-settings.png";
import imageNotification from "../../assets/notification-settings.png";
import imageUnlock from "../../assets/padlock-settings.png";
import imagelanguageChange from "../../assets/language-settings.png";
import imageModeChange from "../../assets/night-mode-settings.png";
import imagePrivatePolicy from "../../assets/privacy-policy-settings.png";
import imageInformationSite from "../../assets/information-settings.png";
import imageLogOut from "../../assets/logout-settings.png";
import imageDeleteUser from "../../assets/delete-user-settings.png";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsProfile from "../../components/SettingsProfile";
import { useSelector } from "react-redux";
import SettingsNotification from "../../components/SettingsNotification";
import SettingsPassword from "../../components/SettingsPassword";
import SettingsLanguage from "../../components/SettingsLanguage";
import SettingsTheme from "../../components/SettingsTheme";
import SettingsPrivacy from "../../components/SettingsPrivacy";
import SettingsInformations from "../../components/SettingsInformation";
import "./index.css";
import SettingsDeleteUser from "../../components/SettingsDeleteUser";
import SettingsLogout from "../../components/SettingsLogout";

const index = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { colors, theme } = useSelector((state) => state.theme);
  const mode = window.localStorage.getItem("theme");
  const location = useLocation();
  const activeItem = location.pathname.split("/")[2];

  return (
    <div className="settings_container">
      <aside
        className="settings_sidebar"
        style={{
          background: colors.layoutBackground,
        }}
      >
        <nav>
          <ul className="settings_sidebar_list">
            <li
              className={
                activeItem == undefined
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings");
              }}
            >
              <img
                src={imageProfile}
                alt="imageProfile"
                width={19}
                height={19}
              />
              {/* {activeItem == undefined ? (
                <img
                  src={imageProfile}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imageProfile}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}
              <p
                style={
                  activeItem == undefined
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.profile.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "notification"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings/notification");
              }}
            >
              <img
                src={imageNotification}
                alt="imageProfile"
                width={19}
                height={19}
              />
              {/* {activeItem == "notification" ? (
                <img
                  src={imageNotification}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imageNotification}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}

              <p
                style={
                  activeItem == "notification"
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.notification.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "password"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings/password");
              }}
            >
              <img
                src={imageUnlock}
                alt="imageProfile"
                width={20}
                height={20}
              />
              {/* {activeItem == "password" ? (
                <img
                  src={imageUnlock}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imageUnlock}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}

              <p
                style={
                  activeItem == "password"
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.password.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "language"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings/language");
              }}
            >
              <img
                src={imagelanguageChange}
                alt="imageProfile"
                width={20}
                height={20}
              />
              {/* {activeItem == "language" ? (
                <img
                  src={imagelanguageChange}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imagelanguageChange}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}

              <p
                style={
                  activeItem == "language"
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.language.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "theme"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings/theme");
              }}
            >
              <img
                src={imageModeChange}
                alt="imageProfile"
                width={22}
                height={22}
              />
              {/* {activeItem == "theme" ? (
                <img
                  src={imageModeChange}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imageModeChange}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}

              <p
                style={
                  activeItem == "theme"
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.mode.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "privacy"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings/privacy");
              }}
            >
              <img
                src={imagePrivatePolicy}
                alt="imageProfile"
                width={20}
                height={20}
              />
              {/* {activeItem == "privacy" ? (
                <img
                  src={imagePrivatePolicy}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imagePrivatePolicy}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}

              <p
                style={
                  activeItem == "privacy"
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.privacy.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "information"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings/information");
              }}
            >
              <img
                src={imageInformationSite}
                alt="imageProfile"
                width={20}
                height={20}
              />
              {/* {activeItem == "information" ? (
                <img
                  src={imageInformationSite}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imageInformationSite}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}

              <p
                style={
                  activeItem == "information"
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.about.item1")}
              </p>
            </li>

            <li
              className={
                activeItem == "delete-user"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings/delete-user");
              }}
            >
              <img
                src={imageDeleteUser}
                alt="imageProfile"
                width={22}
                height={22}
              />
              {/* {activeItem == "delete-user" ? (
                <img
                  src={imageDeleteUser}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imageDeleteUser}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}

              <p
                style={
                  activeItem == "delete-user"
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.deleteUser.item1")}
              </p>
            </li>

            <li
              className={
                activeItem == "logout"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                navigate("/settings/logout");
              }}
            >
              <img
                src={imageLogOut}
                alt="imageProfile"
                width={20}
                height={20}
              />
              {/* {activeItem == "logout" ? (
                <img
                  src={imageLogOut}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={{ filter: "invert(100%) brightness(0%)" }}
                />
              ) : (
                <img
                  src={imageLogOut}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                    mode == "light"
                      ? { filter: "invert(100%) brightness(0%)" }
                      : { filter: "invert(100%) brightness(150%)" }
                  }
                />
              )} */}

              <p
                style={
                  activeItem == "logout"
                    ? { color: "#000" }
                    : { color: colors.text }
                }
                className="m-0 settings_sidebar_item_desc ms-1 p-2"
              >
                {t("settingNavbar.logOut.item1")}
              </p>
            </li>
          </ul>
        </nav>
      </aside>
      {/* <Settings /> */}
      <Routes>
        <Route path="/" element={<SettingsProfile />} />
        <Route path="/notification" element={<SettingsNotification />} />
        <Route path="/password" element={<SettingsPassword />} />
        <Route path="/language" element={<SettingsLanguage />} />
        <Route path="/theme" element={<SettingsTheme />} />
        <Route path="/privacy" element={<SettingsPrivacy />} />
        <Route path="/information" element={<SettingsInformations />} />
        <Route path="/logout" element={<SettingsLogout />} />
        <Route path="/delete-user" element={<SettingsDeleteUser />} />
      </Routes>
    </div>
  );
};

export default index;
