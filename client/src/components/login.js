import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from './loading'
import Alert from './alert'
import '../index.css';
//import apiService from "./mockApiService";
import apiService from "./apiService";

function Login() {
    //State Variables getters & setters
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    //email validation helper function
    //@param email - user email
    //@return if it's valid or not
    function isValidEmail(email) {
        if(email && email.length == 0) {
            return true;
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //password validation helper function
    //@param text - user password
    //@return if it's valid or not
    function isValidPass(text) {
        if(text && text.length == 0) {
            return true;
        }
        const re = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#$%&*+,-./:<=>?@^_`{|}~])[a-zA-Z0-9 !#$%&*+,-./:<=>?@^_`{|}~]{8,64}$/;
        return re.test(text);
    }
    
    //Event Handlers 

    //Enter key event callback
    const onEnterPress = (event, inputName) => {
        if (event.key === 'Enter' || event.keyCode == 13) {
            if(inputName == 'email') {
                const nextSibling = document.querySelector('input[name=pass]');
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
            else if(inputName == 'pass') {
                handleLoginClick();
            }
        }
    };

    //email change event callback
    const handleEmailChange = (event) => {
        setEmail(event.target.value.toLowerCase());
        setValidEmail((isValidEmail(event.target.value.toLowerCase())));
    };

    //password change event callback
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setValidPassword((isValidPass(event.target.value)));
    };

    //alert button click event callback
    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    //login button click event callback
    const handleLoginClick = () => {
        if(!validEmail || !email.length>0 || !password.length>0) {
            setErrorMessage('Valide la información antes de continuar');
            setShowErrorAlert(true);
            return;
        }

        //Show Loading
        setShowLoading(true);

        //Perform login request
        apiService.postRequest("login", { email: email, password: password }).then(loginResponse => {
            //Handle login
            if(loginResponse.data.Match) {
                apiService.getRequest("user/"+loginResponse.data.user_id).then(response => {
                    //Handle user profile get
                    if(!response.data[0].is_verified) {
                        setShowLoading(false);
                        setErrorMessage('Verifique su cuenta antes de iniciar sesión');
                        setShowErrorAlert(true);
                    }
                    else {
                        apiService.profile(response.data[0]);
                        setShowLoading(false);
                        if(response.data[0].bt_id && response.data[0].bt_id > 0) {
                            window.location.href = "/userprofile";    
                        }
                        else {
                            window.location.href = "/tce";
                        }   
                    }
                }).catch(err =>{
                    //Handle error
                    setShowLoading(false);
                    setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
                    setShowErrorAlert(true);
                });
            }
            else {
                setShowLoading(false);
                setErrorMessage('Credenciales no válidas');
                setShowErrorAlert(true);
            }
        }).catch(err =>{
            //Handle error
            setShowLoading(false);
            setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
            setShowErrorAlert(true);
        });
    };

    return(
        apiService.isAuthenticated() ? 
        //If authenticated go to home page
        <Redirect to="/" /> :

        //Show login view
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation={10}> 
                <h1>Entra tus credenciales para acceder a tu perfil</h1>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Correo Electrónico:"
                        name="email"
                        error={!validEmail}
                        helperText={!validEmail ? "Correo electrónico inválido" : ""}
                        onKeyDown={(e)=>{ onEnterPress(e, 'email'); }}
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
                        name="pass"
                        label="Contraseña:"
                        onKeyDown={(e)=>{ onEnterPress(e, 'pass'); }}
                        // error={!validPassword}
                        // helperText={!validPassword ? "Contraseña inválido" : ""}
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
                        disabled= {!validEmail || !email.length>0 || !password.length>0}
                        style={{ margin: '16px' }}>
                            Iniciar Sesión
                    </Button>
                </div>
                <br/>
                <Button
                    href="/forgotPassword"
                    color="primary"
                    variant="contained"
                    className="form-control secondary-button">
                        Restablecer la contraseña
                </Button>
                <p>¿Eres un Usuario Nuevo? </p>
                <Button
                    className="form-control"
                    type="submit"
                    variant="contained"
                    color="primary"
                    href="/register"
                    style={{ margin: '16px' }}>
                    ¡Regístrate!
                </Button>
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
export default Login;