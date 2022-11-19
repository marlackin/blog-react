import React from "react";

class ClassCounter extends React.Component{
    constructor(props){
        super();
        this.state = {
            count:0
        }
        this.Increment = this.Increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }
     Increment(){
        this.setState({count:this.state.count +=1})
    }
     decrement(){
        this.setState({count:this.state.count -=1})
    }
    render(){
        return(
            <div>
                 <h1>{this.state.count}</h1>
                  <button onClick={this.Increment}>Increment</button>
                  <button onClick={this.decrement}>decrement</button>
            </div>
        )
    }
}
export default ClassCounter;