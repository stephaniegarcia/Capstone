import React, { useState, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ReactToPrint from "react-to-print";
import IconButton from '@material-ui/core/IconButton';
import Spinner from './loading'
import SmallSpinner from './smallLoading'
import Alert from './alert'
import { BarChart, Bar, PieChart, Pie, Sector, Cell, Label, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import '../index.css';
//import apiService from "./mockApiService";
import apiService from "./apiService";


function AdminReports() {
    //State Variables getters & setters
    const [shouldLoad, setShouldLoad] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [loadingTopPerType, setLoadingTopPerType] = useState(true);
    const [loadingTopPerStage, setLoadingTopPerStage] = useState(true);
    const [loadingMostContacted, setLoadingMostContacted] = useState(true);
    const [loadingPoorPerforming, setLoadingPoorPerforming] = useState(true);
    const [loadingAccountsPerWeek, setLoadingAccountsPerWeek] = useState(true);
    const [loadingContactRate, setLoadingContactRate] = useState(true);
    const [loadingAverage, setLoadingAverage] = useState(true);
    const [today, setToday] = React.useState('');

    const [contactRate, setContactRate] = useState([]);
    const [averages, setAverages] = useState([]);
    const [topPerType, setTopPerType] = useState([]);
    const [topPerStage, setTopPerStage] = useState([]);
    const [mostContacted, setMostContacted] = useState([]);
    const [poorPerforming, setPoorPerforming] = useState([]);
    const [accountsPerWeek, setAccountsPerWeek] = useState([]);

    const reportsRef = useRef();

    //alert button click event callback
    const onAlertClick = () => {
        setShowErrorAlert(false);
    };
    const COLORS = ['#fcc449', '#ed4628'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(2)}%`}
            </text>
        );
    };

    const randomGuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    };

    //get profile from current session
    function getAnalytics() {
        apiService.refreshOrgTypes().then(async (response) => {
            var temp = response.data;
            var finalList = [];
            for (let index = 0; index < temp.length; index++) {
                const element = temp[index];
                var test = await apiService.getRequest("topTenPerBT/"+element.bt_id);
                if(test.data) {
                    finalList.push({ id:randomGuid(), name: apiService.getOrgType(element.bt_id), orgs: test.data });
                }
            }
            setTopPerType(finalList);
            setLoadingTopPerType(false);
        }).catch(err =>{
            setLoadingTopPerType(false);
        });

        apiService.refreshOrgStages().then(async (response) => {
            var temp = response.data;
            var finalList = [];
            for (let index = 0; index < temp.length; index++) {
                const element = temp[index];
                var test = await apiService.getRequest("topTenPerBS/"+element.bstage_id);
                if(test.data) {
                    finalList.push({ id:randomGuid(), name: element.description, orgs: test.data });
                }
            }
            setTopPerStage(finalList);
            setLoadingTopPerStage(false);
        }).catch(err =>{
            setLoadingTopPerStage(false);
        });

        apiService.getRequest("organizationsContacted").then(response => {
            setLoadingMostContacted(false);
            for (let index = 0; index < response.data.length; index++) {
                response.data[index].count = parseInt(response.data[index].count);
            }
            setMostContacted(response.data);

        }).catch(err =>{
            setLoadingMostContacted(false);
        });

        apiService.getRequest("ratings").then(response => {
            setLoadingAverage(false);
            for (let index = 0; index < response.data.length; index++) {
                response.data[index].rating = parseInt(response.data[index].rating);
                response.data[index].id = randomGuid()
            }
            setAverages(response.data);
        }).catch(err =>{
            setLoadingAverage(false);
        });

        apiService.getRequest("referred/contacted").then(response => {
            setLoadingContactRate(false);
            for (let index = 0; index < response.data.length; index++) {
                response.data[index].not_contacted_total = parseInt(response.data[index].not_contacted_total);
                response.data[index].percentage = parseFloat(response.data[index].percentage);
                response.data[index].contacted = response.data[index].percentage*response.data[index].not_contacted_total;
                response.data[index].data = [
                    { name: 'Contactado', value: response.data[index].contacted },
                    { name: 'Referido', value: response.data[index].not_contacted_total }
                ];
                response.data[index].id = randomGuid();
            }
            setContactRate(response.data);
        }).catch(err =>{
            setLoadingContactRate(false);
        });

        apiService.getRequest("badOrganizations").then(response => {
            setLoadingPoorPerforming(false);
            setPoorPerforming(response.data);
        }).catch(err =>{
            setLoadingPoorPerforming(false);
        });

        apiService.getRequest("accountsCreated").then(response => {
            setLoadingAccountsPerWeek(false);
            for(var i = 0; i < response.data.length; i++) {
                response.data[i].key = String(response.data[i].month) + '/' + String(response.data[i].week);
            }
            setAccountsPerWeek(response.data);
        }).catch(err =>{
            setLoadingAccountsPerWeek(false);
        });
    }

    //Collapsible row for organizations per type snippet
    function CollapsibleTypeOrgRow(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        return (
            <React.Fragment>
            <div style={{ margin: "10px 40px 40px 40px" }}>
              <h5>{row.name}</h5>
              {row.orgs && Array.isArray(row.orgs) && row.orgs.map((nameRow) => (
                  <div>
                    <span>{nameRow.name}</span>
                    {row.orgs[row.orgs.length-1] != nameRow && (
                      <hr />
                    )}
                  </div>
              ))}
            </div>
            </React.Fragment>
        );
    }

    //Collapsible row for organizations per stage snippet
    function CollapsibleStageOrgRow(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        return (
            <React.Fragment>
            <div style={{ margin: "10px 40px 40px 40px" }}>
              <h5>{row.name}</h5>
              {row.orgs && Array.isArray(row.orgs) && row.orgs.map((nameRow) => (
                <div>
                  <span>{nameRow.name}</span>
                    {row.orgs[row.orgs.length-1] != nameRow && (
                      <hr />
                    )}
                </div>
              ))}
            </div>
            </React.Fragment>
        );
    }

    //row snippet for average rating
    function RatingOrgRow(props) {
        const { row } = props;
        const [rating, setRating] = React.useState(row.rating);
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell component="h5">
                        {row.name}
                    </TableCell>
                    <TableCell>
                        <Rating
                            disabled={true}
                            value={rating} />
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    //row snippet for average rating
    function ContactedOrgRow(props) {
        const { row } = props;
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell component="h5">
                        {row.name}
                    </TableCell>
                    <TableCell>
                        {(row.percentage*100).toFixed(2)}%
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    //Load profile into view
    React.useEffect(()=> {
        var tempToday = new Date();
        var dd = String(tempToday.getDate()).padStart(2, '0');
        var mm = String(tempToday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tempToday.getFullYear();
        console.log(tempToday)
        tempToday = mm + '/' + dd + '/' + yyyy;
        setToday(tempToday);
        getAnalytics();
    }, [shouldLoad]);

    return(
        !apiService.isAdminAuthenticated() ?
        //If authenticated go to home page
        <Redirect to="/admin" /> :

        //Show login view
        <div className="top-margin">
            <Paper className="form form--wrapper paper-margin" elevation={10}>
                <div style={{margin: "30px"}} ref={reportsRef}>
                  <div style={{display: "flex"}}>
                    <img className="report-logo-img" src="/images/colmena_dark.png" />
                  </div>
                  <div style={{marginTop: "15px"}}>
                  <h1>Reportes administrativos creado en {today}</h1>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <div style={{
                                    width: '330px',
                                    height: '330px',
                                    margin: "auto"
                                }}>
                                <h3 style={{margin: "15px"}}>
                                Organizaciones Más Contactadas
                                </h3>
                                <small>
                                Número de Veces Contactadas vs Organización
                                </small>
                                <ResponsiveContainer width="100%" height="80%">
                                    <BarChart data={mostContacted}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis>
                                            <Label angle={-90} value='# de Veces Contactadas' position='insideLeft' style={{textAnchor: 'middle', fontWeight: "bold", letterSpacing: "1"}} />
                                        </YAxis>
                                        <Tooltip />
                                        <Bar label="Count" dataKey="count" fill="#9eb2f7" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <SmallSpinner isShown={loadingMostContacted} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <div style={{
                                    width: '330px',
                                    height: '330px',
                                    margin: "auto"
                                }}>
                                <h3 style={{margin: "15px"}}>
                                Organizaciones de Bajo Rendimiento
                                </h3>
                                <small>
                                Número de Calificación vs Organización
                                </small>
                                <ResponsiveContainer width="100%" height="80%">
                                    <BarChart data={poorPerforming}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis>
                                            <Label angle={-90} value='Calificación Media' position='insideLeft' style={{textAnchor: 'middle', fontWeight: "bold", letterSpacing: "1"}} />
                                        </YAxis>
                                        <Tooltip />
                                        <Bar dataKey="rating" fill="#d67ade" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <SmallSpinner isShown={loadingPoorPerforming} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <div style={{
                                    width: '660px',
                                    height: '330px',
                                    margin: "auto"
                                }}>
                                <h3 style={{margin: "15px"}}>
                                    Cuentas por Semana
                                </h3>
                                <small>
                                Número de Cuentas vs Mes/Semana
                                (No se mostrará la semana si no tiene data)  
                                </small>
                                <ResponsiveContainer width="100%" height="80%">
                                    <BarChart data={accountsPerWeek}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="key" />
                                        <YAxis>
                                            <Label angle={-90} value='# de Cuentas Nuevas' position='insideLeft' style={{textAnchor: 'middle', fontWeight: "bold", letterSpacing: "1"}} />
                                        </YAxis>
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#89d171" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <SmallSpinner isShown={loadingAccountsPerWeek} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{marginTop: "30px"}}></div>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <div>
                                <h3 style={{margin: "15px"}}>
                                Mejores Organizaciones por Tipo
                                </h3>
                                {topPerType.map((row) => (<CollapsibleTypeOrgRow  key={'type'+row.id} row={row} />))}
                                <SmallSpinner isShown={loadingTopPerType} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <div>
                                <h3 style={{margin: "15px"}}>
                                Mejores Organizaciones por Etapa
                                </h3>
                                {topPerStage.map((row) => (<CollapsibleStageOrgRow key={'stage'+row.id} row={row} />))}
                                <SmallSpinner isShown={loadingTopPerStage} />
                            </div>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <div>
                                <h3 style={{margin: "15px"}}>
                                    Calificaciones Promedio
                                </h3>
                                {averages.map((row) => (
                                  <div style={{margin: "0px 10px"}}>
                                    <Grid container spacing={1}>
                                      <Grid item xs={9}>
                                        <h5 style={{textAlign:"start"}}>{row.name}</h5>  
                                      </Grid>
                                      <Grid item xs={1}>
                                      <Rating
                                        disabled={true}
                                        value={row.rating} />
                                      </Grid>
                                    </Grid>
                                    {averages[averages.length-1] != row && (<hr/>)}
                                  </div>
                                ))}
                                <SmallSpinner isShown={loadingAverage} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <div>
                                <h3 style={{margin: "15px"}}>
                                    Tasa de Contacto
                                </h3>
                                {contactRate.map((row) => (
                                  <div style={{margin: "0px 10px"}}>
                                    <Grid container spacing={1}>
                                      <Grid item xs={10}>
                                        <h5 style={{textAlign:"start"}}>{row.name}</h5>  
                                      </Grid>
                                      <Grid item xs={1}>
                                        <p>{(row.percentage*100).toFixed(2)}%</p>
                                      </Grid>
                                    </Grid>
                                    {contactRate[contactRate.length-1] != row && (<hr/>)}
                                  </div>
                                ))}
                                <SmallSpinner isShown={loadingContactRate} />
                            </div>
                        </Card>
                    </Grid>
                </Grid>
                  </div>
                </div>
            </Paper>
            <ReactToPrint
                trigger={() => <Button style={{'margin':'15px'}} variant="contained" className="secondary-button" color="primary">Guardar a Pdf</Button>}
                content={() => reportsRef.current} />
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
export default AdminReports;