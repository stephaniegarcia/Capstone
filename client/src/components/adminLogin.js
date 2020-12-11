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

function AdminLogin() {
    //State Variables getters & setters
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    //Email validation helper function
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
        if(!validEmail || !email.length>0 || !password.length>0) {
            setErrorMessage('Valide la información antes de continuar');
            setShowErrorAlert(true);
            return;
        }
        
        //Show Loading
        setShowLoading(true);

        //Perform admin login request
        apiService.postRequest("admin", { email: email, password: password }).then(loginResponse => {
            //Handle login
            if(loginResponse.data && loginResponse.data) {
                if(loginResponse.data.Match) {
                    apiService.adminProfile(loginResponse.data);
                    setShowLoading(false);
                    window.location.href = "/admin/organizaciones";
                }
                else {
                    setShowLoading(false);
                    setErrorMessage('Credenciales incorrectas');
                    setShowErrorAlert(true);        
                }
            }
            else {
                setShowLoading(false);
                setErrorMessage('Credenciales incorrectas');
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
        apiService.isAdminAuthenticated() ? 
        //If authenticated go to home page
        <Redirect to="/adminorgs" /> :

        //Show login view
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation={10}> 
                <h1>Portal de Administradores</h1>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Correo Electrónico:"
                        name="email"
                        onKeyDown={(e)=>{onEnterPress(e,"email")}}
                        error={!validEmail}
                        helperText={!validEmail ? "Correo electrónico inválido" : ""}
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
                        name="pass"
                        onKeyDown={(e)=>{onEnterPress(e,"pass")}}
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
                        //disabled= {!validEmail || !validPassword || !email.length>0 || !password.length>0}
                        disabled= {!validEmail || !email.length>0 || !password.length>0}
                        style={{ margin: '16px' }}>
                            Iniciar Sesión
                    </Button>
                </div>
                <br/>
                <Button
                    href="/adminforgotPassword"
                    color="primary"
                    variant="contained"
                    className="form-control secondary-button">
                        Restablecer la contraseña
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
export default AdminLogin;