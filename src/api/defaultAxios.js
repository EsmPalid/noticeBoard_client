import axios from "axios";

const defaultAxios = (url = "/", config) => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const queryParams = {};

    params.forEach((value, key) => {
        queryParams[key] = value;
    });

    const instance = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true,

        params: {
            ...queryParams,
            language: "ko-KR",
        },
    });

    instance.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const response = instance({ url: url, ...config });

    return response;
};

defaultAxios.get = (url, config) => {
    return defaultAxios(url, { ...config, method: "GET" });
};

defaultAxios.post = (url, data, config) => {
    return defaultAxios(url, { ...config, method: "POST", data });
};

export default defaultAxios;
