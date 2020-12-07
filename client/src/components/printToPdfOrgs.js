import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import ReactToPrint from "react-to-print";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Spinner from './loading'
import Alert from './alert'
import '../index.css';
//import apiService from "./mockApiService";
import apiService from "./apiService";

function PdfOrgs() {
    //State Variables getters & setters
    const organizationsRef = useRef();
    const [shouldLoad, setShouldLoad] = React.useState(false);
    const [roadmap, setRoadmap] = React.useState([]);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const [showMessageAlert, setShowMessageAlert] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showLoading, setShowLoading] = React.useState(false);
    const [showLoadingOrgs, setShowLoadingOrgs] = React.useState(false);
    const [orgTypes, setOrgTypes] = React.useState([]);
    const [orgStages, setOrgStages] = React.useState([]);
    const [businessType, setBusinessType] = React.useState('');
    const [businessStage, setBusinessStage] = React.useState('');
    const [businessStatus, setBusinessStatus] = React.useState(false);
    const [organizations, setOrganizations] = React.useState([]);
    const [refs, setRefs] = React.useState({});
    const [zoomRefs, setZoomRefs] = React.useState({});

    const GreenCheckbox = withStyles({
        root: {
            color: green[400],
            '&$checked': {
            color: green[600],
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);
    
    //alert button click event callback
    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    //Organization step row snippet
    function OrganizationRow(props) {
        const { row } = props;
        return (
            <React.Fragment>
                <div>
                    <h3 style={{textAlign: "left"}} >{row.index}. {row.description}</h3>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableBody>
                                {row.orgs.map((row) => (<Row  key={row.name} row={row} />))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </React.Fragment>
        );
    }

    function RoadmapRow(props) {
        const { row } = props;
        var orgTypeCss = apiService.getOrgTypeCssName(row.bt_id);
        var className = orgTypeCss+" rm-curve ";
        var buttonStyle = {};
        var rowStyle = {};
        var marginTop = row.index>1? "-4px" :"0px";
        if(row.index%2==0) {
          className += "rm-left-curve";
          buttonStyle = {
            left: "-36px",
            top: "5px"
          };
          rowStyle = {
            marginRight: "80px",
            marginLeft: "40px",
            marginTop: marginTop
          }
        }
        else {
          className += "rm-right-curve";
          buttonStyle = {
            right: "-36px",
            top: "5px"
          };
          rowStyle = {
            marginRight: "40px",
            marginLeft: "80px",
            marginTop: marginTop
          }
        }
        return (
          <React.Fragment>
            <TableRow>
                <div style={rowStyle} className={className}>
                  <Button style={buttonStyle} variant="contained" color="primary"></Button>
                  <h5>{row.description}</h5>
                </div>
            </TableRow>
          </React.Fragment>
        );
      }

    //Organization row snippet
    function Row(props) {
        const { row } = props;
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
            <Card variant="outlined" style={{marginBottom:"20px"}}>
                <TableRow>
                    <TableCell scope="row" className="collapse-header-buttons">
                        <h5>{row.name}</h5>
                        <div>
                            <FormControlLabel
                                control={<GreenCheckbox checked={row.had_rating}
                                disabled={true} />}
                                label="Contactado" />
                        </div>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={6} md={6} lg={3}><h3 className="center-text"><span className="light-text">Teléfono: </span>{row.phone_number}</h3></Grid>
                            <Grid item xs={6} sm={6} md={6} lg={3}><h3 className="center-text"><span className="light-text">Correo electrónico: </span>{row.email}</h3></Grid>
                            <Grid item xs={6} sm={6} md={6} lg={3}><h3 className="center-text"><span className="light-text">Etapa: </span>{orgStage}</h3></Grid>
                            <Grid item xs={6} sm={6} md={6} lg={3}><h3 className="center-text"><span className="light-text">Tipo: </span>{apiService.getOrgType(businessType)}</h3></Grid>
                            <Grid item xs={12}>
                                <h3 className="light-text">Descripción: </h3>
                                <h3>{row.description}</h3>
                            </Grid>
                        </Grid>                
                    </TableCell>
                </TableRow>
            </Card>
        </React.Fragment>
        );
    }
    
    //get profile from current session
    async function getProfile() {
        var profile = apiService.profile();
        if(profile) {
            setBusinessStage(profile.bstage_id);
            setBusinessStatus(String(profile.business_status));
            setBusinessType(profile.bt_id);
            if(profile.bt_id && profile.bt_id != null) {
                var roadmapSteps = apiService.getRoadmapSteps(profile.bt_id, profile.bstage_id);
                apiService.getRequest('roadmap/'+profile.bt_id+'/'+profile.bstage_id).then(response => {
                    //Handle organization response
                    if(!response.data) {
                        response.data = [];
                    }
                    for(var i = 0; i < roadmapSteps.length; i++) {
                        var step = roadmapSteps[i];
                        step.index = i+1;
                        refs[String("step"+step.index)] = React.createRef();
                        zoomRefs[String("step"+step.index)] = false;
                        step.orgs = response.data.filter(o => o.bs_id == step.bs_id);
                    }
                    setRefs(refs);
                    setZoomRefs(zoomRefs);
                    setRoadmap(roadmapSteps);
                    setOrganizations(response.data);        
                    setShowLoading(false); 
                    setShowLoadingOrgs(false); 
                }).catch(err =>{
                //Handle error
                    setShowLoading(false);
                    setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
                    setShowErrorAlert(true);
                    setShowLoadingOrgs(false);
                });
            }
        }
    }

    //Load orgs into view
    React.useEffect(async ()=> {
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

        // setTimeout(()=>{
        //   getProfile();
        // }, 1000);
        getProfile();
    }, [shouldLoad]);

    return(
        !apiService.isAuthenticated() ? 
        //If authenticated go to home page
        <Redirect to="/" /> :

        //Show login view
        <div className="top-margin">
            <Paper className="paper-margin" elevation={10}> 
                <div className="paper-margin" ref={organizationsRef}>

                    <div>
                        {!showLoadingOrgs && (
                            <div>
                                {roadmap && roadmap.length>0 && (
                                    <div>
                                        <h1>Este sera tu camino a recorrer:</h1>
                                        <TableContainer className="not-scrollable" style={{marginTop:"15px"}}>
                                            <Table aria-label="table" className={'rm-table'}>
                                                <TableBody >
                                                {roadmap.map((row) => (<RoadmapRow  key={row.name} row={row} />))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <hr/>
                                    </div>
                                )}
                                {roadmap && roadmap.length>0 && (
                                    <div>
                                        <h1>Organizaciones</h1>
                                        <h2>Aqui se muestran todas las organizaciones que forman parte del recorrido: </h2>
                                        <TableContainer className="not-scrollable" style={{marginTop:"15px"}}>
                                            <Table aria-label="table" className={'rm-table'}>
                                            <TableBody>
                                                {roadmap.map((row) => (<OrganizationRow  key={row.name} row={row} />))}
                                            </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                )}
                                {roadmap && roadmap.length==0 && (
                                    <h4>
                                        No existen pasos ni organizaciones para tu etapa de negocio.
                                    </h4>
                                )}
                            </div>
                            )}
                            {showLoadingOrgs && (
                            <div>
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                                <Skeleton style={{marginBottom: "10px"}} variant="rect" height={100} />
                            </div>
                            )}
                    </div>
                </div>
                <ReactToPrint
                    trigger={() => <Button style={{'margin':'15px'}} variant="contained" color="primary">Guardar a Pdf</Button>}
                    content={() => organizationsRef.current} />
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
export default PdfOrgs;