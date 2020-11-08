import React, { Component } from 'react';
import { render } from 'react-dom';
import Ap from './qlogic';


class Questionnaire extends Component {
  constructor() {
    super();
    this.state = {
      quiz: [
        {
          question: "¿Comenzaste un negocio en tu área de expertise o talento como por ejemplo, consultoría, diseño o jardinería?",
          options: ["Si", "No"],
          answer: null
        },{
          question: "¿Comenzaste un negocio para tener un ingreso personal adicional?",
          options: ["Si", "No"],
          answer: null
        },{
          question: "¿Trabajas por tu cuenta, por servicios profesionales o tienes una tienda online?",
          options: ["Si", "No"],
          answer: null
        },{
          question: "¿Tienes un local físico? ¿Como por ejemplo una tienda, restaurante, colmado, cafetería o boutique?",
          options: ["Si", "No"],
          answer: null
        },{
          question: "¿Cuentas con empleados que te ayudan a operar el negocio?",
          options: ["Si", "No"],
          answer: null
        },
      ]
    };
  }

  render() {
    return (
      <div>
        <Ap quiz={this.state.quiz}/>
      </div>
    );
  }
}

render(<Questionnaire />, document.getElementById('root'));
export default Questionnaire;

