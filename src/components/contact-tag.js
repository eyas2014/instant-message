import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SmsIcon from '@material-ui/icons/Sms';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {refetchDialog} from '../lib/actions';

const styles={
	root: {
		color: '#fff',
		borderTop: 'solid 1px #666',
		borderBottom: 'solid 1px #666',
		boxShadow: 'inset 0px 1px 2px #fff, inset 0px 0px 2px #fff',
		marginTop: '6px',
		marginLeft: '-3px',
		marginRight: '-3px',
		width: "106%",
		background: "linear-gradient(#649fcd, #427dab)"
	},

	container: {
		position: 'relative',
		lineHeight: '1'
	},

	icon: {
		marginLeft: '10px',
		color: '#fff'
	},
	date: {
		fontSize: '13px',
	},
	user: {
		fontSize: '13px',
	}

};

class ContactTag extends Component {
	handleClick(receiver){
		if(receiver!==this.props.receiver) {
			this.props.dispatch(refetchDialog(this.props.sender, receiver));
		}

	}

	render(){
		const {contacts, classes, searchStr, receiver}= this.props;
		return (      
		<List component="nav">{contacts.map((item, index)=>{
				if(item.name.indexOf(searchStr)===-1)return null;
				else {
					return (	        
					<ListItem button classes={{root: classes.root}} key={index} onClick={()=>{this.handleClick(item.name)}}>
			          <div className={classes.container}>
				          <span  className={classes.user}>{item.name}</span> 
				          <br />
				          <span  className={classes.date}>{item.lastVisited}</span>
				      </div>
				      {receiver===item.name&&<ListItemIcon className={classes.icon}>
			            <SmsIcon />
			          </ListItemIcon>}
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
			sender: state.sender
	}
}

const contactTagWithStyles=withStyles(styles)(ContactTag);

export default connect(mapStateToProps)(contactTagWithStyles);