import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";
import { Step } from '@material-ui/core';

export default function Organizations() {
  const newOrgModel = {
    name: '',
    email: '',
    phone_number: '',
    type: '',
    step: '',
    link: '',
    description: '',
    isActive: false
  };
  //State variables getters and setters
  const [fullOrganizationList, setFullOrganizationList] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [searchString, setsearchString] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const [openAddOrgModal, setOpenAddOrgModal] = React.useState(false);
  const [openEditOrgModal, setOpenEditOrgModal] = React.useState(false);
  const [lastSelectedOrg, setLastSelectedOrg] = useState({});

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('');
  const [type, setType] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  
  const [orgTypes, setOrgTypes] = useState([]);
  const [orgStages, setOrgStages] = useState([]);
  const [orgSteps, setOrgSteps] = useState([]);

  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validLink, setValidLink] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  
  //email validation helper function
  //@param email - user email
  //@return if it's valid or not
  function isValidEmail(email) {
    if(!email || email == null) {
      return false;
    }
    if(email && email.length == 0) {
        return true;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //phone validation helper function
  //@param email - organization email
  //@return if it's valid or not
  function isValidPhone(phone) {
    if(!phone || phone == null) {
      return false;
    }
    var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return String(phone).search (filter) != -1;
  }
//link validation helper function
//@param link - url link
//@return if it's valid or not
  function isValidLink(link) {
    if(!link || link == null) {
      return false;
    }
    const re = /\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/g;
    return re.test(String(link));
  }

  //name validation helper function
  //@param name - organization name 
    //@return if it's valid or not
  function isValidName(text) {
    if(!text || text == null) {
      return false;
    }
    return text.length >= 2;
  }
 //drescription validation helper function
  //@param text - organization description
    //@return if it's valid or not
  function isValidDescription(text) {
    if(!text || text == null) {
      return false;
    }
    return text.length >= 2;
  }

  const onAlertClick = () => {
    setShowErrorAlert(false);
  };

  const saveLastOrgSelected = (org) => {
    setLastSelectedOrg(org);
    setName(!org.name || org.name == null ? '' : org.name);
    setPhone(!org.phone_number || org.phone_number == '' ? undefined : org.phone_number);
    setEmail(!org.email || org.email == null ? '' : org.email);
    setType(org.bt_id);
    setStep(org.bs_id);
    setDescription(!org.description || org.description == null ? '' : org.description);
    setLink(!org.org_link || org.org_link == null ? '' : org.org_link);
  };

  //Event Handlers

  const handleNameTextChange = (event) => {
    setValidName(isValidName(event.target.value));
    setName(event.target.value);
  };
  const handleEmailTextChange = (event) => {
    setValidEmail(isValidEmail(event.target.value.trim()));
    setEmail(event.target.value.trim());
  };
  const handlePhoneTextChange = (event) => {
    setValidPhone(isValidPhone(event.target.value.trim()));
    setPhone(event.target.value.trim());
  };
  const handleTypeTextChange = (event) => {
    setType(event.target.value);
    var steps = apiService.getRoadmapSteps(event.target.value)
    if(steps && steps.length>0) {
      setOrgSteps(steps);
      setStep(steps[0])
    }
  };
  const handleStepTextChange = (event) => {
    setStep(event.target.value);
  };
  
  const handleLinkTextChange = (event) => {
    setValidLink(isValidLink(event.target.value));
    setLink(event.target.value);
  };
  const handleDescriptionTextChange = (event) => {
    setValidDescription(isValidDescription(event.target.value));
    setDescription(event.target.value);
  };
  const handleOpenDeleteAlertClickOpen = (org) => {
    saveLastOrgSelected(org);
    setOpenDeleteAlert(true);
  };

  const handleOpenDeleteAlertClose = () => {
    saveLastOrgSelected(newOrgModel);
    setOpenDeleteAlert(false);
  };
  
  const handleOpenAddOrgModalClickOpen = () => {
    if(orgTypes && orgTypes.length>0) {
      newOrgModel.bt_id = orgTypes[0].bt_id;
      if(orgSteps && orgSteps.length>0) {
        newOrgModel.bs_id = orgSteps[0].bs_id;
      }
    }
    if(orgStages && orgStages.length>0) {
      newOrgModel.bstage_id = orgStages[0].bstage_id;
    }
    saveLastOrgSelected(newOrgModel);
    setOpenAddOrgModal(true);
  };

  const handleOpenAddOrgModalClose = () => {
    saveLastOrgSelected(newOrgModel);
    setOpenAddOrgModal(false);
  };

  const handleOpenEditOrgModalClickOpen = (org) => {
    saveLastOrgSelected(org);
    setOpenEditOrgModal(true);
  };

  const handleOpenEditOrgModalClose = () => {
    saveLastOrgSelected(newOrgModel);
    setOpenEditOrgModal(false);
  };

  const handleSearchStringChange = (event) => {
    setsearchString(event.target.value);
  };
  //organizations filter
   //@param orgs - organizations
  function filterOrganizations(orgs) {
    var finalData = [];
    for(var i = 0; i < orgs.length; i++) {
      var org = orgs[i];
      if(searchString && searchString.length > 0) {
        if(
            (org.name && String(org.name).toUpperCase().includes(searchString.toUpperCase())) ||
            (org.email && String(org.email).toUpperCase().includes(searchString.toUpperCase()))
        ) {
          finalData.push(org);    
        }
      }
      else {
        finalData.push(org);  
      }
    }
    setOrganizationData(finalData)
  }

  //Enter key event callback
  const onEnterPress = (event, inputName) => {
    if (event.key === 'Enter' || event.keyCode == 13) {
        if(inputName == 'filter') {
            searchOrganizations();
        }
        else if(inputName == 'add-name') {
          const nextSibling = document.querySelector('input[name=add-phone]');
          if (nextSibling !== null) {
              nextSibling.focus();
          }
        }
        else if(inputName == 'add-phone') {
          const nextSibling = document.querySelector('input[name=add-email]');
          if (nextSibling !== null) {
              nextSibling.focus();
          }
        }
        else if(inputName == 'add-email') {
          const nextSibling = document.querySelector('input[name=add-link]');
          if (nextSibling !== null) {
              nextSibling.focus();
          }
        }
        else if(inputName == 'add-link') {
          const nextSibling = document.querySelector('input[name=add-description]');
          if (nextSibling !== null) {
              nextSibling.focus();
          }
        }
        else if(inputName == 'add-description') {
          addOrganization();
        }
        else if(inputName == 'edit-name') {
          const nextSibling = document.querySelector('input[name=edit-phone]');
          if (nextSibling !== null) {
              nextSibling.focus();
          }
        }
        else if(inputName == 'edit-phone') {
          const nextSibling = document.querySelector('input[name=edit-email]');
          if (nextSibling !== null) {
              nextSibling.focus();
          }
        }
        else if(inputName == 'edit-email') {
          const nextSibling = document.querySelector('input[name=edit-link]');
          if (nextSibling !== null) {
              nextSibling.focus();
          }
        }
        else if(inputName == 'edit-link') {
          const nextSibling = document.querySelector('input[name=edit-description]');
          if (nextSibling !== null) {
              nextSibling.focus();
          }
        }
        else if(inputName == 'edit-description') {
          editOrganization();
        }
    }
  };

  //populate organizations table 
  function searchOrganizations() {
    setShowLoading(true);
    if(fullOrganizationList.length == 0) {
      apiService.getRequest("organizations").then((organizationsResponse) => {
        setFullOrganizationList(organizationsResponse.data);
        filterOrganizations(organizationsResponse.data);
        setShowLoading(false);
        
      }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
        setShowErrorAlert(true);
      });
    }
    else {
      filterOrganizations(fullOrganizationList);
      setShowLoading(false);
    }
  }
  //adding an organization
  function addOrganization() {
    if(!validEmail || !email || email == null || !email.length>0 || 
      !validDescription || !description || description == null || !description.length>0 || 
      !validPhone || !phone || phone == null || !phone.length>0 || 
      !validName || !name || name == null || !name.length>0 || 
      !validLink || !link || link == null || !link.length>0) {
        return;
    }
    setShowLoading(true);
    var data = {
      name: name.trim(),
      email: email.trim(),
      phone_number: phone.trim(),
      bs_id: step,
      bt_id: type,
      org_link: link.trim(),
      is_active: true,
      description: description.trim()
    };
    handleOpenAddOrgModalClose();
    apiService.postRequest("organization", data).then((addResponse) => {
      apiService.getRequest("organizations").then((organizationsResponse) => {
        setFullOrganizationList(organizationsResponse.data);
        filterOrganizations(organizationsResponse.data);
        setShowLoading(false);
        
      }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
        setShowErrorAlert(true);
      });
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
      setShowErrorAlert(true);
    });
    saveLastOrgSelected(newOrgModel);
  }

  //editing an organization
  function editOrganization() {
    if(!validEmail || !email || email == null || !email.length>0 || 
      !validDescription || !description || description == null || !description.length>0 || 
      !validPhone || !phone || phone == null || !phone.length>0 || 
      !validName || !name || name == null || !name.length>0 || 
      !validLink || !link || link == null || !link.length>0) {
        return;
    }
    setShowLoading(true);
    var id = lastSelectedOrg.org_id
    var data = {
      org_id: id,
      name: name.trim(),
      email: email,
      phone_number: phone,
      bs_id: step,
      bt_id: type,
      org_link: link.trim(),
      is_active: isActive,
      description: description.trim()
    };
    handleOpenEditOrgModalClose();
    apiService.putRequest("organization", data).then((editResponse) => {
      apiService.getRequest("organizations").then((organizationsResponse) => {
        setFullOrganizationList(organizationsResponse.data);
        filterOrganizations(organizationsResponse.data);
        setShowLoading(false);
      }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
        setShowErrorAlert(true);
      });
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
      setShowErrorAlert(true);
    });
    saveLastOrgSelected(newOrgModel);
  }

  //deleting an organization
  function deleteOrganization() {
    setOpenDeleteAlert(false);
    setShowLoading(true);
    lastSelectedOrg.is_active = !lastSelectedOrg.is_active;
    var data = { is_active: String(lastSelectedOrg.is_active), org_id: lastSelectedOrg.org_id };
    apiService.putRequest("inactiveOrganization", data).then((organizationsResponse) => {
      apiService.getRequest("organizations").then((organizationsResponse) => {
        setFullOrganizationList(organizationsResponse.data);
        filterOrganizations(organizationsResponse.data);
        setShowLoading(false);
      }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
        setShowErrorAlert(true);
      });
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
      setShowErrorAlert(true);
    });
    for(var i = 0; i< fullOrganizationList.length; i++) {
      if(fullOrganizationList[i].org_id == lastSelectedOrg.org_id) {
        fullOrganizationList[i].is_active = lastSelectedOrg.is_active;
      }
      setFullOrganizationList(fullOrganizationList);
      filterOrganizations(fullOrganizationList);
    }
    saveLastOrgSelected(newOrgModel);
  }

  /*Table logic */
  const useRowStyles = makeStyles({
    root: {
      '& > *': {
      borderBottom: 'unset',
      }
    }
  });

  const classes = useRowStyles();

  function OrganizationRow(props) {
    const { row } = props;
    //const [open, setOpen] = useState(false);
    console.log(row.is_active);
    return (
      <React.Fragment>
        <TableRow>
          <div>
            <Button style={{'margin':'15px'}} variant="contained" color="primary" onClick={()=>{ handleOpenEditOrgModalClickOpen(row); }}>
              Editar
            </Button>
            <Button style={{'margin':'15px'}} variant="contained" color="secondary" onClick={()=>{ handleOpenDeleteAlertClickOpen(row); }}>
              Remover
            </Button>
          </div>
        </TableRow>
        <TableRow className={classes.root}>
          <TableCell scope="row">{row.name}</TableCell>
          <TableCell align="center">{row.phone_number}</TableCell>
          <TableCell align="center">{row.email}</TableCell>
          <TableCell align="center">{apiService.getOrgStage(row.bstage_id)}</TableCell>
          <TableCell align="center">{apiService.getOrgType(row.bt_id)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan="6" style={{padding: "0 80px 30px 80px"}}>
              <h4 style={{fontStyle:"italic", fontWeight: "bold"}}>Descripción:</h4>
              <p>
                {row.description}
              </p>
              {row.org_link && row.org_link.length > 0 && (<Link href={row.org_link} target='_blank'>Ver más información</Link>)}
            </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
    
  useEffect(async ()=>{
    setShowLoading(true);
    var orgTypesResponse = await apiService.refreshOrgTypes();
    var orgTypesTemp = orgTypesResponse.data;
    apiService.orgTypes(orgTypesTemp);
    setOrgTypes(orgTypesTemp);

    var orgStagesResponse = await apiService.refreshOrgStages();
    var orgStagesTemp = orgStagesResponse.data;
    apiService.orgStages(orgStagesTemp);
    setOrgStages(orgStagesTemp);

    var orgStepsResponse = await apiService.refreshOrgSteps();
    var orgStepsTemp = orgStepsResponse.data;
    apiService.orgSteps(orgStepsTemp);
    searchOrganizations();
  },[initialLoad])

  return (
    !apiService.isAdminAuthenticated() ?
    //If authenticated go to home page
    <Redirect to="/login" /> :
    
    <div className="top-margin">
      <Paper className="paper-margin" elevation={10}>
        <h1>Manejo de Organizaciones</h1>
        <TableContainer>
          <div>
            <div>
              <FormControl className={classes.formControl} style={{'margin':'15px', 'width':'100%'}}>
                <TextField
                    style={{margin:"auto"}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Busqueda"
                    className="form-control"
                    onKeyDown={(e)=>{onEnterPress(e, "filter")}}
                    onChange={handleSearchStringChange}
                    value={searchString} />
              </FormControl>
              <Button style={{'margin':'15px'}} variant="contained" color="primary" onClick={()=>{ searchOrganizations(); }}>
                Filtrar
              </Button>
            </div>
            <Button style={{'margin':'15px'}} variant="contained" className="add-btn" onClick={()=>{ handleOpenAddOrgModalClickOpen(); }}>
              Añadir Nueva Organización
            </Button>
          </div>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell component="h4">Nombre</TableCell>
                <TableCell component="h4" align="center">Teléfono</TableCell>
                <TableCell component="h4" align="center">Correo Electrónico&nbsp;</TableCell>
                <TableCell component="h4" align="center">Etapa&nbsp;</TableCell>
                <TableCell component="h4" align="center">Tipo&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizationData.map((organization) => ( <OrganizationRow key={organization.name} row={organization} />))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>    
    
    <Dialog
      open={openDeleteAlert}
      onClose={handleOpenDeleteAlertClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"¿Borrar Organización?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Estás seguro de que deseas eliminar esta organización?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpenDeleteAlertClose} color="primary">
          No
        </Button>
        <Button onClick={deleteOrganization} color="secondary" autoFocus>
          Si
        </Button>
      </DialogActions>
    </Dialog>
    

    <Dialog
      open={openAddOrgModal}
      onClose={handleOpenAddOrgModalClose}
      aria-labelledby="add-dialog-title"
      aria-describedby="add-dialog-description">
      <DialogTitle id="add-dialog-title">{"Nueva Organización"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="add-dialog-description">
          <Card variant="outlined" style={{margin:'30px'}}>
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                style={{width:'100%'}}
                className="form-control"
                label="Nombre:"
                name="add-name"
                onKeyDown={(e)=>{ onEnterPress(e, 'add-name'); }}
                error={!validName}
                onChange={handleNameTextChange}
                value={name} />
            </div>
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                style={{width:'100%'}}
                className="form-control"
                label="Telefono:"
                name="add-phone"
                onKeyDown={(e)=>{ onEnterPress(e, 'add-phone'); }}
                error={!validPhone}
                onChange={handlePhoneTextChange}
                value={phone} />
            </div>
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                className="form-control"
                label="Correo Electrónico:"
                name="add-email"
                onKeyDown={(e)=>{ onEnterPress(e, 'add-email'); }}
                error={!validEmail}
                style={{width:'100%'}}
                onChange={handleEmailTextChange}
                value={email} />
            </div>
            
            <div className="margin-25">
              <TextField
                  label="Tipo de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={type}
                  onChange={handleTypeTextChange}>
                  {orgTypes.map((type) => ( <MenuItem key={type.bt_id} value={type.bt_id}>{type.description}</MenuItem> ))}
              </TextField>
            </div>
            <div className="margin-25">
              <TextField
                  label="Paso de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={step}
                  onChange={handleStepTextChange}>
                  {orgSteps.map((type) => ( <MenuItem key={type.bs_id} value={type.bs_id}>{type.description}</MenuItem> ))}
              </TextField>
            </div>
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                style={{width:'100%'}}
                className="form-control"
                label="Enlace:"
                name="add-link"
                onKeyDown={(e)=>{ onEnterPress(e, 'add-link'); }}
                error={!validLink}
                onChange={handleLinkTextChange}
                value={link} />
            </div>  
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                style={{width:'100%'}}
                className="form-control"
                label="Descripción:"
                name="add-description"
                onKeyDown={(e)=>{ onEnterPress(e, 'add-description'); }}
                error={!validDescription}
                onChange={handleDescriptionTextChange}
                value={description} />
            </div>  

            
          </Card>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpenAddOrgModalClose} color="secondary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={addOrganization} color="primary" className="add-btn" variant="contained"
          disabled= {
            !validEmail || !email || email == null || !email.length>0 || 
            !validDescription || !description || description == null || !description.length>0 || 
            !validPhone || !phone || phone == null || !phone.length>0 || 
            !validName || !name || name == null || !name.length>0 || 
            !validLink || !link || link == null || !link.length>0
          }
          autoFocus>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
    

    <Dialog
      open={openEditOrgModal}
      onClose={handleOpenEditOrgModalClose}
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description">
      <DialogTitle id="edit-dialog-title">{"Editar Organización"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="edit-dialog-description">
        <Card variant="outlined" style={{margin:'30px'}}>
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                style={{width:'100%'}}
                className="form-control"
                label="Nombre:"
                name="edit-name"
                onKeyDown={(e)=>{ onEnterPress(e, 'edit-name'); }}
                error={!validName}
                onChange={handleNameTextChange}
                value={name} />
            </div>
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                style={{width:'100%'}}
                className="form-control"
                label="Telefono:"
                name="edit-phone"
                onKeyDown={(e)=>{ onEnterPress(e, 'edit-phone'); }}
                error={!validPhone}
                onChange={handlePhoneTextChange}
                value={phone} />
            </div>
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                className="form-control"
                label="Correo Electrónico:"
                name="edit-email"
                onKeyDown={(e)=>{ onEnterPress(e, 'edit-email'); }}
                error={!validEmail}
                style={{width:'100%'}}
                onChange={handleEmailTextChange}
                value={email} />
            </div>

            <div className="margin-25">
              <TextField
                  label="Tipo de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={type}
                  onChange={handleTypeTextChange}>
                  {orgTypes.map((type) => ( <MenuItem key={type.bt_id} value={type.bt_id}>{type.description}</MenuItem> ))}
              </TextField>
            </div>
            <div className="margin-25">
              <TextField
                  label="Paso de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={step}
                  onChange={handleStepTextChange}>
                  {orgSteps.map((type) => ( <MenuItem key={type.bs_id} value={type.bs_id}>{type.description}</MenuItem> ))}
              </TextField>
            </div>
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                style={{width:'100%'}}
                className="form-control"
                label="Enlace:"
                name="edit-link"
                onKeyDown={(e)=>{ onEnterPress(e, 'edit-link'); }}
                error={!validLink}
                onChange={handleLinkTextChange}
                value={link} />
            </div>  
            <div className="margin-25">
              <TextField
                InputLabelProps={{
                    shrink: true,
                }}  
                style={{width:'100%'}}
                className="form-control"
                label="Descripción:"
                name="edit-description"
                onKeyDown={(e)=>{ onEnterPress(e, 'edit-description'); }}
                error={!validDescription}
                onChange={handleDescriptionTextChange}
                value={description} />
            </div>  
          </Card>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpenEditOrgModalClose} color="secondary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={editOrganization} color="primary" variant="contained" className="add-btn"
          disabled= {!validEmail || !email.length>0 || !validPhone || !phone.length>0 || !validName || !name.length>0 || !validLink || !link.length>0}
          autoFocus>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>

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