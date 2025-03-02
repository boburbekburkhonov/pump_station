/** @format */

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button } from "antd";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { CloseOutlined, CloseCircleFilled } from "@ant-design/icons";
import "./index.css";
import Swal from "sweetalert2";
import { showMessage } from "./alert";

function Notif() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  return (
    <>
      {alert.error && showMessage(alert.error, "error")}

      {alert.success && showMessage(alert.success, "success")}
    </>
  );
}

export default Notif;