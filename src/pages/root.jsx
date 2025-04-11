/** @format */

import React, { memo, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const pages = {
  Home: lazy(() => import("./dashboard/home")),
  Security: lazy(() => import("./security")),
  UserDashboard: lazy(() => import("./dashboardUser")),
  OrganizationDashboard: lazy(() => import("./dashboardOrganization")),
  RegionDashboard: lazy(() => import("./dashboardRegion")),
  Stations: lazy(() => import("./stations")),
  StationsOrganization: lazy(() => import("./stationsOrganization")),
  StationsRegion: lazy(() => import("./stationsRegion")),
  StationsWithUser: lazy(() => import("./stationsWithUser")),
  StationsInformations: lazy(() => import("./stationsInfo")),
  MapsPage: lazy(() => import("./maps")),
  RegionMapsPage: lazy(() => import("./mapsRegion")),
  ProfilePage: lazy(() => import("./profilePage")),
  DataPage: lazy(() => import("./data")),
  DataPageOrganization: lazy(() => import("./dataOrganization")),
  DataPageRegion: lazy(() => import("./dataRegion")),
  ElectrPage: lazy(() => import("./electrydata")),
  ElectrPageOrganization: lazy(() => import("./electrydataOrganization")),
  ElectrPageRegion: lazy(() => import("./electrydataRegion")),
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
  NotificationsInfo: lazy(() =>
    import("../components/notificationInformation")
  ),
  NotFound: lazy(() => import("./notFound")),
  AllDataPage: lazy(() => import("./allDataPage")),
  AllDataPageOrganization: lazy(() => import("./allDataPageOrganization")),
  AllDataPageRegion: lazy(() => import("./allDataPageRegion")),
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
  } else if (localStorage.getItem("roles") === "678a3a3e271c9b956e444415") {
    return "region";
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
          ) : checkRole() == "region" ? (
            <pages.RegionDashboard />
          ) : (
            ""
          )
        }
      />

      <Route
        path="/security"
        element={<pages.Security />}
      />

      <Route
        path="/stations"
        element={
          checkRole() == "root" ? (
            <pages.Stations />
          ) : checkRole() == "district" ? (
            <pages.StationsWithUser />
          ) : checkRole() == "organization" ? (
            <pages.StationsOrganization />
          ) : checkRole() == "region" ? (
            <pages.StationsRegion />
          ) : (
            ""
          )
        }
      />
      <Route path="/notification" element={<pages.Notifications />} />
      <Route path="/notification/:id" element={<pages.NotificationsInfo />} />
      <Route path="/stations/:id" element={<pages.StationsInformations />} />
      <Route
        path="/maps"
        element={
          checkRole() == "root" ? (
            <pages.MapsPage />
          ) : checkRole() == "district" ? (
            <pages.MapsPage />
          ) : checkRole() == "organization" ? (
            <pages.MapsPage />
          ) : checkRole() == "region" ? (
            <pages.RegionMapsPage />
          ) : (
            ""
          )
        }
      />
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
          ) : checkRole() == "region" ? (
            <pages.DataPageRegion />
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
          ) : checkRole() == "region" ? (
            <pages.ElectrPageRegion />
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
          ) : checkRole() == "region" ? (
            <pages.AllDataPageRegion />
          ) : (
            ''
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
      {/* <Route path="*" element={<pages.NotFound />} /> */}
    </Routes>
  );
}

export default memo(Root);
