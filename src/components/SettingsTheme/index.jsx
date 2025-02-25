import { MoonFilled, SunFilled } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/actions/themeType";
import "./index.css";
import { useTranslation } from "react-i18next";

const SettingsTheme = () => {
  const dispatch = useDispatch();
  const handleToggleTheme = () => dispatch(toggleTheme());
  const { i18n, t } = useTranslation();
  const { colors, theme } = useSelector((state) => state.theme);

  return (
    <main className="settings_right" style={{
      background: colors.layoutBackground,
    }}>
      <div className="settings_right_theme_container">
        <div className="settings_right_theme_header">
          <h1>{t("settingNavbar.mode.item2")}</h1>
          <p>{t("settingNavbar.mode.item3")}</p>
        </div>

        <div className="settings_right_theme_content">
          <div
            className="settings_right_theme_card settings_right_theme_transition_info_card"
            style={{ background: colors.buttonColor, color: "#fff" }}
          >
            <h2>{t("settingNavbar.mode.item4")}</h2>
            <p>{t("settingNavbar.mode.item5")}</p>
            <div className="switch-container">
              <input
                onChange={handleToggleTheme}
                checked={theme === "light"}
                type="checkbox"
                id="switch"
              />
              <label htmlFor="switch">
                <MoonFilled className="fa-moon" />
                <SunFilled className="fa-sun" />
                <span className="ball"></span>
              </label>
            </div>
          </div>
          <div
            className="settings_right_theme_info_card settings_right_theme_transition_info_card"
            style={{ background: colors.buttonColor, color: "#fff" }}
          >
            <h3>{t("settingNavbar.mode.item6")}</h3>
            <ul>
              <li>
                <span>{t("settingNavbar.mode.item7")}</span>
              </li>
              <li>
                <span>{t("settingNavbar.mode.item8")}</span>
              </li>
              <li>
                <span>{t("settingNavbar.mode.item9")}</span>
              </li>
            </ul>
          </div>

          <div
            className="settings_right_theme_extra_card settings_right_theme_transition_info_card"
            style={{ background: colors.buttonColor, color: "#fff" }}
          >
            <h3>{t("settingNavbar.mode.item10")}</h3>
            <p>{t("settingNavbar.mode.item11")}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsTheme;
