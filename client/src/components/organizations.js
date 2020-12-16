import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Skeleton from '@material-ui/lab/Skeleton';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
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
  const [orgTypesCheck, setOrgTypesCheck] = useState({});
  const [orgStage, setOrgStage] = useState('');
  const [searchString, setsearchString] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [showLoadingOrgs, setShowLoadingOrgs] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  //Enter key event callback
  const onEnterPress = (event, inputName) => {
    if (event.key === 'Enter' || event.keyCode == 13) {
        if(inputName == 'filter') {
          searchOrganizations();
        }
    }
  };
//Organization Type Checkbox event callback
  const handleTypeCheckChange = (event) => {
    orgTypesCheck[event.target.name] = event.target.checked;
    setOrgTypesCheck({ ...orgTypesCheck, [event.target.name]: event.target.checked });
  };
//Aler event callback
  const onAlertClick = () => {
    setShowErrorAlert(false);
  };
//Organization Type event callback
  const handleOrgTypeChange = (event) => {
    setOrgType(event.target.value);
  };
  //Organization Stage event callback
  const handleOrgStageChange = (event) => {
    setOrgStage(event.target.value);
  };
  //Search event callback
  const handleSearchStringChange = (event) => {
    setsearchString(event.target.value);
  };
//Filter Organizations
//@param organizations
  function filterOrganizations(orgs) {
    var finalData = [];
    var tempData = [];
    for(var i = 0; i < orgs.length; i++) {
      var org = orgs[i];
      org.key = apiService.randomGuid();
      if(searchString && searchString.length > 0) {
        if(
            (org.name && String(org.name).toUpperCase().includes(searchString.toUpperCase())) ||
            (org.email && String(org.email).toUpperCase().includes(searchString.toUpperCase()))
        ) {
          if(finalData.filter(o => o.org_id == org.org_id).length == 0) {
            finalData.push(org);
          } 
        }
      }
      else {
        if(finalData.filter(o => o.org_id == org.org_id).length == 0) {
          finalData.push(org);
        }
      }
    }

    var selectedTypes = [];
    for(var i = 0; i < orgTypes.length; i ++) {
      if(orgTypesCheck[String(orgTypes[i].bt_id)]) {
        selectedTypes.push(orgTypes[i].bt_id);
      }
    }
    if(selectedTypes.length>0) {
      tempData = [...finalData];
      finalData = [];
      for(var i = 0; i < tempData.length; i++) {
        var org = tempData[i];
        var containsAllTypesSelected = true;
        for(var selectedTypeIndex = 0; selectedTypeIndex < selectedTypes.length; selectedTypeIndex ++) {
          var found = org.types.map(t=>t.bt_id).includes(selectedTypes[selectedTypeIndex]);
          //containsAllTypesSelected = containsAllTypesSelected && found;
          containsAllTypesSelected = containsAllTypesSelected || found;
        }
        if(containsAllTypesSelected) {
          if(finalData.filter(o => o.org_id == org.org_id).length == 0) {
            finalData.push(org);
          }
        }
      }
    }
    
    if(orgStage && String(orgStage).length>0) {
      tempData = [...finalData];
      finalData = [];
      for(var i = 0; i < tempData.length; i++) {
        var org = tempData[i];
        if(org && String(org.bstage_id) == String(orgStage)) {
          if(finalData.filter(o => o.org_id == org.org_id).length == 0) {
            finalData.push(org);
          }
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
    const [open, setOpen] = useState(false);
    
    return (
      <React.Fragment>
        <TableRow>
          <TableCell style={{paddingRight: "0px", width:"40px"}}>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
          </TableCell>
          <TableCell style={{paddingLeft: "0px"}} component="h5" scope="row">
              {row.name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={16}>
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
                      <h3 className="center-text"><span className="light-text">Tipo(s):</span></h3>
                      {row.types.map((type) => ( <h3 className="center-text">{type.description}</h3> ))}
                    </Grid>
                    <Grid item xs={12}>
                      <h3 className="light-text" style={{marginTop: "-15px"}}>Descripción: </h3>
                      <h3>{row.description}</h3>
                    </Grid>
                    {row.org_link && row.org_link.length>0 && (<Grid style={{marginBottom: "20px"}} item xs={12}><Link href={row.org_link} target='_blank' style={{color: "#333333", textDecoration: "underline"}}>Ver más información</Link></Grid>)}
                  </Grid>
              </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  useEffect(async ()=>{
    setShowLoading(true);
    setShowLoadingOrgs(true);
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
    !apiService.isAuthenticated() ? <Redirect to="/login" /> :
    <div className="top-margin">
      <Paper className="paper-margin" elevation={10}>
        <h1>Organizaciones</h1>
        <TableContainer>
          <div>
            <FormControl className={classes.formControl} style={{'margin':'15px', 'width':'100%'}}>
              <TextField
                  style={{margin:"auto"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Búsqueda"
                  className="form-control"
                  onKeyDown={(e)=>{onEnterPress(e,"filter")}}
                  onChange={handleSearchStringChange}
                  value={searchString} />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} style={{'margin':'15px'}}>
              <small style={{display: "block", textAlign:"center"}}>Tipo(s) de Negocio</small>
                {orgTypes.map((type) => (
                  <FormControlLabel
                    control={<Checkbox checked={orgTypesCheck[String(type.bt_id)]} onChange={handleTypeCheckChange} name={type.bt_id} />}
                    label={type.description} />
                ))}
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
          {!showLoadingOrgs && (
            <Table aria-label="collapsible table">
              <TableBody>
                {organizationData.map((organization) => ( <Row key={organization.key} row={organization} /> ))}
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