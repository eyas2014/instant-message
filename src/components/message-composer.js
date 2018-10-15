import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import IconFileCopy from '@material-ui/icons/FileCopy';
import IconCameraEnhance from '@material-ui/icons/CameraEnhance';
import IconMic from '@material-ui/icons/Mic';
import TextField from '@material-ui/core/TextField';
import emotionPic from '../images/emojisprite_0.png';


const styles={
	wrapper: {
		position: 'absolute',
		bottom: '0px',
		width: '100%',
		height: '150px',
	},
	iconButton: {
		backgroundColor: 'red',
		borderRadius: '50%'
	},
	messageInput: {
		width: "95%",
		marginTop: "20px"
	},
	composerIcon1: {
		float: 'left',
		width: '10%'
	},
	composerIcon2: {
		paddingTop: '6px',
		paddingLeft: '6px',
		float:'left',
		width: '6%'
	},
	emotionPic: {
		width: "30px",
		height: "30px",
		background: "url("+emotionPic+") 60px 60px",
		backgroundSize: "810px 210px"
	}

};

class MessageComposer extends Component {
	render(){
		const { classes } =this.props;
		return(
			<Grid container className={classes.wrapper} justify="center">
				<Grid item xs={1}>
					<IconButton className={classes.iconButton}>YS</IconButton>
				</Grid>
				<Grid item xs={8}>
					<TextField className={classes.messageInput} multiline></TextField>



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
						<div  className={classes.composerIcon1}>
							<IconButton>
								Send
							</IconButton>
						</div>
					</div>



				</Grid>
				<Grid item xs={1}>
					<IconButton className={classes.iconButton}>
						<IconFileCopy></IconFileCopy>
					</IconButton>
				</Grid>
			</Grid>

		)


	}


}


export default withStyles(styles)(MessageComposer);