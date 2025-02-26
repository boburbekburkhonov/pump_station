import React, { useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";
import { postDataApi } from "../../utils/index";
import { toast, ToastContainer } from "react-toastify";
const SettingsPassword = () => {
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();
  const accessToken = localStorage.getItem("access_token");

  const changePasswordUser = async (values) => {
    let oldPassword = values.currentPassword;
    let newPassword = values.newPassword;
    let confirmPassword = values.confirmPassword;

    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    if (newPassword != confirmPassword) {
      setErrorMessage(t("loginData.errorConfirmationNewPassword"));
    } else {
      try {
        const res = await postDataApi(`users/updatePassword`, data, accessToken);

        if (res.data.statusCode === 200) {
          toast.success(t("toast.successPassword"));

          setErrorMessage("");

          form.resetFields();
        }
      } catch (err) {
        setErrorMessage(err.response.data.message);
      }
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
      <div
        className="settings_right_password_container"
        style={{ background: colors.layoutBackground, color: colors.text }}
      >
        <div
          className="settings_right_password_info-card"
          style={{ background: colors.buttonColor, color: '#ffffff' }}
        >
          <h3>{t("settingNavbar.password.item1")}</h3>
          <p style={{ color: '#ffffff' }}>{t("settingNavbar.password.item2")}</p>
        </div>
        <Form form={form} onFinish={changePasswordUser}>
          <Form.Item name="currentPassword">
            <div className="settings_right_password_form-group m-0">
              <label htmlFor="current-password">
                {t("settingNavbar.password.item3")}
              </label>
              <Input.Password
                id="current-password"
                placeholder={t("settingNavbar.password.item3")}
                name="currentPassword"
                required
              />
            </div>
          </Form.Item>
          <Form.Item name="newPassword">
            <div className="settings_right_password_form-group m-0">
              <label htmlFor="new-password">
                {t("settingNavbar.password.item4")}
              </label>
              <Input.Password
                id="new-password"
                placeholder={t("settingNavbar.password.item4")}
                name="newPassword"
                required
              />
            </div>
          </Form.Item>
          <Form.Item name="confirmPassword">
            <div className="settings_right_password_form-group m-0">
              <label htmlFor="confirm-password">
                {t("settingNavbar.password.item5")}
              </label>
              <Input.Password
                placeholder={t("settingNavbar.password.item5")}
                id="confirm-password"
                name="confirmPassword"
                required
              />
            </div>
          </Form.Item>

          <div className="login_send_code_error login_send_code_error_change_password login_send_code_error_settings_password">
            <h4 className="login_send_code_error_heading">{errorMessage}</h4>
          </div>
          <button
            type="submit"
            className="btn-primary-pump login-btn"
            style={{ background: colors.buttonColor }}
          >
            {t("settingNavbar.password.item6")}
          </button>
        </Form>
      </div>
    </main>
  );
};

export default SettingsPassword;
