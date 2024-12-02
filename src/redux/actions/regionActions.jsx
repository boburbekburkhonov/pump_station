import { getDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const REGION_TYPES = {
    GET_ALL_REGIONS: "GET_ALL_REGIONS",
}

export const getAllRegionId = (lang, token) => async (dispatch) => {
    try {
        const res = await getDataApi(`regions/get-all?lang=${lang}&page=1&perPage=100`, token)

        dispatch({
            type: REGION_TYPES.GET_ALL_REGIONS,
            payload: res.data.data.data
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