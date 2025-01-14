/** @format */

import { TOGGLE_THEME } from "../actions/themeType";

const initialTheme = localStorage.getItem("theme") || "light";

const initialState = {
  theme: initialTheme,
  colors: {
    background: initialTheme === "light" ? "#F3F7FF" : "#37424e",
    layoutBackground: initialTheme === "light" ? "#FDFEFF" : "#2e3540",
    text: initialTheme === "light" ? "#31394D" : "#FFFFFF",
    buttonText: initialTheme === "light" ? "#F3F7FF" : "#37424e", 
    textWhite: "#fff",
    textLight: "#748AA1",
    buttonColor: "#3652AD",
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
    blurBgColor: "rgba(52, 152, 219, 0.2)"
  },
};

const themes = {
  light: {
    background: "#F3F7FF",
    layoutBackground: "#FDFEFF",
    text: "#31394D",
    buttonColor: "#3652AD",
    buttonText: "#F3F7FF",
    boxShadow: "rgba(34, 60, 80, 0.1)",
    textWhite: "#fff",
    textLight: "#748AA1",
    blurFilter: "rgba(0, 0, 0, 0.1)",
    statisticElement1: "#B558F6",
    statisticElement2: "#FEC400",
    statisticElement3: "#4072EE",
    blurBgColor: "rgba(52, 152, 219, 0.2)"
  },
  dark: {
    background: "#37424e",
    layoutBackground: "#2e3540",
    text: "#FFFFFF",
    buttonColor: "#3652AD",
    buttonText: "#37424e", 
    textWhite: "#fff",
    textLight: "#748AA1",
    statisticElement1: "#B558F6",
    statisticElement2: "#FEC400",
    statisticElement3: "#4072EE",
    blurFilter: "rgba(256, 256, 256, 0.1)",
    boxShadow: "rgba(255, 255, 255, 0.2)",
    blurBgColor: "rgba(52, 152, 219, 0.2)"
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
