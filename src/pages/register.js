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

export default class Register extends Component {
	componentDidMount(){


	}
	render(){
		return (<div>
					<Image src={logo} alt='logo'></Image>
					<form>
				        <TextField
				          id="user-name"
				          label="User Name"
				          name="userName"
				          margin="normal"
				          variant="outlined"
				        />
				        <br />
				        <TextField
				          id="password"
				          label="Password"
				          type="password"
				          margin="normal"
				          variant="outlined"
				        />
				        <br />
				        <TextField
				          id="password"
				          label="Re-enter Password"
				          type="password"
				          margin="normal"
				          variant="outlined"
				        />
				        <br />
				        <br />
			            <Button variant="contained">
			              	<i class="fas fa-sign-in-alt"></i>
			              	<Span>Sign Up</Span>
			   			</Button>
			        </form>
				</div>)

	}


}