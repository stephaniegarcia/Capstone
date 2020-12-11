import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";

function ForgotPassword() {
  //State Variables getters & setters
  const [email, setEmail] = React.useState('');
  const [validEmail, setValidEmail] = React.useState(true);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showLoading, setShowLoading] = React.useState(false);

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
  
  //Event Handlers 

  //Enter key event callback
  const onEnterPress = (event, inputName) => {
      if (event.key === 'Enter' || event.keyCode == 13) {
          if(inputName == 'email') {
            handleClick();
          }
      }
  };

  //email change event callback
  const handleEmailChange = (event) => {
      setEmail(event.target.value.toLowerCase());
      setValidEmail((isValidEmail(event.target.value.toLowerCase())));
  };

  //error alert button click event callback
  const onErrorAlertClick = () => {
      setShowErrorAlert(false);
  };

  //message alert button click event callback
  const onMessageAlertClick = () => {
    window.location.href = "/login";
  };

  //login button click event callback
  const handleClick = () => {
      if(!validEmail || !email.length>0) {
          setErrorMessage('Valide la información antes de continuar');
          setShowErrorAlert(true);
          return;
      }

      //Show Loading
      setShowLoading(true);
      //Perform login request
      apiService.postRequest("user/changePassword", { email: email }).then(response => {
        setShowLoading(false);  
        setShowMessageAlert(true);
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
              <h1>Recupera Tu Contrasena</h1>
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
              <div>
                  <Button
                      className="form-control"
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleClick}
                      disabled= {!validEmail || !email.length>0}
                      style={{ margin: '16px' }}>
                          Restablecer la contraseña
                  </Button>
              </div>
          </Paper>
          
          <Alert
              isOpen={showErrorAlert}
              handleSubmit={onErrorAlertClick}
              title="Error"
              text={errorMessage}
              submitButtonText="Ok" />
          <Alert
            isOpen={showMessageAlert}
            handleSubmit={onMessageAlertClick}
            title="Restablecimiento de contraseña"
            text="Se envió un correo electrónico para completar el proceso de recuperación de contraseña"
            submitButtonText="Ok"
      />
          <Spinner isShown={showLoading} />
      </div>
  );
}
export default ForgotPassword;