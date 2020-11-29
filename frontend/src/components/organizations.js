import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";

export default function Organizations() {
  const [fullOrganizationList, setFullOrganizationList] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [orgTypes, setOrgTypes] = useState([]);
  const [orgStages, setOrgStages] = useState([]);
  const [orgType, setOrgType] = useState('');
  const [orgStage, setOrgStage] = useState('');
  const [searchString, setsearchString] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const onAlertClick = () => {
    setShowErrorAlert(false);
  };

  const handleOrgTypeChange = (event) => {
    setOrgType(event.target.value);
  };
  const handleOrgStageChange = (event) => {
    setOrgStage(event.target.value);
  };
  const handleSearchStringChange = (event) => {
    setsearchString(event.target.value);
  };

  function filterOrganizations(orgs) {
    var finalData = [];
    var tempData = [];
    for(var i = 0; i < orgs.length; i++) {
      var org = orgs[i];
      if(org && searchString && searchString.length>0 && (org.name && String(org.name).toUpperCase().includes(searchString.toUpperCase())) || (org.phone && String(org.phone).includes(searchString)) || (org.email && String(org.email).toUpperCase().includes(searchString.toUpperCase()))) {
        finalData.push(org);
      }
    }

    if(orgType && String(orgType).length>0) {
      tempData = [...finalData];
      finalData = [];
      for(var i = 0; i < tempData.length; i++) {
        var org = tempData[i];
        if(org && String(org.bt_id) == String(orgType)) {
          finalData.push(org);
        }
      }
    }
    
    if(orgStage && String(orgStage).length>0) {
      tempData = [...finalData];
      finalData = [];
      for(var i = 0; i < tempData.length; i++) {
        var org = tempData[i];
        if(org && String(org.bstage_id) == String(orgStage)) {
          finalData.push(org);
        }
      }
    }

    setOrganizationData(finalData)
  }

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

  /*Table logic */
  const useRowStyles = makeStyles({
    root: {
      '& > *': {
      borderBottom: 'unset',
      }
    }
  });

  const classes = useRowStyles();

  function Row(props) {
    const { row } = props;
    //const [open, setOpen] = useState(false);
    
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            {/* <IconButton aria-label="expand row" size="small" onClick={() => row.open = !row.open }>
              {row.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton> */}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.phone_number}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{apiService.getOrgStage(row.bstage_id)}</TableCell>
          <TableCell align="right">{apiService.getOrgType(row.bt_id)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan="6" style={{padding: "0 80px 30px 80px"}}>
              <p style={{fontStyle:"italic", fontWeight: "bold"}}>Descripción:</p>
              <p>
                {row.description}
              </p>
              {row.org_link && row.org_link.length>0 && (<Link href={row.org_link} target='_blank'>Ver más información</Link>)}
            </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  useEffect(()=>{
    apiService.refreshOrgTypes().then(response => {
      var temp = response.data;
      apiService.orgTypes(temp);
      setOrgTypes(temp);
    }).catch(err =>{
    });
    apiService.refreshOrgStages().then(response => {
      var temp = response.data;
      apiService.orgStages(temp);
      setOrgStages(temp);
    }).catch(err =>{
    });

    searchOrganizations();
  },[initialLoad])

  return (
    !apiService.isAuthenticated() ? <Redirect to="/login" /> :
    <div className="top-margin">
      <Paper className="paper-margin" elevation={10}>
        <h2>Organizaciones</h2>
        <TableContainer>
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
          </div>
          <div>
            <FormControl className={classes.formControl} style={{'margin':'15px'}}>
              <InputLabel>Tipo</InputLabel>
              <Select
                style={{'width':'150px'}}
                value={orgType}
                onChange={handleOrgTypeChange}>
                  <MenuItem value=''>Todos</MenuItem>
                  {orgTypes.map((type) => ( <MenuItem key={type.bt_id} value={type.bt_id}>{type.description}</MenuItem> ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} style={{'margin':'15px'}}>
              <InputLabel>Etapa</InputLabel>
              <Select
                style={{'width':'150px'}}
                value={orgStage}
                onChange={handleOrgStageChange}>
                <MenuItem value=''>Todos</MenuItem>
                {orgStages.map((stage) => ( <MenuItem key={stage.bstage_id} value={stage.bstage_id}>{stage.description}</MenuItem> ))}
              </Select>
            </FormControl>
            <Button style={{'margin':'15px'}} variant="contained" color="primary" onClick={()=>{ searchOrganizations(); }}>
              Filtrar
            </Button>
          </div>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Teléfono</TableCell>
                <TableCell align="right">Correo Electrónico&nbsp;</TableCell>
                <TableCell align="right">Etapa&nbsp;</TableCell>
                <TableCell align="right">Tipo&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizationData.map((organization) => ( <Row key={organization.name} row={organization} /> ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>    
    <Alert
      isOpen={showErrorAlert}
      handleSubmit={onAlertClick}
      title="Error"
      text={errorMessage}
      submitButtonText="Ok"
    />
    <Spinner isShown={showLoading} />
    </div>
  );
}