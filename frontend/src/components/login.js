import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from './loading'
import Alert from './alert'
import apiService from "./mockApiService";


function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [showLoading, setShowLoading] = useState(false);

    function isValidEmail(email) {
        if(email && email.length == 0) {
            return true;
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

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
            //history.push("/");
            window.location.href = "/";
        }).catch(err =>{
            setShowLoading(false);
            setErrorMessage(err.response.data);
            setShowErrorAlert(true);
        });
    };

    return(
        apiService.isAuthenticated() ? <Redirect to="/" /> :
        <div>
            <Paper className="form form--wrapper" elevation={10}>
                <div style={{'padding-top': '50px'}}></div>
                <h1>Login</h1>
                <div style={{'padding-top': '50px'}}></div>
                <div>
                    <TextField
                        label="Correo Electrónico:"
                        error={!validEmail}
                        //errorText="Correo electrónico inválido"
                        onChange={handleEmailChange}
                        value={email} />
                </div>
                <div>
                    <TextField
                        type="password"
                        label="Contraseña:"
                        //error={!validPassword}
                        //helperText="Contraseña inválido"
                        onChange={handlePasswordChange}
                        value={password} />
                </div>
                <div>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleLoginClick}
                    //disabled= {!validEmail || !validPassword || !email.length>0 || !password.length>0}
                    disabled= {!validEmail || !email.length>0 || !password.length>0}
                    style={{ margin: '16px' }}
                    >
                        Login
                    </Button>
                    <br/>
                    <Button href="/passwordReset" color="inherit" >Reset Password</Button>
                </div>
                <div>
                    <p>Or</p>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    href="/register"
                    style={{ margin: '16px' }}
                    >
                        Register
                    </Button>
                </div>
            </Paper>
            <Alert
                isOpen={showErrorAlert}
                handleSubmit={onAlertClick}
                title="Error"
                text={errorMessage}
                submitButtonText="Ok"
            />
            <Spinner isShown={showLoading} />
        </div>
    );
}
export default Login;