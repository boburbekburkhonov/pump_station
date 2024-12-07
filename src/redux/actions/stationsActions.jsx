/** @format */
import { GLOBALTYPES } from "./globalTypes";
import { getDataApi, postDataApi } from "../../utils";

export const STATIONS_TYPES = {
  CREATE_STATIONS: "CREATE_STATIONS",
  UPDATE_STATIONS: "UPDATE_STATIONS",
  DELETE_STATIONS: "DELETE_STATIONS",
  FIND_ALL_STATIONS: "FIND_ALL_STATIONS",
  FIND_BY_ID_STATIONS: "FIND_BY_ID_STATIONS",
};

export const getAllStationsData = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(
      `stations/findAll?lang=${data.lang}&page=${data.page}&perPage=${data.perPage}&search=${data.search}&regionId=${data.regionId}&organizationId=${data.organizationId}&status=${data.status}`,
      token
    );

    dispatch({
      type: STATIONS_TYPES.FIND_ALL_STATIONS,
      payload: res.data.data,
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
          error: err.response.data.message || err.response.statusText,
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

export const createStationsData = (data, token, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await postDataApi(`stations/create?lang=${lang}`, data, token);

    dispatch({
      type: STATIONS_TYPES.CREATE_STATIONS,
      payload: res.data.data,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: "Ma'lumotlar saqlandi",
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

export const updateStationsData = (data, token, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await postDataApi(`stations/update?lang=${lang}`, data, token);

    dispatch({
      type: STATIONS_TYPES.UPDATE_STATIONS,
      payload: res.data.data,
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
  }
};

export const deleteStationsData = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await postDataApi("stations/delete?lang=uz", data, token);

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

export const findByIdStationsData = (data, token, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(
      `stations/findById?lang=${lang}&id=${data}`,
      token
    );

    dispatch({
      type: STATIONS_TYPES.FIND_BY_ID_STATIONS,
      payload: res.data.data,
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
  }
};
