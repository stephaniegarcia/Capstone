function ApiException(message) {
    this.response = { data: message };
}

function ApiResponse(data) {
    this.response = { data: data };
}
function   isAuthenticated () {
        return localStorage.getItem('token');
    }
    
function createOrganizationsData(name, phone, email, bussinessStage, bussinessType) {
    return {
      name,
      phone,
      email,
      bussinessStage,
      bussinessType,
      moreInfo: [
        { description: 'Proveen financiamiento alternativo a empresas medianas en Puerto Rico y Mexico. Proporcionan soluciones financieras para potenciar el crecimiento de tu negocio. Trabajan transacciones de $500K USD a $5 millones USD, pero son flexibles. ',
            },
      ],
    };
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
                    var data = { firstName: "John", lastName: "Doe", email: "demo@demo.com" };
                    resolve(data);
                }, 1000);
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
                    var data = [createOrganizationsData('Organización 1', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa"),
                    createOrganizationsData('Organización 3', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa")];
                    resolve(data);
                }, 20);
            });
        }
    }
}

let state = {};

function handlePostRequests(path, content) {
    if(path == 'login') {
        if(content.email == 'demo@demo.com' && content.password == '123pescao') {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var data = { firstName: "John", lastName: "Doe", accessToken: "testAccessToken" };
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
        if(content.email == 'demo@demo.com' && content.password == '123pescao') {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    var data = { firstName: content.firstName, accessToken: "testAccessToken" };
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
}

function handlePutRequests(path, content) {

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
    }
};

export default apiService;