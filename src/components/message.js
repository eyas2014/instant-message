import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import dolphin from '../images/dolphin.png';
import IconCheckCircle from '@material-ui/icons/CheckCircle';

const styles={
	tick: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
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
	},
	iconImage: {
		width: "40px",
		height: "auto",
		border: "solid 2px green",
		borderRadius: "50%"
	},
	iconContainer: {
		paddingTop: '10px'
	},
	greyBackground: {
		backgroundColor: "#ddd",
		paddingTop: "10px",
		paddingBottom: "10px"
	},
	brightBackground:{
		backgroundColor: "#fff",
		paddingTop: "10px",
		paddingBottom: "10px"
	}

}


class Message extends Component {
	constructor(){
		super()
		this.state={selected: true}


	}

	selectMessage(){
		this.setState({selected:!this.state.selected})
	}


	render(){
		const {message, classes}= this.props;
		return (
		<div>
			<Grid container justify="center"  onClick={this.selectMessage.bind(this)} className={this.state.selected?classes.greyBackground:classes.brightBackground}>
				<Grid item xs={1}   className={classes.tick}>
					<IconCheckCircle color="primary"></IconCheckCircle>
				</Grid>
				<Grid item  xs={1} >
					<div  className={classes.iconContainer}>
						<img src={dolphin} alt='logo' className={classes.iconImage}></img>
					</div>
				</Grid>
				<Grid item  xs={6}>
					<p className={classes.user}>{message.name}</p>
					<div>
						<p className={classes.message}>{message.message}</p>
					</div>
				</Grid>
				<Grid item  xs={2}>
					<p className={classes.message}>{message.date}</p>
				</Grid>

			</Grid>
		</div>)

	}


}


export default withStyles(styles)(Message);