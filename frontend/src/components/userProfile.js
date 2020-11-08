import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import apiService from "./mockApiService";

// import { DataGrid } from '@material-ui/data-grid';

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

function UserProfile() {

    const [spacing, setSpacing] = React.useState(1);
    const [name, setName] = React.useState('Composed TextField');
    const classes = useStyles();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmailName] = React.useState('');
    const [phone, setPhoneName] = React.useState('');
    const [businessType, setBusinessType] = React.useState('');
    const [businessStage, setBusinessStage] = React.useState('');
    const [organizations, setOrganizations] = React.useState([]);
    const [roadmap, setRoadmap] = React.useState([]);
    

    /*Table logic */
    const useRowStyles = makeStyles({
        root: {
          '& > *': {
            borderBottom: 'unset',
          },
        },
      });
      
      function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();
      
        return (
            
          <React.Fragment>
            
            <TableRow className={classes.root}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.businessStage}</TableCell>
              <TableCell align="right">{row.businessType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                    Descripción
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Descripción</TableCell>
                          {/* <TableCell>Añadir a Mi Perfil</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.moreInfo.map((historyRow) => (
                          <TableRow key={historyRow.description}>
                            <TableCell component="th" scope="row">
                              {historyRow.description}
                            </TableCell>
                            <TableCell>
                            </TableCell>
                             {/* <TableCell>{historyRow.customerId}</TableCell>*/}
                           
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
      
      Row.propTypes = {
        row: PropTypes.shape({
            phone: PropTypes.number.isRequired,
          email: PropTypes.number.isRequired,
          businessStage: PropTypes.number.isRequired,
          moreInfo: PropTypes.arrayOf(
            PropTypes.shape({
              amount: PropTypes.number.isRequired,
              customerId: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
            }),
          ).isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          businessType: PropTypes.number.isRequired,
        }).isRequired,
      };

      function getProfile() {
        var profile = apiService.profile();
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setEmailName(profile.email);
        setPhoneName(profile.phone);
        setBusinessType(profile.businessType);
        setBusinessStage(profile.businessStage);
        setOrganizations(profile.organizations);
        setRoadmap(profile.roadmap);
      }

      React.useEffect(()=> {
        getProfile();
      }, [name]);

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {(
            <Grid  item>
              <div style={{'padding-top': '50px'}}></div>
              <Paper className={classes.paper} >
              <div>
                  <h1>Tu Perfil</h1>
                  <form className={classes.root} noValidate autoComplete="off">
                <div>
                 <TextField
                  id="standard-read-only-input"
                 label="Nombre del Usuario:"
                  defaultValue=" "
                  value={firstName}
                />
                </div>
                <br/>
               <br/>
                <div>
                <TextField
                  id="standard-read-only-input"
                 label="Correo Electrónico:"
                 defaultValue=" "
                 value={email}
                />
                </div>
                <br/>
               <br/>
                <div>
                <TextField
                  id="standard-read-only-input"
                 label="Teléfono:"
                 defaultValue=" "
                 value={phone}
                />
                </div>
                <br/>
                <br/>
                <div>
                <TextField
                  id="standard-read-only-input"
                 label="Etapa de Negocio"
                 defaultValue=" "
                 value={businessStage}
                 InputProps={{
                  readOnly: true,
                }}
                />
                 </div>
                  <br/>
                <br/>
              
                <div>
                   <TextField
                  id="standard-read-only-input"
                 label="Tipo de Negocio"
                 defaultValue=" "
                 value={businessType}
                  InputProps={{
                    readOnly: true,
                  }}
                />
               
                </div>
                  </form>
              </div>
                </Paper>
                <Paper className={classes.paper} >
              <div>
                  <h1>Tu Camino a Recorrer</h1>
                  
              </div>
                </Paper>
                
                <Paper className={classes.paper} >
              <div>
                  <h1>Tus Organizaciones</h1>
                  <div>
                <h2>Organizaciones</h2>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell >Nombre</TableCell>
                      <TableCell align="right">Teléfono</TableCell>
                      <TableCell align="right">Correo Electrónico&nbsp;</TableCell>
                      <TableCell align="right">Etapa&nbsp;</TableCell>
                      <TableCell align="right">Tipo&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                  {organizations.map((row) => (<Row  key={row.name} row={row} />))}
        
                  {/* {this.state.rows && this.state.rows.map((row) => ( <Row key={row.name} row={row} />))} */}

                  
                  </TableBody>
                </Table>
              </TableContainer>
           </div>
              </div>
                </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>
  
    </Grid>
  );
}
export default UserProfile;
