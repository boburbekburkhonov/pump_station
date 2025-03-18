/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { postDataApi } from "../../utils";
import Cookies from "js-cookie";

export const signInAction = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

    Cookies.set("login", data.username, { expires: 1, path: "/" });
    Cookies.set("code", data.password, { expires: 1, path: "/" });

    const res = await postDataApi(`auth/signIn?lang=${lang}`, {
      username: data.username,
      password: data.password,
    });
    console.log(res.data.data.user.name);

    localStorage.setItem("roles", res.data.data.user.role.id);
    localStorage.setItem("access_token", res.data.data.accessToken);
    localStorage.setItem("refresh_token", res.data.data.refreshToken);
    localStorage.setItem("name", res.data.data.user.name);
    localStorage.setItem("roleName", res.data.data.user.role.name);
    Cookies.set("regionId", res.data.data.user.regionId, {
      expires: 1,
      path: "/",
    });
    Cookies.set("districtId", res.data.data.user.districtId, {
      expires: 1,
      path: "/",
    });
    Cookies.set("userId", res.data.data.user.id, { expires: 1, path: "/" });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.data,
      },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });

    window.location.href = "/";
  } catch (err) {
    if (!err.response) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Network Error",
        },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
  }
};

export const refresh_token = () => async (dispatch) => {
  try {
    const res = await postDataApi("auth/refreshToken", {
      username: Cookies.get("login"),
      refreshToken: localStorage.getItem("refresh_token"),
    });

    localStorage.setItem("access_token", res.data.data.accessToken);
    localStorage.setItem("refresh_token", res.data.data.refreshToken);
  } catch (err) {
    if (!err.response) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Network Error",
        },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });

      localStorage.removeItem("login");
      localStorage.removeItem("code");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("roles");
      window.location.href = "/";
    }
  }
};

export const logoutAction = (token) => async (dispatch) => {
  const username = Cookies.get("login");
  const password = Cookies.get("code");

  try {
    if (username && password) {
      const res = await postDataApi(
        "auth/logout",
        {
          username,
          password,
        },
        token
      );

      if (res.status === 201) {
        Cookies.remove("login", { path: "/" });
        Cookies.remove("code", { path: "/" });
        Cookies.remove("regionId", { path: "/" });
        Cookies.remove("districtId", { path: "/" });
        Cookies.remove("userId", { path: "/" });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("roles");
      }
    }
  } catch (err) {
    if (!err.response) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Network Error",
        },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
    window.location.href = "/";
  }
};

export const sendCodePhoneNumber = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await postDataApi(`auth/sendCode?lang=uz`, data);

    const newData = {
      statusCode: "Xz1@k9Lm#Pq",
    };

    localStorage.setItem("user_name_code", data.username);
    localStorage.setItem("user_phone_code", data.phone);

    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: newData,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });
  } catch (err) {
    if (!err.response) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Network Error",
        },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Ma'lumot topilmadi",
        },
      });

      dispatch({
        type: GLOBALTYPES.STATUS,
        payload: { statusCode: "" },
      });
    }
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
  }
};

export const comfirmPhoneNumberCode = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await postDataApi("auth/confirmPhone", data);

    localStorage.setItem("access_token", res.data.data.accessToken);
    localStorage.setItem("refresh_token", res.data.data.refreshToken);

    const newData = {
      statusCode: "7gT!zR4vN*M2",
    };

    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: newData,
    });
  } catch (err) {
    console.log(err);

    if (!err.response) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Network Error",
        },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error:
            err.response.data.message ||
            "Xatolik yuzaga kelti qayta urunib ko'ring",
        },
      });
    }

    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { statusCode: "" },
    });
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
  }
};

export const createNewPassword = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    console.log(data);

    const token = localStorage.getItem("access_token");

    const res = await postDataApi(
      "users/updateNewPassword?lang=uz",
      data,
      token
    );

    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { statusCode: "Qw$8Xp&Jd5Yr" },
    });
  } catch (err) {
    if (!err.response) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: "Network Error",
        },
      });
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_name_code");
    localStorage.removeItem("user_phone_code");
  }
};
