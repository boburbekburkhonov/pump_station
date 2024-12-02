/** @format */

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button } from "antd";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { CloseOutlined, CloseCircleFilled } from "@ant-design/icons";
import "./index.css";

function Notif() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const closeAlert = useCallback(() => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {
      loading: false
    } });
  });

  return (
    <>
      {alert.error && (
        <Alert
          className='alert_component_style'
          message={alert.error}
          showIcon
          type='error'
          action={
            <Button size='small' danger onClick={closeAlert}>
              <CloseCircleFilled size='small' twoToneColor='#eb2f96' />
            </Button>
          }
        />
      )}

      {alert.success && (
        <Alert
          className='alert_component_style'
          message={alert.success}
          type='success'
          showIcon
          action={
            <Button onClick={closeAlert} size='small' type='text'>
              <CloseOutlined size={10} />
            </Button>
          }
        />
      )}
    </>
  );
}

export default Notif;
