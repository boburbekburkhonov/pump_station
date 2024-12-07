/** @format */

import React, { memo, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./dashboard/home"));
const Stations = lazy(() => import("./stations"));
const Users = lazy(() => import("./users"));
const DataPage = lazy(() => import("./data"));
const MapsPage = lazy(() => import("./maps"));
const RolePage = lazy(() => import("./role"));
const Reports = lazy(() => import("./reports"));
const RegionPages = lazy(() => import("./regions"));
const Districts = lazy(() => import("./districts"));
const OrganizationsPages = lazy(() => import("./organizations"));
const UserJoin = lazy(() => import("./userJoin"));
const Notifications = lazy(() => import("./notifications"));
const ElectrPage = lazy(() => import("./electrydata"));
const ProfilePage = lazy(() => import('./profilePage'))
const StationsInformations = lazy(() => import('./stationsInfo'))
const NotFound = lazy(() => import("./notFound"));

function Root() {
  const isAuthenticated = localStorage.getItem("roles");

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/stations' element={<Stations />} />
      <Route path='/statetions/:id' element={<StationsInformations />} />
      <Route path='/maps' element={<MapsPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/data' element={<DataPage />} />
      <Route path='/electrical/data' element={<ElectrPage />} />
      <Route
        path='/users'
        element={
          isAuthenticated === "674877fbf0a8ec5c59065cb6" ? (
            <Users />
          ) : (
            <NotFound />
          )
        }
      />
      <Route
        path='/roles'
        element={
          isAuthenticated === "674877fbf0a8ec5c59065cb6" ? (
            <RolePage />
          ) : (
            <NotFound />
          )
        }
      />
      <Route
        path='/reports'
        element={
          isAuthenticated === "674877fbf0a8ec5c59065cb6" ? (
            <Reports />
          ) : (
            <NotFound />
          )
        }
      />
      <Route
        path='/regions'
        element={
          isAuthenticated === "674877fbf0a8ec5c59065cb6" ? (
            <RegionPages />
          ) : (
            <NotFound />
          )
        }
      />
      <Route
        path='/districts'
        element={
          isAuthenticated === "674877fbf0a8ec5c59065cb6" ? (
            <Districts />
          ) : (
            <NotFound />
          )
        }
      />
      <Route
        path='/organizations'
        element={
          isAuthenticated === "674877fbf0a8ec5c59065cb6" ? (
            <OrganizationsPages />
          ) : (
            <NotFound />
          )
        }
      />
      <Route
        path='/user/join'
        element={
          isAuthenticated === "674877fbf0a8ec5c59065cb6" ? (
            <UserJoin />
          ) : (
            <NotFound />
          )
        }
      />
      <Route
        path='/natification'
        element={
          isAuthenticated === "674877fbf0a8ec5c59065cb6" ? (
            <Notifications />
          ) : (
            <NotFound />
          )
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default memo(Root);
