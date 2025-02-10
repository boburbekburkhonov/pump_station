/** @format */

import React, { memo, useEffect, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./index.css";
import { comfirmPhoneNumberCode } from "../../redux/actions/authActions";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const { Text, Title } = Typography;

function ConfireCodePage() {
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { codeData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [dissableButton, setDissableButton] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (codeData?.statusCode === "7gT!zR4vN*M2") {
      navigate("/update/password");
      setLoading(false);
      dispatch({
        type: GLOBALTYPES.STATUS,
        payload: {
          statusCode: "",
        },
      });
    } else {
      setLoading(false);
    }
  }, [codeData, dispatch]);

  const onFinish = (values) => {
    setLoading(true);

    const username = localStorage.getItem("user_name_code") || "";
    const phone = localStorage.getItem("user_phone_code") || "";

    dispatch(
      comfirmPhoneNumberCode(
        {
          username,
          phone,
          code: values.code,
        },
        i18n.language
      )
    );
  };

  const handleResendCode = () => {
    setDissableButton(true)
    const username = localStorage.getItem("user_name_code") || "";
    const phone = localStorage.getItem("user_phone_code") || "";
    dispatch(
      comfirmPhoneNumberCode({
        username,
        phone,
      })
    );

    setTimeout(() => {
      setDissableButton(false)
    }, 1000 * 60)
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
            {t("loginData.resetPasswordHear")}
          </Title>

          <Text
            style={{
              color: colors.textLight,
            }}
            className='login_page_description'>
            {t("loginData.resetPasswordRoles2")}
          </Text>
        </div>

        <Form
          className='login_page_form'
          name='normal_login'
          onFinish={onFinish}
          layout='vertical'
          requiredMark='optional'>
          <Form.Item
            name='code'
            rules={[
              {
                required: true,
                message: t("loginData.usernameDetectMessage"),
              },
            ]}>
            <Input.OTP
              type='text'
              length={4}
              size='large'
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item className='login_page_button_carton_two'>
            <Button
              onClick={handleResendCode}
              size='large'
              style={{
                color: colors.textWhite,
              }}
              className='login_page_button'
              danger
              type='primary'
              disabled={dissableButton}
            >
              {t("loginData.buttonResendCode")}
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

export default memo(ConfireCodePage);
