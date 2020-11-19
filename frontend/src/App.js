import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import About from './components/about';
import Organizations from './components/organizations';
import Glossary from './components/glossary';
import Questionnaire from './components/questionnaire';
import UserProfile from './components/userProfile';
import Outcome from './components/outcome';
import Navbar from './components/navbar';
import PasswordReset from './components/passwordReset';
import ForgotPassword from './components/forgotPassword';
import AdminLogin from './components/adminLogin';
import AdminReports from './components/adminReports';
import AdminOrganizations from './components/adminOrganizations';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/glosario' component={Glossary} />
          <Route path='/colmena66' component={About} />
          
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <Route path='/passwordReset' component={PasswordReset} />
          <Route path='/forgotPassword' component={ForgotPassword} />
          <Route path='/tce' component={Questionnaire} />
          <Route path='/outcome' component={Outcome} />
          <Route path='/organizaciones' component={Organizations} />
          <Route path='/userprofile' component={UserProfile} />
          <Route path='/admin' component={AdminLogin} />

          <Route exact path='/adminreports' component={AdminReports} />
          <Route exact path='/adminorgs' component={AdminOrganizations} />
        </Switch>
    </div>
    </Router>
  );
}
export default App;