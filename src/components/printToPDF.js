import React from "react";
import ReactToPrint from "react-to-print";
import Paper from '@material-ui/core/Paper';

class PrintToPDF extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
 
          <div className="top-margin">
          <Paper className="paper-margin" elevation={10}>
            <div>
            
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <PrintToPDF ref={el => (this.componentRef = el)} />
     
            </div>
          </Paper>
        </div>
    );
  }
}

export default Example;
