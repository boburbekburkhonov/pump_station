/** @format */

import { TOGGLE_THEME } from "../actions/themeType";

const initialTheme = localStorage.getItem("theme") || "light";

const initialState = {
  theme: initialTheme,
  colors: {
    background: initialTheme === "light" ? "#F5F6FA" : "#1F2327",
    layoutBackground: initialTheme === "light" ? "#FFFFFF" : "#292E33",
    text: initialTheme === "light" ? "#31394D" : "#FFFFFF",
    buttonText: initialTheme === "light" ? "#F5F6FA" : "#1F2327", 
    textWhite: "#fff",
    textLight: "#748AA1",
    buttonColor: "#29CB97",
    statisticElement1: "#B558F6",
    statisticElement2: "#FEC400",
    statisticElement3: "#4072EE",
    blurFilter:
      initialTheme === "light"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(256, 256, 256, 0.1)",
    boxShadow:
      initialTheme === "light"
        ? "rgba(34, 60, 80, 0.1)"
        : "rgba(255, 255, 255, 0.2)",
  },
};

const themes = {
  light: {
    background: "#F5F6FA",
    layoutBackground: "#FFFFFF",
    text: "#31394D",
    buttonColor: "#29CB97",
    buttonText: "#F5F6FA",
    boxShadow: "rgba(34, 60, 80, 0.1)",
    textWhite: "#fff",
    textLight: "#748AA1",
    blurFilter: "rgba(0, 0, 0, 0.1)",
    statisticElement1: "#B558F6",
    statisticElement2: "#FEC400",
    statisticElement3: "#4072EE",
  },
  dark: {
    background: "#1F2327",
    layoutBackground: "#292E33",
    text: "#FFFFFF",
    buttonColor: "#29CB97",
    buttonText: "#1F2327", 
    textWhite: "#fff",
    textLight: "#748AA1",
    statisticElement1: "#B558F6",
    statisticElement2: "#FEC400",
    statisticElement3: "#4072EE",
    blurFilter: "rgba(256, 256, 256, 0.1)",
    boxShadow: "rgba(255, 255, 255, 0.2)",
  },
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newTheme = state.theme === "light" ? "dark" : "light";

      localStorage.setItem("theme", newTheme);

      return {
        ...state,
        theme: newTheme,
        colors: themes[newTheme],
      };
    default:
      return state;
  }
};

export default themeReducer;
