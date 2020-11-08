import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 800,
    width: 900,
  },
  control: {
    padding: theme.spacing(1),
  },
}));

function About() {

    const [spacing, setSpacing] = React.useState(1);
    const classes = useStyles();

  return (
  
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {(
            <Grid  item>
                  <div style={{'padding-top': '50px'}}></div>
                <Paper className={classes.paper} >
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
                
        
            </Grid>
          )}
        </Grid>
      </Grid>
  
    </Grid>
  );
}
export default About;
