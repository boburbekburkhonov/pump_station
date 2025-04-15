/** @format */

import React, { memo, useState, useCallback, useEffect } from "react";
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
  Drawer,
  List,
  Empty,
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
  DeleteFilled,
  SettingOutlined,
} from "@ant-design/icons";

import { toggleTheme } from "../../redux/actions/themeType";
import "./index.css";
import Logo from "../../assets/output-onlinepngtools-removebg-preview.png";
import Logo2 from "../../assets/output-onlinepngtools__1_-removebg-preview.png";
import { logoutAction } from "../../redux/actions/authActions";
import SecurityPage from '../../pages/security'
import SupportPage from '../../pages/support'
import {
  deleteNotification,
  getAllNotifications,
  getAllNotificationsForOneInfo,
  getNotificationCount,
} from "../../redux/actions/notificationActions";
import imageNotification from "../../assets/notification.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ru"; // Ruscha
import "dayjs/locale/en"; // Inglizcha
import "dayjs/locale/uz"; // O‘zbek (kirill)

const { Header, Sider, Content } = Layout;

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// O‘zbek lotincha tarjima (qo‘lda)
dayjs.updateLocale("uz", {
  relativeTime: {
    future: "%s dan keyin",
    past: "%s oldin",
    s: "bir necha soniya",
    m: "bir daqiqa",
    mm: "%d daqiqa",
    h: "bir soat",
    hh: "%d soat",
    d: "bir kun",
    dd: "%d kun",
    M: "bir oy",
    MM: "%d oy",
    y: "bir yil",
    yy: "%d yil",
  },
});

