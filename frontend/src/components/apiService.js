import axios from 'axios';

let state = {};

let settings =
{
    BaseApiUrl: "http://localhost:3030"
};

// function getHeaders() {
//     if(state.accessToken) {
//         return { 'Authorization': `Bearer ${state.accessToken}` };
//     } else {
//         return { };
//     }
// }

function getUserProfile() {
    var json = localStorage.getItem('col-profile');
    return JSON.parse(json);
}
function setUserProfile(profile) {
    if(profile && profile != null) {
        localStorage.setItem('col-profile', JSON.stringify(profile));
    }
    else {
        localStorage.removeItem('col-profile');
    }
}

function getAdminProfile() {
    var json = localStorage.getItem('col-admin-profile');
    return JSON.parse(json);
}
function setAdminProfile(profile) {
    if(profile && profile != null) {
        localStorage.setItem('col-admin-profile', JSON.stringify(profile));
    }
    else {
        localStorage.removeItem('col-admin-profile');
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
        return axios.get(settings.BaseApiUrl+"/"+path);
        //return axios.get(settings.BaseApiUrl+"/"+path, { headers: getHeaders() });
    },
    postRequest: (path, content) => {
        return axios.post(settings.BaseApiUrl+"/"+path, content);
        //return axios.post(settings.BaseApiUrl+"/"+path, content, { headers: getHeaders() });
    },
    putRequest: (path, content) => {
        return axios.put(settings.BaseApiUrl+"/"+path, content);
        //return axios.put(settings.BaseApiUrl+"/"+path, content, { headers: getHeaders() });
    },
    deleteRequest: (path, content) => {
        return axios.delete(settings.BaseApiUrl+"/"+path, content);
        //return axios.delete(settings.BaseApiUrl+"/"+path, content, { headers: getHeaders() });
    },
    // setAccessToken: (accessToken) => {
    //     state.accessToken = accessToken;
    // },
    isAuthenticated: () => {
        var isAuthenticated = localStorage.getItem('col-profile') != null
        return isAuthenticated;
    },
    logout: () => {
        setUserProfile(null);
    },
    adminLogout: () => {
        setAdminProfile(null);
    },
    saveQuiz: (quiz) => {
        localStorage.setItem('col-quiz', JSON.stringify(quiz));
    },
    getQuiz: () => {
        var json = localStorage.getItem('col-quiz');
        return JSON.parse(json); 
    },
    clearQuiz: (quiz) => {
        localStorage.removeItem('col-quiz');
    },
    profile: (profile) => {
        if(profile && profile != null) {
            setUserProfile(profile);
        }
        return getUserProfile();
    },
    adminProfile: (profile) => {
        if(profile && profile != null) {
            setAdminProfile(profile);
        }
        return getAdminProfile();
    },
    isAdminAuthenticated: ()=>{
        var isAuthenticated = localStorage.getItem('col-admin-profile') != null
        return isAuthenticated;
    }
};

export default apiService;