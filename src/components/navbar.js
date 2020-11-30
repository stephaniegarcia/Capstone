import { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
//import apiService from "./mockApiService";
import apiService from "./apiService";

function Navbar() {
  //Setters
  const [initialLoad, setInitialLoad] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [drawerState, setDrawerState] = useState(false);

  //User Logout Button click event
  var logout = function() {
    apiService.logout();
    window.location.href = "/";
  }

    //Admin Logout Button click event
  var adminLogout = function() {
    apiService.adminLogout();
    window.location.href = "/";
  }
  //Home Button click event
  var home = function() {
    window.location.href = "/";
  }
  //Admin Home Button click event
  var adminHome = function() {
    window.location.href = "/admin";
  }


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };

  useEffect(()=>{
    setLoggedIn(apiService.isAuthenticated());
  },[initialLoad])
      
  return(
    <div>
      <AppBar style={{ background: '#333333' }}>
        <Toolbar>          
          {apiService.isAdminAuthenticated() ? (
                <Button onClick={adminHome} color="inherit" >
                  <img className="logo-img" src="/images/colmena.png" /> 
                </Button>
            ): (
              <Button onClick={home} color="inherit" >
                <img className="logo-img" src="/images/colmena.png" /> 
              </Button>
            )}

            <div className="nav-links content-mobile">
              <Button onClick={toggleDrawer(true)}>
                <MenuIcon fontSize='large' style={{color: 'white'}} />
              </Button>
            </div>
            <div className="nav-links content-desktop">
                {!apiService.isAuthenticated() && (
                      <Button href="/login" color="inherit" >Iniciar Sesión</Button>
                  )}
                  <Button href="/glosario" color="inherit" >Glosario</Button>
                  <Button href="/colmena66" color="inherit" >Sobre Colmena66</Button>
                  {apiService.isAdminAuthenticated() ? (
                    <div>
                      <Button href="/adminreports" color="inherit" >Reportes</Button>
                      <Button href="/gareports" color="inherit" >Google Analytics</Button>
                      <Button href="/adminorgs" color="inherit" >Manejar Organizaciones</Button>
                      <Button onClick={() => {adminLogout()}} color="inherit" >Cerrar sesion admin</Button>
                    </div>
                  ) : (

                    apiService.isAuthenticated() && (
                      <div>
                        <Button href="/organizaciones" color="inherit" >Organizaciones</Button>
                        <Button href="/tce" color="inherit" >Comienza Tu Camino Empresarial</Button>
                        <Button href="/userprofile" color="inherit" >Tu Perfil</Button>
                        <Button onClick={() => {logout()}} color="inherit" >Cerrar sesion</Button>
                      </div>
                    )

                  )}
            </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={drawerState} onClose={toggleDrawer(false)}>
            <div className="drawer-links">
              {apiService.isAdminAuthenticated() ? (
                    <Button onClick={adminHome} color="inherit" >
                      <img className="logo-img" src="/images/colmena.png" /> 
                    </Button>
                ): (
                  <Button onClick={home} color="inherit" >
                    <img className="logo-img" src="/images/colmena.png" /> 
                  </Button>
                )}
              {!apiService.isAuthenticated() && (
                  <Button href="/login" color="inherit" >Iniciar Sesión</Button>
              )}
              <Button href="/glosario" color="inherit" >Glosario</Button>
              <Button href="/colmena66" color="inherit" >Sobre Colmena66</Button>
              {apiService.isAdminAuthenticated() ? (
                <div>
                  <Button href="/adminreports" color="inherit" >Reportes</Button>
                  <Button href="/gareports" color="inherit" >Google Analytics</Button>
                  <Button href="/adminorgs" color="inherit" >Manejar Organizaciones</Button>
                  <Button onClick={() => {adminLogout()}} color="inherit" >Cerrar sesion admin</Button>
                </div>
              ) : (

                apiService.isAuthenticated() && (
                  <div>
                    <Button href="/organizaciones" color="inherit" >Organizaciones</Button>
                    <Button href="/tce" color="inherit" >Comienza Tu Camino Empresarial</Button>
                    <Button href="/userprofile" color="inherit" >Tu Perfil</Button>
                    <Button onClick={() => {logout()}} color="inherit" >Cerrar sesion</Button>
                  </div>
                )

              )}
            </div>
      </Drawer>
    </div>
  );
};
export default Navbar;