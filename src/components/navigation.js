import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ContactTag from './contact-tag';
import { connect } from 'react-redux';
import spinner from '../images/spinner.gif';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ContactModal from './contact-modal';

const styles={
	search: {
		margin: "10px",
		height: "44px",
		overflow: "hidden"
	},
	iconButton: {
		padding: '5px',
	},
	spinner: {
		marginTop: '50px',
		width: '60px',
		height: 'auto',
		margin: 'auto',
		marginBottom: '50px',
	},
	addContacts: {
		boxShadow: "inset 0px 1px 2px #fff",
		border: "solid 1px #777",
		background: "linear-gradient(#649fcd, #427dab)",
		color: "#fff"

	}
}


class Navigation extends Component {
	constructor(){
		super();
		this.state={openModal:false};

	}

	handleChange(e){
		this.props.dispatch({type: 'searchContacts', str: e.target.value})
	}

	closeModal(){
		this.setState({openModal: false});

	}

	render(){
		const { classes, loading } =this.props;
		return (
			<div>
				<TextField placeholder="search"
							variant="outlined"
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
				        	endAdornment: (
				              <InputAdornment>
				                <IconButton aria-label="close"  classes={{root: classes.iconButton}}>
									<ClearIcon />
				                </IconButton>
				              </InputAdornment>
				            ),
				          }}>
				</TextField>

				{loading?<img src={spinner} className={classes.spinner} alt="spinner"></img>:<ContactTag />}
				<br />
				<Button variant="contained" aria-label="Add Contacts" className={classes.addContacts} 
						onClick={()=>this.setState({openModal: true})}>
		       		 Add Contacts
		    	</Button>
		    	<Modal open={this.state.openModal}>
		    		<ContactModal closeModal={this.closeModal.bind(this)}></ContactModal>
		    	</Modal>
			</div>)
	}
}

function mapStateToProps(state){
	return {loading: state.contacts.loading}
}


export default connect(mapStateToProps)(withStyles(styles)(Navigation));