const LayoutComponent = memo(({ childrenComponent }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { hash, pathname, search } = location;
  ("");
  const isAuthenticated = localStorage.getItem("roles");
  const isToken = localStorage.getItem("access_token");
  const nameUser = localStorage.getItem("name");
  const nameRole = localStorage.getItem("roleName");

  const { colors, theme } = useSelector((state) => state.theme);
  const { countNotif, allNotifications } = useSelector(
    (state) => state.notifications
  );
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState("home");
  const fetchAllData = useCallback(() => {
    const lang = i18n.language;

    dispatch(getNotificationCount(lang, isToken));
    dispatch(getAllNotificationsForOneInfo(lang, isToken));
  }, [dispatch, isToken, i18n.language]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);

  const menuItems = [
    {
      key: "home",
      icon: (
        <PieChartOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className="layout_links" to="/">
          {t("layoutData.navLink1")}
        </Link>
      ),
    },
    {
      key: "maps",
      icon: (
        <AimOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className="layout_links" to="/maps">
          {t("layoutData.navLink2")}
        </Link>
      ),
    },
    {
      key: "data_page",
      icon: (
        <DatabaseOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: <p className="link_new_text_style">{t("layoutData.navLink3")}</p>,
      children: [
        {
          key: "all/data",
          label: (
            <Link className="layout_links" to="/all/data">
              {t("layoutData.navLink17")}
            </Link>
          ),
        },
        {
          key: "data",
          label: (
            <Link className="layout_links" to="/data">
              {t("layoutData.navLink8")}
            </Link>
          ),
        },
        {
          key: "electrical/data",
          label: (
            <Link className="layout_links" to="/electrical/data">
              {t("layoutData.navLink7")}
            </Link>
          ),
        },
      ],
    },
    // {
    //   key: "reports",
    //   icon: (
    //     <SnippetsOutlined
    //       className="menu-icon"
    //       style={{ fontSize: "16px", fontWeight: "500" }}
    //     />
    //   ),
    //   label: (
    //     <Link className="layout_links" to="/reports">
    //       {t("layoutData.navLink14")}
    //     </Link>
    //   ),
    // },
    {
      key: "notification",
      icon: (
        <BellOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className="layout_links" to="/notification">
          {t("layoutData.navLink15")}
        </Link>
      ),
    },
    {
      key: "stations",
      icon: (
        <DesktopOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className="layout_links" to="/stations">
          {t("layoutData.navLink4")}
        </Link>
      ),
    },
    {
      key: "users_page",
      icon: (
        <UserSwitchOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: <p className="link_new_text_style">{t("layoutData.navLink5")}</p>,
      children: [
        {
          key: "users",
          label: (
            <Link className="layout_links" to="/users">
              {t("layoutData.navLink5")}
            </Link>
          ),
        },
        {
          key: "user/join",
          label: (
            <Link className="layout_links" to="/user/join">
              {t("layoutData.navLink12")}
            </Link>
          ),
        },
        {
          key: "roles",
          label: (
            <Link className="layout_links" to="/roles">
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
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: <p className="link_new_text_style">{t("layoutData.navLink16")}</p>,
      children: [
        {
          key: "regions",
          label: (
            <Link className="layout_links" to="/regions">
              {t("layoutData.navLink9")}
            </Link>
          ),
        },
        {
          key: "districts",
          label: (
            <Link className="layout_links" to="/districts">
              {t("layoutData.navLink10")}
            </Link>
          ),
        },
        {
          key: "organizations",
          label: (
            <Link className="layout_links" to="/organizations">
              {t("layoutData.navLink11")}
            </Link>
          ),
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined style={{ fontSize: "16px" }} />,
      label: (
        <Link className="layout_links" to="/settings">
          {t("layoutData.navLink18")}
        </Link>
      ),
    },
  ];

  const menuItemsUsers = [
    {
      key: "home",
      icon: (
        <PieChartOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className="layout_links" to="/">
          {t("layoutData.navLink1")}
        </Link>
      ),
    },
    {
      key: "maps",
      icon: (
        <AimOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className="layout_links" to="/maps">
          {t("layoutData.navLink2")}
        </Link>
      ),
    },
    {
      key: "data_page",
      icon: (
        <DatabaseOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: <p className="link_new_text_style">{t("layoutData.navLink3")}</p>,
      children: [
        {
          key: "all/data",
          label: (
            <Link className="layout_links" to="/all/data">
              {t("layoutData.navLink17")}
            </Link>
          ),
        },
        {
          key: "data",
          label: (
            <Link className="layout_links" to="/data">
              {t("layoutData.navLink8")}
            </Link>
          ),
        },
        {
          key: "electrical/data",
          label: (
            <Link className="layout_links" to="/electrical/data">
              {t("layoutData.navLink7")}
            </Link>
          ),
        },
      ],
    },
    // {
    //   key: "reports",
    //   icon: (
    //     <SnippetsOutlined
    //       className="menu-icon"
    //       style={{ fontSize: "16px", fontWeight: "500" }}
    //     />
    //   ),
    //   label: (
    //     <Link className="layout_links" to="/reports">
    //       {t("layoutData.navLink14")}
    //     </Link>
    //   ),
    // },
    {
      key: "notification",
      icon: (
        <BellOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className="layout_links" to="/notification">
          {t("layoutData.navLink15")}
        </Link>
      ),
    },
    {
      key: "stations",
      icon: (
        <DesktopOutlined
          className="menu-icon"
          style={{ fontSize: "16px", fontWeight: "500" }}
        />
      ),
      label: (
        <Link className="layout_links" to="/stations">
          {t("layoutData.navLink4")}
        </Link>
      ),
    },
    {
      key: "settings",
      icon: <SettingOutlined style={{ fontSize: "16px" }} />,
      label: (
        <Link className="layout_links" to="/settings">
          {t("layoutData.navLink18")}
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
      }}
    >
      <FolderOpenOutlined
        style={{
          fontSize: 20,
          margin: "5px 0",
        }}
      />
      <p>{t("stationsPageData.noDataTitle")}</p>
    </div>
  );

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const handleDismiss = (id) => {
    dispatch(deleteNotification(id, isToken));
  };

  function timeAgo(dateString, lan) {
    dayjs.locale(lan);
    return dayjs(dateString).fromNow();
  }

  return pathname == "/security" ? (
    <SecurityPage />
  ) : pathname == "/support" ? <SupportPage /> : (
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
          colorTextSecondary: colors.text,
          colorIcon: colors.text,
          dangerShadow: "none",
          defaultShadow: "none",
          primaryShadow: "none",
        },
      }}
    >
      <Layout
        style={{
          background: colors.background,
        }}
      >
        <Sider
          style={{
            background: colors.layoutBackground,
            height: "100vh",
          }}
          theme={localStorage.getItem("theme") || "light"}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="custom-sider"
        >
          <div
            className="layout_logo_box"
            style={{
              background: colors.background,
            }}
          >
            <img
              src={theme === "light" ? Logo : Logo2}
              alt="logo"
              className="logo_image_styles"
            />

            {!collapsed && (
              <h1
                className="logo_name"
                style={{
                  color: colors.logoColor,
                }}
              >
                Smart Pump Station
              </h1>
            )}
          </div>

          <Menu
            style={{
              background: "transparent",
              overflowY: "scroll",
              paddingBottom: "60px",
            }}
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            items={
              isAuthenticated === "674877fbf0a8ec5c59065cb6"
                ? menuItems
                : menuItemsUsers
            }
          />
        </Sider>

        <Layout
          style={{
            background: colors.background,
          }}
        >
          <Header
            style={{
              padding: "0 0.75rem 0 0",
              background: colors.layoutBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="text"
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginLeft: "5px",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    fontWeight: "500",
                    color: colors.text,
                  }}
                >
                  <span>{t("loginData.user")}:</span> {nameUser}
                  {/* <span style={{
                    textTransform: 'lowercase'
                  }}>
                  {" "}
                  {nameRole}
                  </span> */}
                </p>
              </div>
            </div>

            <div className="header_controller_component">
              <div>
                <Avatar
                  onClick={() => {
                    setSelectedKey("settings");
                    navigate("/settings");
                  }}
                  shape="square"
                  style={{
                    marginBottom: "8px",
                    background: colors.buttonColor,
                    cursor: "pointer",
                  }}
                  size="default"
                  icon={<UserOutlined />}
                />
              </div>

              <div
                className="header_badge_container"
                style={{ marginRight: "15px" }}
              >
                <Badge
                  onClick={showDrawer}
                  count={countNotif}
                  // overflowCount={10}
                >
                  <Button type="primary" icon={<BellFilled />} />
                </Badge>
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
            }}
          >
            {childrenComponent}
          </Content>
        </Layout>
      </Layout>

      <Drawer
        title={t("layoutData.navLink15")}
        placement="right"
        closable={true}
        onClose={closeDrawer}
        open={visible}
      >
        {countNotif === 0 ? (
          <Empty
            description={t("dashboardPageData.emptyData")}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          />
        ) : (
          <ul
            className="notification-wrapper-is-read"
            style={{
              listStyleType: "none",
              margin: "0",
              padding: "0",
              marginBottom: "20px",
            }}
          >
            {allNotifications.data?.map((e, i) => {
              return e.isSeen == false ? (
                <li
                  className="notification-wrapper-item "
                  key={i}
                  style={{ display: "flex", cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/notification/${e.id}`);
                    closeDrawer();
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      className="mt-2"
                      style={{
                        marginTop: "10px",
                        filter:
                          theme === "dark" ? "invert(1) brightness(10)" : "",
                      }}
                      src={imageNotification}
                      alt="messageRead"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ms-4" style={{ marginLeft: "20px" }}>
                    <p className="m-0" style={{ margin: "0" }}>
                      {e.title}
                    </p>
                    <p
                      className="notification-wrapper-item-time"
                      style={{
                        margin: "0",
                        marginTop: "8px",
                        color: colors.text,
                      }}
                    >
                      {timeAgo(e?.createdAt, i18n.language)}
                    </p>
                  </div>
                </li>
              ) : (
                ""
              );
            })}
          </ul>
        )}
      </Drawer>
    </ConfigProvider>
  );
});

export default LayoutComponent;
