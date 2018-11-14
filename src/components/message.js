import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconCheckCircle from '@material-ui/icons/CheckCircle';
import { connect } from 'react-redux';
import styled from 'styled-components';


const Avartar=styled.div`
	width: 50px;
	height: 60px;
	border: solid 1px #618833;
	border-radius: 50%;
	background-image: url("profilePhoto.jpg");
	background-position: ${(props)=>{ 
		const x=-6-props.column*46;
		const y=-16-props.row*56;
		return x+'px '+y+'px'}};
	background-size: 200px 480px;
`;

const styles={
	image: {
		width: "100px",
		height: "auto"
	},
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
		alignItems: 'center',
		'& svg': { 
			color: '#88f'
		}
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
				color: '#538fbe'
			}
		}
	}

}


class Message extends Component {

	toggleMessage(){
		const { sender, clientTime, selected }=this.props.message;
		this.props.dispatch({type:'toggleMessage', sender, clientTime, selected});
	}


	render(){
		const {timerStart, deleteTimer, message, sender, clientTime, status, selected, storeName}=this.props.message;
		var timeLeft;
		if(status==='deleting') timeLeft='Deleting';
		else if(status==='composed') timeLeft='Sending';
		else if(status==='sentToServer'&&deleteTimer==='forever')timeLeft='forever';
		else if(status==='sentToReceiver'&&deleteTimer==='forever')timeLeft='forever';
		else if(status==='receivedMessage'&&deleteTimer==='forever')timeLeft='forever';
		else if(timerStart){ 
			timeLeft=deleteTimer-(this.props.currentTime-timerStart)/1000;
			timeLeft=Math.floor(timeLeft/60)+':'+Math.floor(timeLeft%60);
		}
		else timeLeft=Math.floor(deleteTimer/60)+':'+Math.floor(deleteTimer%60);

		var classes=this.props.classes;
		return (
		<div>
			<Grid container justify="center"  onClick={this.toggleMessage.bind(this)} className={selected?classes.greyBackground:classes.brightBackground}>
				<Grid item xs={1}   className={selected?classes.selectedTick:classes.tick}>
					<IconCheckCircle color="primary"></IconCheckCircle>
				</Grid>
				<Grid item  xs={1} >
					<Avartar column={sender.column} row={sender.row}>
					</Avartar>
				</Grid>
				<Grid item  xs={6}>
					<p className={classes.user}>{sender.name}</p>
					<div>
						{message&&<p className={classes.message}>{message}</p>}
						{storeName&&<img className={classes.image} src={'http://localhost:3000/'+storeName} alt="pp"/>}
					</div>
				</Grid>
				<Grid item  xs={1}>
					<p className={classes.message}>{clientTime.toString().substring(16, 25)}</p>
				</Grid>
				<Grid item  xs={1}>
					<p className={classes.message}>{timeLeft}</p>
				</Grid>

			</Grid>
		</div>)

	}


}

export default connect()(withStyles(styles)(Message));