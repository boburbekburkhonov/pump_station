import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SettingsInformations = () => {
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();

  return (
    <main className="settings_right" style={{
      background: colors.layoutBackground
    }}>
      <div className="settings_right_information_container">
        <h1 style={{ color: colors.loginHeadingColor, fontWeight: 'bolder' }}>
        {t("settingNavbar.about.item2")}
        </h1>
        <p style={{color: colors.text}}>
        {t("settingNavbar.about.item3")}
        </p>

        <h2 style={{ color: colors.loginHeadingColor }}>{t("settingNavbar.about.item4")}</h2>
        <ul>
          <li>{t("settingNavbar.about.item5")}</li>
          <li>{t("settingNavbar.about.item6")}</li>
          <li>{t("settingNavbar.about.item7")}</li>
          <li>{t("settingNavbar.about.item8")}</li>
          <li>{t("settingNavbar.about.item9")}</li>
        </ul>

        <h2 style={{ color: colors.loginHeadingColor }}>{t("settingNavbar.about.item10")}</h2>
        <div
          className="settings_right_information_download_links"
          style={{ borderLeft: `5px solid ${colors.loginHeadingColor}`, background: '#d4d4d4', color: '#000000', borderRadius: '10px' }}
        >
          <p>{t("settingNavbar.about.item11")}</p>
          <a
            href="https://play.google.com/store/apps/details?id=smarttubewell"
            target="_blank"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play Store"
              width={150}
              height={45}
            />
          </a>
          <a href="https://apps.apple.com/app/smarttubewell" target="_blank">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              width={150}
              height={45}
            />
          </a>
        </div>
      </div>
    </main>
  );
};

export default SettingsInformations;
