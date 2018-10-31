import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SmsIcon from '@material-ui/icons/Sms';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { loadDialog } from '../lib/actions';

const styles={
	root: {
		backgroundColor: '#cc8',
		color: '#fff'
	},

	container: {
		position: 'relative',
		lineHeight: '1'
	},

	lastMessage: {
		fontSize: '11px'
	},
	date: {
		marginRight: '0px',
		fontSize: '13px',
		position: 'absolute',
		right: '0px',
		top: '2px'
	},
	user: {
		fontSize: '13px',
	}

};

class ContactTag extends Component {
	handleClick(contact){
		if(contact!==this.props.receiver) {
			this.props.dispatch({type:'updateReceiver', receiver: contact});
		}

	}

	render(){
		const {contacts, classes, searchStr}= this.props;
		return (      
		<List component="nav">{contacts.map((item, index)=>{
				if(item.name.indexOf(searchStr)==-1)return null;
				else {
					return (	        
					<ListItem button classes={{root: classes.root}} key={index} onClick={()=>{this.handleClick(item.name)}}>
			          <ListItemIcon>
			            <SmsIcon />
			          </ListItemIcon>
			          <div className={classes.container}>
				          <span  className={classes.user}>{item.name}</span> 
				          <span  className={classes.date}>{item.date}</span>
				          <br />
				          <span className={classes.lastMessage}>{item.lastMessage.Name+': '+item.lastMessage.message}</span>
			          </div>
			        </ListItem>)
			    }
			})}
		</List>)
	}

}


const mapStateToProps=function (state){
	return {contacts: state.contacts.data,
			receiver: state.receiver,
			searchStr: state.searchContacts,
	}
}

const contactTagWithStyles=withStyles(styles)(ContactTag);

export default connect(mapStateToProps)(contactTagWithStyles);