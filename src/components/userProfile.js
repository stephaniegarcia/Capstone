import * as React from 'react';
import { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import Spinner from './loading'
import Alert from './alert'
import ReactToPrint from "react-to-print";
import '../index.css';
//import apiService from "./mockApiService";
import apiService from "./apiService";

function UserProfile() {
  //State Variables getters & setters
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [spacing, setSpacing] = React.useState(1);
  const [name, setName] = React.useState('Composed TextField');
  const [userId, setUserId] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [businessType, setBusinessType] = React.useState('');
  const [businessStage, setBusinessStage] = React.useState('');
  const [requiredAssistance, setRequiredAssistance] = React.useState('');
  const [businessStatus, setBusinessStatus] = React.useState(false);
  const [organizations, setOrganizations] = React.useState([]);
  const [roadmap, setRoadmap] = React.useState([]);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [showLoading, setShowLoading] = React.useState(false);
  const [allowUpdate, setAllowUpdate] = React.useState(true);
  const [validFirstName, setValidFirstName] = React.useState(true);
  const [validLastName, setValidLastName] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPhone, setValidPhone] = React.useState(true);
  const [orgTypes, setOrgTypes] = React.useState([]);
  const [orgStages, setOrgStages] = React.useState([]);

  //Event 
  //Enter key event callback
  const onEnterPress = (event, inputName) => {
    if (event.key === 'Enter' || event.keyCode == 13) {
      if(inputName == 'name') {
        const nextSibling = document.querySelector('input[name=lastname]');
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
      else if(inputName == 'lastname') {
        const nextSibling = document.querySelector('input[name=phone]');
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
      else if(inputName == 'phone') {
        updateProfile();
      }
    }
  };

  //change password handler
  const handleChangePassword = () => {
    setShowLoading(true);  
    var profile = apiService.profile();
    apiService.postRequest('user/changePassword', {email:profile.email}).then(response => {
      setShowLoading(false);
      setMessage("Se envió un correo electrónico para completar el proceso de recuperación de contraseña");
      setShowMessageAlert(true);
    }).catch(err => {
      setShowLoading(false);
      setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
      setShowErrorAlert(true);
    });
  };

  //alert button click event callback
  const onAlertClick = () => {
    setShowErrorAlert(false);
  };

  const onMessageAlertClick = () => {
    setShowMessageAlert(false);
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

  //organization feedback submit event
  const setOrgRating = (id, rating, comments) => {
    handleClose();
    var data = { rating: parseInt(rating), user_id: userId, organization_id: id, rating_comment: comments.trim() };
    apiService.postRequest("ratings", data);
  };

  //Organization row snippet
  function Row(props) {
    const { row } = props;
    const [rating, setRating] = React.useState(row.rating);
    const [comments, setComments] = React.useState(row.comments);
    const handleRatingChange = (event) => {
      setRating(event.target.value);
    };
    const handleCommentsChange = (event) => {
      setComments(event.target.value);
    };
    var orgStage = '';
        if(row.bstage_id) {
          orgStage = apiService.getOrgStage(row.bstage_id);
        }
        else {
          var step = apiService.getOrgStep(row.bs_id);
          if(step) {
            orgStage = apiService.getOrgStage(step.bstage_id);
          }
        }
    return (
      <React.Fragment>
        <TableRow >
          <TableCell className="no-bottom-border"></TableCell>
          <TableCell className="no-bottom-border" scope="row">{row.name}</TableCell>
          <TableCell className="no-bottom-border" align="center">{row.phone_number}</TableCell>
          <TableCell className="no-bottom-border" align="center">{row.email}</TableCell>
          <TableCell className="no-bottom-border" align="center">{orgStage}</TableCell>
          <TableCell className="no-bottom-border" align="center">{apiService.getOrgType(row.bt_id)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan="6" style={{padding: "0 80px 30px 80px"}}>
            <h4 style={{fontStyle:"italic", fontWeight: "bold"}}>Descripción:</h4>
            <p>
              {row.description}
            </p>
              {row.org_link && row.org_link.length>0 && (<Link href={row.org_link} target='_blank'>Ver más información</Link>)}
              <div style={{marginTop: "15px"}}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                  Calificar
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Calificar</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Déjanos saber como ha sido la calidad del servicio y tu experiencia con esta organización
                    </DialogContentText>
                    <Rating
                        value={rating}
                        onChange={handleRatingChange} />
                    <TextField
                      autoFocus
                      value={comments}
                      onChange={handleCommentsChange}
                      margin="dense"
                      label="Comentario"
                      fullWidth />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancelar
                    </Button>
                    <Button onClick={()=>{ setOrgRating(row.org_id, rating, comments); }} color="primary">
                      Someter
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
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
            {row.name}
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
    var orgTypeCss = apiService.getOrgTypeCssName(row.bt_id);
    var className = orgTypeCss+" rm-curve ";
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
              <Button style={buttonStyle} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
              <img style={{maxWidth:"30px"}} src="images/touch_icon.png" />
              </Button>
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
                  <h4>Organizaciones</h4>
                  <Table>
                    {row.orgs.map((org) => (<RoadmapOrganizationRow  key={row.org_id} row={org} />))}
                  </Table>
                </div>
              </Popover>
              <h5>{row.description}</h5>
            </div>
        </TableRow>
      </React.Fragment>
    );
  }

  //get profile from current session
  function getProfile() {
    var profile = apiService.profile();
    if(profile) {
      setUserId(profile.user_id);
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setEmail(profile.email);
      setPhone(profile.phone_number);
      setBusinessStage(profile.bstage_id);
      setBusinessStatus(String(profile.business_status));
      setRequiredAssistance(profile.requested_assistance && profile.requested_assistance != null ? profile.requested_assistance : 'Ninguna');

      setBusinessType(profile.bt_id);
      if(profile.bt_id && profile.bt_id != null) {

        var roadmapSteps = apiService.getRoadmapSteps(profile.bt_id, profile.bstage_id);

        apiService.getRequest('tce/roadmap/organizations/'+profile.bt_id).then(response => {
          //Handle organization response
          if(!response.data) {
            response.data = [];
          }
          for(var i = 0; i < roadmapSteps.length; i++) {
            var step = roadmapSteps[i];
            step.index = i+1;
            step.orgs = response.data.filter(o => o.bs_id == step.bs_id);
          }
          console.log(roadmapSteps);
          setRoadmap(roadmapSteps);
          setOrganizations(response.data);          
        }).catch(err =>{
          //Handle error
          setShowLoading(false);
          setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
          setShowErrorAlert(true);
        });
      }
    }
  }

  //update profile button click event callback
  const updateProfile = () => {
    if(!validEmail || !validPhone || !validFirstName || !validLastName) {
      setErrorMessage('Valide la información antes de continuar');
      setShowErrorAlert(true);
      return;
    }

    var data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone_number: phone,
      bstage_id: businessStage,
      requested_assistance: requiredAssistance,
      
      //business_status: String(businessStatus).toLowerCase() == 'true'
      business_status: String(businessStatus)
    };

    console.log(data);
    var profile = apiService.profile();
    setShowLoading(true);
    apiService.putRequest("user/"+profile.user_id, data).then(response => {
        setShowLoading(false);
        apiService.profile(response.data[0]);
        getProfile();
    }).catch(err =>{
        debugger;
        setShowLoading(false);
        setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
        setShowErrorAlert(true);
    });
  };
//Rating and Comment Button
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Load profile into view
  React.useEffect(async ()=> {
    setShowLoading(true);
    var orgTypesResponse = await apiService.refreshOrgTypes();
    var orgTypesTemp = orgTypesResponse.data;
    console.log(orgTypesTemp);
    apiService.orgTypes(orgTypesTemp);
    setOrgTypes(orgTypesTemp);

    var orgStagesResponse = await apiService.refreshOrgStages();
    var orgStagesTemp = orgStagesResponse.data;
    apiService.orgStages(orgStagesTemp);
    setOrgStages(orgStagesTemp);

    var orgStepsResponse = await apiService.refreshOrgSteps();
    var orgStepsTemp = orgStepsResponse.data;
    apiService.orgSteps(orgStepsTemp);

    setTimeout(()=>{
      getProfile();
    }, 500);
    setShowLoading(false);
  }, [shouldLoad]);

  const organizationsRef = useRef();
  const roadmapRef = useRef();

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
              name="name"
              onKeyDown={(e)=>{ onEnterPress(e, 'name'); }}
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
              name="lastname"
              onKeyDown={(e)=>{ onEnterPress(e, 'lastname'); }}
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
              disabled={true}
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
              name="phone"
              onKeyDown={(e)=>{ onEnterPress(e, 'phone'); }}
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
                {orgStages.map((stage) => ( <MenuItem key={stage.bstage_id} value={stage.bstage_id}>{stage.description}</MenuItem> ))}
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
              value={apiService.getOrgType(businessType)}
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
            onClick={handleChangePassword}
            color="primary"
            variant="contained"
            className="form-control secondary-button">
              Cambiar Contrasena
          </Button>
        </form> 
      </Paper>

      {(businessType && businessType != null) ? (
          <div>
            <div>
              <Paper className="paper-margin" elevation={10} >
                <div ref={roadmapRef}>
                  <h1>Nos indicaste que tu negocio esta en etapa de {apiService.getOrgStage(apiService.profile().bstage_id)}</h1>
                  <h2>Este sera tu camino a recorrer:</h2>
                  
                  {apiService.getOrgTypeVideo(businessType) && apiService.getOrgTypeVideo(businessType) != null && (
                    <iframe src={apiService.getOrgTypeVideo(businessType)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  )}
                  <img className="org-type-icon" src={"images/"+apiService.getOrgTypeIcon(businessType)} />
                  <TableContainer style={{marginTop:"15px"}}>
                    <Table aria-label="table" className={'rm-table'}>
                      <TableBody >
                        {roadmap.map((row) => (<RoadmapRow  key={row.name} row={row} />))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <ReactToPrint
                  trigger={() => <Button style={{'margin':'15px'}} variant="contained" color="primary">Guardar a Pdf</Button>}
                  content={() => roadmapRef.current} />
              </Paper>        
              <Paper className="paper-margin" elevation={10} >
                <div ref={organizationsRef}>
                <h1>Aqui se muestran todas las organizaciones mencionadas en el recorrido: </h1>
                <h2>Organizaciones</h2>
                  <div>
                    <TableContainer>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell component="h4">Nombre</TableCell>
                            <TableCell component="h4" align="center">Teléfono</TableCell>
                            <TableCell component="h4" align="center">Correo Electrónico&nbsp;</TableCell>
                            <TableCell component="h4" align="center">Etapa&nbsp;</TableCell>
                            <TableCell component="h4" align="center">Tipo&nbsp;</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody >
                          {organizations.map((row) => (<Row  key={row.name} row={row} />))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
                <ReactToPrint
                  trigger={() => <Button style={{'margin':'15px'}} variant="contained" color="primary">Guardar a Pdf</Button>}
                  content={() => organizationsRef.current} />
              </Paper>  
            </div>
          </div>
      ): (
        <Paper className="paper-margin" elevation={10} >
          <div>
            <h1>Tu camino empresarial</h1>
            <h2>Completa tu Camino empresarial para ver mas informacion.</h2>
          </div>
        </Paper>
      )}
      <Alert
        isOpen={showErrorAlert}
        handleSubmit={onAlertClick}
        title="Error"
        text={errorMessage}
        submitButtonText="Ok" />
      <Alert
        isOpen={showMessageAlert}
        handleSubmit={onMessageAlertClick}
        title="Restablecimiento de contraseña"
        text={message}
        submitButtonText="Ok" />
      <Spinner isShown={showLoading} />
    </div>
  );
}
export default UserProfile;
