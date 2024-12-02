/** @format */

import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { Button, ConfigProvider, Layout, Menu, Select } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserSwitchOutlined,
  DashboardOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  AimOutlined,
  MoonFilled,
  SunFilled,
  PoweroffOutlined,
  FolderOpenOutlined
} from "@ant-design/icons";

import { toggleTheme } from "../../redux/actions/themeType";
import "./index.css";
import Logo from "../../assets/react.svg";
import { logoutAction } from "../../redux/actions/authActions";

const { Header, Sider, Content } = Layout;

const LayoutComponent = memo(({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const { colors, theme } = useSelector((state) => state.theme);

  const { i18n, t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: (
        <DashboardOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className='layout_links' to='/'>
          {t("layoutData.navLink1")}
        </Link>
      ),
    },
    {
      key: "/maps",
      icon: (
        <AimOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className='layout_links' to='/maps'>
          {t("layoutData.navLink2")}
        </Link>
      ),
    },
    {
      key: "/data",
      icon: (
        <DatabaseOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className='layout_links' to='/data'>
          {t("layoutData.navLink3")}
        </Link>
      ),
    },
    {
      key: "/stations",
      icon: (
        <DesktopOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className='layout_links' to='/stations'>
          {t("layoutData.navLink4")}
        </Link>
      ),
    },
    {
      key: "/users",
      icon: (
        <UserSwitchOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className='layout_links' to='/users'>
          {t("layoutData.navLink5")}
        </Link>
      ),
    },
  ];

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const handleToggleTheme = () => dispatch(toggleTheme());

  const onChangeLogout = () =>
    dispatch(logoutAction(localStorage.getItem("access_token")));

  const customizeRenderEmpty = () => (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <FolderOpenOutlined
        style={{
          fontSize: 20,
          margin: '5px 0'
        }}
      />
      <p>{t("stationsPageData.noDataTitle")}</p>
    </div>
  );

  return (
    <ConfigProvider
      renderEmpty={customizeRenderEmpty}
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
          colorTextDescription: colors.text
        },
      }}>
      <Layout
        style={{
          background: colors.background,
        }}>
        <Sider
          style={{
            background: colors.layoutBackground,
            height: "100vh",
          }}
          theme={localStorage.getItem("theme") || "light"}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className='custom-sider'>
          <div className='layout_logo_box'>
            <img src={Logo} alt='logo' />

            {!collapsed && (
              <h1 className='logo_name'>Smart Solutions System</h1>
            )}
          </div>

          <Menu
            style={{
              background: "transparent",
            }}
            mode='inline'
            defaultSelectedKeys={[location.pathname]}
            items={menuItems}
          />

          <div
            style={{
              width: "100%",
              padding: "0 5px",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              bottom: "10px",
            }}>
            <Button
              onClick={onChangeLogout}
              icon={
                <PoweroffOutlined
                  className='menu-icon'
                  style={{ fontSize: "16px", fontWeight: "600" }}
                />
              }
              style={{
                background: colors.buttonColor,
                width: "100%",
                height: 45,
                fontWeight: "bold",
                fontSize: "16px",
              }}
              type='primary'>
              {!collapsed && t("layoutData.navLink6")}
            </Button>
          </div>
        </Sider>

        <Layout
          style={{
            background: colors.background,
          }}>
          <Header
            style={{
              padding: "0 0.75rem 0 0",
              background: colors.layoutBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Button
              type='text'
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ color: colors.text }} />
                ) : (
                  <MenuFoldOutlined style={{ color: colors.text }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <div className='header_controller_component'>
              <Select
                defaultValue='uz'
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

              <div className='switch-container'>
                <input
                  onChange={handleToggleTheme}
                  checked={theme === "light"}
                  type='checkbox'
                  id='switch'
                />
                <label htmlFor='switch'>
                  <MoonFilled className='fa-moon' />
                  <SunFilled className='fa-sun' />
                  <span className='ball'></span>
                </label>
              </div>
            </div>
          </Header>

          <Content
            style={{
              padding: "15px",
              borderRadius: colors.blurFilter,
              height: "90vh",
              overflowY: "auto",
              paddingBottom: "30px",
            }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
});
export default LayoutComponent;
