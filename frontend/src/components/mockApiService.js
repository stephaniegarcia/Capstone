function ApiException(message) {
    this.response = { data: message };
}

function ApiResponse(data) {
    this.response = { data: data };
}
function isAuthenticated () {
    return localStorage.getItem('token');
}
    
function createOrganizationsData(name, phone, email, businessStage, businessType) {
    return {
      name,
      phone,
      email,
      businessStage,
      businessType,
      moreInfo: [
        { description: 'Proveen financiamiento alternativo a empresas medianas en Puerto Rico y Mexico. Proporcionan soluciones financieras para potenciar el crecimiento de tu negocio. Trabajan transacciones de $500K USD a $5 millones USD, pero son flexibles. ',
            },
      ],
      open: false
    };
}

const organizations = [
    createOrganizationsData('Organización 1', "787 987 6656", "asdf@goog.com", "Idea", "Microempresa"),
    createOrganizationsData('Organización 2', "787 987 6656", "asdf@goog.com", "Prototipo", "Comerciante"),
    createOrganizationsData('Organización 3', "787 987 6656", "asdf@goog.com", "Expansión", "Empresa Basada en Innovación"),
    createOrganizationsData('Organización 4', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Empresa en Crecimiento"),
    createOrganizationsData('Organización 5', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Acceso a Capital")
];

const logInUserProfile = { firstName: "John", lastName: "Doe", email: "demo@demo.com", password: "123pescao"}; //credentials for login
const userProfile = { //changes to from register
    firstName: "John",
    lastName: "Doe",
    email: "demo@demo.com",
    phone: '939 460 2020',
    password: "123pescao",
    accessToken: "testAccessToken",
    businessType: "",
    businessStage: "Prototipo",
    organizations: [],
    roadmap: []
};

let state = {};

function handleGetRequests(path) {
    if(path == 'profile') {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var data = userProfile;
                    resolve(data);
                }, 1000);
            });
        }
    }
    else if(path.startsWith("organizations?")) {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var temp = path.replace("organizations?","");
                    var elems = temp.split("&");
                    var type = elems[0].replace("type=","");
                    var stage = elems[1].replace("stage=","");
                    var data = organizations;
                    if(type && type.length>0) {
                        data = data.filter(org => org.businessType == type);
                    }
                    if(stage && stage.length>0) {
                        data = data.filter(org => org.businessStage == stage);
                    }
                    resolve(data);
                }, 3000);
            });
        }
    }
    else if (path == 'quiz/result') {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(state.quizResult);
                }, 10);
            });
        }
    }
}

function handlePostRequests(path, content) {
    if(path == 'login') {
        if(content.email == logInUserProfile.email && content.password == logInUserProfile.password) {
            userProfile.firstName = logInUserProfile.firstName;
            userProfile.lastName = logInUserProfile.lastName;
            userProfile.email = logInUserProfile.email;
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var data = userProfile;
                    localStorage.setItem('token', data.accessToken);
                    resolve(data);

                }, 1000);
            });
        }
        else {
            return new Promise(function(){
                throw new ApiException("Email/password was incorrect.");
            });
        }
    }
    else if (path == 'register') {
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                userProfile.firstName = content.firstName;
                userProfile.lastName = content.lastName;
                userProfile.password = content.password;
                userProfile.email = content.email;
                userProfile.phone = content.phone;
                var data = userProfile;
                localStorage.setItem('token', data.accessToken);
                resolve(data);
            }, 1000);
        });
    }
    else if (path == 'quiz/submit') {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            state.quizSubmitted = content;
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    state.quizResults = {
                        firstName: userProfile.firstName,
                        email: userProfile.email,
                        phone: userProfile.phone,
                        businessStage: userProfile.businessStage,
                        businessType: "Microempresa",
                        organizations: [
                            createOrganizationsData('Organización 1', "787 987 6656", "asdf@goog.com", "Prototipo", "Microempresa"),
                            createOrganizationsData('Organización 2', "787 987 6656", "asdf@goog.com", "Prototipo", "Microempresa"),
                            createOrganizationsData('Organización 3', "787 987 6656", "asdf@goog.com", "Prototipo", "Microempresa"),
                        ],
                        roadmap: []
                    }
                    resolve(state.quizResults);
                }, 1000);
            });
        }
    }
    else if (path == 'quiz/save') {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    userProfile.businessType = state.quizResults.businessType;
                    userProfile.organizations = state.quizResults.organizations;
                    userProfile.roadmap = state.quizResults.roadmap;
                    state.quizResults = null;
                    resolve("All good");
                }, 1000);
            });
        }
    }
}

function handlePutRequests(path, content) {
    if (path == 'profile/update') {
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                userProfile.firstName = content.firstName;
                userProfile.lastName = content.lastName;
                userProfile.password = content.password;
                userProfile.email = content.email;
                var data = userProfile;
                resolve(data);
            }, 1000);
        });
    }
}

const apiService = {
    initialize: (config) =>{
        //if(config && config.BaseApiUrl) {
        //    settings.BaseApiUrl = config.BaseApiUrl;
        //}
        //TODO: Initialize anything needed
    },
    getRequest: (path) => {
        return handleGetRequests(path);
    },
    postRequest: (path, content) => {
        return handlePostRequests(path, content);
    },
    putRequest: (path, content) => {
        return handlePutRequests(path, content);
    },
    setAccessToken: (accessToken) => {
        state.accessToken = accessToken;
    },
    isAuthenticated: () => {
        return localStorage.getItem('token');
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    saveQuiz: (quiz) => {
        state.quiz = quiz;
    },
    getQuiz: () => {
      return state.quiz;  
    },
    profile: () => {
        return userProfile;
    }
};

export default apiService;