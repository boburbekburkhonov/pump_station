/** @format */

import React, { memo, useEffect, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./index.css";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { sendCodePhoneNumber } from "../../redux/actions/authActions";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const { Text, Title } = Typography;

function SendCodePages() {
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { codeData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (codeData?.statusCode === "Xz1@k9Lm#Pq") {
      navigate("/confire/code");
      setLoading(false);
      dispatch({
        type: GLOBALTYPES.STATUS,
        payload: "",
      });
    } else {
      setLoading(false);
    }
  }, [codeData]);

  const onFinish = (values) => {
    dispatch(sendCodePhoneNumber(values, i18n.language));
    setLoading(true);
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
            {t("loginData.header2")}
          </Title>
          <Text
            style={{
              color: colors.textLight,
            }}
            className='login_page_description'>
            {t("loginData.resetPasswordRoles")}
          </Text>
        </div>

        <Form
          className='login_page_form'
          name='normal_login'
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
            name='phone'
            rules={[
              {
                required: true,
                message: t("loginData.phoneDetectMessage"),
              },
            ]}>
            <Input
              size='large'
              prefix={
                <PhoneOutlined
                  style={{
                    marginRight: ".5rem",
                  }}
                />
              }
              placeholder={t("loginData.phonePlaceholder")}
            />
          </Form.Item>

          <Form.Item className='login_page_button_carton_two'>
            <Button
              onClick={() => navigate("/")}
              size='large'
              style={{
                color: colors.textWhite,
              }}
              className='login_page_button'
              danger
              type='primary'>
              {t("dataPagesInformation.allStationsDataModalCancelButton")}
            </Button>

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

export default memo(SendCodePages);
