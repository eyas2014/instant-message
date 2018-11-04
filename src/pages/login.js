import logo from './logo.svg';
import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const Image=styled.img`
	height: 200px;
	width: auto;
`;

const Span=styled.span`
	margin-left: 10px;
`;

const P=styled.p`
	color: red;
`;

class Login extends Component {
	constructor(){
		super();
		this.state={incorrectPassword: false}
	}

	submit(){
		fetch("http://localhost:3000/authenticate", {
	        method: "POST", 
	        mode: "cors", 
	        cache: "no-cache", 
	        credentials: "same-origin", 
	        headers: {
	            "Content-Type": "application/json; charset=utf-8",	       
	        },
	        redirect: "follow", 
	        referrer: "no-referrer", 
	        body: JSON.stringify(this.state), 
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			if(data.validated) {
				this.props.dispatch({type: 'login', username: this.state.userName});
				window.location.href="http://localhost:3000#/dashboard";
			}
			else this.setState({incorrectPassword: true});
		})
	}

	_changeHandler(e){
		var input={};
		input[e.target.id]=e.target.value;
		this.setState(input);
	}

	componentWillMount(){
		fetch("http://localhost:3000/prelogin").then((response)=>{
			return response.json()
		}).then((data)=>{
			if(data.validated) {
				//window.location.href="http://localhost:3000#/dashboard"; disable prelogin to temporarily allow two users in one computer.
			}
		})
	}

	render(){
		return (<div>
					<Image src={logo} alt='logo'></Image>
					<form>
				        <TextField
				          id="userName"
				          label="User Name"
				          name="userName"
				          margin="normal"
				          variant="outlined"
				          onChange={(e)=>this._changeHandler(e)}
				        />
				        <br />
				        <TextField
				          id="password"
				          label="Password"
				          type="password"
				          margin="normal"
				          variant="outlined"
				          onChange={(e)=>this._changeHandler(e)}
				        />
				        {this.state.incorrectPassword && <P>incorrect password!</P>}
				        <br />
				        <br />
			            <Button onClick={()=>this.submit()} variant="contained">
			              	<i className="fas fa-sign-in-alt"></i>
			              	<Span>Login</Span>
			   			</Button>
			   			<p><a href="#register">No, I don't have an account</a></p>
			        </form>
				</div>)
	}
}

function mapStateToProps(state){
	return {
		sender: state.sender
	}
}

export default connect(mapStateToProps)(Login);