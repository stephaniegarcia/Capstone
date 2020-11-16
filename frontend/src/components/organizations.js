import React, { useState, useEffect } from 'react';

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import Spinner from './loading'
import Alert from './alert'
import apiService from "./mockApiService";

export default function Organizations() {
  const [organizationData, setOrganizationData] = useState([]);
  const [orgType, setOrgType] = useState('');
  const [orgStage, setOrgStage] = useState('');
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

  //populate organizations table 
  function searchOrganizations() {
    setShowLoading(true);
    apiService.getRequest("organizations?type="+orgType+"&stage="+orgStage).then((organizationsResponse) => {
      setShowLoading(false);
      setOrganizationData(organizationsResponse)
    }).catch(err =>{
      setShowLoading(false);
      setErrorMessage(err.response.data);
      setShowErrorAlert(true);
    });
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
          <TableCell align="right">{row.phone}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.businessStage}</TableCell>
          <TableCell align="right">{row.businessType}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan="5" style={{padding: "0 80px 30px 80px"}}>
              <Typography gutterBottom component="div">
                Descripción:
              </Typography>
              {row.moreInfo.map((historyRow) => (
                <p>
                  {historyRow.description}
                </p>
              ))}
            </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  useEffect(()=>{
    searchOrganizations();
  },[initialLoad])

  return (
    !apiService.isAuthenticated() ? <Redirect to="/login" /> :
    <div className="top-margin">
      <Paper className="paper-margin" elevation="10">
        <h2>Organizaciones</h2>
        <TableContainer>
          <div>
            <FormControl className={classes.formControl} style={{'margin':'15px'}}>
              <InputLabel>Tipo</InputLabel>
              <Select
                style={{'width':'150px'}}
                value={orgType}
                onChange={handleOrgTypeChange}>
                <MenuItem value=''>Todos</MenuItem>
                <MenuItem value='Microempresa'>Microempresa</MenuItem>
                <MenuItem value='Comerciante'>Comerciante</MenuItem>
                <MenuItem value='Empresa Basada en Innovación'>Empresa Basada en Innovación</MenuItem>
                <MenuItem value='Empresa en Crecimiento'>Empresa en Crecimiento</MenuItem>
                <MenuItem value='Acceso a Capital'>Acceso a Capital</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} style={{'margin':'15px'}}>
              <InputLabel>Etapa</InputLabel>
              <Select
                style={{'width':'150px'}}
                value={orgStage}
                onChange={handleOrgStageChange}>
                <MenuItem value=''>Todos</MenuItem>
                <MenuItem value='Idea'>Idea</MenuItem>
                <MenuItem value='Prototipo'>Prototipo</MenuItem>
                <MenuItem value='Expansión'>Expansión</MenuItem>
                <MenuItem value='Lanzamiento'>Lanzamiento</MenuItem>
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