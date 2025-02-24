import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SettingsPrivacy = () => {
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const date = new Date();

  return (
    <main
      className="settings_right"
      style={{
        background: colors.layoutBackground
      }}
    >
      <div className="settings_right_privacy_container">
        <h1 style={{ color: colors.loginHeadingColor }}>
          {t("settingNavbar.privacy.item2")}
        </h1>
        <p>
          <strong>{t("settingNavbar.privacy.item3")}</strong>{" "}
          {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
        </p>

        <h2 style={{ color: colors.loginHeadingColor }}>
          {t("settingNavbar.privacy.item4")}
        </h2>
        <p>{t("settingNavbar.privacy.item5")}</p>
        <ul>
          <li>{t("settingNavbar.privacy.item6")}</li>
          <li>{t("settingNavbar.privacy.item7")}</li>
          <li>{t("settingNavbar.privacy.item8")}</li>
          <li>{t("settingNavbar.privacy.item9")}</li>
          <li>{t("settingNavbar.privacy.item10")}</li>
        </ul>

        <h2 style={{ color: colors.loginHeadingColor }}>
          {t("settingNavbar.privacy.item11")}
        </h2>
        <p>{t("settingNavbar.privacy.item12")}</p>
        <ul>
          <li>{t("settingNavbar.privacy.item13")}</li>
          <li>{t("settingNavbar.privacy.item14")}</li>
          <li>{t("settingNavbar.privacy.item15")}</li>
          <li>{t("settingNavbar.privacy.item16")}</li>
        </ul>

        <h2 style={{ color: colors.loginHeadingColor }}>
          {t("settingNavbar.privacy.item17")}
        </h2>
        <p>{t("settingNavbar.privacy.item18")}</p>
        <ul>
          <li>{t("settingNavbar.privacy.item19")}</li>
          <li>{t("settingNavbar.privacy.item20")}</li>
          <li>{t("settingNavbar.privacy.item21")}</li>
        </ul>
        <p>{t("settingNavbar.privacy.item22")}</p>

        <h2 style={{ color: colors.loginHeadingColor }}>
          {t("settingNavbar.privacy.item23")}
        </h2>
        <p>{t("settingNavbar.privacy.item24")}</p>
        <ul>
          <li>{t("settingNavbar.privacy.item25")}</li>
          <li>{t("settingNavbar.privacy.item26")}</li>
          <li>{t("settingNavbar.privacy.item27")}</li>
        </ul>

        <h2 style={{ color: colors.loginHeadingColor }}>
          {t("settingNavbar.privacy.item28")}
        </h2>
        <div
          className="settings_right_privacy_contact"
          style={{ borderLeft: `5px solid ${colors.loginHeadingColor}`, background: colors.layoutBackground }}

        >
          <p>{t("settingNavbar.privacy.item29")}</p>
          <p>
            <strong>{t("settingNavbar.privacy.item30")}</strong>{" "}
            {t("settingNavbar.privacy.item31")}
          </p>
          <p>
            <strong>{t("settingNavbar.privacy.item32")}</strong>{" "}
            {t("settingNavbar.privacy.item33")}
          </p>
          <p>
            <strong>{t("settingNavbar.privacy.item34")}</strong>{" "}
            {t("settingNavbar.privacy.item35")}
          </p>
        </div>
      </div>
    </main>
  );
};

export default SettingsPrivacy;
