import {
  AimOutlined,
  GlobalOutlined,
  GoogleOutlined,
  PhoneOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageProfile from "../../assets/profile-users.jpg";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { postDataApi } from "../../utils/index";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import {
  getUserInformationById,
  isUserUpdated,
} from "../../redux/actions/dashboard";
import Cookies from "js-cookie";
import "./index.css";

const SettingsProfile = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const { userInformationById } = useSelector((state) => state.dashboard);
  const { colors, theme } = useSelector((state) => state.theme);
  const [isActiveChangedBtn, setIsActiveChangedBtn] = useState(false);
  const { updatedUserInformationById } = useSelector(
    (state) => state.dashboard
  );
  const userId = Cookies.get("userId");
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    dispatch(getUserInformationById(userId, accessToken));
  }, [updatedUserInformationById]);

  const changeUserInformation = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const email = formData.get("email");
    const phone = formData.get("phone");

    const data = {
      id: userInformationById.id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      phone: phone,
      email: email,
      roleId: userInformationById.roleId,
      regionId: userInformationById.regionId,
      districtId: userInformationById.districtId,
      organizationId: userInformationById.organizationId,
    };

    try {
      const res = await postDataApi(`users/update?lang=${lang}`, data);

      if (res.data.statusCode === 200) {
        toast.success(t("toast.successProfile"));
        localStorage.setItem("firstName", data.firstName);
        dispatch(isUserUpdated());
        setIsActiveChangedBtn(!isActiveChangedBtn);
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

  return (
    <main
      className="settings_right"
      style={{
        background: colors.layoutBackground,
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div className="d-flex align-items-center">
          <img className="profile-pic" src={imageProfile} alt="User Avatar" />
          <h3 className="profile_pic_heading ms-4">
            {userInformationById.name}
          </h3>
        </div>

        <button
          className="btn btn-success"
          style={{ background: colors.buttonColor }}
          onClick={() => setIsActiveChangedBtn(true)}
        >
          {t("settingNavbar.profile.item2")}
        </button>
      </div>
      <div className="settings-content">
        <form onSubmit={changeUserInformation}>
          <div
            className="d-flex flex-wrap justify-content-between align-items-center mb-4"
            style={{ gap: "20px" }}
          >
            <div>
              <label htmlFor="firstName">
                {t("settingNavbar.profile.item3")}
              </label>
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`${
                    isActiveChangedBtn
                      ? "form-control active_input_change"
                      : "form-control"
                  }`}
                  defaultValue={userInformationById.name}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span
                    className={`${
                      isActiveChangedBtn
                        ? "input-group-text active_input_change"
                        : "input-group-text"
                    }`}
                  >
                    <UserOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="username">
                {t("settingNavbar.profile.item5")}
              </label>
              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={`${
                    isActiveChangedBtn
                      ? "form-control active_input_change"
                      : "form-control"
                  }`}
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.username}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span
                    className={`${
                      isActiveChangedBtn
                        ? "input-group-text active_input_change"
                        : "input-group-text"
                    }`}
                  >
                    <UserOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email">{t("settingNavbar.profile.item6")}</label>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`${
                    isActiveChangedBtn
                      ? "form-control active_input_change"
                      : "form-control"
                  }`}
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.email}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span
                    className={`${
                      isActiveChangedBtn
                        ? "input-group-text active_input_change"
                        : "input-group-text"
                    }`}
                  >
                    <GoogleOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="phone">{t("settingNavbar.profile.item7")}</label>

              <div className="input-group">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className={`${
                    isActiveChangedBtn
                      ? "form-control active_input_change"
                      : "form-control"
                  }`}
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.phone}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span
                    className={`${
                      isActiveChangedBtn
                        ? "input-group-text active_input_change"
                        : "input-group-text"
                    }`}
                  >
                    <PhoneOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="regionName">
                {t("settingNavbar.profile.item8")}
              </label>

              <div className="input-group">
                <input
                  type="text"
                  name="regionName"
                  id="regionName"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.regionName}
                  style={{ maxWidth: "300px" }}
                  disabled
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <GlobalOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="districtName">
                {t("settingNavbar.profile.item13")}
              </label>

              <div className="input-group">
                <input
                  type="text"
                  name="districtName"
                  id="districtName"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.districtName}
                  style={{ maxWidth: "300px" }}
                  disabled
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <GlobalOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="organizationName">
                {t("settingNavbar.profile.item14")}
              </label>

              <div className="input-group">
                <input
                  type="text"
                  name="organizationName"
                  id="organizationName"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.organizationName}
                  style={{ maxWidth: "300px" }}
                  disabled
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <GlobalOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="role">{t("settingNavbar.profile.item9")}</label>
              <div className="input-group">
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.roleName}
                  style={{ maxWidth: "300px" }}
                  disabled
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <UsergroupAddOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {isActiveChangedBtn ? (
            <div className="d-flex justify-content-end align-items-center">
              <button
                type="button"
                className="btn btn-light"
                style={{ background: "#F2F2F2" }}
                onClick={() => setIsActiveChangedBtn(!isActiveChangedBtn)}
              >
                {t("settingNavbar.profile.item10")}
              </button>
              <button
                type="submit"
                className="btn btn-success ms-3"
                style={{ background: colors.buttonColor }}
              >
                {t("settingNavbar.profile.item11")}
              </button>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </main>
  );
};

export default SettingsProfile;
