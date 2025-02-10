/** @format */

import React, { memo, useEffect, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined } from "@ant-design/icons";

import "./index.css";
import { createNewPassword } from "../../redux/actions/authActions";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const { Text, Title } = Typography;

function UpdatePassword() {
  const { t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { codeData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (codeData?.statusCode === "Qw$8Xp&Jd5Yr") {
      setLoading(false);
      setIsOpenAlert(true);
      dispatch({
        type: GLOBALTYPES.STATUS,
        payload: {
          statusCode: "",
        },
      });
    } else {
      setLoading(false);
    }
  }, [codeData]);

  const onFinish = (values) => {
    dispatch(createNewPassword(values));
    setLoading(true);
  };

  if (isOpenAlert) {
    return (
      <div className='login_page_section'>
        <div
          style={{
            background: colors.layoutBackground,
            boxShadow: `0px 0px 10px 2px ${colors.boxShadow}`,
          }}
          className='custom_alert'>
          <h4
            style={{
              color: colors.text,
            }}
            className='custom_alert_title'>
            Parolingiz muoffaqiyatli o'zgardi
          </h4>

          <Text
            style={{
              color: colors.textLight,
            }}
            className='login_page_description'>
            Yangi parol yordamida tizimga kirishingiz mumkin.
          </Text>

          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            type='primary'>
            Tushunarli
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className='login_page_section'>
      <div
        style={{
          background: colors.layoutBackground,
          boxShadow: `0px 0px 10px 2px ${colors.boxShadow}`,
        }}
        className='login_page_container'>
        <div className='login_page_header'>
          <Title
            style={{
              color: colors.text,
            }}
            className='login_page_title'>
            {t("loginData.resetPasswordHear2")}
          </Title>
          <Text
            style={{
              color: colors.textLight,
            }}
            className='login_page_description'>
            {t("loginData.resetPasswordRoles3")}
          </Text>
        </div>

        <Form
          className='login_page_form'
          name='normal_login'
          onFinish={onFinish}
          layout='vertical'
          requiredMark='optional'>
          <Form.Item
            name='newPassword'
            rules={[
              {
                required: true,
                message: t("loginData.passwordDetectMessage"),
              },
            ]}>
            <Input.Password
              size='large'
              prefix={
                <LockOutlined
                  style={{
                    marginRight: ".5rem",
                  }}
                />
              }
              type='password'
              placeholder={t("loginData.passPlaceholder")}
            />
          </Form.Item>

          <Form.Item className='login_page_button_carton'>
            <Button
              size='large'
              loading={loading}
              style={{
                background: colors.buttonColor,
                color: colors.textWhite,
              }}
              className='login_page_button'
              block='true'
              type='primary'
              htmlType='submit'>
              {t("loginData.codeSendButton")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default memo(UpdatePassword);
