import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ContactTag from './contact-tag';
import {updateContacts} from '../lib/actions';
import { connect } from 'react-redux';
import spinner from '../images/spinner.gif';


const styles={
	search: {
		margin: "10px",
		height: "44px",
		overflow: "hidden"
	},
	iconButton: {
		padding: '5px'
	},
	spinner: {
		marginTop: '100px',
		width: '60px',
		height: 'auto',
		margin: 'auto'
	}
}


class Navigation extends Component {

	componentWillMount(){
		this.props.dispatch(updateContacts({clientName: 'Yaming'}));
	}


	render(){
		const { classes, loading } =this.props;
		return (
			<div>
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

				{loading?<img src={spinner} className={classes.spinner}></img>:<ContactTag />}
			</div>)
	}
}

function mapStateToProps(state){
	return {loading: state.contacts.loading}
}


export default connect(mapStateToProps)(withStyles(styles)(Navigation));