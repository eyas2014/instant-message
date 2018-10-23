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
import dolphin from '../images/dolphin.png';
import { connect } from 'react-redux';
import sendMessage from '../lib/actions'


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

	}

};

class MessageComposer extends Component {
	send(){
		this.props.dispatch(sendMessage(this.message.value));
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
						{[0,1,2,3,4,5,6].map((item, index)=>{
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
					<div>
						<img src={dolphin} alt='logo' className={classes.iconImage}></img>
					</div>
				</Grid>
			</Grid>

		)


	}


}




const ComposerWithStyles=withStyles(styles)(MessageComposer);

export default connect()(ComposerWithStyles);