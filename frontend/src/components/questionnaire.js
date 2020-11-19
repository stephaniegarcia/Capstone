import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Ap from './qlogic';
import { Route, Redirect } from 'react-router-dom';
import Spinner from './loading'
import Alert from './alert'
import apiService from "./mockApiService";
//import apiService from "./apiService";

function Questionnaire() {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const onAlertClick = () => {
    setShowErrorAlert(false);
  };

  async function getQuestions() {
    setShowLoading(true);
    apiService.getRequest("quiz")
    .then((response)=>{
      if(response) {
        for(var i = 0; i < response.length; i++) {
          response[i].answer = null;
        }
      }
      setShowLoading(false);
      setQuizQuestions(response);
      setInitialLoad(true);
    })
    .catch(err =>{
      setShowLoading(false);
      setErrorMessage(err.response.data);
      setShowErrorAlert(true);
    });
  };


  useEffect(()=>{
    getQuestions();
  },[initialLoad])

  return (
    !apiService.isAuthenticated() ? <Redirect to="/login" /> :
      <div>
        {(quizQuestions.length>0 ? <Ap quiz={quizQuestions} /> : <div></div>)}
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
export default Questionnaire;