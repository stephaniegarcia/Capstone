import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Ap from './qlogic';
import { Route, Redirect } from 'react-router-dom';
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";

function Questionnaire() {

  //Getters and Setters
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const onAlertClick = () => {
    setShowErrorAlert(false);
  };

  //Get Questions call
  async function getQuestions() {
    setShowLoading(true);
    apiService.getRequest("tce/questions")
    .then((response)=>{
      if(response.data) {
        for(var i = 0; i < response.data.length; i++) {
          response.data[i].answer = null;
          response.data[i].options = ["Si", "No"]
        }
      }
      setShowLoading(false);
      setQuizQuestions(response.data);
      setInitialLoad(true);
    })
    .catch(err =>{
      setShowLoading(false);
      setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
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