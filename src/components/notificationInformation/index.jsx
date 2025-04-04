import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postDataApi } from "../../utils";
import logo from "../../assets/output-onlinepngtools-removebg-preview.png";
import logoDark from "../../assets/output-onlinepngtools__1_-removebg-preview.png";
import "./index.css";
import Loading from "../loading";

const informationNotification = () => {
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const lang = i18n.language;
  const { id } = useParams();
  const { allNotifications } = useSelector((state) => state.notifications);
  const [notification, setNotification] = useState([]);
  const theme = window.localStorage.getItem("theme");
  const isToken = localStorage.getItem("access_token");

  useEffect(() => {
    const findNotification = allNotifications.data?.filter((e) => e.id == id);

    setNotification(findNotification);

    postDataApi(
      `notification/markAsSeen?lang=${lang}`,
      {
        notificationId: id,
      },
      isToken
    ).then((data) => data);
  }, [id, allNotifications]);

  const fixDate = (time) => {
    const fixedTime = new Date(time);
    fixedTime.setHours(fixedTime.getHours() - 5);

    const date = `${fixedTime.getDate()}.${
      fixedTime.getMonth() + 1
    }.${fixedTime.getFullYear()} `;

    const timeDate = `${fixedTime.getHours()}:${
      String(fixedTime.getMinutes()).length == 1
        ? "0" + fixedTime.getMinutes()
        : fixedTime.getMinutes()
    }`;

    return {
      date: date,
      time: timeDate,
    };
  };

  return (
    <div
      className="user_info_notif_wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {notification.length != 0 ? (
        <>
          <div className="notification_information_container">
            <div className="notification_information_card">
              <div
                className="notification_information_icon-box"
                style={{
                  background: theme == "light" ? "#e0f7fa" : "",
                }}
              >
                <img
                  src={theme == "light" ? logo : logoDark}
                  alt="logo"
                  className="notification_information_icon"
                  width={222}
                  height={222}
                />
              </div>
              <div className="notification_information_info">
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "30px" }}>💧</span>
                  {t("settingNavbar.notification.item9")}
                </h2>

                <div
                  className="status-box"
                  style={{
                    marginBottom: "20px",
                    background: colors.backgroundColorNotificationInfo,
                  }}
                >
                  <p style={{ margin: "0", fontWeight: "bold" }}>
                    Status:{" "}
                    <span className="status warning">
                      <span style={{ fontSize: "20px" }}>⚠️</span>
                      {t("settingNavbar.notification.item10")}
                    </span>
                  </p>
                </div>

                <h2
                  className="notification_information_title"
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    background: colors.backgroundColorNotificationInfo,
                  }}
                >
                  Title:{" "}
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "400",
                      marginLeft: "10px",
                    }}
                  >
                    {notification[0].title}
                  </p>
                </h2>
                <h2
                  className="notification_information_message"
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    background: colors.backgroundColorNotificationInfo,
                  }}
                >
                  Message:{" "}
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "400",
                      marginLeft: "10px",
                    }}
                  >
                    {notification[0].message}
                  </p>
                </h2>
                <p
                  className="notification_information_time"
                  style={{ background: colors.backgroundColorNotificationInfo }}
                >
                  📅 {fixDate(notification[0].date).date} | 🕒{" "}
                  {fixDate(notification[0].date).time}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default informationNotification;
