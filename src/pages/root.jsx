/** @format */

import React, { memo, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const pages = {
  Home: lazy(() => import("./dashboard/home")),
  UserDashboard: lazy(() => import("./dashboardUser")),
  OrganizationDashboard: lazy(() => import("./dashboardOrganization")),
  Stations: lazy(() => import("./stations")),
  StationsWithUser: lazy(() => import("./stationsWithUser")),
  StationsInformations: lazy(() => import("./stationsInfo")),
  MapsPage: lazy(() => import("./maps")),
  ProfilePage: lazy(() => import("./profilePage")),
  DataPage: lazy(() => import("./data")),
  DataPageOrganization: lazy(() => import("./dataOrganization")),
  ElectrPage: lazy(() => import("./electrydata")),
  ElectrPageOrganization: lazy(() => import("./electrydataOrganization")),
  Users: lazy(() => import("./users")),
  RolePage: lazy(() => import("./role")),
  Reports: lazy(() => import("./reports")),
  RegionPages: lazy(() => import("./regions")),
  Districts: lazy(() => import("./districts")),
  OrganizationsPages: lazy(() => import("./organizations")),
  UserJoin: lazy(() => import("./userJoin")),
  AggrigateMoreData: lazy(() => import("./aggrigateMoreData")),
  ElectricalMoreData: lazy(() => import("./electricalMoreData")),
  Notifications: lazy(() => import("./notifications")),
  NotFound: lazy(() => import("./notFound")),
  AllDataPage: lazy(() => import("./allDataPage")),
  AllDataPageOrganization: lazy(() => import("./allDataPageOrganization")),
  MoreAllDataPage: lazy(() => import("./aggregateAndElectricalMoreDataPage")),
  Settings: lazy(() => import("./settingsPage")),
};

const isAdmin = () =>
  localStorage.getItem("roles") === "674877fbf0a8ec5c59065cb6";
const checkRole = () => {
  if (localStorage.getItem("roles") === "674877fbf0a8ec5c59065cb6") {
    return "root";
  } else if (localStorage.getItem("roles") === "675689ce75ed8fc6ed490821") {
    return "district";
  } else if (localStorage.getItem("roles") === "678a3a7a271c9b956e44441b") {
    return "organization";
  }
};

function Root() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          checkRole() == "root" ? (
            <pages.Home />
          ) : checkRole() == "district" ? (
            <pages.UserDashboard />
          ) : checkRole() == "organization" ? (
            <pages.OrganizationDashboard />
          ) : (
            ""
          )
        }
      />
      <Route
        path="/stations"
        element={isAdmin() ? <pages.Stations /> : <pages.StationsWithUser />}
      />
      <Route path="/notification" element={<pages.Notifications />} />
      <Route path="/stations/:id" element={<pages.StationsInformations />} />
      <Route path="/maps" element={<pages.MapsPage />} />
      <Route path="/profile" element={<pages.ProfilePage />} />
      <Route
        path="/data"
        element={
          checkRole() == "root" ? (
            <pages.DataPage />
          ) : checkRole() == "district" ? (
            <pages.DataPage />
          ) : checkRole() == "organization" ? (
            <pages.DataPageOrganization />
          ) : (
            ""
          )
        }
      />
      <Route
        path="/electrical/data"
        element={
          checkRole() == "root" ? (
            <pages.ElectrPage />
          ) : checkRole() == "district" ? (
            <pages.ElectrPage />
          ) : checkRole() == "organization" ? (
            <pages.ElectrPageOrganization />
          ) : (
            ""
          )
        }
      />
      <Route path="/reports" element={<pages.Reports />} />
      <Route
        path="/all/data"
        element={
          checkRole() == "root" ? (
            <pages.AllDataPage />
          ) : checkRole() == "district" ? (
            <pages.AllDataPage />
          ) : checkRole() == "organization" ? (
            <pages.AllDataPageOrganization />
          ) : (
            ""
          )
        }
      />
      <Route path="/agrigate/infos/:id" element={<pages.AggrigateMoreData />} />
      <Route path="/all/data/infos/:id" element={<pages.MoreAllDataPage />} />
      <Route
        path="/electrical/infos/:id"
        element={<pages.ElectricalMoreData />}
      />
      <Route path="/settings/*" element={<pages.Settings />} />

      {isAdmin() && (
        <>
          <Route path="/users" element={<pages.Users />} />
          <Route path="/roles" element={<pages.RolePage />} />
          <Route path="/regions" element={<pages.RegionPages />} />
          <Route path="/districts" element={<pages.Districts />} />
          <Route
            path="/organizations"
            element={<pages.OrganizationsPages />}
          />{" "}
          <Route path="/user/join" element={<pages.UserJoin />} />
        </>
      )}
      <Route path="*" element={<pages.NotFound />} />
    </Routes>
  );
}

export default memo(Root);
