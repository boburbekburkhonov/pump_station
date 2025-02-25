import React, { useState } from "react";
import imageProfile from "../../assets/profile.svg";
import imageNotification from "../../assets/notification.svg";
import imageUnlock from "../../assets/unlock.svg";
import imagelanguageChange from "../../assets/language-change.webp";
import imageModeChange from "../../assets/mode-change.png";
import imagePrivatePolicy from "../../assets/private-policy.jpg";
import imageInformationSite from "../../assets/information-site.webp";
import imageLogOut from "../../assets/logout.svg";
import imageDeleteUser from "../../assets/delete-user.png";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  const [activeItem, setActiveItem] = useState("profile");
  const navigate = useNavigate();
  const { colors, theme } = useSelector((state) => state.theme);
  const mode = window.localStorage.getItem("theme");

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
                activeItem == "profile"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                setActiveItem("profile");
                navigate("/settings");
              }}
            >
              {activeItem == "profile" ? (
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
              )}
              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
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
                setActiveItem("notification");
                navigate("/settings/notification");
              }}
            >
              {activeItem == "notification" ? (
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
              )}

              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
                {t("settingNavbar.notification.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "change-password"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                setActiveItem("change-password");
                navigate("/settings/password");
              }}
            >
              {activeItem == "change-password" ? (
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
              )}

              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
                {t("settingNavbar.password.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "change-language"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                setActiveItem("change-language");
                navigate("/settings/language");
              }}
            >
              {activeItem == "change-language" ? (
                <img
                  src={imagelanguageChange}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                  { filter: "invert(100%) brightness(0%)" }
                  }
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
              )}

              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
                {t("settingNavbar.language.item1")}
              </p>
            </li>
            <li
              className={
                activeItem == "change-theme"
                  ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar text-dark"
                  : "settings_sidebar_item d-flex align-items-center p-2"
              }
              onClick={() => {
                setActiveItem("change-theme");
                navigate("/settings/theme");
              }}
            >
              {activeItem == "change-theme" ? (
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
              )}

              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
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
                setActiveItem("privacy");
                navigate("/settings/privacy");
              }}
            >
              <img
                src={imagePrivatePolicy}
                alt="imageProfile"
                width={20}
                height={20}
                style={
                  activeItem != "privacy"
                    ? { filter: "invert(100%) brightness(150%)" }
                    : {}
                }
              />

              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
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
                setActiveItem("information");
                navigate("/settings/information");
              }}
            >
              {activeItem == "information" ? (
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
              )}

              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
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
                setActiveItem("delete-user");
                navigate("/settings/delete-user");
              }}
            >
              {activeItem == "delete-user" ? (
                <img
                  src={imageDeleteUser}
                  alt="imageProfile"
                  width={20}
                  height={20}
                  style={
                  { filter: "invert(100%) brightness(0%)" }
                  }
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
              )}

              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
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
                setActiveItem("logout");
                navigate("/settings/logout");
              }}
            >
              {activeItem == "logout" ? (
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
              )}

              <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
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
        <Route path="/delete-user" element={<SettingsDeleteUser setActiveItem={setActiveItem} />} />
      </Routes>
    </div>
  );
};

export default index;
