import React, { Component } from 'react';

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
import Checkbox from '@material-ui/core/Checkbox';
import mockApiService from "./mockApiService";

class Organizations extends Component {
  // constructor(props) {
  //   super(props);
  //   // const { orders } = this.props;
  //   this.searchOrganizations = this.searchOrganizations.bind(this);
  //   this.state = {
  //     rows : []
  //   }
  // }
   
  // searchOrganizations() {
  //   //lets assume an array was returned
  //   mockApiService.getRequest("organizations").then((organizationsResponse) => {
  //     console.log("following is the response from api and the contents of row array")
  //     console.log(organizationsResponse);
  //     // data = organizationsResponse;
  //     // console.log(data);
  //     this.setState({rows:organizationsResponse});
  //   });
  // }
  
    render() {

        /*Checkbox logic */
    // let checked = false;
    // function setChecked() {}   
    // const handleChange = (event) => {
    //     setChecked(event.target.checked);
    //     //checked = true;
    //   };

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
                                  {/* <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                /> */}
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
                  <TableBody>
                  {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
                  {/* {this.state.rows && this.state.rows.map((row) => ( <Row key={row.name} row={row} />))} */}

                  
                  </TableBody>
                </Table>
              </TableContainer>
           </div>
            );
          
          
    }
}

export default Organizations;
