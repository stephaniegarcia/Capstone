import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select';
import Spinner from './loading'
import Alert from './alert'
import apiService from "./mockApiService";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [businessStage, setBusinessStage] = useState('Idea');
    const [businessStatus, setBusinessStatus] = useState('true');
    const [requiredAssistance, setRequiredAssistance] = useState('Ninguna');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [validFirstName, setValidFirstName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validPhone, setValidPhone] = useState(true);

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
        return text.length > 5
    }
    
      function isValidPhone(phone) {
        const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        return re.test(String(phone));
      }
      function isValidName(text) {
        const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        return text.length >= 2 && re.test(String(text))
      }
      
      const handleFirstNameChange = (event) => {
        setFirstName(event.target.value.trim());
        setValidFirstName((isValidName(event.target.value.trim())));
      };
      const handleLastNameChange = (event) => {
        setLastName(event.target.value.trim());
        setValidLastName((isValidName(event.target.value.trim())));
      };
      const handlePhoneChange = (event) => {
        setPhone(event.target.value.trim());
        setValidPhone((isValidPhone(event.target.value.trim())));
      };
      const handleBusinessStageChange = (event) => {
        setBusinessStage(event.target.value);
      };
      const handleBusinessStatusChange = (event) => {
        setBusinessStatus(event.target.value);
      };
      const handleRequiredAssistanceChange = (event) => {
        setRequiredAssistance(event.target.value);
      };

    const handleEmailChange = (event) => {
        setEmail(event.target.value.toLowerCase().trim());
        setValidEmail((isValidEmail(email)));
    };
    const handlePasswordChange = (event) => {
        setValidPassword((isValidPass(event.target.value)));
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setValidConfirmPassword((isValidPass(event.target.value) && event.target.value == password));
        setConfirmPassword(event.target.value);
    };
    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    const handleRegisterClick = () => {
        setShowLoading(true);
        var data = {
            email: email, 
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            businessStatus: String(businessStatus).toLowerCase() == 'true',
            businessStage: businessStage,
            requiredAssistance: requiredAssistance
        };
        apiService.postRequest("register", data).then(response => {
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
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation="10">
                <h1>Register</h1>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Nombre:"
                        error={!validFirstName}
                        onChange={handleFirstNameChange}
                        value={firstName} />
                </div>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Apellido:"
                        error={!validLastName}
                        onChange={handleLastNameChange}
                        value={lastName} />
                </div>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Telefono:"
                        error={!validPhone}
                        onChange={handlePhoneChange}
                        value={phone} />
                </div>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Correo Electrónico:"
                        error={!validEmail}
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
                        error={!validPassword}
                        helperText="Contraseña debe tener al menos 6 caracteres"
                        onChange={handlePasswordChange}
                        value={password} />
                </div>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}      
                        className="form-control"
                        type="password"
                        label="Confirmar Contraseña:"
                        helperText="Contraseña debe ser igual a la anterior"
                        error={!validConfirmPassword}
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword} />
                </div>
                <div className="margin-25">
                    <TextField
                        label="Etapa de Negocio"
                        select
                        className="form-control"
                        value={businessStage}
                        onChange={handleBusinessStageChange}>
                        <MenuItem value='Idea'>Idea</MenuItem>
                        <MenuItem value='Prototipo'>Prototipo</MenuItem>
                        <MenuItem value='Expansión'>Expansión</MenuItem>
                        <MenuItem value='Lanzamiento'>Lanzamiento</MenuItem>
                    </TextField>
                 </div>
                <div className="margin-25">
                    <TextField
                        label="Tipo de Asistencia"
                        select
                        className="form-control"
                        value={requiredAssistance}
                        onChange={handleRequiredAssistanceChange}>
                            <MenuItem value='Ninguna'>Ninguna</MenuItem>
                            <MenuItem value='Asuntos Legales'>Asuntos Legales</MenuItem>
                            <MenuItem value='Prestamos'>Prestamos</MenuItem>
                            <MenuItem value='Mentoria'>Mentoria</MenuItem>
                    </TextField>
                 </div>
                 <div className="margin-25">
                    <TextField
                        label="Negocio está Operando Actualmente"
                        select
                        className="form-control"
                        value={businessStatus}
                        onChange={handleBusinessStatusChange}>
                        <MenuItem value='true'>Si</MenuItem>
                        <MenuItem value='false'>No</MenuItem>
                    </TextField>
                 </div>
                <div>
                    <Button
                        className="form-control"
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleRegisterClick}
                        disabled= {!validEmail || !email.length>0 || !validPassword || !password.length>0 || !validConfirmPassword || !confirmPassword.length>0 || !validPhone || !phone.length>0 || !validFirstName || !firstName.length>0 || !validLastName || !lastName.length>0}
                        style={{ margin: '16px' }} >
                            Submit
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
export default Register;