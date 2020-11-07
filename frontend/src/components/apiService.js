import axios from 'axios';

let state = {};

let settings =
    {
        BaseApiUrl: "https://jsonplaceholder.typicode.com"
    };

    function getHeaders() {
        if(state.accessToken) {
            return { 'Authorization': `Bearer ${state.accessToken}` };
        } else {
            return { };
        }
    }

const apiService = {
    initialize: (config) =>{
        if(config && config.BaseApiUrl) {
            settings.BaseApiUrl = config.BaseApiUrl;
        }
        //TODO: Initialize anything needed
    },
    getRequest: (path) => {
        return axios.get(settings.BaseApiUrl+"/"+path, { headers: getHeaders() });
    },
    postRequest: (path, content) => {
        return axios.post(settings.BaseApiUrl+"/"+path, content, { headers: getHeaders() });
    },
    putRequest: (path, content) => {
        return axios.put(settings.BaseApiUrl+"/"+path, content, { headers: getHeaders() });
    },
    setAccessToken: (accessToken) => {
        state.accessToken = accessToken;
    },
    isAuthenticated: () => {
        return localStorage.getItem('token');
    },
    logout: () => {
        localStorage.removeItem('token');
    }

};

export default apiService;