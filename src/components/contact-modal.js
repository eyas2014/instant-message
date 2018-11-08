import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {loadAccounts, addContact} from '../lib/actions';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles={
	modal: {
		position: 'absolute',
		top: '20%',
		left: '20%',
		width: '60%',
		height: '60%'
	}	
}

class ContactModal extends Component {
	componentDidMount(){
		const {sender, dispatch}=this.props;
		dispatch(loadAccounts(sender));
	}

	chooseContact(){
		this.closeModal();
		this.dispatch(addContact(this.sender, this.item));

	}



	render(){
		const { classes, closeModal, accounts, dispatch, sender } =this.props;
		return(
		    <Paper className={classes.modal}>
				<Button onClick={closeModal}>Choose Contacts</Button>
				<List>
				{accounts.map((item, index)=>{
					return (<ListItem key={index} onClick={this.chooseContact.bind({item, dispatch, closeModal, sender})}>
								<ListItemText primary={item} />
							</ListItem>)

				})}
				</List>
			</Paper>)
	}
}


function mapStateToProps(state){
	return {
		sender: state.sender,
		accounts: state.accounts

	}
}

export default connect(mapStateToProps)(withStyles(styles)(ContactModal));