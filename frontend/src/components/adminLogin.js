import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from './loading'
import Alert from './alert'
import '../index.css';
import apiService from "./mockApiService";
//import apiService from "./apiService";

function AdminLogin() {
    //State Variables getters & setters
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    //email validation helper function
    function isValidEmail(email) {
        if(email && email.length == 0) {
            return true;
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //password validation helper function
    function isValidPass(text) {
        if(text && text.length == 0) {
            return true;
        }
        return text.length > 6
    }

    //email change event callback
    const handleEmailChange = (event) => {
        setEmail(event.target.value.toLowerCase());
        setValidEmail((isValidEmail(email)));
    };

    //password change event callback
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setValidPassword((isValidPass(password)));
    };

    //alert button click event callback
    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    //login button click event callback
    const handleLoginClick = () => {
        //Show Loading
        setShowLoading(true);

        //Perform admin login request
        apiService.postRequest("admin/login", { email: email, password: password }).then(response => {
            //Handle admin login
            apiService.adminProfile(response);
            setShowLoading(false);
            window.location.href = "/admin/organizaciones";
        }).catch(err =>{
            //Handle error
            setShowLoading(false);
            setErrorMessage(err.response.data);
            setShowErrorAlert(true);
        });
    };

    return(
        apiService.isAdminAuthenticated() ? 
        //If authenticated go to home page
        <Redirect to="/adminorgs" /> :

        //Show login view
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation={10}> 
                <h2>Portal de Administradores</h2>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Correo Electrónico:"
                        error={!validEmail}
                        //errorText="Correo electrónico inválido"
                        onChange={handleEmailChange}
                        value={email} />
                </div>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                          }}  
                        className="form-control"
                        type="password"
                        label="Contraseña:"
                        //error={!validPassword}
                        //helperText="Contraseña inválido"
                        onChange={handlePasswordChange}
                        value={password} />
                </div>
                <div>
                    <Button
                        className="form-control"
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleLoginClick}
                        //disabled= {!validEmail || !validPassword || !email.length>0 || !password.length>0}
                        disabled= {!validEmail || !email.length>0 || !password.length>0}
                        style={{ margin: '16px' }}>
                            Iniciar Sesión
                    </Button>
                </div>
            </Paper>
            <Alert
                isOpen={showErrorAlert}
                handleSubmit={onAlertClick}
                title="Error"
                text={errorMessage}
                submitButtonText="Ok" />
            <Spinner isShown={showLoading} />
        </div>
    );
}
export default AdminLogin;