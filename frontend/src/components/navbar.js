import { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import apiService from "./mockApiService";
//import apiService from "./apiService";
function Navbar() {
    const [initialLoad, setInitialLoad] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    var logout = function() {
        apiService.logout();
        window.location.href = "/";
      }

      var adminLogout = function() {
        apiService.adminLogout();
        window.location.href = "/";
      }

      useEffect(()=>{
        setLoggedIn(apiService.isAuthenticated());
      },[initialLoad])
      
    return(
      <div>
        <AppBar style={{ background: '#333333' }}>
          <Toolbar>          
              <Button  href="/" color="inherit" >
                <img className="logo-img" src="/images/colmena.png" /> 
              </Button>
              <div className="nav-links">
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
                {apiService.isAdminAuthenticated() && (
                  <div>
                    <Button href="/adminreports" color="inherit" >Reportes</Button>
                    <Button href="/adminorgs" color="inherit" >Manejar Organizaciones</Button>
                    <Button onClick={() => {adminLogout()}} color="inherit" >Cerrar sesion admin</Button>
                  </div>
                )}
              </div>
          </Toolbar>
        </AppBar>
      </div>
    );
};
export default Navbar;