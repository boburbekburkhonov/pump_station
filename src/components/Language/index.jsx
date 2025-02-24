import React, { memo, useState } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { useSelector } from "react-redux";

const languagesImage = {
  uz: {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Flag_of_Uzbekistan.png/1200px-Flag_of_Uzbekistan.png",
  },
  ru: {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/2560px-Flag_of_Russia.svg.png",
  },
  en: {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
  },
};

const Language = () => {
  const { i18n, t } = useTranslation();
  const { colors, theme } = useSelector((state) => state.theme);
  const lang = i18n.language;
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="language_change_container header-select-wrapper d-flex align-items-center justify-content-end ms-4">
      <Select
      className="w-100"
        defaultValue="uz"
        value={i18n.language}
        dropdownStyle={{
          background: colors.layoutBackground,
          color: colors.buttonText,
        }}
        style={{
          width: 120,
        }}
        onChange={changeLanguage}
        options={[
          {
            value: "uz",
            label: t("layoutData.oz"),
          },
          {
            value: "ru",
            label: t("layoutData.rus"),
          },
          {
            value: "en",
            label: t("layoutData.eng"),
          },
        ]}
      />
    </div>
  );
};

export default memo(Language);
