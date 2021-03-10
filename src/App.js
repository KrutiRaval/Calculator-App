import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";

class App extends Component {
    constructor(){
        super();

        this.state = {
            result: ""
        }
    }

    componentDidMount(){
        document.addEventListener("keypress", event => {
            if (/^[0-9=+-/*.]$/g.test(event.key)) {
              this.onClick(event.key)
            } else {
              console.log('Not Valid Key', event.key);
            }
          });
    }

    componentWillUnmount(){
        document.removeEventListener("keypress", event => {});
    }

    onClick = (button) => {
        button = button.key ? button.key : button
        if(button === "="){
            this.calculate()
        }
        else if(button === "C"){
            this.reset()
        } 
        else {
            this.setState({
                result: this.state.result === "invalid" || this.state.result === "Infinity" ? button : this.state.result + button
            })
        }
    };


    calculate = () => {
        if(this.state.result === "invalid") {
            this.reset()
        }
        var checkResult = ''
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
        }

        else {
            checkResult = this.state.result
        }

        try {
            this.setState({
                result: (eval(checkResult)|| "") + ""
            })
        } catch (e) {
            this.setState({
                result: "invalid"
            })
        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };

    render() {
        return (
            <div name="keypress">
                <div className="calculator-body">
                    <span className="title">Calculator</span>
                    <ResultComponent result={this.state.result}/>
                    <KeyPadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;
