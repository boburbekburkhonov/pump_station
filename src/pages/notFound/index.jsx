/** @format */

import React from "react";
import { Button, Result, ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { colors } = useSelector((state) => state.theme);
  const { t } = useTranslation();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.buttonColor,
          colorPrimaryText: colors.text,
          colorText: colors.text,
          colorTextHover: colors.textWhite,
          colorBgTextHover: colors.buttonColor,
          colorBgContainerSelected: colors.statisticElement3,
          colorBgContainer: colors.background,
          colorPrimaryActive: colors.background,
          colorPrimaryBg: colors.background,
          colorBgBase: colors.background,
          colorBorder: colors.text,
          colorTextPlaceholder: colors.textLight,
          colorTextQuaternary: colors.text,
          colorTextDescription: colors.text,
        },
      }}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Result
          status='404'
          title='404'
          subTitle={t("loginData.notFoundTitle")}
          extra={
            <Button
              style={{
                padding: 0,
              }}
              type='primary'>
              <Link
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem",
                }}
                to='/'>
                {t("loginData.notFoundLink")}
              </Link>
            </Button>
          }
        />
      </div>
    </ConfigProvider>
  );
}

export default NotFound;
