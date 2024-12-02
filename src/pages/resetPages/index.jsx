/** @format */

import React, { memo, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("../login/index"));
const SendCodePage = lazy(() => import("./sendCodePages"));
const ConfireCodePage = lazy(() => import("./confireCodePage"));

const AuthRootPages = memo(() => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/reset/password' element={<SendCodePage />} />
      <Route path='/confire/code' element={<ConfireCodePage />} />
    </Routes>
  );
});

export default AuthRootPages;
