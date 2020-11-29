function ApiException(message) {
    this.response = { data: message };
}

function ApiResponse(data) {
    this.response = { data: data };
}
function isAuthenticated () {
    return localStorage.getItem('col-profile') != null;
}
function isAdminAuthenticated () {
    return localStorage.getItem('col-admin-profile') != null;
}
    
function createOrganizationsData(id, name, phone, email, businessStage, businessType, rating, checked) {
    return {
      id,
      name: name,
      phone,
      email,
      bs_id: businessStage,
      bt_id: businessType,
      description: 'Proveen financiamiento alternativo a empresas medianas en Puerto Rico y Mexico. Proporcionan soluciones financieras para potenciar el crecimiento de tu negocio. Trabajan transacciones de $500K USD a $5 millones USD, pero son flexibles.',
      open: false,
      rating,
      checked,
      link: 'https://www/google.com'
    };
}

const mostContacted = [
    {
      name: "Los gapos",
      total: 30  
    },
    {
      name: "Tempis",
      total: 25
    },
    {
      name: "Places787",
      total: 22
    }
  ];

const poorPerforming = 
[
    {
        "name": [
            "JunX",
            "SSS",
            "MMM",
            "Logitech",
            "Infox",
            "JacksonX",
            "Los gapos",
            "Places787",
            "Tempis",
            "OneX",
            "Bravos Cidra",
            "Mulos",
            "Pentatonix",
            "Bulldogs"
        ]
    }
]

const topPerStage =
[
    {
        "stage": "Idea/Concepto",
        "names": [
            "JunX",
            "SSS",
            "MMM",
            "Logitech",
            "Infox",
            "JacksonX",
            "Los gapos",
            "Places787",
            "Tempis",
            "OneX"
        ]
    },
    {
        "stage": "Prueba de Concepto",
        "names": [
            "Bravos Cidra",
            "Mulos",
            "Pentatonix",
            "Bulldogs",
            "Infox",
            "JacksonX",
            "Los gapos",
            "Places787",
            "Tempis",
            "OneX"
        ]
    },
    {
        "stage": "Prototipo",
        "names": [
            "Cayeyanos",
            "Lolas",
            "Chiviri",
            "5 de Maya",
            "Cabra tosta",
            "Centenaria",
            "Bamba",
            "EXP",
            "TEMPO",
            "Chronome"
        ]
    },
    {
        "stage": "Lanzamiento",
        "names": [
            "Spooky",
            "Skreetch",
            "Rick",
            "E=MC",
            "SNEEK",
            "JJ COOling style",
            "Zombie",
            "Wind",
            "Tempis",
            "U"
        ]
    },
    {
        "stage": "Crecimiento",
        "names": [
            "Spooky",
            "Skreetch",
            "Rick",
            "E=MC",
            "SNEEK",
            "JJ COOling style",
            "Zombie",
            "Wind",
            "Tempis",
            "U"
        ]
    },
    {
        "stage": "Expansión",
        "names": [
            "JunX",
            "SSS",
            "MMM",
            "Logitech",
            "Infox",
            "JacksonX",
            "Los gapos",
            "Places787",
            "Tempis",
            "OneX"
        ]
    }
]

const topPerType = 
[
    {
        "type": "microempresas",
        "name": [
            "JunX",
            "SSS",
            "MMM",
            "Logitech",
            "Infox",
            "JacksonX",
            "Los gapos",
            "Places787",
            "Tempis",
            "OneX"
        ]
    },
    {
        "type": "comercial",
        "name": [
            "Bravos Cidra",
            "Mulos",
            "Pentatonix",
            "Bulldogs",
            "Infox",
            "JacksonX",
            "Los gapos",
            "Places787",
            "Tempis",
            "OneX"
        ]
    },
    {
        "type": "Empresa basada en inovacion",
        "name": [
            "Cayeyanos",
            "Lolas",
            "Chiviri",
            "5 de Maya",
            "Cabra tosta",
            "Centenaria",
            "Bamba",
            "EXP",
            "TEMPO",
            "Chronome"
        ]
    },
    {
        "type": "Empresa en crecimiento",
        "name": [
            "Spooky",
            "Skreetch",
            "Rick",
            "E=MC",
            "SNEEK",
            "JJ COOling style",
            "Zombie",
            "Wind",
            "Tempis",
            "U"
        ]
    }
]

