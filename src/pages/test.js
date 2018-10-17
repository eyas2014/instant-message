import React, { Component } from 'react';

class Child1 extends Component{
	render(){
		return (<div>

					<p>Child1</p>
					<button onClick={this.props.action}>add</button>
			</div>)


	}

}

class Child2 extends Component{
	constructor(){
		super()
		alert('in child2');

	}

	render(){
		return (<div>
					<p>Child2</p>
					<p>{this.props.number.a}</p>
			</div>)


	}

}

class Child3 extends Component{
	render(){
		alert("child3");
		return (<div>
					<p>Child3</p>
					<Child4></Child4>
			</div>)


	}

}

class Child4 extends Component{
	render(){
		alert('child4');
		return (<div>
					<p>Child4</p>
			</div>)


	}

}



class Parent extends Component{
	constructor(props){
		super(props);
		this.state={count:0};
		this.value={a: 8 }
	}

	count(){
		this.setState({count: this.state.count+1});


	}

	render(){
		alert('parent render');
		this.value.a=this.state.count;
		return (<div>
					<Child1 action={this.count.bind(this)}></Child1>
					<Child2 number={this.value}></Child2>
					<Child3></Child3>
			</div>)


	}

}


export default class App extends Component {
	render(){
		return (<Parent></Parent>)

	}



}