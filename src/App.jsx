import React, { memo, useCallback, useEffect, useTransition, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScrollToTop from "./components/scrollTop";
import "./index.css";
import Notif from "./components/alert";
import LayoutComponent from "./components/layout";
import Root from "./pages/root";
import { refresh_token } from "./redux/actions/authActions";
import AuthRootPages from "./pages/resetPages";
import Loading from "./components/loading";

const ConditionalContent = memo(({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? (
        <LayoutComponent childrenComponent={<Root />} />
      ) : (
        <AuthRootPages />
      )}
    </>
  );
});

const App = () => {
  const { colors, theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem("access_token");
  const [isPending, startTransition] = useTransition();

  const refreshedTokenFunction = useCallback(() => {
    if (isAuthenticated) {
      dispatch(refresh_token());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    startTransition(() => {
      refreshedTokenFunction();
    });
  }, [refreshedTokenFunction]);

  useEffect(() => {
    const logoLink = document.querySelector('link[rel="icon"]');

    if (logoLink) {
      logoLink.href =
        theme === "light"
          ? "./src/assets/output-onlinepngtools-removebg-preview.png"
          : "./src/assets/output-onlinepngtools__1_-removebg-preview.png";
    }
  }, [theme]);

  return (
    <div
      style={{
        background: colors.background,
        color: `${colors.text}`,
      }}
      className="App"
    >
      <ScrollToTop />
      <div className="main">
        <Notif />
        {isPending ? (
          <div className="loading">
            <Loading />
          </div>
        ) : (
          <ConditionalContent isAuthenticated={isAuthenticated} />
        )}
      </div>
    </div>
  );
};

export default App;
