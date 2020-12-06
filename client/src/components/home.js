import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Grid, Card } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LanguageIcon from '@material-ui/icons/Language';
import { Link } from 'react-router-dom';

function Home(props)
{
    return (
        <div className="top-margin">
            <Paper className="paper-margin" style={{padding: '30px'}} elevation={10}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* <h1>Tu Camino Empresarial</h1> */}
                        <h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        </h1>
                        <h2>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </h2>
                        <hr className="home-hr" />
                        <iframe src="https://www.youtube.com/embed/videoseries?list=PLpc-BRL4RhWChZwVywGethXrgUCMFtxkd" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>   
                        <hr className="home-hr" />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Grid>
                </Grid>
            </Paper>

            <Paper className="paper-margin" style={{padding: '30px', marginTop: "60px"}} elevation={10}>
                <h1>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </h1>
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </h2>
                <hr className="home-hr" />
                <img src="images/banner1.png" className="drop-image" style={{width:"75%"}} />
                <hr className="home-hr" />
                <Grid container spacing={3} style={{marginTop: '60px'}}>
                    <Grid item xs={12} sm={6} md={6} lg={3} style={{padding: "15px"}}>
                        <img src="images/paso1.png" style={{width:"45%"}} />
                        <h5>
                            Crea Tu Cuenta
                        </h5>
                        <hr className="home-hr" />
                        <p>
                            Presiona Iniciar Sesion en la barra navegadora y crea Tu Perfil.
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} style={{padding: "15px"}}>
                        <img src="images/paso2.png" style={{width:"45%"}} />
                        <h5>
                            Completa Las Preguntas
                        </h5>
                        <hr className="home-hr" />
                        <p>
                            Con un breve cuestionario nos ayudaras a identificar tu tipo de negocio para brindarte recursos de tu interes.
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} style={{padding: "15px"}}>
                        <img src="images/paso3.png" style={{width:"45%"}} />
                        <h5>
                            Recibe Tu Camino Empresarial Personalizado
                        </h5>
                        <hr className="home-hr" />
                        <p>
                            Te proveeremos una guia de los pasos a seguir para tu negocio.
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} style={{padding: "15px"}}>
                        <img src="images/paso4.png" style={{width:"45%"}} />
                        <h5>
                            Contacta Las Organizaciones Recomendadas
                        </h5>
                        <hr className="home-hr" />
                        <p>
                            Marca con cuales organizaciones ya te has contactado y ofreceles una calificacion de como fueron sus servicios.
                        </p>
                    </Grid>
                </Grid>
            </Paper>

            <Paper className="paper-margin" style={{padding: '30px', marginTop: '60px'}} elevation={10}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        </h1>
                        <h2>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </h2>
                        <hr className="home-hr" />
                        <img src="images/about.jpg" className="drop-image" style={{width:"75%"}} />
                        <hr className="home-hr" />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Grid>
                </Grid>
            </Paper>

            <Paper style={{padding: '30px', marginTop: '60px'}} elevation={10}>
                <Grid container spacing={3} style={{marginTop: '60px'}}>
                    <Grid item xs={6} sm={3}>
                        <a href="https://www.facebook.com/colmena66" target="_blank">
                            <FacebookIcon className="footer-color" fontSize="large"/>
                        </a>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <a href="https://instagram.com/colmena66" target="_blank">
                            <InstagramIcon className="footer-color" fontSize="large"/>
                        </a>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <a href="https://twitter.com/colmena_66" target="_blank">
                            <TwitterIcon className="footer-color" fontSize="large"/>
                        </a>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <a href="https://www.linkedin.com/company/colmena66/" target="_blank">
                            <LinkedInIcon className="footer-color" fontSize="large"/>
                        </a>
                    </Grid>
                </Grid>

                <Grid container spacing={3} style={{marginTop: '60px'}}>
                    <Grid item xs={12} sm={6} md={4}>
                        <a className="footer-color" href="mailto:info@colmena66.com" target="_blank">
                            <AlternateEmailIcon fontSize="small"/> info@colmena66.com
                        </a>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <a className="footer-color" href="https://www.colmena66.com/" target="_blank">
                            <LanguageIcon fontSize="small"/> https://www.colmena66.com/
                        </a>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <a className="footer-color" href="https://www.colmena66.com/en/partners/signup" target="_blank">
                            Registro de socio
                        </a>
                    </Grid>
                </Grid>
            </Paper>
        
        </div>
    )
}
export default Home;

function Item(props)
{
    return (
        <div>
            <h1>{props.item.name}</h1>
            <p>{props.item.description}</p>
        </div>
    )
}