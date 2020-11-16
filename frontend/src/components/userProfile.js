import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Rating from '@material-ui/lab/Rating';
import Select from '@material-ui/core/Select';
import Spinner from './loading'
import Alert from './alert'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import '../index.css';
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
    const [shouldLoad, setShouldLoad] = React.useState(false);
    const [spacing, setSpacing] = React.useState(1);
    const [name, setName] = React.useState('Composed TextField');
    const classes = useStyles();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [businessType, setBusinessType] = React.useState('');
    const [businessStage, setBusinessStage] = React.useState('');
    const [requiredAssistance, setRequiredAssistance] = React.useState('');
    const [businessStatus, setBusinessStatus] = React.useState('');
    const [organizations, setOrganizations] = React.useState([]);
    const [roadmap, setRoadmap] = React.useState([]);
    
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showLoading, setShowLoading] = React.useState(false);

    const [allowUpdate, setAllowUpdate] = React.useState(true);
    
    const [validFirstName, setValidFirstName] = React.useState(true);
    const [validLastName, setValidLastName] = React.useState(true);
    const [validEmail, setValidEmail] = React.useState(true);
    const [validPhone, setValidPhone] = React.useState(true);

    const onAlertClick = () => {
      setShowErrorAlert(false);
    };

    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    function isValidPhone(phone) {
      const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
      return re.test(String(phone));
    }
    function isValidName(text) {
      const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
      return text.length >= 2 && re.test(String(text))
    }
    
    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value.trim());
      setValidFirstName((isValidName(event.target.value.trim())));
    };
    const handleLastNameChange = (event) => {
      setLastName(event.target.value.trim());
      setValidLastName((isValidName(event.target.value.trim())));
    };
    const handleEmailChange = (event) => {
      setEmail(event.target.value.toLowerCase().trim());
      setValidEmail((isValidEmail(event.target.value.trim())));
    };
    const handlePhoneChange = (event) => {
      setPhone(event.target.value.trim());
      setValidPhone((isValidPhone(event.target.value.trim())));
    };
    const handleBusinessStageChange = (event) => {
      setBusinessStage(event.target.value);
    };
    const handleBusinessStatusChange = (event) => {
      setBusinessStatus(event.target.value);
    };
    const handleRequiredAssistanceChange = (event) => {
      setRequiredAssistance(event.target.value);
    };

    const setOrgRating = (id, rating) => {
      var data = {organizationId: id, rating: rating};
      apiService.postRequest("organization/rating", data);
    };
    const setOrgChecked = (id, check) => {
      var data = {organizationId: id, checked: check};
      apiService.postRequest("organization/tracking", data);
    };
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
        const [rating, setRating] = React.useState(row.rating);
        const [check, setCheck] = React.useState(row.checked);
        const handleRatingChange = (event) => {
          setRating(event.target.value);
          setOrgRating(row.id, event.target.value)
        };
        const handleCheckboxChange = (event) => {
          setCheck(event.target.checked );
          setOrgChecked(row.id, event.target.checked )
        };
        return (
          <React.Fragment>
            <TableRow >
              <TableCell className="no-bottom-border">
                {/* <IconButton aria-label="expand row" size="small" onClick={() => row.open = !row.open }>
                  {row.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton> */}
              </TableCell>
              <TableCell className="no-bottom-border" scope="row">
                {row.name}
              </TableCell>
              <TableCell className="no-bottom-border" align="right">{row.phone}</TableCell>
              <TableCell className="no-bottom-border" align="right">{row.email}</TableCell>
              <TableCell className="no-bottom-border" align="right">{row.businessStage}</TableCell>
              <TableCell className="no-bottom-border" align="right">{row.businessType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="6" style={{padding: "0 80px 30px 80px"}}>
                <Typography gutterBottom component="div">
                  Descripción:
                </Typography>
                {row.moreInfo.map((historyRow) => (
                  <p>
                    {historyRow.description}
                  </p>
                ))}
                <Rating
                  value={rating}
                  onChange={handleRatingChange} />
                <br/>
                <br/>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }

      function RoadmapOrganizationRow(props) {
        const { row } = props;
        const classes = useRowStyles();
        return (
          <React.Fragment>            
            <TableRow className={classes.root}>
              <TableCell>
                {row}
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
//Drawing Roadmap Logic
      function RoadmapRow(props) {
        const { row } = props;
        const [anchorEl, setAnchorEl] = React.useState(null);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
        const open = Boolean(anchorEl);
        const id = open ? 'rm-popover'+row.index : undefined;
        var className = "rm-curve ";
        var buttonStyle = {};
        if(row.index%2==0) {
          className += "rm-left-curve";
          buttonStyle = {
            left: "-36px",
            top: "5px"
          };
        }
        else {
          className += "rm-right-curve";
          buttonStyle = {
            right: "-36px",
            top: "5px"
          };
        }
        var marginTop = row.index>1? "-4px" :"0px";
        return (
          <React.Fragment>
            <TableRow>
                <div style={{"margin-top": marginTop}} className={className}>
                  <Button style={buttonStyle} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}></Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <div style={{margin:"15px"}}>
                      <h6>Organizaciones</h6>
                      <Table>
                        {row.organizations.map((org) => (<RoadmapOrganizationRow  key={row.name} row={org} />))}
                      </Table>
                    </div>
                  </Popover>
                  <h5>{row.name}</h5>
                </div>
            </TableRow>
          </React.Fragment>
        );
      }

      //sets all fields to be able to edit them 
      function getProfile() {
        var profile = apiService.profile();
        if(profile) {
          setFirstName(profile.firstName);
          setLastName(profile.lastName);
          setEmail(profile.email);
          setPhone(profile.phone);
          setBusinessType(profile.businessType);
          setBusinessStage(profile.businessStage);
          setBusinessStatus(String(profile.businessStatus));
          setRequiredAssistance(profile.requiredAssistance);
          setOrganizations(profile.organizations);
          setRoadmap(profile.roadmap);
        }
      }

      const updateProfile = () => {
        var data = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          businessStage: businessStage,
          requiredAssistance: requiredAssistance,
          businessStatus: String(businessStatus).toLowerCase() == 'true'
        };
        setShowLoading(true);
        apiService.putRequest("profile/update", data).then(response => {
            setShowLoading(false);
            getProfile();
        }).catch(err =>{
            setShowLoading(false);
            setErrorMessage(err.response.data);
            setShowErrorAlert(true);
        });
      };

      React.useEffect(()=> {
        getProfile();
      }, [shouldLoad]);

  return (
    !apiService.isAuthenticated() ? <Redirect to="/login" /> :
    <div className="top-margin">
      <Paper className="paper-margin" elevation="10">
      <h1>Tu Perfil</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <div className="margin-25">
            <TextField
              InputLabelProps={{
                  shrink: true,
              }}      
              className="form-control"
              onChange={handleFirstNameChange}
              error={!validFirstName}
              label="Nombre:"
              defaultValue=" "
              value={firstName} />
          </div>
          <div className="margin-25">
            <TextField
              InputLabelProps={{
                  shrink: true,
              }}      
              className="form-control"
              onChange={handleLastNameChange}
              error={!validLastName}
              label="Apellido:"
              defaultValue=" "
              value={lastName} />
          </div>
          <div className="margin-25">
            <TextField
              InputLabelProps={{
                  shrink: true,
              }}      
              className="form-control"
              onChange={handleEmailChange}
              error={!validEmail}
              label="Correo Electrónico:"
              defaultValue=" "
              value={email} />
          </div>
          <div className="margin-25">
            <TextField
              InputLabelProps={{
                  shrink: true,
              }}      
              className="form-control"
              onChange={handlePhoneChange}
              error={!validPhone}
              label="Teléfono:"
              defaultValue=" "
              value={phone} />
          </div>
          <div className="margin-25">
              <TextField
                label="Etapa de Negocio"
                select
                className="form-control"
                value={businessStage}
                onChange={handleBusinessStageChange}>
                <MenuItem value=''></MenuItem>
                <MenuItem value='Idea'>Idea</MenuItem>
                <MenuItem value='Prototipo'>Prototipo</MenuItem>
                <MenuItem value='Expansión'>Expansión</MenuItem>
                <MenuItem value='Lanzamiento'>Lanzamiento</MenuItem>
              </TextField>
          </div>  
          <div className="margin-25">
            <TextField
              select
              InputLabelProps={{
                  shrink: true,
              }}
              label="Tipo de Asistencia"
              className="form-control"
              value={requiredAssistance}
              onChange={handleRequiredAssistanceChange}>
              <MenuItem value='Ninguna'>Ninguna</MenuItem>
              <MenuItem value='Asuntos Legales'>Asuntos Legales</MenuItem>
              <MenuItem value='Prestamos'>Prestamos</MenuItem>
              <MenuItem value='Mentoria'>Mentoria</MenuItem>
            </TextField>
          </div>
          <div className="margin-25">
            <TextField
              label="Negocio está Operando Actualmente"
              select
              className="form-control"
              value={businessStatus}
              onChange={handleBusinessStatusChange}>
              <MenuItem value='true'>Si</MenuItem>
              <MenuItem value='false'>No</MenuItem>
            </TextField>
          </div>
          <div className="margin-25">
            <TextField
              InputLabelProps={{
                  shrink: true,
              }}  
              className="form-control"
              label="Tipo de Negocio"
              defaultValue=" "
              value={businessType}
              InputProps={{
                readOnly: true,
              }} />
          </div>
          <Button
            style={{'margin':'15px'}}
            className="form-control"
            disabled= {!validEmail || !validPhone || !validFirstName || !validLastName}
            variant="contained" color="primary" onClick={()=>{ updateProfile(); }}>
            Actualizar Tu Perfil
          </Button>
          <br/>
          <Button
                    href="/forgotPassword"
                    color="inherit"
                    className="form-control">
                        Cambiar Contrasena
                </Button>
        </form> 
      </Paper>

      <Paper className="paper-margin" elevation="10" >
        <div>
          <h1>Tu Camino a Recorrer</h1>
          <TableContainer>
            <Table aria-label="table" className={'rm-table'}>
              <TableBody >
                {roadmap.map((row) => (<RoadmapRow  key={row.name} row={row} />))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
                
      <Paper className="paper-margin" elevation="10" >
        <div>
          <h1>Tus Organizaciones</h1>
          <div>
            <TableContainer>
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
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Paper>
        
      <Alert
        isOpen={showErrorAlert}
        handleSubmit={onAlertClick}
        title="Error"
        text={errorMessage}
        submitButtonText="Ok" />
      <Spinner isShown={showLoading} />
    </div>
  );
}
export default UserProfile;