const accountsPerWeek = 
[
    {
        "week": "week 1",
        "count": "2"
    },
    {
        "week": "week 2",
        "count": "5"
    },
    {
        "week": "week 3",
        "count": "10"
    },
    {
        "week": "week 4",
        "count": "0"
    }
]

const organizations = [
    createOrganizationsData(1, 'Organización 1', "787 987 6656", "asdf@goog.com", "Idea", "Microempresa", 0, false),
    createOrganizationsData(2, 'Organización 2', "787 987 6656", "asdf@goog.com", "Prototipo", "Comerciante", 0, false),
    createOrganizationsData(3, 'Organización 3', "787 987 6656", "asdf@goog.com", "Expansión", "Empresa Basada en Innovación", 0, false),
    createOrganizationsData(4, 'Organización 4', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Empresa en Crecimiento", 0, false),
    createOrganizationsData(5, 'Organización 5', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Acceso a Capital", 0, false)
];

const quiz= [
    {
        question_id: 1,
      description: "¿Comenzaste un negocio en tu área de expertise o talento como por ejemplo, consultoría, diseño o jardinería?",
    },{
        question_id: 2,
        description: "¿Comenzaste un negocio para tener un ingreso personal adicional?",
    },{
        question_id: 3,
        description: "¿Trabajas por tu cuenta, por servicios profesionales o tienes una tienda online?",
    },{
        question_id: 4,
        description: "¿Tienes un local físico? ¿Como por ejemplo una tienda, restaurante, colmado, cafetería o boutique?",
    },{
        question_id: 5,
        description: "¿Cuentas con empleados que te ayudan a operar el negocio?"
    }
]

const logInUserProfile = { first_name: "John", last_name: "Doe", email: "demo@demo.com", password: "123pescao"}; //credentials for login
let userProfile = { //changes to from register
    id: "userid",
    first_name: "John",
    last_name: "Doe",
    email: "demo@demo.com",
    phone: '939 460 2020',
    password: "123pescao",
    accessToken: "testAccessToken",
    bt_id: "",
    bs_id: "Lanzamiento",
    requiredAssistance: 'Mentoria',
    business_status: true,
    organizations: [],
    roadmap: []
};

let state = {};

function getUserProfile() {
    var adminProfile = getAdminProfile();
    if(adminProfile) {
        return adminProfile;
    }
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

function handleGetRequests(path, content) {
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
    else if (path == 'tce/roadmap/organizations') {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var data = [
                            createOrganizationsData(7, 'Organización 1', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 5, true),
                            createOrganizationsData(8, 'Organización 2', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 3, true),
                            createOrganizationsData(9, 'Organización 3', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 0, false),
                        ];
                    resolve(data);
                }, 1000);
            });
        }
    }
    else if (path == 'tce/user/'+userProfile.id+'/organizations') {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    userProfile = getUserProfile();
                    resolve(userProfile.organizations);
                }, 1000);
            });
        }
    }
    else if (path == 'user/'+userProfile.id) {
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
    else if (path == 'tce/businesstype/'+userProfile.id) {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    userProfile = getUserProfile();
                    resolve(userProfile.bt_id);
                }, 1000);
            });
        }
    }
    else if(path == 'tce/questions') {
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
    else if (path == 'admin/organizations') {
        if(!isAdminAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var data = organizations;
                    resolve(data);
                }, 3000);
            });
        }
    }
    else if(path == "organizations") {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var data = organizations;
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
    else if (path == "admin/accountsPerWeek") {
        if(!isAdminAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("admin is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(accountsPerWeek);
                }, 10);
            });
        }
    }
    else if (path == "admin/organizations/poorperforming") {
        if(!isAdminAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("admin is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(poorPerforming);
                }, 10);
            });
        }
    }
    else if (path == "admin/organizations/topPerStage") {
        if(!isAdminAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("admin is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(topPerStage);
                }, 10);
            });
        }
    }
    else if (path == "admin/organizations/topPerType") {
        if(!isAdminAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("admin is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(topPerType);
                }, 10);
            });
        }
    }
    else if (path == "admin/organizations/mostContacted") {
        if(!isAdminAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("admin is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(mostContacted);
                }, 10);
            });
        }
    }
    
}

