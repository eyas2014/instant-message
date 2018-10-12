import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';


const styles={
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
	}
}


class Navigation extends Component {
	render(){
		const { classes } =this.props;
		return (
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
			</Grid>)
	}
}


export default withStyles(styles)(Navigation);