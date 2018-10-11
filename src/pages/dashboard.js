import React, { Component } from 'react';
import HeaderBar from '../components/header-bar';
import { Container } from '../components//styled-components';




export default class App extends Component {
	render(){
		return (<Container width='70'>
					<HeaderBar></HeaderBar>
					<p>main!!</p>

			</Container>)

	}

}