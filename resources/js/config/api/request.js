import axios from "axios";
import { URL_API } from "../index";

const debugData = data => {
    return Promise.resolve(data);
}

const debugError = er => {
    return Promise.reject(er);
}

const request = () => {
    const token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");

    const axiosApi = axios.create({
        baseURL: URL_API,
        headers: {
            Authorization: `${token_type} ${token}`,
        }
    });

    // _store.dispatch(fetchingServer(true));

    return {
        get(url, options = {}) {
            return axiosApi.get(url).then(debugData).catch(debugError)
        },
        post(url, data, options = {}) {
            return axiosApi.post(url, data).then(debugData).catch(debugError)
        },
        put(url, data, options = {}) {
            return axiosApi.put(url, data).then(debugData).catch(debugError)
        },
        delete(url, options = {}) {
            return axiosApi.delete(url).then(debugData).catch(debugError)
        },
    }
}

export default request;