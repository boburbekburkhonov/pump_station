import { getDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const REGION_TYPES = {
    GET_ALL_REGIONS: "GET_ALL_REGIONS",
    GET_ALL_REGIONS_FOR_REGION: "GET_ALL_REGIONS_FOR_REGION",
}

export const getAllRegionId = (lang, token, page, perPage) => async (dispatch) => {
    try {
        const res = await getDataApi(`regions/get-all?lang=${lang}&page=${page}&perPage=${perPage}`, token)

        dispatch({
            type: REGION_TYPES.GET_ALL_REGIONS,
            payload: res.data.data.data
        })
        dispatch({
            type: REGION_TYPES.GET_ALL_REGIONS_FOR_REGION,
            payload: res.data.data
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
                    error: err.response.data.message || err.response.message,
                },
            });
        }
    }
}

export const createRegion = (lang, token, page, perPage) => async (dispatch) => {
    try {
        const res = await getDataApi(`regions/get-all?lang=${lang}&page=${page}&perPage=${perPage}`, token)

        dispatch({
            type: REGION_TYPES.GET_ALL_REGIONS,
            payload: res.data.data.data
        })
        dispatch({
            type: REGION_TYPES.GET_ALL_REGIONS_FOR_REGION,
            payload: res.data.data
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
                    error: err.response.data.message || err.response.message,
                },
            });
        }
    }
}