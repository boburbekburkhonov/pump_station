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
    buttonColor: "#405FF2",
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
    blurBgColor: "rgba(64, 95, 242, 0.2)",
    logoColor: initialTheme === "light" ? "#405FF2" : "#fff",
    blurBgColor2: "rgba(64, 95, 242, 0.1)",
  },
};

const themes = {
  light: {
    background: "#F3F7FF",
    layoutBackground: "#FDFEFF",
    text: "#31394D",
    buttonColor: "#405FF2",
    buttonText: "#F3F7FF",
    boxShadow: "rgba(34, 60, 80, 0.1)",
    textWhite: "#fff",
    textLight: "#748AA1",
    blurFilter: "rgba(0, 0, 0, 0.1)",
    statisticElement1: "#B558F6",
    statisticElement2: "#FEC400",
    statisticElement3: "#4072EE",
    blurBgColor: "rgba(64, 95, 242, 0.2)",
    blurBgColor2: "rgba(64, 95, 242, 0.1)",
    logoColor: "#405FF2"
  },
  dark: {
    background: "#37424e",
    layoutBackground: "#2e3540",
    text: "#FFFFFF",
    buttonColor: "#405FF2",
    buttonText: "#37424e",
    textWhite: "#fff",
    textLight: "#748AA1",
    statisticElement1: "#B558F6",
    statisticElement2: "#FEC400",
    statisticElement3: "#4072EE",
    blurFilter: "rgba(256, 256, 256, 0.1)",
    boxShadow: "rgba(255, 255, 255, 0.2)",
    blurBgColor: "rgba(64, 95, 242, 0.2)",
    blurBgColor2: "rgba(64, 95, 255, 0.1)",
    logoColor: "#fff"
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
