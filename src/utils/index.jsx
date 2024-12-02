/** @format */

import axios from "axios";

export const getDataApi = async (url, token) => {
    const res = await axios.get(`https://api.ns.sss.uz/api/v1/${url}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res;
};  

export const postDataApi = async (url, post, token) => {
    const res = await axios.post(
        `https://api.ns.sss.uz/api/v1/${url}`,
        post,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
    );

    return res;
};

export const getOneDataApi = async (url, post, token) => {
    const res = await axios.put(
        `https://api.ns.sss.uz/api/v1/${url}`,
        post,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              },
        }
    );

    return res;
};

export const getOneParamsDataApi = async (url, id) => {
    const res = await axios.put(`https://api.ns.sss.uz/api/v1/${url}`, {
        params: {
            id: id,
        },
    });

    return res;
};

export const patDataApi = async (url, post) => {
    const res = await axios.patch(
        `https://api.ns.sss.uz/api/v1/${url}`,
        post
    );

    return res;
};

export const deleteDataApi = async (url) => {
    const res = await axios.delete(`https://api.ns.sss.uz/api/v1/${url}`);

    return res;
};

