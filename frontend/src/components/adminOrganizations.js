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

function AdminOrganizations() {
    //State Variables getters & setters
    
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [showLoading, setShowLoading] = useState(false);


    //alert button click event callback
    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    return(
        !apiService.isAdminAuthenticated() ? 
        //If authenticated go to home page
        <Redirect to="/admin" /> :

        //Show login view
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation={10}> 
                <h2>Manejo de Organizaciones</h2>
                
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
export default AdminOrganizations;