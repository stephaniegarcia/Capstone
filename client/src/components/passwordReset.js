import React from 'react'
import { useParams, useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";


function PasswordReset() {

  //Getters and Setters
  const [email, setEmail] = React.useState('');
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [validPassword, setValidPassword] = React.useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = React.useState(true);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showContent, setShowContent] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [initialLoad, setInitialLoad] = React.useState(false);
  
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
        if(inputName == 'pass') {
            const nextSibling = document.querySelector('input[name=confirmPass]');
            if (nextSibling !== null) {
                nextSibling.focus();
            }
        }
        else if(inputName == 'confirmPass') {
            handleSubmitClick();
        }
    }
  };

  //error alert button click event callback
  const onErrorAlertClick = () => {
    setShowErrorAlert(false);
    window.location.href = "/login";
  };

  //message alert button click event callback
  const onMessageAlertClick = () => {
    setShowMessageAlert(false);
    window.location.href = "/login";
  };

  //password change event callback
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setValidPassword((isValidPass(event.target.value)));
    if(confirmPass && confirmPass.length>0) {
      setValidConfirmPassword(event.target.value == confirmPass);    
    }
  };

  //confirm password change event callback
  const handleConfirmPasswordChange = (event) => {
    setConfirmPass(event.target.value);
    setValidConfirmPassword((isValidPass(event.target.value) && event.target.value == password));
  };

  //submit button click event callback
  const handleSubmitClick = () => {
    if(!validPassword || !validConfirmPassword || !password.length>0 || !confirmPass.length>0) {
      setErrorMessage('Valide la información antes de continuar');
      setShowErrorAlert(true);
      return;
  }

    var data = { email: email, password: password };
    apiService.putRequest("user/password", data).then((response)=>{
      setShowMessageAlert(true);
    })
    .catch(err =>{
      setShowLoading(false);
      setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
      setShowErrorAlert(true);
    });
  };

  //Initialize View
  var params = useParams();
  let query = new URLSearchParams(useLocation().search);
  React.useEffect(()=>{
    setEmail(params.email);
    setId(query.get("id"));

    //Validate if id is still valid for changing password
    if(!params.email || !query.get("id")) {
      setShowLoading(false);
      setErrorMessage('El enlace de restablecimiento de contraseña puede haber caducado');
      setShowErrorAlert(true);
    }
    else {
      setShowLoading(true);
      apiService.getRequest("newPassword/user/"+params.email+"?id="+query.get("id")).then((response)=>{
        setShowContent(true);
        setShowLoading(false);
      })
      .catch(err =>{
        setShowLoading(false);
        setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
        setShowErrorAlert(true);
      });
    }
  },[initialLoad])

  return (
    <div>
        {showContent && (
          <div className="top-margin">
              <Paper className="form form--wrapper paper-margin" elevation={10}> 
                <h2>Cambiar Contraseña</h2>
                <div className="margin-25">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                          }}  
                        className="form-control"
                        type="password"
                        name="pass"
                        onKeyDown={(e)=>{ onEnterPress(e, 'pass'); }}
                        label="Contraseña:"
                        error={!validPassword}
                        helperText="La contraseña debe contener al menos 1 letra, 1 dígito, 1 carácter especial. #$%&amp;*+,-./:<=>?@^_`{|}~ y entre 8 y 64 caracteres de largo"
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
                        name="confirmPass"
                        onKeyDown={(e)=>{ onEnterPress(e, 'confirmPass'); }}
                        label="Confirmar Contraseña:"
                        helperText="Contraseña debe ser igual a la anterior"
                        error={!validConfirmPassword}
                        onChange={handleConfirmPasswordChange}
                        value={confirmPass} />
                </div>
                <div>
                    <Button
                        className="form-control"
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitClick}
                        disabled= {!validPassword || !validConfirmPassword || !password.length>0 || !confirmPass.length>0}
                        style={{ margin: '16px' }}>
                            Cambiar
                    </Button>
                </div>
            </Paper>
          </div>
        )}
        <Alert
          isOpen={showErrorAlert}
          handleSubmit={onErrorAlertClick}
          title="Error"
          text={errorMessage}
          submitButtonText="Ok" />
        <Alert
          isOpen={showMessageAlert}
          handleSubmit={onMessageAlertClick}
          title="Gracias"
          text='Su contraseña ha sido actualizada'
          submitButtonText="Ok" />
        <Spinner isShown={showLoading} />
    </div>
  )}
export default PasswordReset;