import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Spinner from './loading'
import SmallSpinner from './smallLoading'
import Alert from './alert'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
//import { Chart } from "react-charts";
import '../index.css';
import apiService from "./mockApiService";

//import apiService from "./apiService";

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
    const [mostContacted, setMostContacted] = useState({"name":[]});
    const [poorPerforming, setPoorPerforming] = useState({"name":[]});
    const [accountsPerWeek, setAccountsPerWeek] = useState([]);

    // const columnChartSeries = React.useMemo(
    //     () => ({
    //         type: "bar"
    //     }),
    //     []
    // );

    // const columnChartAxes = React.useMemo(
    //     () => [
    //         { primary: true, type: 'linear', position: 'bottom' },
    //         { type: 'linear', position: 'left' },
    //     ],
    //     []
    // );

    //alert button click event callback
    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    //get profile from current session
    function getAnalytics() {
        apiService.getRequest("admin/organizations/topPerType").then(response => {
            setLoadingTopPerType(false);
            setTopPerType(response);
        }).catch(err =>{
            setLoadingTopPerType(false);
        });

        apiService.getRequest("admin/organizations/topPerStage").then(response => {
            setLoadingTopPerStage(false);
            setTopPerStage(response);
        }).catch(err =>{
            setLoadingTopPerStage(false);
        });

        apiService.getRequest("admin/organizations/mostContacted").then(response => {
            setLoadingMostContacted(false);
            setMostContacted(response[0]);
        }).catch(err =>{
            setLoadingMostContacted(false);
        });

        apiService.getRequest("admin/organizations/poorperforming").then(response => {
            setLoadingPoorPerforming(false);
            setPoorPerforming(response[0]);
        }).catch(err =>{
            setLoadingPoorPerforming(false);
        });

        apiService.getRequest("admin/accountsPerWeek").then(response => {
            setLoadingAccountsPerWeek(false);

            var data = [
                {
                    label: 'New Accounts',
                    data: [],
                }
            ];
            // response.map((row)=>{
            //     data.data.push({primary: row.week, secondary: row.count});
            // });
            setAccountsPerWeek(response);
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
                    {row.type}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Table size="small">
                            <TableBody>
                                {row.name.map((nameRow) => (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {nameRow}
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
                    {row.stage}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Table size="small">
                            <TableBody>
                                {row.names.map((nameRow) => (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {nameRow}
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
                                    {row}
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
            <Paper className="form form--wrapper paper-margin" elevation={10}> 
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
                                            {topPerType.map((row) => (<CollapsibleTypeOrgRow  key={row.name} row={row} />))}
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
                                            {topPerStage.map((row) => (<CollapsibleStageOrgRow  key={row.name} row={row} />))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <SmallSpinner isShown={loadingTopPerStage} />
                            </div>    
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <div>
                                <h3>
                                    Most Contacted
                                </h3>
                                <TableContainer>
                                    <Table aria-label="collapsible table">
                                        <TableBody >
                                            {mostContacted.name.map((row) => (<OrgNameRow  key={row.name} row={row} />))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <SmallSpinner isShown={loadingMostContacted} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <div>
                                <h3>
                                    Poor Performing
                                </h3>
                                <TableContainer>
                                    <Table aria-label="collapsible table">
                                        <TableBody >
                                            {poorPerforming.name.map((row) => (<OrgNameRow  key={row.name} row={row} />))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
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
                                        <XAxis dataKey="week" />
                                        <YAxis />
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