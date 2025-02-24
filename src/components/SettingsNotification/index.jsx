import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SettingsNotification = () => {
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();

  return (
    <main
      className="settings_right"
      style={{
        background: colors.layoutBackground,
      }}
    >
      <div className="settings_right_notification_container">
        <div
          className="settings_right_notification_info-card"
          style={{ background: colors.layoutBackground, color: colors.text }}
        >
          <h3>{t("settingNavbar.notification.item2")}</h3>
          <p>{t("settingNavbar.notification.item3")}</p>
        </div>
        <h3>{t("settingNavbar.notification.item4")}</h3>
        <div className="settings_right_notification_setting-item">
          <span style={{ color: '#000000' }}>
            {t("settingNavbar.notification.item5")}
          </span>
          <label className="settings_right_notification_toggle-switch">
            <input
              className="settings_right_notification_input"
              type="checkbox"
            />
            <span className="settings_right_notification_slider"></span>
          </label>
        </div>

        <div className="settings_right_notification_setting-item">
          <span style={{ color: '#000000' }}>
            {t("settingNavbar.notification.item6")}
          </span>
          <label className="settings_right_notification_toggle-switch">
            <input
              className="settings_right_notification_input"
              type="checkbox"
            />
            <span className="settings_right_notification_slider"></span>
          </label>
        </div>
      </div>
    </main>
  );
};

export default SettingsNotification;
