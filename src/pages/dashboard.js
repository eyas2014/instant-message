import React, { Component } from 'react';
import HeaderBar from '../components/header-bar';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

const styles={
	background: {
		backgroundColor: '#ddd',
	},

	nav: {
		borderRight: "solid 2px #aaa",
		backgroundColor: "#fff",
		height: "100%"
	},
	search: {
		margin: "10px",
		height: "44px",
		overflow: "hidden"
	},
	iconButton: {
		padding: '5px'
	},

	fullHeight:{
		height: "100vh"
	},
	fillRemain: {
		position: "absolute",
		top: '48px',
		bottom: '0px'

	}

}


class App extends Component {
	render(){
		const { classes } =this.props;
		return (
			<Grid container justify='center' className={classes.background}>
				<Grid item xs={12} md={8} className={classes.fullHeight}>
					<HeaderBar></HeaderBar>
					<Grid container>
						<Grid item xs={3} className={classes.nav}>
								<TextField placeholder="search"
											variant="outlined"
											margin="normal"
											classes={{root: classes.search}}
								          InputProps={{
								          	className: classes.iconButton,
								            startAdornment: (
								              <InputAdornment>
								                <IconButton aria-label="search" classes={{root: classes.iconButton}}>
													<SearchIcon />
								                </IconButton>
								              </InputAdornment>
								            ),
								        	endAdornment: (
								              <InputAdornment>
								                <IconButton aria-label="close"  classes={{root: classes.iconButton}}>
													<ClearIcon />
								                </IconButton>
								              </InputAdornment>
								            ),
								          }}>
								</TextField>
						</Grid>
						<Grid item xs={9}>
						</Grid>
					</Grid>
				</Grid>
			</Grid>)

	}

}


export default withStyles(styles)(App);