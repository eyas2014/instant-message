import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import dolphin from '../images/dolphin.png';
import IconCheckCircle from '@material-ui/icons/CheckCircle';
import spinner from '../images/spinner.gif';
import { connect } from 'react-redux';

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
		textAlign: 'center'
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

	selectMessage(id){
		const {dispatch, message}=this.props;
		if(message.selected) dispatch({type:'deselectMessage', id:message.id});
		else dispatch({type:'selectMessage', id:message.id});
	}


	render(){
		const {receiveTime, deleteTimer, message, sender}=this.props.message;
		var timeLeft=deleteTimer-(this.props.currentTime.getTime()-receiveTime.getTime())/1000;
		var classes=this.props.classes;
		return (
		<div>
			<Grid container justify="center"  onClick={this.selectMessage.bind(this)} className={message.selected?classes.greyBackground:classes.brightBackground}>
				<Grid item xs={1}   className={message.selected?classes.selectedTick:classes.tick}>
					<IconCheckCircle color="primary"></IconCheckCircle>
				</Grid>
				<Grid item  xs={1} >
					<div>
						{message.pending?<img src={spinner} className={classes.spinner} alt="spinner"></img>
								:<img src={dolphin} className={classes.messageIcon} alt='logo'></img>}
					</div>
				</Grid>
				<Grid item  xs={6}>
					<p className={classes.user}>{sender}</p>
					<div>
						<p className={classes.message}>{message}</p>
					</div>
				</Grid>
				<Grid item  xs={1}>
					<p className={classes.message}>{receiveTime.toString().substring(4, 25)}</p>
				</Grid>
				<Grid item  xs={1}>
					<p className={classes.message}>{Math.floor(timeLeft/60)}:{Math.floor(timeLeft%60)}</p>
				</Grid>

			</Grid>
		</div>)

	}


}

export default connect()(withStyles(styles)(Message));