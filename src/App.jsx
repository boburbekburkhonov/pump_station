/** @format */

import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import ScrollToTop from "./components/scrollTop";
import "./index.css";
import Notif from "./components/alert";
import LayoutComponent from "./components/layout";
import Root from "./pages/root";
import { refresh_token } from "./redux/actions/authActions";
import AuthRootPages from "./pages/resetPages";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

const ConditionalContent = memo(({ isAuthenticated }) => {

  return (
    <>
      {isAuthenticated ? (
        <motion.div
          initial='initial'
          animate='in'
          exit='out'
          variants={pageVariants}
          transition={pageTransition}>
          <LayoutComponent childrenComponent={<Root />} />
        </motion.div>
      ) : (
        <motion.div
          initial='initial'
          animate='in'
          exit='out'
          variants={pageVariants}
          transition={pageTransition}>
          <AuthRootPages />
        </motion.div>
      )}
    </>
  );
});

const App = () => {
  const { colors, theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch()
  const isAuthenticated = localStorage.getItem("access_token");

  const refreshedTokenFunction = useCallback(() => {
    if (isAuthenticated) {
      dispatch(refresh_token())
    }
  }, [dispatch, isAuthenticated])

  useEffect(() => {
    refreshedTokenFunction()
  }, [refreshedTokenFunction])

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
      className='App'>
      <ScrollToTop />
      <div className='main'>
        <Notif />
        <ConditionalContent isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default App;
