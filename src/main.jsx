/** @format */

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./i18n.jsx";
import Loading from "./components/loading/index.jsx";
import DataProvider from "./redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <DataProvider>
        <AnimatePresence mode="wait">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AnimatePresence>
      </DataProvider>
    </Suspense>
  </StrictMode>
);
