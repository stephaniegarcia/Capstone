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
import Box from '@material-ui/core/Box';
import ReactToPrint from "react-to-print";
import IconButton from '@material-ui/core/IconButton';
import Spinner from './loading'
import SmallSpinner from './smallLoading'
import Alert from './alert'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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

        apiService.getRequest("badOrganizations").then(response => {
            setLoadingPoorPerforming(false);
            console.log(response.data);
            setPoorPerforming(response.data);
        }).catch(err =>{
            setLoadingPoorPerforming(false);
        });

        apiService.getRequest("accountsCreated").then(response => {
            setLoadingAccountsPerWeek(false);
            for(var i = 0; i < response.data.length; i++) {
                response.data[i].key = String(response.data[i].year) + ' - ' + String(response.data[i].week);
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
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Table size="small">
                            <TableBody>
                                {row.orgs && Array.isArray(row.orgs) && row.orgs.map((nameRow) => (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {nameRow.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            </React.Fragment>
        );
    }

    //Collapsible row for organizations per stage snippet
    function CollapsibleStageOrgRow(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        return (
            <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Table size="small">
                            <TableBody>
                                {row.orgs && Array.isArray(row.orgs) && row.orgs.map((nameRow) => (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {nameRow.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            </React.Fragment>
        );
    }

    //organization name row snippet
    function OrgNameRow(props) {
        const { row } = props;
        return (
            <React.Fragment>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Box margin={1}>
                        <Table size="small">
                            <TableBody>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                            </TableBody>
                        </Table>
                    </Box>
                </TableCell>
            </TableRow>
            </React.Fragment>
        );
    }

    //poor performing organization name row snippet
    function PoorPerfOrgRow(props) {
        const { row } = props;
        return (
            <React.Fragment>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Box margin={1}>
                        <Table size="small">
                            <TableBody>
                                <TableCell component="th" scope="row">
                                    {row.organization}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.average_rating}
                                </TableCell>
                            </TableBody>
                        </Table>
                    </Box>
                </TableCell>
            </TableRow>
            </React.Fragment>
        );
    }

    //Load profile into view
    React.useEffect(()=> {
        getAnalytics();
    }, [shouldLoad]);

    return(
        !apiService.isAdminAuthenticated() ? 
        //If authenticated go to home page
        <Redirect to="/admin" /> :

        //Show login view
        <div className="top-margin">
            <Paper ref={reportsRef} className="form form--wrapper paper-margin" elevation={10}> 
                <h1>Reportes</h1>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <div>
                                <h3>
                                    Top Per Type
                                </h3>
                                <TableContainer>
                                    <Table aria-label="collapsible table">
                                        <TableBody >
                                            {topPerType.map((row) => (<CollapsibleTypeOrgRow  key={row.id} row={row} />))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <SmallSpinner isShown={loadingTopPerType} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <div>
                                <h3>
                                    Top Per Stage
                                </h3>
                                <TableContainer>
                                    <Table aria-label="collapsible table">
                                        <TableBody >
                                            {topPerStage.map((row) => (<CollapsibleStageOrgRow key={row.id} row={row} />))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <SmallSpinner isShown={loadingTopPerStage} />
                            </div>    
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <div style={{
                                    width: '100%',
                                    height: '400px',
                                }}>
                                <h3>
                                    Most Contacted
                                </h3>
                                <ResponsiveContainer width="100%" height="80%">
                                    <BarChart data={mostContacted}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis label="#" />
                                        <Tooltip />
                                        <Bar label="Count" dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <SmallSpinner isShown={loadingMostContacted} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <div style={{
                                    width: '100%',
                                    height: '400px',
                                }}>
                                <h3>
                                    Poor Performing
                                </h3>
                                {/* <TableContainer>
                                    <Table aria-label="collapsible table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Puntuación media</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {poorPerforming.name.map((row) => (<PoorPerfOrgRow  key={row.name} row={row} />))}
                                        </TableBody>
                                    </Table>
                                </TableContainer> */}
                                <ResponsiveContainer width="100%" height="80%">
                                    <BarChart data={poorPerforming}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="rating" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <SmallSpinner isShown={loadingPoorPerforming} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <div style={{
                                    width: '100%',
                                    height: '400px',
                                }}>
                                <h3>
                                    Accounts Per Week
                                </h3>
                                <ResponsiveContainer width="100%" height="80%">
                                    <BarChart data={accountsPerWeek}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="key" />
                                        <YAxis label="#" />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <SmallSpinner isShown={loadingAccountsPerWeek} />
                            </div>    
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
            <ReactToPrint
                trigger={() => <Button style={{'margin':'15px'}} variant="contained" color="primary">Save to Pdf</Button>}
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