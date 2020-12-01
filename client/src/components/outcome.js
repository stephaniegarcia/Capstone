import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Link from '@material-ui/core/Link';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory, Redirect } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";
import '../index.css';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 800,
    width: 900,
  },
  control: {
    padding: theme.spacing(1),
  },
}));

function Outcome() {

  //Getters and Setters
    const history = useHistory();
    const [spacing, setSpacing] = React.useState(1);
    const [name, setName] = React.useState('Composed TextField');
    const classes = useStyles();
    const [profile, setProfile] = React.useState({});
    const [orgTypes, setOrgTypes] = React.useState([]);
    const [orgStages, setOrgStages] = React.useState([]);

    const [showContent, setShowContent] = React.useState(false);

    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const [showSubmitErrorAlert, setSubmitShowErrorAlert] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showLoading, setShowLoading] = React.useState(false);

    const [businessType, setBusinessType] = React.useState('');
    const [organizations, setOrganizations] = React.useState([]);
    const [roadmap, setRoadmap] = React.useState([]);

    const onAlertClick = () => {
      setShowErrorAlert(false);
    };

    const onSubmitAlertClick = () => {
      window.location.href = "/tce";
    };

    //Submiting quiz logic
    function submitQuiz() {
      setShowLoading(true);
      var answers = {};
      var quizResult = apiService.getQuiz();
      for(var i = 0; i < quizResult.length; i++) {
        //answers.push({ question_id: quizResult[i].question_id, answer: quizResult[i].answer })
        var key = 'answer'+(i+1);
        answers[key] = quizResult[i].answer == '0';
      }
      var tempProfile = apiService.profile();
      setProfile(tempProfile);
      apiService.postRequest("tce/answers/"+apiService.profile().user_id, answers).then((quizresponse)=>{
        apiService.getRequest("user/"+tempProfile.user_id).then(userResponse => {
          //Handle user profile get
          var updatedProfile = userResponse.data[0];
          apiService.profile(updatedProfile);
          setProfile(updatedProfile);
          console.log(updatedProfile);
          var bt_id = updatedProfile.bt_id;
          setBusinessType(bt_id);
          if(bt_id && bt_id != null) {
            var roadmapSteps = apiService.getRoadmapSteps(bt_id, tempProfile.bstage_id);
            apiService.getRequest('tce/roadmap/organizations/'+bt_id).then(response => {
              //Handle organization response
              if(!response.data) {
                response.data = [];
              }
              for(var i = 0; i < roadmapSteps.length; i++) {
                var step = roadmapSteps[i];
                step.index = i+1;
                step.orgs = response.data.filter(o => o.bs_id == step.bs_id);
              }
              setRoadmap(roadmapSteps);
              setOrganizations(response.data);         
              setShowLoading(false); 
            }).catch(err =>{
              //Handle error
              setShowLoading(false);
              setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
              setShowErrorAlert(true);
            });
          }
          setShowContent(true);
        }).catch(err =>{
            //Handle error
            setShowLoading(false);
            setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
            setShowErrorAlert(true);
        });
      }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err ? (err.response ? (err.response.data? String(err.response.data) : String(err.response)) : String(err)) : 'Ocurrio un error');
        setSubmitShowErrorAlert(true);
      });
    }
    //Save data to profile
    function saveData() {
      history.push("/userprofile");
    }

    React.useEffect(async ()=> {
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
      submitQuiz();
    }, [name]);

    /*Table logic */
    const useRowStyles = makeStyles({
        root: {
          '& > *': {
            borderBottom: 'unset',
          },
        },
      });
    
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
            <TableRow className={classes.root}>
              <TableCell className="no-bottom-border">
              </TableCell>
              <TableCell className="no-bottom-border" scope="row">{row.name}</TableCell>
              <TableCell className="no-bottom-border" align="center">{row.phone_number}</TableCell>
              <TableCell className="no-bottom-border" align="center">{row.email}</TableCell>
              <TableCell className="no-bottom-border" align="center">{orgStage}</TableCell>
              <TableCell className="no-bottom-border" align="center">{apiService.getOrgType(row.bt_id)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan="6" style={{padding: "0 80px 30px 80px"}}>
                  <h4 style={{fontStyle:"italic", fontWeight: "bold"}}>Descripción:</h4>
                  <p>
                    {row.description}
                  </p>
                  {row.org_link && row.org_link.length>0 && (<Link href={row.org_link} target='_blank'>Ver más información</Link>)}
                </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
      function RoadmapOrganizationRow(props) {
        const { row } = props;
        const classes = useRowStyles();
        return (
          <React.Fragment>            
            <TableRow className={classes.root}>
              <TableCell>
                {row.name}
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }

      function RoadmapRow(props) {
        const { row } = props;
        const [anchorEl, setAnchorEl] = React.useState(null);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
        const open = Boolean(anchorEl);
        const id = open ? 'rm-popover'+row.index : undefined;
        var orgTypeCss = apiService.getOrgTypeCssName(row.bt_id);
        var className = orgTypeCss+" rm-curve ";
        var buttonStyle = {};
        if(row.index%2==0) {
          className += "rm-left-curve";
          buttonStyle = {
            left: "-36px",
            top: "5px"
          };
        }
        else {
          className += "rm-right-curve";
          buttonStyle = {
            right: "-36px",
            top: "5px"
          };
        }
        var marginTop = row.index>1? "-4px" :"0px";
        return (
          <React.Fragment>
            <TableRow>
                <div style={{"margin-top": marginTop}} className={className}>
                  <Button style={buttonStyle} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                    <img style={{maxWidth:"30px"}} src="images/touch_icon.png" />
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <div style={{margin:"15px"}}>
                      <h6>Organizaciones</h6>
                      <Table>
                        {row.orgs.map((org) => (<RoadmapOrganizationRow  key={row.org_id} row={org} />))}
                      </Table>
                    </div>
                  </Popover>
                  <h5>{row.description}</h5>
                </div>
            </TableRow>
          </React.Fragment>
        );
      }


  return (
    !apiService.isAuthenticated() ? <Redirect to="/login" /> :
    <div>
      { showContent &&
       <div>
        <div style={{'padding-top': '50px'}}></div>
        <Paper className="paper-margin" elevation={10} >
        <div>
            <h1>Segun tus respuestas tu tipo de negocio es:</h1>
            <h2>{apiService.getOrgType(businessType)}</h2>
            <h3>¡Sigue tu camino! Si empezaste tu negocio porque es lo que te apasiona, 
              con el propósito de generar ingreso personal adicional o porque quieres tener
               flexibilidad con tu tiempo, tienes una microempresa.</h3>
               {apiService.getOrgTypeVideo(businessType) && apiService.getOrgTypeVideo(businessType) != null && (
                  <iframe src={apiService.getOrgTypeVideo(businessType)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                )}
          <div>
         
           </div>
            <br/>
          <br/>
        

            
        </div>
          </Paper>
          <Paper className="paper-margin" elevation={10} >
          <div>
            <div>
               <h1>Nos indicaste que tu negocio esta en etapa de {apiService.getOrgStage(profile.bstage_id)}</h1>
              <h2>Este sera tu camino a recorrer:</h2>
              {apiService.getOrgTypeVideo(businessType) && apiService.getOrgTypeVideo(businessType) != null && (
                <iframe src={apiService.getOrgTypeVideo(businessType)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              )}
              <img className="org-type-icon" src={"images/"+apiService.getOrgTypeIcon(businessType)} />  
              {roadmap && roadmap.length>0 && (    
                <TableContainer>
                  <Table aria-label="table" className={'rm-table'}>
                    <TableBody >
                      {roadmap.map((row) => (<RoadmapRow  key={row.name} row={row} />))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {roadmap && roadmap.length==0 && (
                <h4>
                    No existen pasos ni organizaciones para tu etapa de negocio.
                </h4>
              )}
            </div>
          </div>
          </Paper>  
          {organizations && organizations.length>0 && (
            <Paper className="paper-margin" elevation={10} >
              <div>
                  <h1>Aqui se muestran todas las organizaciones mencionadas en el recorrido: </h1>
                  <h2>Organizaciones</h2>
                  <TableContainer>
                    <Table aria-label="collapsible table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell component="h4">Nombre</TableCell>
                          <TableCell component="h4" align="center">Teléfono</TableCell>
                          <TableCell component="h4" align="center">Correo Electrónico&nbsp;</TableCell>
                          <TableCell component="h4" align="center">Etapa&nbsp;</TableCell>
                          <TableCell component="h4" align="center">Tipo&nbsp;</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody >
                        {organizations.map((row) => (<Row  key={row.name} row={row} />))}
                      </TableBody>
                    </Table>
                  </TableContainer>
              </div>
            </Paper>
          )}
          <div>
          <Button style={{'margin':'15px'}} variant="contained" color="secondary" href="/tce">
            Repetir el Cuestionario
          </Button>
          <Button style={{'margin':'15px'}} variant="contained" color="primary" className="secondary-button" onClick={()=>{ saveData(); }}>
            Ver Perfil
          </Button>
          </div>
          </div>
      }
      
    <Alert
      isOpen={showErrorAlert}
      handleSubmit={onAlertClick}
      title="Error"
      text={errorMessage}
      submitButtonText="Ok" />
    <Alert
      isOpen={showSubmitErrorAlert}
      handleSubmit={onSubmitAlertClick}
      title=""
      text={errorMessage}
      submitButtonText="Ok" />
  <Spinner isShown={showLoading} />
    </div>
  );
}
export default Outcome;
