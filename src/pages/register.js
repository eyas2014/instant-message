import logo from './logo.svg';
import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

export default class Register extends Component {
	constructor(){
		super();
		this.state={};


	}

	_handleChange(e){
		this.setState({accountExist: false});
		var obj={};
		obj[e.target.id]=e.target.value;
		this.setState(obj);
	}


	submit(){
		fetch('http://localhost:3000/registration', {
			method: "POST", 
	        mode: "cors", 
	        cache: "no-cache", 
	        credentials: "same-origin", 
	        headers: {
	            "Content-Type": "application/json; charset=utf-8",	       
	        },
	        redirect: "follow", 
	        referrer: "no-referrer", 
	        body: JSON.stringify({userName: this.state.userName, password: this.state.password1}), 
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			console.log(data);
			if(data.success) {
				window.location.href="http://localhost:3000#/dashboard";
			}
			else this.setState({accountExist: true});
		})

	}

	render(){
		return (<div>
					<Image src={logo} alt='logo'></Image>
					<form>
				        <TextField onChange={(e)=>this._handleChange(e)}
				          id="userName"
				          label="User Name"
				          name="userName"
				          margin="normal"
				          variant="outlined"
				        />
				        <br />
				        <TextField onChange={(e)=>this._handleChange(e)}
				          id="password1"
				          label="Password"
				          type="password"
				          margin="normal"
				          variant="outlined"
				        />
				        <br />
				        <TextField onChange={(e)=>this._handleChange(e)}
				          id="password2"
				          label="Re-enter Password"
				          type="password"
				          margin="normal"
				          variant="outlined"
				        />
				        {this.state.password1!==this.state.password2&&this.state.password2&&<P>password mismatch!</P>}
				        <br />
				        {this.state.accountExist&&<P>Account already exists!</P>}
				        <br />
			            <Button variant="contained" onClick={()=>this.submit()}>
			              	<i className="fas fa-sign-in-alt"></i>
			              	<Span>Sign Up</Span>
			   			</Button>
			        </form>
				</div>)

	}


}