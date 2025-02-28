import { ConfigProvider, Empty } from "antd";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const EmptyCard = () => {
  const { colors, theme } = useSelector((state) => state.theme);
  const { t } = useTranslation();

  return (
    <ConfigProvider
      theme={{
        components: {
          Empty: {
            colorTextDescription: colors.text,
            colorBgLayout: "red",
          },
        },
      }}
    >
      <Empty
        description={t("dashboardPageData.emptyData")}
      />
    </ConfigProvider>
  );
};

export default memo(EmptyCard);
