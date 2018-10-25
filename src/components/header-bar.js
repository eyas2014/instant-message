import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';

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
		boxShadow: "none"
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
	logout(){
		fetch("http://localhost:3000/logout").then((response)=>{
			return response.json()
		}).then((data)=>{
			if(data.loggedOut) {
				window.location.href="/login";
			}
		})
	}

	handleChange(e){
		this.props.dispatch({type: 'searchDialog', str: e.target.value})

	}


	render(){
		const { classes, receiver } = this.props;
		return (
			<AppBar position='static' classes={{root: classes.noShadow}}>
				<Grid container>
						<Grid item xs={3}>
							<Toolbar  classes={{root: classes.floatLeft}} >
					          <IconButton aria-label="Menu" color="inherit">
					            <MenuIcon />
					          </IconButton>
					          <Typography variant='inherit' color="inherit">
					            Telegram
					          </Typography>
				        	</Toolbar>
				        </Grid>
				        <Grid item xs={9}>
					        <Toolbar  classes={{root: classes.floatLeft}} >
					          <Typography variant='inherit' className={classes.typography1}>
					            Contact:
					          </Typography>
					          <Typography variant='inherit'  className={classes.typography2}>
					            {receiver}
					          </Typography>
					        </Toolbar>
					        <Toolbar   classes={{root: classes.floatRight}} >
								<TextField placeholder="search"
											variant="filled"
											margin="normal"
											classes={{root: classes.search}}
											onChange={(e)=>this.handleChange(e)}
								          InputProps={{
								          	className: classes.iconButton,
								            startAdornment: (
								              <InputAdornment>
								                <IconButton aria-label="search" classes={{root: classes.iconButton}}>
													<SearchIcon />
								                </IconButton>
								              </InputAdornment>
								            ),
								          }}>
								</TextField>
								<Button color="inherit" variant="outlined" onClick={this.logout} className={classes.button}>Logout
						        </Button>
					    	</Toolbar>
				        </Grid>
				    </Grid>
			    </AppBar>)

	}

}

function mapStateToProps(state){
	return {receiver: state.receiver}
}

export default connect(mapStateToProps)(withStyles(styles)(HeaderBar));



