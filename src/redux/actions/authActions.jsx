/** @format */

import { GLOBALTYPES } from "./globalTypes";
import { postDataApi } from "../../utils";
import Cookies from 'js-cookie';

export const signInAction = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

    Cookies.set('login', data.username, { expires: 1, path: '/' })
    Cookies.set('code', data.password, { expires: 1, path: '/' })

    const res = await postDataApi(`auth/signIn?lang=${lang}`, {
      username: data.username,
      password: data.password,
    });

    localStorage.setItem("roles", res.data.data.user.role.id);
    localStorage.setItem("access_token", res.data.data.accessToken);
    localStorage.setItem("refresh_token", res.data.data.refreshToken);
    Cookies.set('regionId', res.data.data.user.regionId, { expires: 1, path: '/' })
    

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

    window.location.href = '/'
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
    const res = await postDataApi('auth/refreshToken', {
      username: Cookies.get('login'),
      refreshToken: localStorage.getItem("refresh_token")
    })

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

      localStorage.removeItem("login")
      localStorage.removeItem("code")
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("roles")
      window.location.href = '/'
    }
  }
};

export const logoutAction = (token) => async (dispatch) => {
  const username = Cookies.get('login')
  const password = Cookies.get('code')

  try {
    if (username && password) {

      const res = await postDataApi("auth/logout", {
        username,
        password
      }, token)

      if (res.status === 201) {
        Cookies.remove('login', { path: '/' })
        Cookies.remove('code', { path: '/' })
        Cookies.remove('regionId', { path: '/' })
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("roles")
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
    window.location.href = '/'
  }
}

export const sendCodePhoneNumber = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true
    })

    console.log(data);

    const res = await postDataApi(`auth/sendCode?lang=${lang}`, data)

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message
      }
    })
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
}

export const comfirmPhoneNumberCode = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true
    })

    const res = await postDataApi('auth/confirmPhone', data)

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: res.data.message
    })

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
}
