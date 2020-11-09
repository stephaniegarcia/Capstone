function ApiException(message) {
    this.response = { data: message };
}

function ApiResponse(data) {
    this.response = { data: data };
}
function isAuthenticated () {
    return localStorage.getItem('token');
}
    
function createOrganizationsData(id, name, phone, email, businessStage, businessType, rating, checked) {
    return {
      id,
      name,
      phone,
      email,
      businessStage,
      businessType,
      moreInfo: [
        { description: 'Proveen financiamiento alternativo a empresas medianas en Puerto Rico y Mexico. Proporcionan soluciones financieras para potenciar el crecimiento de tu negocio. Trabajan transacciones de $500K USD a $5 millones USD, pero son flexibles. ',
            },
      ],
      open: false,
      rating,
      checked
    };
}

const organizations = [
    createOrganizationsData(1, 'Organización 1', "787 987 6656", "asdf@goog.com", "Idea", "Microempresa", 0, false),
    createOrganizationsData(2, 'Organización 2', "787 987 6656", "asdf@goog.com", "Prototipo", "Comerciante", 0, false),
    createOrganizationsData(3, 'Organización 3', "787 987 6656", "asdf@goog.com", "Expansión", "Empresa Basada en Innovación", 0, false),
    createOrganizationsData(4, 'Organización 4', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Empresa en Crecimiento", 0, false),
    createOrganizationsData(5, 'Organización 5', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Acceso a Capital", 0, false)
];

const quiz= [
    {
      question: "¿Comenzaste un negocio en tu área de expertise o talento como por ejemplo, consultoría, diseño o jardinería?",
      options: ["Si", "No"],
    },{
      question: "¿Comenzaste un negocio para tener un ingreso personal adicional?",
      options: ["Si", "No"],
    },{
      question: "¿Trabajas por tu cuenta, por servicios profesionales o tienes una tienda online?",
      options: ["Si", "No"],
    },{
      question: "¿Tienes un local físico? ¿Como por ejemplo una tienda, restaurante, colmado, cafetería o boutique?",
      options: ["Si", "No"],
    },{
      question: "¿Cuentas con empleados que te ayudan a operar el negocio?",
      options: ["Si", "No"],
    }
]

const logInUserProfile = { firstName: "John", lastName: "Doe", email: "demo@demo.com", password: "123pescao"}; //credentials for login
let userProfile = { //changes to from register
    firstName: "John",
    lastName: "Doe",
    email: "demo@demo.com",
    phone: '939 460 2020',
    password: "123pescao",
    accessToken: "testAccessToken",
    businessType: "",
    businessStatus: true,
    requiredAssistance: 'Mentoria',
    businessStage: "Lanzamiento",
    organizations: [],
    roadmap: []
};

let state = {};

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
                    userProfile = getUserProfile();
                    resolve(userProfile);
                }, 1000);
            });
        }
    }
    else if(path == 'quiz') {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(quiz);
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
            setUserProfile(userProfile);
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
                userProfile.businessStage = content.businessStage;
                userProfile.businessStatus = content.businessStatus;
                userProfile.requiredAssistance = content.requiredAssistance;
                setUserProfile(userProfile);
                localStorage.setItem('token', userProfile.accessToken);
                resolve(userProfile);
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
                    userProfile = getUserProfile();
                    state.quizResults = {
                        firstName: userProfile.firstName,
                        email: userProfile.email,
                        phone: userProfile.phone,
                        businessStage: userProfile.businessStage,
                        businessType: "Microempresa",
                        organizations: [
                            createOrganizationsData(7, 'Organización 1', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 5, true),
                            createOrganizationsData(8, 'Organización 2', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 3, true),
                            createOrganizationsData(9, 'Organización 3', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 0, false),
                        ],
                        roadmap: [
                            {name:"Entrada al Mercado", organizations: ["Organización 1", "Organización 2", "Organización 3"]},
                            {name:"Capital Para Entrada al Mercado", organizations: ["Organización 4", "Organización 5", "Organización 6"]},
                            {name:"Coworking", organizations: ["Organización 7", "Organización 8", "Organización 9"]},
                            {name:"Incubación", organizations: ["Organización 10", "Organización 11", "Organización 12"]},
                        ]
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
                    userProfile = getUserProfile();
                    userProfile.businessType = state.quizResults.businessType;
                    userProfile.organizations = state.quizResults.organizations;
                    userProfile.roadmap = state.quizResults.roadmap;
                    setUserProfile(userProfile);
                    state.quizResults = null;
                    resolve("All good");
                }, 1000);
            });
        }
    }
    else if(path == "organization/tracking"){
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    userProfile = getUserProfile();
                    for(var i = 0; i < userProfile.organizations.length; i++) {
                        if(userProfile.organizations[i].id == content.organizationId) {
                            userProfile.organizations[i].checked = content.checked;
                        }
                    }
                    setUserProfile(userProfile);
                    resolve("All good");
                }, 1000);
            });
        }
    }
    else if (path == 'organization/rating') {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    userProfile = getUserProfile();
                    for(var i = 0; i < userProfile.organizations.length; i++) {
                        if(userProfile.organizations[i].id == content.organizationId) {
                            userProfile.organizations[i].rating = content.rating;
                        }
                    }
                    setUserProfile(userProfile);
                    resolve("All good");
                }, 1000);
            });
        }
    }
}

function handlePutRequests(path, content) {
    if (path == 'profile/update') {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                userProfile = getUserProfile();
                userProfile.firstName = content.firstName;
                userProfile.lastName = content.lastName;
                userProfile.email = content.email;
                userProfile.phone = content.phone;
                userProfile.businessStage = content.businessStage;
                userProfile.businessStatus = content.businessStatus;
                userProfile.requiredAssistance = content.requiredAssistance;
                setUserProfile(userProfile);
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
        var isAuthenticated = localStorage.getItem('token') != null
        return isAuthenticated;
    },
    logout: () => {
        localStorage.removeItem('token');
        setUserProfile(null);
    },
    saveQuiz: (quiz) => {
        state.quiz = quiz;
    },
    getQuiz: () => {
      return state.quiz;  
    },
    profile: () => {
        return getUserProfile();
    }
};

export default apiService;