function handlePostRequests(path, content) {
    if(path == 'admin/changePassword') {
        if(content) {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(true);
                }, 1000);
            });
        }
        else {
            return new Promise(function(){
                throw new ApiException("Email/password was incorrect.");
            });
        }
    }
    else if(path == 'user/changePassword') {
        if(content) {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve(true);
                }, 1000);
            });
        }
        else {
            return new Promise(function(){
                throw new ApiException("Email/password was incorrect.");
            });
        }
    }
    else if(path == 'login') {
        if(content.email == logInUserProfile.email && content.password == logInUserProfile.password) {
            userProfile.first_name = logInUserProfile.first_name;
            userProfile.last_name = logInUserProfile.last_name;
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
    else if(path == 'admin/login') {
        if(content.email == logInUserProfile.email && content.password == logInUserProfile.password) {
            userProfile.first_name = logInUserProfile.first_name;
            userProfile.last_name = logInUserProfile.last_name;
            userProfile.email = logInUserProfile.email;
            setAdminProfile(userProfile);
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var data = userProfile;
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
                userProfile.first_name = content.first_name;
                userProfile.last_name = content.last_name;
                userProfile.password = content.password;
                userProfile.email = content.email;
                userProfile.phone = content.phone;
                userProfile.bs_id = content.bs_id;
                userProfile.business_status = String(content.business_status).toLowerCase() == 'true';
                userProfile.requiredAssistance = content.requiredAssistance;
                setUserProfile(userProfile);
                localStorage.setItem('token', userProfile.accessToken);
                resolve(userProfile);
            }, 1000);
        });
    }
    else if (path == 'tce/answers/'+userProfile.id) {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            state.quizSubmitted = content;
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    // userProfile = getUserProfile();
                    // state.quizResults = {
                    //     first_name: userProfile.first_name,
                    //     email: userProfile.email,
                    //     phone: userProfile.phone,
                    //     bs_id: userProfile.bs_id,
                    //     bt_id: "Microempresa",
                    //     organizations: [
                    //         createOrganizationsData(7, 'Organización 1', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 5, true),
                    //         createOrganizationsData(8, 'Organización 2', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 3, true),
                    //         createOrganizationsData(9, 'Organización 3', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa", 0, false),
                    //     ],
                    //     roadmap: [
                    //         {name:"Entrada al Mercado", organizations: ["Organización 1", "Organización 2", "Organización 3"]},
                    //         {name:"Capital Para Entrada al Mercado", organizations: ["Organización 4", "Organización 5", "Organización 6"]},
                    //         {name:"Coworking", organizations: ["Organización 7", "Organización 8", "Organización 9"]},
                    //         {name:"Incubación", organizations: ["Organización 10", "Organización 11", "Organización 12"]},
                    //     ]
                    // }
                    resolve("Microempresa");
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
                    userProfile.bt_id = state.quizResults.bt_id;
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
    else if (path.startsWith('tce/organization/') && path.endsWith('/check')) {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var id = path.replace('tce/organization/', '').replace('/user/'+userProfile.id+'/check')
                    userProfile = getUserProfile();
                    for(var i = 0; i < userProfile.organizations.length; i++) {
                        if(userProfile.organizations[i].id == id) {
                            userProfile.organizations[i].check = content;
                        }
                    }
                    setUserProfile(userProfile);
                    resolve("All good");
                }, 1000);
            });
        }
    }
    else if (path.startsWith('tce/organization/') && path.endsWith('/rating')) {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var id = path.replace('tce/organization/', '').replace('/user/'+userProfile.id+'/rating')
                    userProfile = getUserProfile();
                    for(var i = 0; i < userProfile.organizations.length; i++) {
                        if(userProfile.organizations[i].id == id) {
                            userProfile.organizations[i].rating = content;
                        }
                    }
                    setUserProfile(userProfile);
                    resolve("All good");
                }, 1000);
            });
        }
    }
    else if (path.startsWith('tce/organization/') && path.endsWith('/comment')) {
        if(!isAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var id = path.replace('tce/organization/', '').replace('/user/'+userProfile.id+'/comment')
                    userProfile = getUserProfile();
                    for(var i = 0; i < userProfile.organizations.length; i++) {
                        if(userProfile.organizations[i].id == id) {
                            userProfile.organizations[i].comments = content;
                        }
                    }
                    setUserProfile(userProfile);
                    resolve("All good");
                }, 1000);
            });
        }
    }
    else if (path == 'admin/organization') {
        if(!isAdminAuthenticated()) {
            return new Promise(function(){
                throw new ApiException("user is not logged in.");
            });
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(function() {
                    organizations.push({
                        id: organizations.length+1,
                        name: content.name,
                        phone: content.phone,
                        email: content.email,
                        bs_id: content.bs_id,
                        bt_id: content.bt_id,
                        description: content.description,
                        open: false,
                        link:content.link
                    });
                }, 3000);
            });
        }
    }
}

