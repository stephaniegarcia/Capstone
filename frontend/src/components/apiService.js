import axios from 'axios';

let state = {};

let settings =
{
    BaseApiUrl: "http://localhost:" + (process.env.REACT_API_PORT || 3000)
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
    },
    refreshOrgTypes: () => {
        return axios.get(settings.BaseApiUrl+"/businessType");
    },
    refreshOrgStages: () => {
        return axios.get(settings.BaseApiUrl+"/businessStages");
    },
    refreshOrgSteps: () => {
        return axios.get(settings.BaseApiUrl+"/businessStep");
    },
    orgTypes: (types) => {
        if(types) {
            localStorage.setItem('col-org-types', JSON.stringify(types));
        } 
        else {
            var orgTypes = JSON.parse(localStorage.getItem('col-org-types'));
            return orgTypes;
        }
    },
    orgStages: (stages) => {
        if(stages) {
            localStorage.setItem('col-org-stages', JSON.stringify(stages));
        } 
        else {
            var orgStages = JSON.parse(localStorage.getItem('col-org-stages'));
            return orgStages;
        }
    },
    orgSteps: (steps) => {
        if(steps) {
            localStorage.setItem('col-org-steps', JSON.stringify(steps));
        } 
        else {
            var orgSteps = JSON.parse(localStorage.getItem('col-org-steps'));
            return orgSteps;
        }
    },
    getOrgType: (bt_id) => {
        var orgTypes = JSON.parse(localStorage.getItem('col-org-types'));
        orgTypes = orgTypes.filter(o => o.bt_id == bt_id);
        if(orgTypes.length>0) {
            return orgTypes[0].description;
        }
        return '';
    },
    getOrgTypeVideo: (bt_id) => {
        // var orgTypes = JSON.parse(localStorage.getItem('col-org-types'));
        // orgTypes = orgTypes.filter(o => o.bt_id == bt_id);
        // if(orgTypes.length>0) {
        //     return orgTypes[0].video;
        // }
        // return null;
        switch(bt_id) {
            case 1:
                return 'https://www.youtube.com/embed/I4jjKZin69M';
            case 2:
                return 'https://www.youtube.com/embed/fLpi3y4hCx8';
            case 3:
                return 'https://www.youtube.com/embed/E2pHNYr7Aho';
            case 4:
                return 'https://www.youtube.com/embed/g-j-XLl1mb8';
            case 5:
                return null;
        }
    },
    getOrgStage: (bstage_id) => {
        var orgStages = JSON.parse(localStorage.getItem('col-org-stages'));
        orgStages = orgStages.filter(o => o.bstage_id == bstage_id);
        if(orgStages.length>0) {
            return orgStages[0].description;
        }
        return '';
    },
    getOrgStep: (bs_id) => {
        var orgSteps = JSON.parse(localStorage.getItem('col-org-steps'));
        orgSteps = orgSteps.filter(o => o.bs_id == bs_id);
        if(orgSteps.length>0) {
            return orgSteps[0].description;
        }
        return '';
    },
    getRoadmapSteps: (bt_id, bstage_id) => {
        var orgSteps = JSON.parse(localStorage.getItem('col-org-steps'));
        //orgSteps = orgSteps.filter(o => o.bt_id == bt_id && o.bstage_id == bstage_id);
        orgSteps = orgSteps.filter(o => o.bt_id == bt_id);
        if(orgSteps.length>0) {
            return orgSteps;
        }
        return [];
    },
    getRequest: (path) => {
        return axios.get(settings.BaseApiUrl+"/"+path);

        // if(content) {
        //     return axios.get(settings.BaseApiUrl+"/"+path, { params: JSON.stringify(content) });
        // }
        // else {
        //     return axios.get(settings.BaseApiUrl+"/"+path);
        // }
        
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