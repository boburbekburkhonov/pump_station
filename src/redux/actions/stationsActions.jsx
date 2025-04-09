/** @format */
import { GLOBALTYPES } from "./globalTypes";
import { getDataApi, postDataApi } from "../../utils";

export const STATIONS_TYPES = {
  CREATE_STATIONS: "CREATE_STATIONS",
  UPDATE_STATIONS: "UPDATE_STATIONS",
  DELETE_STATIONS: "DELETE_STATIONS",
  FIND_ALL_STATIONS: "FIND_ALL_STATIONS",
  FIND_ALL_STATIONS_BY_DISTRICT_ID: "FIND_ALL_STATIONS_BY_DISTRICT_ID",
  FIND_BY_ID_STATIONS: "FIND_BY_ID_STATIONS",
  FIND_LAST_DATA_AND_STATIONS: "FIND_LAST_DATA_AND_STATIONS",
  FIND_MAPS_LAST_DATA: "FIND_MAPS_LAST_DATA",
  FIND_MAPS_LAST_DATA_BY_DISTRICT_ID: "FIND_MAPS_LAST_DATA_BY_DISTRICT_ID",
  FIND_MY_LOCATIONS_POLYGONE: "FIND_MY_LOCATIONS_POLYGONE",
  FIND_LAST_DATA_LOADING: "FIND_LAST_DATA_LOADING",
  FIND_SELECTED_STATIONS_ID: "FIND_SELECTED_STATIONS_ID",
};

export const getAllStationsData = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(
      `stations/findAll?lang=${data.lang}&page=${
        data.page == undefined ? "" : data.page
      }&perPage=${data.perPage == undefined ? "" : data.perPage}&search=${
        data.search == undefined ? "" : data.search
      }&regionId=${
        data.regionId == undefined ? "" : data.regionId
      }&districtId=${
        data.districtId == undefined ? "" : data.districtId
      }&organizationId=${
        data.organizationId == undefined ? "" : data.organizationId
      }&status=${data.status == undefined ? "" : data.status}`,
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

export const getAllStationsDataByDistrictId =
  (data, token) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findAll?lang=${data.lang}&page=${data.page}&perPage=${data.perPage}&search=${data.search}&regionId=${data.regionId}&districtId=${data.districtId}&organizationId=${data.organizationId}&status=${data.status}`,
        token
      );

      dispatch({
        type: STATIONS_TYPES.FIND_ALL_STATIONS_BY_DISTRICT_ID,
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

export const findLastStationsData = (lang, token) => async (dispatch) => {
  try {
    dispatch({
      type: STATIONS_TYPES.FIND_LAST_DATA_LOADING,
      payload: true,
    });

    const res = await getDataApi(
      `dashboard/getSelectedStationLastData?lang=${lang}`,
      token
    );

    const stationsId = res.data.data.map((item) => item.id);

    dispatch({
      type: STATIONS_TYPES.FIND_LAST_DATA_AND_STATIONS,
      payload: res.data.data,
    });

    dispatch({
      type: STATIONS_TYPES.FIND_SELECTED_STATIONS_ID,
      payload: stationsId,
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
      console.log(err.response);
      // dispatch({
      //   type: GLOBALTYPES.ALERT,
      //   payload: {
      //     error: err.response.data.message || err.response.statusText,
      //   },
      // });
    }
  } finally {
    dispatch({
      type: STATIONS_TYPES.FIND_LAST_DATA_LOADING,
      payload: false,
    });
  }
};

export const findInMapsLastData =
  (lang, token, page, perPage, search, status) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findAllLastData?lang=${lang}&page=${
          page == undefined ? "" : page
        }&perPage=${perPage == undefined ? "" : perPage}&search=${
          search == undefined ? "" : search
        }&status=${status == undefined ? "" : status}`,
        token
      );

      dispatch({
        type: STATIONS_TYPES.FIND_MAPS_LAST_DATA,
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

export const findInMapsLastDataByDistrictId =
  (lang, token, page, perPage, districtId, search, status) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await getDataApi(
        `stations/findAllLastData?lang=${lang}&page=${
          page == undefined ? "" : page
        }&perPage=${
          perPage == undefined ? "" : perPage
        }&districtId=${districtId}&search=${
          search == undefined ? "" : search
        }&status=${status == undefined ? "" : status}`,
        token
      );

      dispatch({
        type: STATIONS_TYPES.FIND_MAPS_LAST_DATA_BY_DISTRICT_ID,
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

export const findMyLocationsPolygon = (lang, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: STATIONS_TYPES.FIND_LAST_DATA_LOADING,
      payload: true,
    });

    const res = await getDataApi(
      `districts/getById?lang=${lang}&id=${id}`,
      token
    );
    console.log(res.data.data);

    dispatch({
      type: STATIONS_TYPES.FIND_MY_LOCATIONS_POLYGONE,
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
          error: err.response.data.message || err.response.statusText,
        },
      });
    }
  } finally {
    dispatch({
      type: STATIONS_TYPES.FIND_LAST_DATA_LOADING,
      payload: false,
    });
  }
};

export const createNewLastDataStation =
  (lang, data, token) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      const res = await postDataApi(
        `dashboard/create?lang=${lang}`,
        data,
        token
      );

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
