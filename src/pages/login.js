import logo from './logo.svg';
import React, { Component } from 'react';
import styled from 'styled-components';

const Image=styled.img`
	height: 200px;
	width: auto;
`;

export default class App extends Component {
	componentDidMount(){


	}
	render(){
		return (<div>
					<Image src={logo} alt='logo'></Image>
					

				</div>)

	}


}