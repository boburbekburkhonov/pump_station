/** @format */

import React, { memo, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const pages = {
  Home: lazy(() => import("./dashboard/home")),
  UserDashboard: lazy(() => import("./dashboardUser")),
  Stations: lazy(() => import("./stations")),
  StationsWithUser: lazy(() => import("./stationsWithUser")),
  StationsInformations: lazy(() => import("./stationsInfo")),
  MapsPage: lazy(() => import("./maps")),
  ProfilePage: lazy(() => import("./profilePage")),
  DataPage: lazy(() => import("./data")),
  ElectrPage: lazy(() => import("./electrydata")),
  Users: lazy(() => import("./users")),
  RolePage: lazy(() => import("./role")),
  Reports: lazy(() => import("./reports")),
  RegionPages: lazy(() => import("./regions")),
  Districts: lazy(() => import("./districts")),
  OrganizationsPages: lazy(() => import("./organizations")),
  UserJoin: lazy(() => import("./userJoin")),
  Notifications: lazy(() => import("./notifications")),
  NotFound: lazy(() => import("./notFound")),
};

const isAdmin = () =>
  localStorage.getItem("roles") === "674877fbf0a8ec5c59065cb6";

function Root() {
  return (
    <Routes>
      <Route
        path='/'
        element={isAdmin() ? <pages.Home /> : <pages.UserDashboard />}
      />
      <Route
        path='/stations'
        element={isAdmin() ? <pages.Stations /> : <pages.StationsWithUser />}
      />
      <Route path='/notification' element={<pages.Notifications />} />
      <Route path='/stations/:id' element={<pages.StationsInformations />} />
      <Route path='/maps' element={<pages.MapsPage />} />
      <Route path='/profile' element={<pages.ProfilePage />} />
      <Route path='/data' element={<pages.DataPage />} />
      <Route path='/electrical/data' element={<pages.ElectrPage />} />
      <Route path='/reports' element={<pages.Reports />} />

      {isAdmin() && (
        <>
          <Route path='/users' element={<pages.Users />} />
          <Route path='/roles' element={<pages.RolePage />} />
          <Route path='/regions' element={<pages.RegionPages />} />
          <Route path='/districts' element={<pages.Districts />} />
          <Route path='/organizations' element={<pages.OrganizationsPages />} />
          <Route path='/user/join' element={<pages.UserJoin />} />
        </>
      )}
      <Route path='*' element={<pages.NotFound />} />
    </Routes>
  );
}

export default memo(Root);
