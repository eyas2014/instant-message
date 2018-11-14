import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import IconPanorama from '@material-ui/icons/Panorama';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CloseTimer from './close-timer';
import {sendMessage, uploadImg} from '../redux/actions';
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
	wrapper: {
		position: 'absolute',
		bottom: '0px',
		width: '100%',
		height: '150px',
	},
	iconContainer: {

	},
	iconImage: {
		width: "50px",
		height: "auto",
		border: "solid 2px green",
		borderRadius: "50%"
	},

	messageRoot: {
		width: "99%",
		height: "90px"
	},
	composerIcon1: {
		display: 'inline-block',
		float: 'left',
		margin: "4px"
	},
	composerIcon2: {
		display: 'inline-block',
		paddingTop: '6px',
		paddingLeft: '9px',
		float:'right'
	},

	// emotionPic: {
	// 	width: "30px",
	// 	height: "30px",
	// 	background: "url("+emotionPic+") 60px 60px",
	// 	backgroundSize: "810px 210px"
	// },

	messageInput: {
		color: 'red'

	},

	timer: {
		paddingLeft: '20px',
		fontSize: '30px'
	},
	composerIcon3: {
		fontSize: "40px",
	},

	composerIcon4: {
		border: "solid 1px #666",
		boxShadow: "inset 0px 1px 2px #fff",
		background: 'linear-gradient(#649fcd, #427dab)',
		color: "#fff"
	}


};

class MessageComposer extends Component {
	constructor(){
		super();
		this.deleteTimer=30;
	}

	handleUpload(e){
		const {sender, receiver, dispatch}=this.props;
		dispatch(uploadImg(sender, receiver, this.deleteTimer, e.target.files[0]))
	}

	send(){
		const {sender, dispatch, receiver}=this.props;
		dispatch({type: 'scrollStart'});
		var clientTime=new Date();
		var ev={type:'sendNewMessage',message: this.message.value, deleteTimer: this.deleteTimer, 
					sender,  receiver, clientTime: clientTime.getTime()};
		dispatch(sendMessage(ev));
		this.message.value=null;
	}

	setTimer(timer){
		this.deleteTimer=timer;

	}

	render(){
		const { classes, sender } =this.props;
		return(
			<Grid container className={classes.wrapper} justify="center">
				<Grid item xs={1}>
					<Avartar column={sender.column} row={sender.row}>
					</Avartar>
				</Grid>
				<Grid item xs={8}>
					<TextField classes={{root: classes.messageRoot}} 
								multiline rows={4}
								inputRef={(el)=>this.message=el}>
					</TextField>
					<div>
						<div  className={classes.composerIcon1}>
								<label htmlFor={"imageInput"}><IconPanorama color="primary" className={classes.composerIcon3}></IconPanorama></label>
								<input type="file" name="photo" id="imageInput" style={{display: 'none'}} 
										onChange={this.handleUpload.bind(this)} />
						</div>

						<div  className={classes.composerIcon2}>
							<Button variant="contained"
									className={classes.composerIcon4}
									onClick={()=>this.send()}>
								Send
							</Button>
						</div>
					</div>
				</Grid>
				<Grid item xs={1}>
					<div className={classes.timer}>
						<IconButton>
							<CloseTimer setTimer={this.setTimer.bind(this)}></CloseTimer>
						</IconButton>
					</div>
				</Grid>
			</Grid>

		)


	}


}

function mapStateToProps(state){
	return {sender: state.sender,
			receiver: state.receiver}
}



const ComposerWithStyles=withStyles(styles)(MessageComposer);

export default connect(mapStateToProps)(ComposerWithStyles);