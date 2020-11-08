import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import About from './components/about';
import Organizations from './components/organizations';
import Glossary from './components/glossary';
import Questionnaire from './components/questionnaire';
import UserProfile from './components/userProfile';
import Outcome from './components/outcome';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import apiService from "./components/mockApiService";
import PasswordReset from './components/passwordReset';


function App() {

  var logout = function() {
    apiService.logout();
    window.location.reload(false);
  }
  return (
    <Router>
      <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/login'} className="nav-link">Login</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
        </nav> */}
        <AppBar
       
         style={{ background: '#333333' }}>
          <Toolbar>
          {/* <img src="/images/colmena.png" /> */}
        
            <Button  href="/" color="inherit" >
            
              <Typography variant="h6">
                Inicio
              </Typography>
            </Button>
            {!apiService.isAuthenticated() && (
                    <Button href="/login" color="inherit" >Iniciar Sesión</Button>
                )}

            <Button href="/glosario" color="inherit" >Glosario</Button>
            <Button href="/colmena66" color="inherit" >Sobre Colmena66</Button>

            {apiService.isAuthenticated() && (

                      <div>
                     <Button href="/organizaciones" color="inherit" >Organizaciones</Button>
                     <Button href="/tce" color="inherit" >Comienza Tu Camino Empresarial</Button>
                     <Button href="/userprofile" color="inherit" >Tu Perfil</Button>
                     <Button onClick={() => {logout()}} color="inherit" >Cerrar sesion</Button>
                     </div>
                )}
            
           
            
        </Toolbar>
      </AppBar>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/passwordReset' component={PasswordReset} />
          <Route path='/tce' component={Questionnaire} />
          <Route path='/outcome' component={Outcome} />
          <Route path='/organizaciones' component={Organizations} />
          <Route path='/glosario' component={Glossary} />
          <Route path='/colmena66' component={About} />
          <Route path='/userprofile' component={UserProfile} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;