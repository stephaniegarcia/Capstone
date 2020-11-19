import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'

function Home(props)
{
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
        <div>
            <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLpc-BRL4RhWChZwVywGethXrgUCMFtxkd" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
}
export default Home;

function Item(props)
{
    return (
       <div className="top-margin">
           <Paper className="paper-margin" elevation={10}>
            <iframe width="420" height="315"
                src="https://www.youtube.com/playlist?list=PLpc-BRL4RhWChZwVywGethXrgUCMFtxkd">
            </iframe> 
                   <h2>{props.item.name}</h2>
                   <p>{props.item.description}</p>
                   <br/>
               <br/>
               <br/>
               <br/>
               <br/>
            </Paper>
        </div>
    )
}