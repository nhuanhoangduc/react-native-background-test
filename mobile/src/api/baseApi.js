import axios from 'axios';
import configs from '@mobile/configs';
import store from '@mobile/store';


const Request = axios.create({
    baseURL: configs.serverUrl,
});

const getHeaders = () => {
    const { global } = store.getState();
    const token = global.token;

    return {
        'Authorization': 'Bearer ' + token,
    };
};



const baseApi = {
    GET: (endpoint, data = null) => {
        return Request.post(endpoint, {
            headers: getHeaders(),
            params: data,
        });
    },

    POST: (endpoint, data) => {
        return Request.post(endpoint, data, {
            headers: getHeaders(),
        });
    }
};


export default baseApi;

