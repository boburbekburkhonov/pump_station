import React, { useCallback, useEffect, useState } from "react";
import { Alert, Flex, Pagination, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getAllNotifications,
  getAllNotificationsForOneInfo,
  getNotificationCount,
} from "../../redux/actions/notificationActions";
import { useNavigate } from "react-router-dom";
import messageRead from "../../assets/email-read.png";
import messageNotRead from "../../assets/email-not-read.png";
import "./index.css";
import Loading from "../../components/loading";

function Notifications() {
  const { colors, theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { countNotif, unseenNotif, allNotifications } = useSelector(
    (state) => state.notifications
  );
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const { i18n, t } = useTranslation();
  const isToken = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const lang = i18n.language;

    dispatch(getNotificationCount(lang, isToken));
    dispatch(getAllNotificationsForOneInfo(lang, isToken));
    dispatch(
      getAllNotifications(lang, isToken, pageData.page, pageData.perPage)
    );
  }, [pageData]);

  const fixDate = (time) => {
    const fixedTime = new Date(time);
    fixedTime.setHours(fixedTime.getHours() - 5);

    const date = `${fixedTime.getDate()}.${
      fixedTime.getMonth() + 1
    }.${fixedTime.getFullYear()} ${fixedTime.getHours()}:${
      String(fixedTime.getMinutes()).length == 1
        ? "0" + fixedTime.getMinutes()
        : fixedTime.getMinutes()
    }`;

    return date;
  };

  return (
    <div>
      <section className="home-section">
        <div className="home-section-notification-wrapper">
          <div className="card-notification" style={{ width: "100%" }}>
            <div className="card-body" style={{ padding: "0" }}>
              <h2 style={{ marginBottom: "20px" }}>
                {t("layoutData.navLink15")}
              </h2>

              {unseenNotif.data?.length == 0 ||
              unseenNotif.data == undefined ? (
                <div
                  style={{
                    minHeight: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loading />
                </div>
              ) : (
                <>
                  <ul
                    className="notification-wrapper"
                    style={{
                      margin: "0",
                      padding: "0",
                      listStyleType: "none",
                      marginBottom: "30px",
                    }}
                  >
                    <li
                      className="notification-wrapper-item-first"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {t("settingNavbar.notification.item7")}{" "}
                        {`(${unseenNotif.totalDocuments})`}
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {t("settingNavbar.notification.item8")}
                      </p>
                    </li>
                    {unseenNotif.data?.map((e, i) => {
                      return (
                        <li
                          className="notification-wrapper-item"
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/notification/${e.id}`)}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={
                                e.isSeen == true ? messageRead : messageNotRead
                              }
                              alt="messageRead"
                              width={24}
                              height={24}
                            />
                            <p style={{ margin: "0", marginLeft: "10px" }}>
                              {e.title}
                            </p>
                          </div>
                          <p style={{ margin: "0" }}>{fixDate(e?.date)}</p>
                        </li>
                      );
                    })}
                  </ul>

                  <Pagination
                    style={{ display: "flex", justifyContent: "center" }}
                    defaultCurrent={pageData.page}
                    total={unseenNotif.totalDocuments}
                    onChange={(page, size) =>
                      setPageData({ page: page, perPage: size })
                    }
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notifications;
