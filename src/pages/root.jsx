/** @format */

import React, { memo, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./dashboard/home"));
const Stations = lazy(() => import("./stations"));
const Users = lazy(() => import("./users"));
const MapsPage = lazy(() => import("./maps"));
const DataPage = lazy(() => import("./data"));

function Root() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/stations' element={<Stations />} />
      <Route path='/users' element={<Users />} />
      <Route path='/maps' element={<MapsPage />} />
      <Route path='/data' element={<DataPage />} />
    </Routes>
  );
}

export default memo(Root);
