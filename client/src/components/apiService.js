import axios from 'axios';

let state = {};

let settings =
{
    BaseApiUrl: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
};
//Get User Profile
function getUserProfile() {
    var json = localStorage.getItem('col-profile');
    return JSON.parse(json);
}
//Set User Profile
function setUserProfile(profile) {
    if(profile && profile != null) {
        localStorage.setItem('col-profile', JSON.stringify(profile));
    }
    else {
        localStorage.removeItem('col-profile');
    }
}
//Get Admin Profile 
function getAdminProfile() {
    var json = localStorage.getItem('col-admin-profile');
    return JSON.parse(json);
}
//Set Admin Profile
function setAdminProfile(profile) {
    if(profile && profile != null) {
        localStorage.setItem('col-admin-profile', JSON.stringify(profile));
    }
    else {
        localStorage.removeItem('col-admin-profile');
    }
}

const apiService = {
    //Looks up list of organization types and saves it
    //@return: request promise
    refreshOrgTypes: () => {
        return axios.get(settings.BaseApiUrl+"/businessType");
    },
     //Looks up list of organization stages and saves it
    //@return: request promise
    refreshOrgStages: () => {
        return axios.get(settings.BaseApiUrl+"/businessStages");
    },
     //Looks up list of organization steps and saves it
    //@return: request promise
    refreshOrgSteps: () => {
        return axios.get(settings.BaseApiUrl+"/businessStep");
    },
     //Looks up list of organization types
     //@param: types
    //@return: request promise
    orgTypes: (types) => {
        if(types) {
            localStorage.setItem('col-org-types', JSON.stringify(types));
        } 
        else {
            var orgTypes = JSON.parse(localStorage.getItem('col-org-types'));
            return orgTypes;
        }
    },
    //Looks up list of organization stages
    //@param: stages
    //@return: request promise
    orgStages: (stages) => {
        if(stages) {
            localStorage.setItem('col-org-stages', JSON.stringify(stages));
        } 
        else {
            var orgStages = JSON.parse(localStorage.getItem('col-org-stages'));
            return orgStages;
        }
    },
    //Looks up list of organization stages
    //@param: steps
    //@return: request promise
    orgSteps: (steps) => {
        if(steps) {
            localStorage.setItem('col-org-steps', JSON.stringify(steps));
        } 
        else {
            var orgSteps = JSON.parse(localStorage.getItem('col-org-steps'));
            return orgSteps;
        }
    },
    //Looks up list of organization stages
    //@param: steps
    //@return: request promise
    getOrgType: (bt_id) => {
        var orgTypes = JSON.parse(localStorage.getItem('col-org-types'));
        if(orgTypes && orgTypes != null) {
            orgTypes = orgTypes.filter(o => o.bt_id == bt_id);
            if(orgTypes.length>0) {
                return orgTypes[0].description;
            }
        }
        return '';
    },
    //Looks up list of organization stages
    //@param: steps
    //@return: request promise
    getOrgTypeVideo: (bt_id) => {
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
     //Looks up icon of organization type
    //@param: business type id
    //@return: icon
    getOrgTypeIcon: (bt_id) => {
        var icon = '';
        var bordered = '_hex';
        switch(bt_id) {
            case 1:
                icon = 'microempresa';
                break;
            case 2:
                icon = 'comerciante';
                break;
            case 3:
                icon = 'innovacion';
                break;
            case 4:
                icon = 'expansion';
                break;
            case 5:
                icon = 'acceso_capital'
                break;
        }
        return icon+bordered+".png";
    },
     //Looks up name of organization type
    //@param: business type id
    //@return: request promise
    getOrgTypeCssName: (bt_id) => {
        switch(bt_id) {
            case 1:
                return 'microempresa';
            case 2:
                return 'comerciante';
            case 3:
                return 'innovacion';
            case 4:
                return 'expansion';
            case 5:
                return 'accesoCapital';
        }
    },
     //Get organization stages
    //@param: business stage id
    //@return: stage
    getOrgStage: (bstage_id) => {
        var orgStages = JSON.parse(localStorage.getItem('col-org-stages'));
        if(orgStages && orgStages != null) {
            orgStages = orgStages.filter(o => o.bstage_id == bstage_id);
            if(orgStages.length>0) {
                return orgStages[0].description;
            }
        }
        return '';
    },
     //Get organization step
    //@param: business step id
    //@return: steps
    getOrgStep: (bs_id) => {
        var orgSteps = JSON.parse(localStorage.getItem('col-org-steps'));
        if(orgSteps && orgSteps != null) {
            orgSteps = orgSteps.filter(o => o.bs_id == bs_id);
            if(orgSteps.length>0) {
                return orgSteps[0];
            }   
        }
        return '';
    },
     //Get roadmap steps
    //@param: business stage id
    //@return: steps
    getRoadmapSteps: (bstage_id) => {
        var orgSteps = JSON.parse(localStorage.getItem('col-org-steps'));
        if(orgSteps && orgSteps != null) {
            orgSteps = orgSteps.filter(o => o.bstage_id == bstage_id);
            if(orgSteps.length>0) {
                return orgSteps;
            }
        }
        return [];
    },
    //Send HTTP GET to API
    //@param: path 
    //@return: request promise
    getRequest: (path) => {
        var url = settings.BaseApiUrl+"/"+path;
        return axios.get(url);
    },
  //Recieve HTTP POST from API
    //@param: path, content
    //@return: request promise
    postRequest: (path, content) => {
        return axios.post(settings.BaseApiUrl+"/"+path, content);
    },
    //Recieve HTTP PUT from API
    //@param: path, content
    //@return: request promise
    putRequest: (path, content) => {
        return axios.put(settings.BaseApiUrl+"/"+path, content);
    },
    //Recieve HTTP DELETE from API
    //@param: path, content
    //@return: request promise
    deleteRequest: (path, content) => {
        return axios.delete(settings.BaseApiUrl+"/"+path, content);
    },
    //Recieve HTTP PUT from API
    //@return: authentication
    isAuthenticated: () => {
        var isAuthenticated = localStorage.getItem('col-profile') != null
        return isAuthenticated;
    },
    //Logout
    logout: () => {
        setUserProfile(null);
    },
    //admin Logout
    adminLogout: () => {
        setAdminProfile(null);
    },
    //Save Quiz
    //@param: quiz
    saveQuiz: (quiz) => {
        localStorage.setItem('col-quiz', JSON.stringify(quiz));
    },
    //Send HTTP GET to API
    //@return: request promise
    getQuiz: () => {
        var json = localStorage.getItem('col-quiz');
        return JSON.parse(json); 
    },
    //Clear Quiz
    //@param: quiz
    clearQuiz: (quiz) => {
        localStorage.removeItem('col-quiz');
    },
    //User Profile
    //@param: profile
    //@return user profile
    profile: (profile) => {
        if(profile && profile != null) {
            setUserProfile(profile);
        }
        return getUserProfile();
    },
    //Admin Profile
    //@param: profile
    //@return: admin profile
    adminProfile: (profile) => {
        if(profile && profile != null) {
            setAdminProfile(profile);
        }
        return getAdminProfile();
    },
    //Admin authentication
    //@return: auhtentication
    isAdminAuthenticated: ()=>{
        var isAuthenticated = localStorage.getItem('col-admin-profile') != null
        return isAuthenticated;
    },
    //Randomizer
    //@return string
    randomGuid: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }
};

export default apiService;