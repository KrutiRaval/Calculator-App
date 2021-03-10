import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";

//The calculator App which main logic and rendering the data
class App extends Component {
    constructor(){
        super();
      //State variable would store the result or input
        this.state = {
            result: ""
        }
    }

    //This lifecycle allows to listen to the keypress for input as soon as the app component is mounted
    componentDidMount(){
        document.addEventListener("keypress", event => {
          //only allows keyboard key input for numbers and operators
            if (/^[0-9=+-/*.]$/g.test(event.key)) {
              this.onClick(event.key)
            } else {
              console.log('Not Valid Key', event.key);
            }
          });
    }

    //This lifecycle removes listening to the keypress for input as soon as the app component is about to unmount
    componentWillUnmount(){
        document.removeEventListener("keypress", event => {});
    }

    //Performs operations accordingly if a button or key is pressed 
    onClick = (button) => {

       //checking whether the input is via keyboard or button click and assigning value accordingly
        button = button.key ? button.key : button

        //Calling the calculate function to evaluate the result
        if(button === "="){
            this.calculate()
        }

        //Clearing the result section by calling the reset function
        else if(button === "C"){
            this.reset()
        } 

        //For all the other inputs setting the state to the input entered
        else {
            this.setState({
              //Making sure when to append the values to a number and when to reset in case of errors
                result: this.state.result === "Invalid" || this.state.result === "Infinity" ? button : this.state.result + button
            })
        }
    };

    //Calculation logic for arithmatic operations
    calculate = () => {
        if(this.state.result === "Invalid") {
            this.reset()
        }
        var checkResult = this.state.result
        //subtracting a negative number would end up summing it so changing the symbol
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
        }

        //Exception handling done via try catch block
        try {
            this.setState({
              //eval executes checkResult and perfoms operations on it
                result: (eval(checkResult)|| "") + ""
            })
        } catch (e) {
            this.setState({
                result: "Invalid"
            })
        }
    };

    //reset the result section
    reset = () => {
        this.setState({
            result: ""
        })
    };

    //renders the component into react-dom
    render() {
        return (
          //Triggers the app to allow inputs from keyboard
            <div name="keypress">
                <div className="calculator-body">
                    <span className="title">Calculator</span>
                    {/* Parent-Child Component Relationship which used functions as props to the child */}
                    <ResultComponent result={this.state.result}/>
                    <KeyPadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;
