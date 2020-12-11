import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";

function Register() {
    //State Variables getters & setters
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [tempProfile, setTempProfile] = useState({});
    const [orgStages, setOrgStages] = useState([]);
    const [businessStage, setBusinessStage] = useState('');
    const [businessStatus, setBusinessStatus] = useState('true');
    const [requiredAssistance, setRequiredAssistance] = useState('Ninguna');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [validFirstName, setValidFirstName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    //email validation helper function
     //@param email - new user email
    //@return if it's valid or not
    function isValidEmail(email) {
        if(email && email.length == 0) {
            return true;
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //password validation helper function
     //@param text - new user password
    //@return if it's valid or not
    function isValidPass(text) {
        if(text && text.length == 0) {
            return true;
        }
        const re = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#$%&*+,-./:<=>?@^_`{|}~])[a-zA-Z0-9 !#$%&*+,-./:<=>?@^_`{|}~]{8,64}$/;
        return re.test(text);
    }
    
    //phone validation helper function
     //@param phone - new user phone
    //@return if it's valid or not
    function isValidPhone(phone) {
        if(!phone || phone == null) {
            return false;
        }
        var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return String(phone).search (filter) != -1;
    }
    
    //name validation helper function
     //@param text - new user name
    //@return if it's valid or not
    function isValidName(text) {
        const re = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ '.-]+(([',. -][a-zA-ZáÁéÉíÍóÓúÚñÑüÜ '.-])?[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ '.-]*)*$/g;
        return text.length >= 2 && re.test(String(text))
    }
    
    //Event Handlers
    //Enter key event callback
    const onEnterPress = (event, inputName) => {
        if (event.key === 'Enter' || event.keyCode == 13) {
            if(inputName == 'name') {
                const nextSibling = document.querySelector('input[name=lastname]');
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
            else if(inputName == 'lastname') {
                const nextSibling = document.querySelector('input[name=phone]');
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
            else if(inputName == 'phone') {
                const nextSibling = document.querySelector('input[name=email]');
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
            else if(inputName == 'email') {
                const nextSibling = document.querySelector('input[name=pass]');
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
            else if(inputName == 'pass') {
                const nextSibling = document.querySelector('input[name=confirmPass]');
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
            else if(inputName == 'confirmPass') {
                handleRegisterClick();
            }
        }
    };

    //first name change event callback
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        setValidFirstName((isValidName(event.target.value)));
    };
    
    //last name change event callback
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
        setValidLastName((isValidName(event.target.value)));
    };
    
    //phone change event callback
    const handlePhoneChange = (event) => {
        setPhone(event.target.value.trim());
        setValidPhone((isValidPhone(event.target.value.trim())));
    };
    
    //business stage change event callback
    const handleBusinessStageChange = (event) => {
        setBusinessStage(event.target.value);
    };
    
    //business status change event callback
    const handleBusinessStatusChange = (event) => {
        setBusinessStatus(event.target.value);
    };

    //require assistance change event callback
    const handleRequiredAssistanceChange = (event) => {
        setRequiredAssistance(event.target.value);
    };

    //email change event callback
    const handleEmailChange = (event) => {
        setEmail(event.target.value.toLowerCase().trim());
        setValidEmail((isValidEmail(event.target.value.toLowerCase().trim())));
    };

    //password change event callback
    const handlePasswordChange = (event) => {
        setValidPassword((isValidPass(event.target.value)));
        setPassword(event.target.value);

        if(confirmPassword && confirmPassword.length>0) {
            setValidConfirmPassword(event.target.value == confirmPassword);    
        }
    };

    //comfirm password change event callback
    const handleConfirmPasswordChange = (event) => {
        setValidConfirmPassword((isValidPass(event.target.value) && event.target.value == password));
        setConfirmPassword(event.target.value);
    };

    //alert button click event callback
    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    const onSuccessAlertClick = () => {
        setShowLoading(true);
        //Handle register
        if(tempProfile.is_verified) {
            apiService.profile(tempProfile);
            if(tempProfile.bt_id && tempProfile.bt_id > 0) {
                window.location.href = "/userprofile";    
            }
            else {
                window.location.href = "/tce";
            }
        }
        else {
            window.location.href = "/login";
        }
    };

    //register button click event callback
    const handleRegisterClick = () => {
        if(!validEmail || !email.length>0 || !validPassword || !password.length>0 || !validConfirmPassword || !confirmPassword.length>0 || !validPhone || !phone.length>0 || !validFirstName || !firstName.length>0 || !validLastName || !lastName.length>0) {
            setErrorMessage('Valide la información antes de continuar');
            setShowErrorAlert(true);
            return;
        }

        //Show Loading
        setShowLoading(true);

        var data = {
            email: email, 
            password: password,
            firstname: firstName.trim(),
            lastname: lastName.trim(),
            phone_number: phone,
            business_status: String(businessStatus),
            business_stage: businessStage,
            requested_assistance: requiredAssistance
        };
        //Perform register request
        apiService.postRequest("register", data).then(response => {
            setShowLoading(false);
            setShowSuccessAlert(true);
            setTempProfile(response.data[0]);
        }).catch(err =>{
            //Handle error
            setShowLoading(false);
            setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
            setShowErrorAlert(true);
        });
    };


    useEffect(()=>{
        apiService.refreshOrgStages().then(response => {
          var temp = response.data;
          apiService.orgStages(temp);
          setOrgStages(temp);
          setBusinessStage(temp[0].bstage_id);
        }).catch(err =>{
        });
      },[initialLoad])

    return(
        apiService.isAuthenticated() ?
        //If authenticated go to home page
        <Redirect to="/" /> :
        
        //Show register view
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation={10}>
                <h1>Registrarse</h1>
                <div className="margin-25">
                    <TextField
                        required 
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Nombre:"
                        name="name"
                        onKeyDown={(e)=>{ onEnterPress(e, 'name'); }}
                        error={!validFirstName}
                        helperText={!validFirstName ? "Nombre inválido" : ""}
                        onChange={handleFirstNameChange}
                        value={firstName} />
                </div>
                <div className="margin-25">
                    <TextField
                        required 
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Apellidos:"
                        name="lastname"
                        onKeyDown={(e)=>{ onEnterPress(e, 'lastname'); }}
                        error={!validLastName}
                        helperText={!validLastName ? "Apellidos inválido" : ""}
                        onChange={handleLastNameChange}
                        value={lastName} />
                </div>
                <div className="margin-25">
                    <TextField
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Teléfono:"
                        name="phone"
                        onKeyDown={(e)=>{ onEnterPress(e, 'phone'); }}
                        error={!validPhone}
                        helperText={!validPhone ? "Teléfono inválido" : ""}
                        onChange={handlePhoneChange}
                        value={phone} />
                </div>
                <div className="margin-25">
                    <TextField
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        label="Correo Electrónico:"
                        name="email"
                        onKeyDown={(e)=>{ onEnterPress(e, 'email'); }}
                        error={!validEmail}
                        helperText={!validEmail ? "Correo electrónico inválido" : ""}
                        onChange={handleEmailChange}
                        value={email} />
                </div>
                <div className="margin-25">
                    <TextField
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        className="form-control"
                        type="password"
                        label="Contraseña:"
                        name="pass"
                        onKeyDown={(e)=>{ onEnterPress(e, 'pass'); }}
                        error={!validPassword}
                        helperText="La contraseña debe contener al menos 1 letra, 1 dígito, 1 carácter especial. #$%&amp;*+,-./:<=>?@^_`{|}~ y entre 8 y 64 caracteres de largo"
                        onChange={handlePasswordChange}
                        value={password} />
                </div>
                <div className="margin-25">
                    <TextField
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}      
                        className="form-control"
                        type="password"
                        label="Confirmar Contraseña:"
                        name="confirmPass"
                        onKeyDown={(e)=>{ onEnterPress(e, 'confirmPass'); }}
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
                        {orgStages.map((stage) => ( <MenuItem key={stage.bstage_id} value={stage.bstage_id}>{stage.description}</MenuItem> ))}
                    </TextField>
                 </div>
                <div className="margin-25">
                    <TextField
                        label="¿Qué Tipo de Asistencia Necesitas?"
                        select
                        className="form-control"
                        value={requiredAssistance}
                        onChange={handleRequiredAssistanceChange}>
                            <MenuItem value='Ninguna'>Ninguna</MenuItem>
                            <MenuItem value='Asuntos Legales'>Asuntos Legales</MenuItem>
                            <MenuItem value='Prestamos'>Préstamos</MenuItem>
                            <MenuItem value='Mentoria'>Mentoría</MenuItem>
                    </TextField>
                 </div>
                 <div className="margin-25">
                    <TextField
                        label="¿Tu Negocio está Operando Actualmente?"
                        select
                        className="form-control"
                        value={businessStatus}
                        onChange={handleBusinessStatusChange}>
                        <MenuItem value='true'>Sí</MenuItem>
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
                            Someter
                    </Button>
                </div>
            </Paper>
            <Alert
                isOpen={showErrorAlert}
                handleSubmit={onAlertClick}
                title="Error"
                text={errorMessage}
                submitButtonText="Ok" />
            <Alert
                isOpen={showSuccessAlert}
                handleSubmit={onSuccessAlertClick}
                title=""
                text="¡Gracias por Registrarte! Recibirás un correo electrónico con instrucciones para validar tu cuenta."
                submitButtonText="Ok" />
            <Spinner isShown={showLoading} />
        </div>
    );
}
export default Register;