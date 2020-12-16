import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link';
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
    const [today, setToday] = React.useState('');

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
//Roadmap
    function RoadmapRow(props) {
        const { row } = props;
        var orgTypeCss = apiService.getOrgTypeCssName(apiService.profile().bt_id);
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
                        <h5>Nombre de Organización: {row.name}</h5>
                        <div>
                            <FormControlLabel
                                control={<GreenCheckbox checked={row.had_rating}
                                disabled={true} />}
                                label="Contactado" />
                        </div>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                        <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} lg={3}>
                            <h3 className="center-text light-text">Teléfono: </h3>
                            <h3 className="center-text">{row.phone_number}</h3>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={3}>
                            <h3 className="center-text light-text">Correo electrónico: </h3>
                            <h3 className="center-text">{row.email}</h3>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={3}>
                      <h3 className="center-text light-text">Etapa:</h3>
                      <h3 className="center-text">{orgStage}</h3>
                    </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={3}>
                                <h3 className="center-text"><span className="light-text">Tipo(s):</span></h3>
                                {row.types.map((type) => ( <h3 className="center-text">{type.description}</h3> ))}
                            </Grid>
                            <Grid item xs={12}>
                                <h3 className="light-text" style={{marginTop: "-15px"}}>Descripción: </h3>
                                <h3>{row.description}</h3>
                            </Grid>
                            {row.org_link && row.org_link.length>0 && (<Grid style={{marginBottom: "20px"}} item xs={12}><h3><span className="light-text">Más información: </span>{row.org_link}</h3></Grid>)}
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
                
                var roadmapSteps = apiService.getRoadmapSteps(profile.bstage_id);
                var ratingsResponse = await apiService.getRequest('ratings/'+profile.user_id);
                var ratings = ratingsResponse.data;
                apiService.getRequest('roadmap/'+profile.bt_id+'/'+profile.bstage_id).then(response => {
                    //Handle organization response
                    if(!response.data) {
                        response.data = [];
                    }

                    for(var i = 0; i < response.data.length; i++) {
                        response.data[i].key = apiService.randomGuid();
                    }

                    for(var i = 0; i < roadmapSteps.length; i++) {
                        var step = roadmapSteps[i];
                        step.index = i+1;
                        refs[String("step"+step.index)] = React.createRef();
                        zoomRefs[String("step"+step.index)] = false;
                        step.orgs = [];
                        for(var j = 0; j < response.data.length; j++) {
                            if(response.data[j].bs_id == step.bs_id && step.orgs.filter(o => o.org_id == response.data[j].org_id).length == 0) {
                                step.orgs.push(response.data[j]);
                            }
                        }
                    }
                    if(ratings) {
                        for(var i = 0; i < response.data.length; i++) {
                            var org = response.data[i];
                            var orgRating = ratings.filter(r => r.org_id == org.org_id);
                            if(orgRating && orgRating.length>0) {
                            response.data[i].had_rating = true;
                            response.data[i].rating = orgRating[0].rating;
                            response.data[i].comments = orgRating[0].rating_comment;
                            }
                            else {
                            response.data[i].had_rating = false;
                            response.data[i].rating = 0;
                            response.data[i].comments = '';
                            }
                        } 
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
        var tempToday = new Date();
        var dd = String(tempToday.getDate()).padStart(2, '0');
        var mm = String(tempToday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tempToday.getFullYear();
        console.log(tempToday)
        tempToday = mm + '/' + dd + '/' + yyyy;
        setToday(tempToday);

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
                    <div style={{display: "flex"}}>
                        <img className="report-logo-img" src="/images/colmena_dark.png" />
                    </div>
                    <div style={{marginTop: "15px"}}>
                        {!showLoadingOrgs && (
                            <div>
                                <h1>Camino Empresarial para</h1>
                                <h1>{apiService.profile().first_name} {apiService.profile().last_name}</h1>
                                <h1>creado en {today}</h1>
                                <hr/>
                                <p>
                                    En este documento tienes todas las organizaciones recomendadas basadas en tu tipo de negocio y etapa en la que te encuentras. Recuerda contactarlas y marcar tu progreso para que puedas recorrer Tu Camino Empresarial de manera más organizada y fácil. Si deseas conocer si hay alguna organización nueva, puedes visitar la página de Tu Camino Empresarial para ver la versión más actualizada.
                                </p>
                                <hr/>
                                <h1>Nos indicaste que tu negocio está en etapa de {apiService.getOrgStage(apiService.profile().bstage_id)}</h1>
                                <h2>Éste sera tu camino a recorrer:</h2>
                                <img className="org-type-icon" src={"images/"+apiService.getOrgTypeIcon(businessType)} />
                                <h2>{apiService.getOrgType(businessType)}</h2>
                                {roadmap && roadmap.length>0 && (
                                    <div>
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
                                        <h2>Aquí se muestran todas las organizaciones que forman parte del recorrido: </h2>
                                       
{apiService.profile().bstage_id != 4 && apiService.profile().bt_id == 4 && (
                    <small>No Existen Organizaciones Para Tu Etapa de Negocio. Comunícate con Colmena66 para más Información.</small>
                  )}
                                        <div className="not-scrollable" style={{marginTop:"15px"}}>
                                            {roadmap.map((row) => (
                                                <div>
                                                    <h3 style={{textAlign: "left"}} >{row.index}. {row.description}</h3>
                                                    {row.orgs.length > 0 && (
                                                        <div>
                                                            {row.orgs.map((row) => (<Row  key={row.name} row={row} />))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {roadmap && roadmap.length==0 && (
                                    <h4>
                                        No existen pasos ni organizaciones para tu etapa de negocio.
                                    </h4>
                                )}
                            </div>
                            )}
                    </div>
                </div>
                <ReactToPrint
                    trigger={() => <Button style={{'margin':'45px 15px 15px 15px'}} variant="contained" color="primary">Guardar a Pdf</Button>}
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