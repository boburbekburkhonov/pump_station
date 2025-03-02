/** @format */

import React from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { showMessage } from "./alert";

function Notif() {
  const alert = useSelector((state) => state.alert);

  return (
    <>
      {alert.error && showMessage(alert.error, "error")}

      {alert.success && showMessage(alert.success, "success")}
    </>
  );
}

export default Notif;