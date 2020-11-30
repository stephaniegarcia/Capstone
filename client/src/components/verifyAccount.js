import React from 'react'
import { useParams, useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";


function VerifyAccount() {

  //Getters and Setters
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showLoading, setShowLoading] = React.useState(false);
  const [initialLoad, setInitialLoad] = React.useState(false);

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

  //Initialize View
  var params = useParams();
  let query = new URLSearchParams(useLocation().search);
  React.useEffect(()=>{
    console.log(params.email);
    console.log(query.get("id"));
    
    //Validate if id is still valid for changing password
    if(!params.email || !query.get("id")) {
      setShowLoading(false);
      setErrorMessage('El enlace de verificar cuenta puede haber caducado');
      setShowErrorAlert(true);
    }
    else {
      setShowLoading(true);
      apiService.getRequest("verify/"+params.email+"?id="+query.get("id")).then((response)=>{
        setShowLoading(false);
        setShowMessageAlert(true);
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
          text='Su perfil ha sido verificado'
          submitButtonText="Ok" />
        <Spinner isShown={showLoading} />
    </div>
  )}
export default VerifyAccount;