import React, {Component} from 'react';

//This component displays the result of operations or the inputs
class ResultComponent extends Component {
    render() {
        let {result} = this.props;
        return (
            <div className="result">
                <p>{result}</p>
            </div>
    );
    }
}


export default ResultComponent;

