import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {loadAccounts, addContact} from '../redux/actions';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles={
	modal: {
		position: 'absolute',
		top: '20%',
		left: '35%',
		width: '320px',
		overflowY: 'auto',
		backgroundColor: "#fff",
	},
	title: {
		color: '#538fbe',
		textAlign: 'center'
	},
	contact: {
		borderBottom: "dashed 1px #000",
		borderTop: "dashed 1px #000",
		marginTop: "-1px"
	},
	avartar: {
		width: '50px',
		height: '60px',
		border: 'solid 1px #538fbe',
		borderRadius: '50%',
		backgroundImage: 'url("profilePhoto.jpg")',
		backgroundSize: '200px 480px',
	},
	cancelButton: {
		border: "solid 1px #666",
		boxShadow: "inset 0px 1px 2px #fff",
		background: 'linear-gradient(#649fcd, #427dab)',
		color: "#fff"

	},
	buttonWrapper: {
		padding: '20px',
		width:'120px',
		margin: 'auto',
		textAlign: "center"
	},
	list: {
		height: '250px',
		overflowY: 'auto',
		width: '240px',
		margin: 'auto'
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
				<h4 onClick={closeModal} className={classes.title}>Contacts</h4>
				<List className={classes.list}>
				{accounts.map((item, index)=>{
					const x=-6-item.column*46;
					const y=-16-item.row*56;
					const position=x+'px '+y+'px';
					return (<ListItem key={index} onClick={this.chooseContact.bind({item, dispatch, closeModal, sender})} className={classes.contact}>
								<div className={classes.avartar} 
									style={{backgroundPosition:position}}>
								</div>
								<ListItemText primary={item.name}/>
							</ListItem>)

				})}
				</List>
				<div className={classes.buttonWrapper}>
					<Button className={classes.cancelButton}
							onClick={closeModal}>Cancel</Button>
				</div>
			</Paper>)
	}
}


function mapStateToProps(state){
	return {
		sender: state.sender.name,
		accounts: state.accounts

	}
}

export default connect(mapStateToProps)(withStyles(styles)(ContactModal));