import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import dolphin from '../images/dolphin.png';
import IconCheckCircle from '@material-ui/icons/CheckCircle';
import spinner from '../images/spinner.gif';

const styles={
	tick: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& svg': { 
			color: '#fff'

		}
	},

	selectedTick: {
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

	messageIcon: {
		marginTop:'20px',
		width: "40px",
		height: "auto",
		border: "solid 2px green",
		borderRadius: "50%"
	},

	spinner: {
		marginTop:'20px',
		width: "40px",
		height: "auto",
		borderRadius: "50%"
	},

	greyBackground: {
		backgroundColor: "#eee",
		paddingTop: "10px",
		paddingBottom: "10px"
	},

	brightBackground:{
		backgroundColor: "#fff",
		paddingTop: "10px",
		paddingBottom: "10px",
		'&:hover': {
			backgroundColor: "#eee",
			'& svg': {
				color: '#99f'
			}
		}
	}

}


class Message extends Component {

	selectMessage(){
		if(this.props.selected) this.props.toggleMessage({status:false, id: this.props.message.id});
		else this.props.toggleMessage({status:true, id: this.props.message.id});
	}


	render(){
		const {message, classes, selected, pending}= this.props;
		return (
		<div>
			<Grid container justify="center"  onClick={this.selectMessage.bind(this)} className={selected?classes.greyBackground:classes.brightBackground}>
				<Grid item xs={1}   className={selected?classes.selectedTick:classes.tick}>
					<IconCheckCircle color="primary"></IconCheckCircle>
				</Grid>
				<Grid item  xs={1} >
					<div>
						{pending?<img src={spinner} className={classes.spinner} alt="spinner"></img>
								:<img src={dolphin} className={classes.messageIcon} alt='logo'></img>}
					</div>
				</Grid>
				<Grid item  xs={6}>
					<p className={classes.user}>{message.sender}</p>
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