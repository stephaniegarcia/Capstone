import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
import apiService from "./mockApiService";
import '../index.css';


// import { DataGrid } from '@material-ui/data-grid';

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
    const history = useHistory();
    const [spacing, setSpacing] = React.useState(1);
    const [name, setName] = React.useState('Composed TextField');
    const classes = useStyles();
    const [quizResult, setQuizResult] = React.useState({organizations:[], roadmap:[]});

    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showLoading, setShowLoading] = React.useState(false);

    const onAlertClick = () => {
      setShowErrorAlert(false);
    };

    function submitQuiz() {
      setShowLoading(true);
      apiService.postRequest("quiz/submit", apiService.getQuiz()).then((response)=>{
        if(response.roadmap) {
          for(var i = 0; i < response.roadmap.length; i++) {
            response.roadmap[i].index = i+1;
          }
        }
        setShowLoading(false);
        setQuizResult(response);
      }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err.response.data);
        setShowErrorAlert(true);
      });
    }

    function saveData() {
      setShowLoading(true);
      apiService.postRequest("quiz/save", apiService.getQuiz()).then((response)=>{
        setShowLoading(false);
        history.push("/userprofile");
      }).catch(err =>{
        setShowLoading(false);
        setErrorMessage(err.response.data);
        setShowErrorAlert(true);
      });
    }

    React.useEffect(()=> {
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
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                {/* <Collapse in={row.open} timeout="auto" unmountOnExit> */}
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      Descripción
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      {/* <TableHead>
                        <TableRow>
                          <TableCell>Descripción</TableCell>
                        </TableRow>
                      </TableHead> */}
                      <TableBody>
                        {row.moreInfo.map((historyRow) => (
                          <TableRow key={historyRow.description}>
                            <TableCell component="th" scope="row">
                              {historyRow.description}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                {/* </Collapse> */}
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
      
      Row.propTypes = {
        row: PropTypes.shape({
            phone: PropTypes.number.isRequired,
          email: PropTypes.number.isRequired,
          businessStage: PropTypes.number.isRequired,
          moreInfo: PropTypes.arrayOf(
            PropTypes.shape({
              amount: PropTypes.number.isRequired,
              customerId: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
            }),
          ).isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          businessType: PropTypes.number.isRequired,
        }).isRequired,
      };

      function RoadmapOrganizationRow(props) {
        const { row } = props;
        const classes = useRowStyles();
        return (
          <React.Fragment>            
            <TableRow className={classes.root}>
              <TableCell>
                {row}
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
        var className = "rm-curve ";
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
                  <Button style={buttonStyle} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}></Button>
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
                        {row.organizations.map((org) => (<RoadmapOrganizationRow  key={row.name} row={org} />))}
                      </Table>
                    </div>
                  </Popover>
                  <h5>{row.name}</h5>
                </div>
            </TableRow>
          </React.Fragment>
        );
      }


  return (
    !apiService.isAuthenticated() ? <Redirect to="/login" /> :
    <div>
      <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {(
            <Grid  item>
                <div style={{'padding-top': '50px'}}></div>
              <Paper className={classes.paper} >
              <div>
                  <h1>Segun tus respuestas tu tipo de negocio es:</h1>
                  <h1> {quizResult.businessType}</h1>
                  <h3>¡Sigue el camino rojo! Si empezaste tu negocio porque es lo que te apasiona, 
                    con el propósito de generar ingreso personal adicional o porque quieres tener
                     flexibilidad con tu tiempo, tienes una microempresa.</h3>
                <div>
               
                 </div>
                  <br/>
                <br/>
              
 
                  
              </div>
                </Paper>
                <Paper className={classes.paper} >
                <div>
                  <div>
                     <h1>Nos indicaste que tu negocio esta en etapa de {quizResult.businessStage}</h1>
                  <h1>Este sera tu camino a recorrer:</h1>  
                    <TableContainer component={Paper}>
                      <Table aria-label="table" className={'rm-table'}>
                        <TableBody >
                          {quizResult.roadmap.map((row) => (<RoadmapRow  key={row.name} row={row} />))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
                </Paper>  
                
                <Paper className={classes.paper} >
              <div>
                  <h1>Aqui se muestran todas las organizaciones mencionadas en el recorrido: </h1>
                  <div>
                <h2>Organizaciones</h2>
              <TableContainer component={Paper}>
                <div>
                
                </div>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell >Nombre</TableCell>
                      <TableCell align="right">Teléfono</TableCell>
                      <TableCell align="right">Correo Electrónico&nbsp;</TableCell>
                      <TableCell align="right">Etapa&nbsp;</TableCell>
                      <TableCell align="right">Tipo&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                  {quizResult.organizations.map((row) => (<Row  key={row.name} row={row} />))}
        
                  </TableBody>
                </Table>
              </TableContainer>
           </div>
              </div>
                </Paper>
                <div>
                <Button style={{'margin':'15px'}} variant="contained" color="secondary" href="/tce">
                  Cancel
                </Button>
                <Button style={{'margin':'15px'}} variant="contained" color="primary" onClick={()=>{ saveData(); }}>
                  Save
                </Button>
                </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
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
export default Outcome;
