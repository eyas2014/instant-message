import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

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
		const {messages, sender, receiver, dispatch}=this.props;
		var list=messages.reduce((accumulator, currentValue, currentIndex)=>{
			if(currentValue.selected) accumulator.push(true);
			else accumulator.push(false);
			return accumulator
		}, []);
		dispatch({type: 'deleteMessages', list});
	}

	cancelSelect(){
		this.props.dispatch({type: 'cancelSelect'});

	}

	render(){
		const {classes}=this.props;
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
				    <Button onClick={this.cancelSelect.bind(this)} className={classes.cancel}>
				        Cancel
				    </Button>
	      		</div>
		</div>)
	}
}

function mapStateToProps(state){
	return {
		messages: state.dialogs.data,
		sender: state.sender,
		receiver: state.receiver
	}


}



export default connect(mapStateToProps)(withStyles(styles)(MessageControl));