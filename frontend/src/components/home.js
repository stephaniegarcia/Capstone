import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button';

 
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
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
             {/* next={ (next, active) => console.log(`we left ${active}, 
             and are now at ${next}`)}; 
          prev={ (prev, active) => console.log(`we left ${active}, 
          and are now at ${prev}`)};  */}
        </Carousel>
       
    )
}
export default Home;

function Item(props)
{
    return (
      
        <Paper>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <br/>
          <br/>
          <br/>
          <br/>
          <br/>
 
            {/* <Button className="CheckButton">
                Check it out!
            </Button> */}
        </Paper>
    )
}