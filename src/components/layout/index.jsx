/** @format */

import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  Button,
  ConfigProvider,
  Layout,
  Menu,
  Select,
  Badge,
  Avatar,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserSwitchOutlined,
  PieChartOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  AimOutlined,
  MoonFilled,
  SunFilled,
  PoweroffOutlined,
  FolderOpenOutlined,
  AppstoreAddOutlined,
  SnippetsOutlined,
  BellOutlined,
  BellFilled,
  UserOutlined,
} from "@ant-design/icons";

import { toggleTheme } from "../../redux/actions/themeType";
import "./index.css";
import Logo from "../../assets/react.svg";
import { logoutAction } from "../../redux/actions/authActions";

const { Header, Sider, Content } = Layout;

const LayoutComponent = memo(({ childrenComponent }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("roles");

  const { colors, theme } = useSelector((state) => state.theme);
  const [collapsed, setCollapsed] = useState(true);

  const menuItems = [
    {
      key: "/",
      icon: (
        <PieChartOutlined
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
      key: "data_page",
      icon: (
        <DatabaseOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: <p className='link_new_text_style'>{t("layoutData.navLink3")}</p>,
      children: [
        {
          key: "/data",
          label: (
            <Link className='layout_links' to='/data'>
              {t("layoutData.navLink8")}
            </Link>
          ),
        },
        {
          key: "/electrical/data",
          label: (
            <Link className='layout_links' to='/electrical/data'>
              {t("layoutData.navLink7")}
            </Link>
          ),
        },
      ],
    },
    {
      key: "/reports",
      icon: (
        <SnippetsOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className='layout_links' to='/reports'>
          {t("layoutData.navLink14")}
        </Link>
      ),
    },
    {
      key: "/natification",
      icon: (
        <BellOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className='layout_links' to='/natification'>
          {t("layoutData.navLink15")}
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
      key: "users_page",
      icon: (
        <UserSwitchOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: <p className='link_new_text_style'>{t("layoutData.navLink5")}</p>,
      children: [
        {
          key: "/users",
          label: (
            <Link className='layout_links' to='/users'>
              {t("layoutData.navLink5")}
            </Link>
          ),
        },
        {
          key: "/user/join",
          label: (
            <Link className='layout_links' to='/user/join'>
              {t("layoutData.navLink12")}
            </Link>
          ),
        },
        {
          key: "/roles",
          label: (
            <Link className='layout_links' to='/roles'>
              {t("layoutData.navLink13")}
            </Link>
          ),
        },
      ],
    },
    {
      key: "add_news_data",
      icon: (
        <AppstoreAddOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: <p className='link_new_text_style'>{t("layoutData.navLink16")}</p>,
      children: [
        {
          key: "/regions",
          label: (
            <Link className='layout_links' to='/regions'>
              {t("layoutData.navLink9")}
            </Link>
          ),
        },
        {
          key: "/districts",
          label: (
            <Link className='layout_links' to='/districts'>
              {t("layoutData.navLink10")}
            </Link>
          ),
        },
        {
          key: "/organizations",
          label: (
            <Link className='layout_links' to='/organizations'>
              {t("layoutData.navLink11")}
            </Link>
          ),
        },
      ],
    },
  ];

  const menuItemsUsers = [
    {
      key: "/",
      icon: (
        <PieChartOutlined
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
      key: "data_page",
      icon: (
        <DatabaseOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: <p className='link_new_text_style'>{t("layoutData.navLink3")}</p>,
      children: [
        {
          key: "/data",
          label: (
            <Link className='layout_links' to='/data'>
              {t("layoutData.navLink8")}
            </Link>
          ),
        },
        {
          key: "/electrical/data",
          label: (
            <Link className='layout_links' to='/electrical/data'>
              {t("layoutData.navLink7")}
            </Link>
          ),
        },
      ],
    },
    {
      key: "/reports",
      icon: (
        <SnippetsOutlined
          className='menu-icon'
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className='layout_links' to='/reports'>
          {t("layoutData.navLink14")}
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
  ];

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const handleToggleTheme = () => dispatch(toggleTheme());

  const onChangeLogout = () =>
    dispatch(logoutAction(localStorage.getItem("access_token")));

  const customizeRenderEmpty = () => (
    <div
      style={{
        textAlign: "center",
      }}>
      <FolderOpenOutlined
        style={{
          fontSize: 20,
          margin: "5px 0",
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
          colorBgTextHover: colors.background,
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
              overflowY: "scroll",
              paddingBottom: "60px",
            }}
            mode='inline'
            defaultSelectedKeys={[location.pathname]}
            items={
              isAuthenticated === "674877fbf0a8ec5c59065cb6"
                ? menuItems
                : menuItemsUsers
            }
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
              <div>
                <Avatar
                  onClick={() => navigate("/profile")}
                  shape='square'
                  style={{
                    marginBottom: "8px",
                    background: colors.buttonColor,
                    cursor: "pointer",
                  }}
                  size='default'
                  icon={<UserOutlined />}
                />
              </div>

              <div className='header_badge_container'>
                <Badge count={99} overflowCount={10}>
                  <Button type='primary' icon={<BellFilled />} />
                </Badge>
              </div>

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

              <div className='language_change_container'>
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
            {childrenComponent}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
});
export default LayoutComponent;
