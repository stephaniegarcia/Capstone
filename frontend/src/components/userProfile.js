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
import Rating from '@material-ui/lab/Rating';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from './loading'
import Alert from './alert'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import '../index.css';
import apiService from "./mockApiService";
//import apiService from "./apiService";

function UserProfile() {
  //State Variables getters & setters
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [spacing, setSpacing] = React.useState(1);
  const [name, setName] = React.useState('Composed TextField');
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

  //alert button click event callback
  const onAlertClick = () => {
    setShowErrorAlert(false);
  };

  //email validation helper function
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  //phone validation helper function
  function isValidPhone(phone) {
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(String(phone));
  }
  
  //name validation helper function
  function isValidName(text) {
    const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    return text.length >= 2 && re.test(String(text))
  }
  
  //first name change event callback
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value.trim());
    setValidFirstName((isValidName(event.target.value.trim())));
  };
  
  //last name change event callback
  const handleLastNameChange = (event) => {
    setLastName(event.target.value.trim());
    setValidLastName((isValidName(event.target.value.trim())));
  };
  
  //email change event callback
  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase().trim());
    setValidEmail((isValidEmail(event.target.value.trim())));
  };
  
  //phone change event callback
  const handlePhoneChange = (event) => {
    setPhone(event.target.value.trim());
    setValidPhone((isValidPhone(event.target.value.trim())));
  };
  
  //business stage change event callback
  const handleBusinessStageChange = (event) => {
    setBusinessStage(event.target.value);
  };
  
  //business status change event callback
  const handleBusinessStatusChange = (event) => {
    setBusinessStatus(event.target.value);
  };
  
  //require assistance change event callback
  const handleRequiredAssistanceChange = (event) => {
    setRequiredAssistance(event.target.value);
  };

  //organization rating change event callback
  const setOrgRating = (id, rating) => {
    var data = {organizationId: id, rating: rating};
    apiService.postRequest("organization/rating", data);
  };

  //organization check change event callback
  const setOrgChecked = (id, check) => {
    var data = {organizationId: id, checked: check};
    apiService.postRequest("organization/tracking", data);
  };

  //Organization row snippet
  function Row(props) {
    const { row } = props;
    const [rating, setRating] = React.useState(row.rating);
    const [check, setCheck] = React.useState(row.checked);
    const handleRatingChange = (event) => {
      setRating(event.target.value);
      setOrgRating(row.id, event.target.value)
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


<Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Clasificación
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Clasificación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Entra aquí tu clasificación y deja un comentario sobre la calidad del servicio de esta organización.
          </DialogContentText>
          <Rating
              value={rating}
              onChange={handleRatingChange} />
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comentario"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Someter
          </Button>
        </DialogActions>
      </Dialog>

      
            <br/>
            <br/>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  //Roadmap Organization row snippet
  function RoadmapOrganizationRow(props) {
    const { row } = props;
    return (
      <React.Fragment>            
        <TableRow>
          <TableCell>
            {row}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  //Roadmap row snippet
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

  //get profile from current session
  function getProfile() {
    var profile = apiService.profile();
    if(profile) {
      setFirstName(profile.firstname);
      setLastName(profile.lastname);
      setEmail(profile.email);
      setPhone(profile.phone_number);
      setBusinessType(profile.business_type);
      setBusinessStage(profile.business_stage);
      setBusinessStatus(String(profile.business_status));
      setRequiredAssistance(profile.required_assistance);

      if(!profile.organizations) {
        profile.organizations = [];
      }
      if(!profile.roadmap) {
        profile.roadmap = [];
      }
      setOrganizations(profile.organizations);
      setRoadmap(profile.roadmap);
    }
  }

  //update profile button click event callback
  const updateProfile = () => {
    var data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone_number: phone,
      business_stage: businessStage,
      required_assistance: requiredAssistance,
      business_status: String(businessStatus).toLowerCase() == 'true'
    };
    var profile = apiService.profile();
    setShowLoading(true);
    apiService.putRequest("user/"+profile.Id, data).then(response => {
        setShowLoading(false);
        apiService.profile(response);
        getProfile();
    }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err.response.data);
        setShowErrorAlert(true);
    });
  };

  //Load profile into view
  React.useEffect(()=> {
    getProfile();
  }, [shouldLoad]);

  //dialog logic
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    !apiService.isAuthenticated() ?
    //Redirect to login
    <Redirect to="/login" /> :
    
    //Show user profile page
    <div className="top-margin">
      <Paper className="paper-margin" elevation={10}>
      <h1>Tu Perfil</h1>
        <form noValidate autoComplete="off">
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
                    href="/passwordReset"
                    color="inherit"
                    className="form-control">
                        Cambiar Contrasena
                </Button>
        </form> 
      </Paper>

      <Paper className="paper-margin" elevation={10} >
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
                
      <Paper className="paper-margin" elevation={10} >
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
