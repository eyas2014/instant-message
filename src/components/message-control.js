import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {deleteMessages} from '../lib/actions';

const styles={
	root: {
		width: '100%',
		height: '150px',
		position: 'absolute',
		bottom: '0px'
	},

	control: {
		margin: '10px'
	},
	wrapperLeft: {
		marginTop: '50px',
		float: 'left',
		paddingLeft: '20px',
	}, 	
	wrapperRight: {
		marginTop: '50px',
		float: 'right',
		marginRight: '20px'
	}, 
	cancel: {
		fontSize: '13px',
		margin: '10px',
		textAlign: 'left',
		fontWeight: '900'
	}
}


class MessageControl extends Component {
	delete(){
		const {messages, dispatch, sender, receiver}=this.props;
		var list=messages.reduce((acc, cur)=>{
				if(cur.selected){
					acc.push({sender: cur.sender, clientTime: cur.clientTime})
				}
				return acc;
			},[]);
		dispatch(deleteMessages(sender, receiver, list))
	}

	render(){
		const {classes, dispatch}=this.props;
		return (
			<div className={classes.root}>
				<div className={classes.wrapperLeft}>
				    <Button variant="contained" className={classes.control}>
				       Forward
				    </Button>
				    <Button variant="contained" onClick={this.delete.bind(this)} className={classes.control}>
				       Delete
				    </Button>
				    <Button variant="contained" className={classes.control}>
				       Reply
				    </Button>
	      		</div>
	      		<div className={classes.wrapperRight}>
				    <Button onClick={()=>dispatch({type: 'cancelSelect'})} className={classes.cancel}>
				        Cancel
				    </Button>
	      		</div>
		</div>)
	}
}

function mapStateToProps(state){
	return {
		messages: state.dialog,
		sender: state.sender,
		receiver: state.receiver
	}


}



export default connect(mapStateToProps)(withStyles(styles)(MessageControl));