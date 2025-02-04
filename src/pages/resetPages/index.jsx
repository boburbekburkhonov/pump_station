/** @format */

import React, { memo, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("../login/index"));
const SendCodePage = lazy(() => import("./sendCodePages"));
const ConfireCodePage = lazy(() => import("./confireCodePage"));
const NotFound = lazy(() => import("../notFound"));
const UpdatePassword = lazy(() => import("./updatePassword"));

const AuthRootPages = memo(() => {

  const isSendCode = localStorage.getItem("user_name_code")
  const isHaveToken = true ||  localStorage.getItem("access_token")

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/reset/password' element={<SendCodePage />} />
      {isSendCode && <Route path='/confire/code' element={<ConfireCodePage />} />}
      {isHaveToken && <Route path='/update/password' element={<UpdatePassword />} />}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
});

export default AuthRootPages;
