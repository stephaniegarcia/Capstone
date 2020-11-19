import * as React from 'react';
import Paper from '@material-ui/core/Paper';

function About() {
  return (
    <div className="top-margin">
      <Paper className="paper-margin" elevation={10}>
        <div>
            <h1>Colmena66</h1>
              Colmena66 es un programa del Fideicomiso para la Ciencia, Tecnología e Investigación de Puerto Rico cuya misión es ayudar a los empresarios y comerciantes en Puerto Rico proporcionando un acceso fácil y libre de costo a los recursos que necesitan para comenzar o hacer crecer tu negocio.

              La Red de recursos de Colmena66 está compuesta por más de 170 organizaciones que proveen apoyo 
              empresarial en todo Puerto Rico, y estas organizaciones representan al sector público, 
              sector sin fines de lucro y la academia. Colmena66 también analiza las brechas en el ecosistema empresarial 
              y trabaja con los miembros de la Red para fortalecer el ecosistema empresarial.
              <h1>Contáctanos</h1>
              tel: 787.525.4111
              email: info@colmena66.com
        </div>
      </Paper>
    </div>
  );
}
export default About;