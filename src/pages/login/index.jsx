/** @format */

import React, { memo, useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { signInAction } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

function Login() {
  const [rememberValue, setRememberValue] = useState(false);
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(signInAction(values, i18n.language));
  };

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
            {t("loginData.header")}
          </Title>
          <Text
            style={{
              color: colors.textLight,
            }}
            className='login_page_description'>
            {t("loginData.description")}
          </Text>
        </div>

        <Form
          className='login_page_form'
          name='normal_login'
          initialValues={{
            remember: rememberValue,
          }}
          onFinish={onFinish}
          layout='vertical'
          requiredMark='optional'>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: t("loginData.usernameDetectMessage"),
              },
            ]}>
            <Input
              size='large'
              prefix={
                <UserOutlined
                  style={{
                    marginRight: ".5rem",
                  }}
                />
              }
              placeholder={t("loginData.userPlaceholder")}
            />
          </Form.Item>

          <Form.Item
            name='password'
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

          <Form.Item className='remember_box'>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox
                style={{
                  color: colors.text,
                }}
                onChange={(e) => {
                  setRememberValue(e.target.checked);
                }}>
                {t("loginData.rememberMessage")}
              </Checkbox>
            </Form.Item>

            <Link className="reset_link" to="/reset/password">
              {t("loginData.resetPassword")}
            </Link>
          </Form.Item>

          <Form.Item className='login_page_button_carton'>
            <Button
              size='large'
              style={{
                background: colors.buttonColor,
                color: colors.textWhite,
              }}
              className='login_page_button'
              block='true'
              type='primary'
              htmlType='submit'>
              {t("loginData.loginButton")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default memo(Login);
