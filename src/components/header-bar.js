import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { apiAddress } from '../config.js';

const styles={
	floatRight: {
		minHeight: '0px',
		paddingTop:'5px',
		float: 'right'
	},
	floatLeft: {
		float: 'left',
		minHeight: '0px'
	},
	fullWidth: {
		width: '100%'
	},
	typography1: {
		lineHeight: '48px',
		marginLeft: '10px'

	},
	typography2: {
		lineHeight: '48px',
		marginLeft: '10px',
		color:  '#ccc'
	},
	noShadow: {
		backgroundColor: "#538fbe",
		boxShadow: "0px 1px 3px #000",
		width: "101%",
		marginLeft: "-2px",
		background: "linear-gradient(#649fcd, #427dab)"
	},
	search: {
		margin: "0px",
		height: "34px",
		overflow: "hidden",
		'& input': {
			padding: '10px'
		}	
	},
	iconButton: {
		paddingLeft: '5px'
	},
	button: {
		marginLeft: '20px'

	}
}

class HeaderBar extends Component {
	logout(username){
		fetch(apiAddress+"/logout", {
		        method: "POST", 
		        mode: "cors", 
		        cache: "no-cache", 
		        credentials: "same-origin", 
		        headers: {
		            "Content-Type": "application/json; charset=utf-8",	       
		        },
		        redirect: "follow", 
		        referrer: "no-referrer", 
		        body: JSON.stringify({username})
			}).then((response)=>{
			return response.json()
		}).then((data)=>{
			if(data.loggedOut) {
				window.location.href=apiAddress+"#/login";
			}
		})
	}

	handleChange(e){
		this.props.dispatch({type: 'searchDialog', str: e.target.value})

	}


	render(){
		const { classes, receiver, connection, sender} = this.props;
		return (
			<AppBar position='static' className={classes.noShadow}>
				<Grid container>
						<Grid item xs={3}>
							<Toolbar  classes={{root: classes.floatLeft}} >
					          <IconButton aria-label="Menu" color="inherit">
					            {connection?<WifiIcon />:<WifiOffIcon />}
					          </IconButton>
					          <Typography variant='inherit' color="inherit">
					            {connection?'online':'offline'}
					          </Typography>
				        	</Toolbar>
				        </Grid>
				        <Grid item xs={6}>
					        <Toolbar  classes={{root: classes.floatLeft}} >
					          <Typography variant='inherit' className={classes.typography1}>
					            Chatting with:
					          </Typography>
					          <Typography variant='inherit'  className={classes.typography2}>
					            {receiver}
					          </Typography>
					        </Toolbar>
					    </Grid>
					    <Grid item xs={3}>
					        <Toolbar   classes={{root: classes.floatRight}} >
								<Button color="inherit" onClick={()=>this.logout(sender)} className={classes.button}>Logout
						        </Button>
					    	</Toolbar>
				        </Grid>
				    </Grid>
			    </AppBar>)

	}

}

function mapStateToProps(state){
	return {receiver: state.receiver,
			sender: state.sender.name,
			connection: state.connection
			}
}

export default connect(mapStateToProps)(withStyles(styles)(HeaderBar));



