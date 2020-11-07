import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { DataGrid } from '@material-ui/data-grid';










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

function UserProfile() {


  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  //   },
  // ];
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];











    const [spacing, setSpacing] = React.useState(1);
    const [name, setName] = React.useState('Composed TextField');
    const classes = useStyles();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  //Organizations Logic
  let rows = [
    createData('Organización 1', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa"),
    createData('Organización 2', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa"),
    createData('Organización 3', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa"),
    createData('Organización 4', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa"),
    createData('Organización 5', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa"),
    createData('Organización 6', "787 987 6656", "asdf@goog.com", "Lanzamiento", "Microempresa"),
  ];

 

 // this.searchOrganizations();

  // const renderTableBody = () => {
  //   console.log("what");
  //   return rows && rows.map((row) => (
  //     <Row key={row.name} row={row} />
  //   ))
  // }
  

    /*Table logic */
    const useRowStyles = makeStyles({
        root: {
          '& > *': {
            borderBottom: 'unset',
          },
        },
      });
    
      function createData(name, phone, email, bussinessStage, bussinessType) {
        return {
          name,
          phone,
          email,
          bussinessStage,
          bussinessType,
          moreInfo: [
            { description: 'Proveen financiamiento alternativo a empresas medianas en Puerto Rico y Mexico. Proporcionan soluciones financieras para potenciar el crecimiento de tu negocio. Trabajan transacciones de $500K USD a $5 millones USD, pero son flexibles. ',
                },
          ],
        };
      }
      
      function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();
      
        return (
            
          <React.Fragment>
            
            <TableRow className={classes.root}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.bussinessStage}</TableCell>
              <TableCell align="right">{row.bussinessType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                    Descripción
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Descripción</TableCell>
                          {/* <TableCell>Añadir a Mi Perfil</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.moreInfo.map((historyRow) => (
                          <TableRow key={historyRow.description}>
                            <TableCell component="th" scope="row">
                              {historyRow.description}
                            </TableCell>
                            <TableCell>
                            </TableCell>
                             {/* <TableCell>{historyRow.customerId}</TableCell>*/}
                           
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
      
      Row.propTypes = {
        row: PropTypes.shape({
            phone: PropTypes.number.isRequired,
          email: PropTypes.number.isRequired,
          bussinessStage: PropTypes.number.isRequired,
          moreInfo: PropTypes.arrayOf(
            PropTypes.shape({
              amount: PropTypes.number.isRequired,
              customerId: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
            }),
          ).isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          bussinessType: PropTypes.number.isRequired,
        }).isRequired,
      };
    

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {(
            <Grid  item>
              <Paper className={classes.paper} >
              <div>
                  <h1>Hola</h1>
                  <form className={classes.root} noValidate autoComplete="off">
                <div>
                 <TextField
                  id="standard-read-only-input"
                 label="Nombre del Usuario:"
                  defaultValue="Agatha Christie"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </div>
                <br/>
               <br/>
                <div>
                <TextField
                  id="standard-read-only-input"
                 label="Correo Electrónico:"
                  defaultValue="demo@demo.com"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </div>
                <br/>
               <br/>
                <div>
                <TextField
                  id="standard-read-only-input"
                 label="Teléfono:"
                  defaultValue="939 460 2020"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </div>
                <br/>
                <br/>
                <div>
                <TextField
                  id="standard-read-only-input"
                 label="Etapa de Negocio"
                  defaultValue="Lanzamiento"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                 </div>
                  <br/>
                <br/>
              
                <div>
                   <TextField
                  id="standard-read-only-input"
                 label="Tipo de Negocio"
                  defaultValue="Microempresa"
                  InputProps={{
                    readOnly: true,
                  }}
                />
               
                </div>
                  </form>
              </div>
                </Paper>
                <Paper className={classes.paper} >
              <div>
                  <h1>Holita Pepita</h1>
           
              </div>
                </Paper>
                
                <Paper className={classes.paper} >
              <div>
                  <h1>Holita </h1>
                  <div>
                <h2>Organizaciones</h2>
              <TableContainer component={Paper}>
                <div>
                    <h4>Filters & Search would be here</h4>
                </div>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell >Organización</TableCell>
                      <TableCell align="right">Teléfono</TableCell>
                      <TableCell align="right">Correo Electrónico&nbsp;</TableCell>
                      <TableCell align="right">Etapa&nbsp;</TableCell>
                      <TableCell align="right">Tipo&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                  {rows.map((row) => (
            <Row  key={row.name} row={row} />
          ))}
        
                  {/* {this.state.rows && this.state.rows.map((row) => ( <Row key={row.name} row={row} />))} */}

                  
                  </TableBody>
                </Table>
              </TableContainer>
           </div>
              </div>
                </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>
  
    </Grid>
  );
}
export default UserProfile;
