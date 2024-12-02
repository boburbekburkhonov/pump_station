/** @format */

import React from "react";
import "./index.css";

const Loading = () => {

  return (
    <div className="loading_container">
      <div className="loader"></div>
    </div>
  );
};

export default React.memo(Loading);
