import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import IconFileCopy from '@material-ui/icons/FileCopy';
import IconCameraEnhance from '@material-ui/icons/CameraEnhance';
import IconMic from '@material-ui/icons/Mic';
import TextField from '@material-ui/core/TextField';
import emotionPic from '../images/emojisprite_0.png';
import Button from '@material-ui/core/Button';
import squid from '../images/squid.png';
import { connect } from 'react-redux';
import CloseTimer from './close-timer';
import {sendMessage, uploadImg} from '../lib/actions';

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
		float: 'left',
		width: '10%'
	},
	composerIcon2: {
		paddingTop: '6px',
		paddingLeft: '9px',
		float:'left',
		width: '6%'
	},
	emotionPic: {
		width: "30px",
		height: "30px",
		background: "url("+emotionPic+") 60px 60px",
		backgroundSize: "810px 210px"
	},

	messageInput: {
		color: 'red'

	},

	timer: {
		paddingLeft: '20px',
		fontSize: '30px'
	}


};

class MessageComposer extends Component {
	constructor(){
		super();
		this.deleteTimer=30;
	}

	handleUpload(e){
		e.preventDefault();
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
		const { classes } =this.props;
		return(
			<Grid container className={classes.wrapper} justify="center">
				<Grid item xs={1}>
					<div>
						<img src={squid} alt='logo' className={classes.iconImage}></img>
					</div>
				</Grid>
				<Grid item xs={8}>
					<TextField classes={{root: classes.messageRoot}} 
								multiline rows={4}
								inputRef={(el)=>this.message=el}>
					</TextField>
					<div>
						<div  className={classes.composerIcon1}>
							<IconButton>
								<IconFileCopy></IconFileCopy>
							</IconButton>
						</div>
						<div  className={classes.composerIcon1}>
							<IconButton>
								<IconCameraEnhance></IconCameraEnhance>
							</IconButton>
						</div>
						<div  className={classes.composerIcon1}>
							<IconButton>
								<IconMic></IconMic>
							</IconButton>
						</div>
 						<input type="file" name="photo" id="inputlogo" onChange={this.handleUpload.bind(this)}/>

						{[0,1,2,3,4,5].map((item, index)=>{
							return (<div  className={classes.composerIcon2} key={index}>
										<div  className={classes.emotionPic}>
										</div>
									</div>)
						})}
						<div  className={classes.composerIcon2}>
							<Button color="primary" 
									variant="contained"
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