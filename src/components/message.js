import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles={
	root: {
		color: 'red'
	},
	user: {
		fontSize: '13px',
		margin: '5px',
		textAlign: 'left',
		fontWeight: '900'
	},
	message: {
		fontSize: '13px',
		margin: '5px',
		textAlign: 'left'
	}


}


class Message extends Component {
	render(){
		const {message, classes}= this.props;
		return (<Grid container justify="center">
			<Grid item xs={1} className={classes.root}>a</Grid>
			<Grid item  xs={1}>b</Grid>
			<Grid item  xs={6}>
				<p className={classes.user}>{message.name}</p>
				<div>
					<p className={classes.message}>{message.message}</p>
				</div>
			</Grid>
			<Grid item  xs={2}>
				<p className={classes.message}>{message.date}</p>
			</Grid>

		</Grid>)

	}


}


export default withStyles(styles)(Message);