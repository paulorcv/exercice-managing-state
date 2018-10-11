import React, { Component } from 'react';
import Score from './Score';



// const numQuestions = 0;
// const numCorrect = 0;

class Game extends Component{

    state = {
        numCorrect: 0,
        numQuestions: 0,
        value1: 0,
        value2: 0,
        value3: 0,
        proposedAnswer: 0
      }

    componentDidMount(){
        this.generateValues();
    }

    generateValues(){

        const value1 = Math.floor(Math.random() * 100);
        const value2 = Math.floor(Math.random() * 100);
        const value3 = Math.floor(Math.random() * 100);
        const proposedAnswer = Math.floor(Math.random() * 3) + value1 + value2 + value3;

        this.setState({
            value1: value1,
            value2: value2,
            value3: value3,
            proposedAnswer: proposedAnswer
        });
    }  

    answerIsRight(answeredTrue){
        console.log('answerIsRight');
        if( answeredTrue==='true')            
            return this.state.proposedAnswer === this.state.value1 + this.state.value2 + this.state.value3;
        else 
            return this.state.proposedAnswer !== this.state.value1 + this.state.value2 + this.state.value3;   

    }

    computeRightAnswer(){
        console.log('computeRightAnswer');
        this.setState(function(currentState){
            return{
                    numCorrect: currentState.numCorrect + 1,
                    numQuestions: currentState.numQuestions + 1
                }
        });        
    }

    computeWrongAnswer(){

        console.log('computeWrongAnswer');

        this.setState(function(currentState){
            return{numQuestions: currentState.numQuestions + 1}
        });
    }

    computeAnswer(event){
        const answer = event.target.name;
        console.log('computeAnswer');
        console.log('answer:');
        console.log(answer);

        if( (answer ==='true' && this.answerIsRight(answer)) || (answer ==='false' && !this.answerIsRight(answer)) ){
                this.computeRightAnswer();
            }
            else{
                this.computeWrongAnswer();
            }
            this.generateValues();
    }

    render(){
    return(
        <div className="game">
          <h2>Mental Math</h2>
          <div className="equation">
            <p className="text">{`${this.state.value1} + ${this.state.value2} + ${this.state.value3} = ${this.state.proposedAnswer}`}</p>
          </div>
          <button onClick={this.computeAnswer} name='true'>True</button>
          <button onClick={this.computeAnswer} name='false'>False</button>
          <Score numCorrect={this.state.numCorrect} numQuestions={this.state.numQuestions} />
        </div>
    )
    }


}

export default Game;