function handlePutRequests(path, content) {
    if (path == 'user/'+getUserProfile().id) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                userProfile = getUserProfile();
                userProfile.first_name = content.first_name;
                userProfile.lastName = content.lastName;
                userProfile.email = content.email;
                userProfile.phone = content.phone;
                userProfile.bs_id = content.bs_id;
                userProfile.business_status = String(content.business_status).toLowerCase() == 'true';
                userProfile.requiredAssistance = content.requiredAssistance;
                setUserProfile(userProfile);
                var data = userProfile;
                resolve(data);
            }, 1000);
        });
    }
    else if (path.startsWith("admin/organization/")) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                var id = path.replace("admin/organization/","");
                for(var i = 0; i < organizations.length; i++) {
                    if(organizations[i].id == id) {
                        organizations[i].name = content.name;
                        organizations[i].email = content.email;
                        organizations[i].phone = content.phone;
                        organizations[i].bs_id = content.bs_id;
                        organizations[i].bt_id = content.bt_id;
                        organizations[i].description = content.description;
                        organizations[i].link = content.link;
                    }
                }
                resolve(organizations);
            }, 1000);
        });
    }
}

function handleDeleteRequests(path, content) {
    if (path.startsWith("admin/organization/")) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                var id = path.replace("admin/organization/","");
                for(var i = 0; i < organizations.length; i++) {
                    if(organizations[i].id == id) {
                        organizations.splice(i, 1);
                    }
                }
                resolve(organizations);
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
    getRequest: (path, content) => {
        return handleGetRequests(path, content);
    },
    postRequest: (path, content) => {
        return handlePostRequests(path, content);
    },
    putRequest: (path, content) => {
        return handlePutRequests(path, content);
    },
    deleteRequest: (path, content) => {
        return handleDeleteRequests(path, content);
    },
    // setAccessToken: (accessToken) => {
    //     state.accessToken = accessToken;
    // },
    isAuthenticated: () => {
        var isAuthenticated = localStorage.getItem('token') != null
        return isAuthenticated;
    },
    logout: () => {
        localStorage.removeItem('token');
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
    profile: () => {
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