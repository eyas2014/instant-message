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
		bottom: '0px',
		borderTop: 'solid 1px #888',
		boxShadow: '0px -1px 2px #888'
	},



	button: {
		margin: "30px 60px",
		border: "solid 1px #666",
		boxShadow: "inset 0px 1px 2px #fff",
		background: 'linear-gradient(#649fcd, #427dab)',
		color: "#fff"
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

				    <Button variant="contained" onClick={this.delete.bind(this)} className={classes.button}>
				       Delete
				    </Button>


				    <Button onClick={()=>dispatch({type: 'cancelSelect'})} className={classes.button}>
				        Cancel
				    </Button>
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