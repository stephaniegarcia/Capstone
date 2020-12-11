import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
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
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';

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

  const [showLoadingOrgs, setShowLoadingOrgs] = React.useState(false);

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
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  
  const [orgTypes, setOrgTypes] = useState([]);
  const [orgTypesCheck, setOrgTypesCheck] = useState({});
  const [orgStages, setOrgStages] = useState([]);
  const [orgSteps, setOrgSteps] = useState([]);
  const [orgStage, setOrgStage] = useState('');
  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validLink, setValidLink] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [validType, setValidType] = useState(false);
  
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
    setStep(org.bs_id);
    setDescription(!org.description || org.description == null ? '' : org.description);
    setLink(!org.org_link || org.org_link == null ? '' : org.org_link);
  };

  //Event Handlers

  const handleTypeCheckChange = (event) => {
    orgTypesCheck[event.target.name] = event.target.checked;
    var atleastOneChecked = false;
    for(var i = 0; i < orgTypes.length; i ++) {
      if(orgTypesCheck[String(orgTypes[i].bt_id)]) {
        atleastOneChecked = true;
      }
    }
    setValidType(atleastOneChecked);
    setOrgTypesCheck({ ...orgTypesCheck, [event.target.name]: event.target.checked });
  };

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
  
  const handleOrgStageChange = (event) => {
    setOrgStage(event.target.value);
    var steps = apiService.getRoadmapSteps(event.target.value)
    if(steps && steps.length>0) {
      setOrgSteps(steps);
      setStep(steps[0].bs_id)
    }
  };

  const handleOpenAddOrgModalClickOpen = () => {
    if(orgTypes && orgTypes.length>0) {
      for(var i = 0; i < orgTypes.length; i++) {
        orgTypesCheck[String(orgTypes[i].bt_id)] = false;
        orgTypes[i].description = apiService.getOrgType(orgTypes[i].bt_id);
      }
      setOrgStage(orgStages[0].bstage_id);
      var steps = apiService.getRoadmapSteps(orgStages[0].bstage_id)
      if(steps && steps.length>0) {
        setOrgSteps(steps);
        setStep(steps[0].bs_id)
        newOrgModel.bs_id = steps[0].bs_id
      }
    }
    if(orgStages && orgStages.length>0) {
      newOrgModel.bstage_id = orgStages[0].bstage_id;
    }
    setValidType(false);
    saveLastOrgSelected(newOrgModel);
    setOpenAddOrgModal(true);
  };

  const handleOpenAddOrgModalClose = () => {
    saveLastOrgSelected(newOrgModel);
    setOpenAddOrgModal(false);
  };

  const handleOpenEditOrgModalClickOpen = (org) => {
    if(orgTypes && orgTypes.length>0) {
      for(var i = 0; i < orgTypes.length; i++) {
        var containsType = org.types.filter(o => o.bt_id == orgTypes[i].bt_id);
        orgTypesCheck[String(orgTypes[i].bt_id)] = containsType && containsType.length>0;
        orgTypes[i].description = apiService.getOrgType(orgTypes[i].bt_id);
      }

      for(var i = 0; i < orgStages.length; i++) {
        if(orgStages[i].bstage_id == org.bstage_id) {
          setOrgStage(orgStages[i].bstage_id);
        }
      }

      var steps = apiService.getRoadmapSteps(org.bstage_id)
      if(steps && steps.length>0) {
        setOrgSteps(steps);
        setStep(steps[0])
      }
    }

    setValidType(true);
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
      org.key = apiService.randomGuid();
      if(searchString && searchString.length > 0) {
        if(
            (org.name && String(org.name).toUpperCase().includes(searchString.toUpperCase())) ||
            (org.email && String(org.email).toUpperCase().includes(searchString.toUpperCase()))
        ) {
          if(finalData.filter(o => o.org_id == org.org_id).length == 0 && org.is_active) {
            finalData.push(org);
          }
        }
      }
      else {
        if(finalData.filter(o => o.org_id == org.org_id).length == 0 && org.is_active) {
          finalData.push(org);
        }
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
        setShowLoadingOrgs(false);
      }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
        setShowErrorAlert(true);
        setShowLoadingOrgs(false);
      });
    }
    else {
      filterOrganizations(fullOrganizationList);
      setShowLoading(false);
    }
  }
  //adding an organization
  function addOrganization() {
    var atleastOneChecked = false;
    for(var i = 0; i < orgTypes.length; i ++) {
      if(orgTypesCheck[String(orgTypes[i].bt_id)]) {
        atleastOneChecked = true;
      }
    }
    if(!validEmail || !email || email == null || !email.length>0 || 
      !validDescription || !description || description == null || !description.length>0 || 
      !validPhone || !phone || phone == null || !phone.length>0 || 
      !validName || !name || name == null || !name.length>0 || 
      !validLink || !link || link == null || !link.length>0 ||
      !validType || !atleastOneChecked) {
        return;
    }
    setShowLoading(true);
    var types = [];
    for(var i = 0; i < orgTypes.length; i++) {
      if(orgTypesCheck[String(orgTypes[i].bt_id)]) {
        types.push(orgTypes[i].bt_id);
      }
    }
    var selectedStage = orgStage;
    var data = {
      name: name.trim(),
      email: email.trim(),
      phone_number: phone.trim(),
      bs_id: step,
      bt_id: types,
      org_link: link.trim(),
      is_active: true,
      description: description.trim()
    };
    handleOpenAddOrgModalClose();
    apiService.postRequest("organization", data).then((addResponse) => {
      var newOrg = { };
      console.log(addResponse.data);
      newOrg.org_id = addResponse.data[0].org_id;
      newOrg.bstage_id = selectedStage;
      newOrg.name = data.name;
      newOrg.email = data.email;
      newOrg.bs_id = data.bs_id;
      newOrg.description = data.description;
      newOrg.org_link = data.org_link;
      newOrg.phone_number = data.phone_number;
      var finalTypes = [];
      for(var tempIndex = 0; tempIndex < types.length; tempIndex++) {
        var btId = types[tempIndex];
        finalTypes.push({ bt_id: btId, description: apiService.getOrgType(btId) })
      }
      newOrg.types = finalTypes;
      newOrg.is_active = true;
      fullOrganizationList.push(newOrg);
      setFullOrganizationList(fullOrganizationList);
      filterOrganizations(fullOrganizationList);
      setShowLoading(false);
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
      setShowErrorAlert(true);
    });
    saveLastOrgSelected(newOrgModel);
  }

  //editing an organization
  function editOrganization() {
    var atleastOneChecked = false;
    for(var i = 0; i < orgTypes.length; i ++) {
      if(orgTypesCheck[String(orgTypes[i].bt_id)]) {
        atleastOneChecked = true;
      }
    }
    if(!validEmail || !email || email == null || !email.length>0 || 
      !validDescription || !description || description == null || !description.length>0 || 
      !validPhone || !phone || phone == null || !phone.length>0 || 
      !validName || !name || name == null || !name.length>0 || 
      !validLink || !link || link == null || !link.length>0 ||
      !validType || !atleastOneChecked) {
        return;
    }
    setShowLoading(true);
    var id = lastSelectedOrg.org_id
    var types = [];
    for(var i = 0; i < orgTypes.length; i++) {
      if(orgTypesCheck[String(orgTypes[i].bt_id)]) {
        types.push(orgTypes[i].bt_id);
      }
    }
    var data = {
      org_id: id,
      name: name.trim(),
      email: email,
      phone_number: phone,
      bs_id: step,
      bt_id: types,
      org_link: link.trim(),
      is_active: true,
      description: description.trim()
    };
    handleOpenEditOrgModalClose();
    apiService.putRequest("organization", data).then((editResponse) => {
      for(var i = 0; i < fullOrganizationList.length; i++) {
        if(fullOrganizationList[i].org_id == data.org_id) {
          fullOrganizationList[i].name = data.name;
          fullOrganizationList[i].email = data.email;
          fullOrganizationList[i].bs_id = data.bs_id;
          fullOrganizationList[i].description = data.description;
          fullOrganizationList[i].org_link = data.org_link;
          fullOrganizationList[i].phone_number = data.phone_number;
          var finalTypes = [];
          for(var tempIndex = 0; tempIndex < types.length; tempIndex++) {
            var btId = types[tempIndex];
            finalTypes.push({ bt_id: btId, description: apiService.getOrgType(btId) })
          }
          fullOrganizationList[i].types = finalTypes;
        }
      }
      setFullOrganizationList(fullOrganizationList);
      filterOrganizations(fullOrganizationList);
      setShowLoading(false);
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
    apiService.putRequest("inactiveOrganization", data).then((removeResponse) => {
      for(var i = 0; i< fullOrganizationList.length; i++) {
        if(fullOrganizationList[i].org_id == lastSelectedOrg.org_id) {
          fullOrganizationList[i].is_active = lastSelectedOrg.is_active;
        }
      }
      setFullOrganizationList(fullOrganizationList);
      filterOrganizations(fullOrganizationList);
      setShowLoading(false);
      // apiService.getRequest("organizations").then((organizationsResponse) => {
        
      // }).catch(err =>{
      //   setShowLoading(false);
      //   setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
      //   setShowErrorAlert(true);
      // });
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
      setShowErrorAlert(true);
    });
    
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
    const [open, setOpen] = useState(false);
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
          </TableCell>
          <TableCell scope="row" className="collapse-header-buttons">
              <h5>{row.name}</h5>
              <div>
                <Button style={{'margin':'15px'}} variant="contained" color="primary" onClick={()=>{ handleOpenEditOrgModalClickOpen(row); }}>
                  Editar
                </Button>
                <Button style={{'margin':'15px'}} variant="contained" color="secondary" onClick={()=>{ handleOpenDeleteAlertClickOpen(row); }}>
                  Remover
                </Button>
              </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <h3 className="center-text light-text">Teléfono: </h3>
                      <h3 className="center-text">{row.phone_number}</h3>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <h3 className="center-text light-text">Correo electrónico: </h3>
                      <h3 className="center-text">{row.email}</h3>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <h3 className="center-text light-text">Etapa:</h3>
                      <h3 className="center-text">{apiService.getOrgStage(row.bstage_id)}</h3>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <h3 className="center-text light-text">Tipo(s):</h3>
                      {row.types.map((type) => ( <h3 className="center-text">{type.description}</h3> ))}
                    </Grid>
                    <Grid item xs={12}>
                      <h3 className="light-text">Descripción: </h3>
                      <h3>{row.description}</h3>
                    </Grid>
                    {row.org_link && row.org_link.length>0 && (<Grid item xs={12}><Link href={row.org_link} target='_blank'>Ver más información</Link></Grid>)}
                  </Grid>
              </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
    
  useEffect(async ()=>{
    setShowLoadingOrgs(true);
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
                    label="Búsqueda"
                    className="form-control"
                    onKeyDown={(e)=>{onEnterPress(e, "filter")}}
                    onChange={handleSearchStringChange}
                    value={searchString} />
              </FormControl>
              <Button style={{'margin':'15px'}} variant="contained" color="primary" onClick={()=>{ searchOrganizations(); }}>
                Filtrar
              </Button>
            </div>
            <Button style={{'margin':'15px', float: 'right'}} variant="contained" className="add-btn" onClick={()=>{ handleOpenAddOrgModalClickOpen(); }}>
              Añadir Nueva Organización
            </Button>
          </div>
          {!showLoadingOrgs && (
            <Table aria-label="collapsible table">
              <TableBody>
                {organizationData.map((organization) => ( <OrganizationRow key={organization.key} row={organization} /> ))}
              </TableBody>
            </Table>
          )}
          {showLoadingOrgs && (
            <div>
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
              <Skeleton style={{marginBottom: "10px"}} variant="rect" height={80} />
            </div>
          )}
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
        <Button onClick={handleOpenDeleteAlertClose} variant="contained" color="primary">
          No
        </Button>
        <Button onClick={deleteOrganization} color="secondary" variant="contained" autoFocus>
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
                helperText={!validName ? "Nombre inválido" : ""}
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
                label="Teléfono:"
                name="add-phone"
                onKeyDown={(e)=>{ onEnterPress(e, 'add-phone'); }}
                error={!validPhone}
                helperText={!validPhone ? "Teléfono inválido" : ""}
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
                helperText={!validEmail ? "Correo electrónico inválido" : ""}
                style={{width:'100%'}}
                onChange={handleEmailTextChange}
                value={email} />
            </div>
            
            <div className="margin-25">
                <small style={{display: "block", textAlign:"center"}}>Tipo(s) de Negocio</small>
                {orgTypes.map((type) => (
                  <FormControlLabel
                    control={<Checkbox checked={orgTypesCheck[String(type.bt_id)]} onChange={handleTypeCheckChange} name={type.bt_id} />}
                    label={type.description} />
                ))}
            </div>
            
            
            <div className="margin-25">
              <TextField
                  label="Etapa de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={orgStage}
                  onChange={handleOrgStageChange}>
                  {orgStages.map((type) => ( <MenuItem key={'stage'+type.bstage_id} value={type.bstage_id}>{type.description}</MenuItem> ))}
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
                helperText={!validLink ? "Enlace inválido" : ""}
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
                helperText={!validDescription ? "Descripción inválido" : ""}
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
            !validLink || !link || link == null || !link.length>0 ||
            !validType
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
                helperText={!validName ? "Nombre inválido" : ""}
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
                label="Teléfono:"
                name="edit-phone"
                onKeyDown={(e)=>{ onEnterPress(e, 'edit-phone'); }}
                error={!validPhone}
                helperText={!validPhone ? "Teléfono inválido" : ""}
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
                helperText={!validEmail ? "Correo electrónico inválido" : ""}
                style={{width:'100%'}}
                onChange={handleEmailTextChange}
                value={email} />
            </div>

            <div className="margin-25">
              <small style={{display: "block", textAlign:"center"}}>Tipo(s) de Negocio</small>
              {orgTypes.map((type) => (
                <FormControlLabel
                  control={<Checkbox checked={orgTypesCheck[String(type.bt_id)]} onChange={handleTypeCheckChange} name={type.bt_id} />}
                  label={type.description} />
              ))}
            </div>
            <div className="margin-25">
              <TextField
                  label="Etapa de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={orgStage}
                  onChange={handleOrgStageChange}>
                  {orgStages.map((type) => ( <MenuItem key={'stage'+type.bstage_id} value={type.bstage_id}>{type.description}</MenuItem> ))}
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
                helperText={!validLink ? "Enlace inválido" : ""}
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
                helperText={!validDescription ? "Descripción inválido" : ""}
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
          disabled= {!validEmail || !email.length>0 || !validPhone || !phone.length>0 || !validName || !name.length>0 || !validLink || !link.length>0 || !validType}
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