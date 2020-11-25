import React, { useState, useEffect } from 'react';

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import Spinner from './loading'
import Alert from './alert'
import apiService from "./mockApiService";
//import apiService from "./apiService";

export default function Organizations() {
  const newOrgModel = {
    name: '',
    email: '',
    phone: '',
    stage: 'Idea',
    type: 'Microempresa',
    link: '',
    description: ''
  };

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
  const [stage, setStage] = useState('');
  const [type, setType] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');

  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validLink, setValidLink] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  
  //email validation helper function
  function isValidEmail(email) {
    if(email && email.length == 0) {
        return true;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //phone validation helper function
  function isValidPhone(phone) {
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(String(phone));
  }

  function isValidLink(link) {
    const re = /\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/g;
    return re.test(String(link));
  }

  //name validation helper function
  function isValidName(text) {
    return text.length >= 2;
  }

  function isValidDescription(text) {
    return text.length >= 2;
  }

  const onAlertClick = () => {
    setShowErrorAlert(false);
  };

  const saveLastOrgSelected = (org) => {
    setLastSelectedOrg(org);
    setName(org.name);
    setPhone(org.phone);
    setEmail(org.email);
    setType(org.type);
    setStage(org.stage);
    setLink(org.link);
  };
  
  const handleNameTextChange = (event) => {
    setValidName(isValidName(event.target.value));
    setName(event.target.value);
  };
  const handleEmailTextChange = (event) => {
    setValidEmail(isValidEmail(event.target.value));
    setEmail(event.target.value);
  };
  const handlePhoneTextChange = (event) => {
    setValidPhone(isValidPhone(event.target.value));
    setPhone(event.target.value);
  };
  const handleStageTextChange = (event) => {
    setStage(event.target.value);
  };
  const handleTypeTextChange = (event) => {
    setType(event.target.value);
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

  function filterOrganizations(organizations) {
    var finalData = [];
    for(var i = 0; i < organizations.length; i++) {
      var org = organizations[i];
      if(org && (org.name && String(org.name).includes(searchString)) || (org.phone && String(org.phone).includes(searchString)) || (org.email && String(org.email).includes(searchString))) {
        finalData.push(org);
      }
    }
    return finalData;
  }

  //populate organizations table 
  function searchOrganizations() {
    setShowLoading(true);
    apiService.getRequest("admin/organizations").then((organizationsResponse) => {
      var finalData = filterOrganizations(organizationsResponse);
      setShowLoading(false);
      setOrganizationData(finalData);
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err.response.data);
      setShowErrorAlert(true);
    });
  }

  function addOrganization() {
    setShowLoading(true);
    var data = {
      name: name,
      email: email,
      phone: phone,
      stage: stage,
      type: type,
      link: link,
      description: description
    };
    handleOpenAddOrgModalClose();
    apiService.postRequest("admin/organization", data).then((organizationsResponse) => {
      setShowLoading(false);
      setOrganizationData(organizationsResponse)
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err.response.data);
      setShowErrorAlert(true);
    });
    saveLastOrgSelected(newOrgModel);
  }

  function editOrganization() {
    setShowLoading(true);
    var id = lastSelectedOrg.id
    var data = {
      name: name,
      email: email,
      phone: phone,
      stage: stage,
      type: type,
      link: link,
      description: description
    };
    handleOpenEditOrgModalClose();
    apiService.putRequest("admin/organization?id=" + id, data).then((organizationsResponse) => {
      setShowLoading(false);
      setOrganizationData(organizationsResponse)
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err.response.data);
      setShowErrorAlert(true);
    });
    saveLastOrgSelected(newOrgModel);
  }

  function deleteOrganization() {
    setOpenDeleteAlert(false);
    setShowLoading(true);
    apiService.deleteRequest("admin/organization?orgId="+lastSelectedOrg.id).then((organizationsResponse) => {
      var finalData = filterOrganizations(organizationsResponse);
      setShowLoading(false);
      setOrganizationData(finalData);
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err.response.data);
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
    //const [open, setOpen] = useState(false);
    
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
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.phone}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.bs_id}</TableCell>
          <TableCell align="right">{row.bt_id}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan="6" style={{padding: "0 80px 30px 80px"}}>
              <Typography gutterBottom component="div">
                Descripción:
              </Typography>
              <p>
                {row.description}
              </p>
              <Link href={row.link} target='_blank'>Ver más información</Link>
            </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
    
  useEffect(()=>{
    searchOrganizations();
  },[initialLoad])

  return (
    // !apiService.isAuthenticated() ? <Redirect to="/login" /> :
    <div className="top-margin">
      <Paper className="paper-margin" elevation={10}>
        <h2>Manejo de Organizaciones</h2>
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
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Teléfono</TableCell>
                <TableCell align="right">Correo Electrónico&nbsp;</TableCell>
                <TableCell align="right">Etapa&nbsp;</TableCell>
                <TableCell align="right">Tipo&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizationData.map((organization) => ( <OrganizationRow key={organization.name} row={organization} />))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>    
    <Alert
      isOpen={showErrorAlert}
      handleSubmit={onAlertClick}
      title="Error"
      text={errorMessage}
      submitButtonText="Ok" />
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
                error={!validEmail}
                style={{width:'100%'}}
                onChange={handleEmailTextChange}
                value={email} />
            </div>
            <div className="margin-25">
              <TextField
                  label="Etapa de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={stage}
                  onChange={handleStageTextChange}>
                  <MenuItem value='Idea'>Idea</MenuItem>
                  <MenuItem value='Prototipo'>Prototipo</MenuItem>
                  <MenuItem value='Expansión'>Expansión</MenuItem>
                  <MenuItem value='Lanzamiento'>Lanzamiento</MenuItem>
              </TextField>
            </div>
            <div className="margin-25">
              <TextField
                  label="Tipo de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={type}
                  onChange={handleTypeTextChange}>
                  <MenuItem value='Microempresa'>Microempresa</MenuItem>
                  <MenuItem value='Comerciante'>Comerciante</MenuItem>
                  <MenuItem value='Empresa Basada en Innovación'>Empresa Basada en Innovación</MenuItem>
                  <MenuItem value='Empresa en Crecimiento'>Empresa en Crecimiento</MenuItem>
                  <MenuItem value='Acceso a Capital'>Acceso a Capital</MenuItem>
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
                error={!validDescription}
                onChange={handleDescriptionTextChange}
                value={link} />
            </div>  

            
          </Card>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpenAddOrgModalClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={addOrganization} color="primary"
          disabled= {!validEmail || !email.length>0 || !validDescription || !description.length>0 || !validPhone || !phone.length>0 || !validName || !name.length>0 || !validLink || !link.length>0}
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
                error={!validEmail}
                style={{width:'100%'}}
                onChange={handleEmailTextChange}
                value={email} />
            </div>
            <div className="margin-25">
              <TextField
                  label="Etapa de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={stage}
                  onChange={handleStageTextChange}>
                  <MenuItem value='Idea'>Idea</MenuItem>
                  <MenuItem value='Prototipo'>Prototipo</MenuItem>
                  <MenuItem value='Expansión'>Expansión</MenuItem>
                  <MenuItem value='Lanzamiento'>Lanzamiento</MenuItem>
              </TextField>
            </div>
            <div className="margin-25">
              <TextField
                  label="Tipo de Negocio"
                  select
                  style={{width:'100%', textAlign: "center"}}
                  className="form-control"
                  value={type}
                  onChange={handleTypeTextChange}>
                  <MenuItem value='Microempresa'>Microempresa</MenuItem>
                  <MenuItem value='Comerciante'>Comerciante</MenuItem>
                  <MenuItem value='Empresa Basada en Innovación'>Empresa Basada en Innovación</MenuItem>
                  <MenuItem value='Empresa en Crecimiento'>Empresa en Crecimiento</MenuItem>
                  <MenuItem value='Acceso a Capital'>Acceso a Capital</MenuItem>
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
                error={!validLink}
                onChange={handleLinkTextChange}
                value={link} />
            </div>  
          </Card>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpenEditOrgModalClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={editOrganization} color="primary"
          disabled= {!validEmail || !email.length>0 || !validPhone || !phone.length>0 || !validName || !name.length>0 || !validLink || !link.length>0}
          autoFocus>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>

    <Spinner isShown={showLoading} />
    </div>
  );
}