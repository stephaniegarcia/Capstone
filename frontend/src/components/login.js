import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from './loading'
import Alert from './alert'
import '../index.css';
import apiService from "./mockApiService";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    //email validation
    function isValidEmail(email) {
        if(email && email.length == 0) {
            return true;
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    //password validation
    function isValidPass(text) {
        if(text && text.length == 0) {
            return true;
        }
        return text.length > 6
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value.toLowerCase());
        setValidEmail((isValidEmail(email)));
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setValidPassword((isValidPass(password)));
    };

    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    const handleLoginClick = () => {
        setShowLoading(true);
        apiService.postRequest("login", { email: email, password: password }).then(response => {
            apiService.setAccessToken(response.accessToken);
            setShowLoading(false);
            window.location.href = "/";
        }).catch(err =>{
            setShowLoading(false);
            setErrorMessage(err.response.data);
            setShowErrorAlert(true);
        });
    };

    return(
        apiService.isAuthenticated() ? <Redirect to="/" /> :
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation="10"> 
                <h2>Entra tus credenciales para acceder a tu perfil</h2>
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
                <br/>
                <Button
                    href="/forgotPassword"
                    color="inherit"
                    className="form-control">
                        Reset Password
                </Button>
                <p>Nuevo Usuario? </p>
                <Button
                    className="form-control"
                    type="submit"
                    variant="contained"
                    color="primary"
                    href="/register"
                    style={{ margin: '16px' }}>
                    Regístrate!
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