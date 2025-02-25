import React from "react";
import imageProfile from "../../assets/profile.svg";
import "./index.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { postDataApi } from "../../utils";
import Cookies from "js-cookie";

const SettingsLogout = () => {
  const { userInformationById } = useSelector((state) => state.dashboard);
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const accessToken = localStorage.getItem("access_token");
  const username = Cookies.get("login");
  const password = Cookies.get("code");

  const logOut = async () => {
    try {
      const data = {
        username: username,
        password: password,
      };

      const res = await postDataApi(`auth/logout`, data, accessToken);
      console.log(res);

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
      <div className="settings_right-page">
        <div className="settings_right-container">
          <h1>{t("settingNavbar.logOut.item1")}</h1>
          <p>{t("settingNavbar.logOut.item2")}</p>

          <div
            className="settings_right-profile"
            style={{ background: colors.buttonColor, color: '#fff' }}
          >
            <img
              src={imageProfile}
              alt="imageProfile"
              className="imageProfile"
              width={50}
              height={50}
              style={{ filter: "invert(1) brightness(10)" }}
            />
            <div className="settings_right-details ms-2">
              <h2>
                {userInformationById.name}
              </h2>
              <p>{userInformationById.email}</p>
            </div>
          </div>

          <div className="settings_right-info">
            <h3 style={{ color: colors.buttonColor }}>
              {t("settingNavbar.logOut.item3")}
            </h3>
            <ul>
              <li>{t("settingNavbar.logOut.item4")}</li>
              <li>{t("settingNavbar.logOut.item5")}</li>
              <li>{t("settingNavbar.logOut.item6")}</li>
            </ul>
          </div>

          <div className="settings_right-info">
            <h3 style={{ color: colors.buttonColor }}>
              {t("settingNavbar.logOut.item7")}
            </h3>
            <p>{t("settingNavbar.logOut.item8")}</p>
          </div>

          <div className="settings_right-buttons">
            <button className="settings_right-logout" onClick={() => logOut()}>
              {t("settingNavbar.logOut.item1")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsLogout;
