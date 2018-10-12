import React, { Component } from 'react';
import HeaderBar from '../components/header-bar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Navigation from '../components/navigation';

const styles={
	background: {
		backgroundColor: '#ddd',
	},
	fullHeight:{
		position: 'relative',
		height: "100vh"
	}, 
	height100: {
		height: "100%",
		backgroundColor: "#fff"
	},
	fullDiv: {
		width: "100%",
		height: "100%"
	},
	fillRemain: {
		position: 'absolute', 
		top: '48px', 
		bottom: '0px', 
		width: "100%"
	}
}

class App extends Component {
	render(){
		const { classes } =this.props;
		return (
			<Grid container justify='center' className={classes.background}>
				<Grid item xs={12} md={8} className={classes.fullHeight}>
					<HeaderBar></HeaderBar>
					<div className={classes.fillRemain}>
						<Grid container  className={classes.fullDiv}>
							<Navigation></Navigation>
							<Grid item xs={9}   className={classes.height100}>
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>)

	}

}


export default withStyles(styles)(App);