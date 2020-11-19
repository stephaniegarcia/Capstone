import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from  '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LiveHelp from '@material-ui/icons/LiveHelp';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import apiService from "./mockApiService";
//import apiService from "./apiService";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: "60%",
 
    margin: "0 auto"
  }),
  button:{
    pointerEvents: "none",
    boxShadow: "none"
  },
  questionMeta:{
    marginLeft: 10,
    display: "inline"
  },
  footer:{
    marginTop: "40px"
  }
});

class Questionnaire extends Component {

constructor(props){
  super(props);
  this.state = {
    current: 0,
    quiz: props.quiz,
    selectedValue: null,
    revealed: false,
  }
}

handleChange = event => {
    this.state.quiz[this.state.current].answer = event.target.value;
    this.setState({ selectedValue: event.target.value });
    var canSubmit = true;
    for(var i = 0; i < this.state.quiz.length; i++) {
      canSubmit = canSubmit && this.state.quiz[i].answer != null;
    }
    this.setState({ canSubmit: canSubmit });
    apiService.saveQuiz(this.state.quiz);
  };


moveNextClick = () => {
  this.setState({ selectedValue: this.state.quiz[this.state.current+1].answer });
  this.setState({current: this.state.current+1})
}

movePreviousClick = () => {
  this.setState({ selectedValue: this.state.quiz[this.state.current-1].answer });
  this.setState({current: this.state.current-1})
}

 render(){
    var question = this.state.quiz[this.state.current];
    var curQuestion = this.state.current + 1;
    var size = this.state.quiz.length;
    var moveRight = this.state.current+1 < this.state.quiz.length;
    var moveLeft = this.state.current-1 >= 0;

  return (
    !question ? '' : 
    <div>
        <h1>Comienza Tu Recorrido Empresarial</h1>
        <h4>Contesta las siguientes preguntas para identificar tu tipo de negocio</h4>
      <Paper className="paper-margin" elevation={10}>
        <Typography component="p">
          <Button variant="fab" color="primary" aria-label="add" className={this.props.classes.button}>
           <LiveHelp />
           </Button>
          <span className={this.props.classes.questionMeta}> Pregunta # {curQuestion} / {size}</span>
         
        </Typography>

        <hr style={{marginBottom: "20px"}}/>
        <Typography variant="headline" component="h5">
          {question.question}
        </Typography>

        {question.options.map((opt, index)=>(
          <div key={index} style={{marginTop: "5px"}}   ref={index.toString()}>
          <Radio
          // checked={this.state.quiz[this.state.current].answer}
          checked={this.state.selectedValue === index.toString()}
          onChange={this.handleChange}
          value={index.toString()}
          name="radio-button-demo"
          aria-label="A"
        />
        {opt}
        </div>
        ))}
        <div className={this.props.classes.footer}>
          <Button href="/outcome" disabled={!this.state.canSubmit} variant="raised" color="secondary">Someter</Button>
          <Button disabled={!moveRight} onClick={this.moveNextClick} variant="raised" color="primary" style={{float: "right"}}>Siguiente</Button>
          <Button disabled={!moveLeft} onClick={this.movePreviousClick} variant="raised" color="primary" style={{float: "right", marginRight: "50px"}}>Anterior</Button>
        </div>
      </Paper>
    </div>
  );
  }
}

Questionnaire.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Questionnaire);