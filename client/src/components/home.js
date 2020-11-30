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
    //Tutorial 
    var items = [
        {
            name: "Crea Tu Cuenta",
            description: "Presiona Iniciar Sesion en la barra navegadora y crea Tu Perfil."
        },
        {
            name: "Completa Las Preguntas",
            description: "Con un breve cuestionario nos ayudaras a identificar tu tipo de negocio para brindarte recursos de tu interes."
        },
        {
            name: "Recibe Tu Camino Empresarial Personalizado",
            description: "Te proveeremos una guia de los pasos a seguir para tu negocio."
        },
        {
            name: "Contacta Las Organizaciones Recomendadas",
            description: "Marca con cuales organizaciones ya te has contactado y ofreceles una calificacion de como fueron sus servicios."
        }
    ]
 
    return (
        <div className="top-margin">
            <Paper className="paper-margin" style={{padding: '60px 30px'}} elevation={10}>
                <Carousel>
                    {
                        items.map( (item, i) => <Item key={i} item={item} /> )
                    }
                </Carousel>
            </Paper>
            <Paper className="paper-margin" style={{padding: '60px 30px'}} elevation={10}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Tu Camino Empresarial</h1>
                        <iframe src="https://www.youtube.com/embed/videoseries?list=PLpc-BRL4RhWChZwVywGethXrgUCMFtxkd" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>   
                    </Grid>
                </Grid>
            </Paper>
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