import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Message from './message';

const styles={
	root: {
		position: 'absolute',
		top: '0px',
		bottom: '150px',
		overflowY: 'scroll',
		width: '100%'
	}

}

class DialogBox extends Component {
	render(){
		const {messages, classes}= this.props;
		return (
		<div className={classes.root}>{messages.map((item,index)=>{
			return (<Message message={item} key={index}></Message>)
		})}
		</div>)
	}

}


const mapStateToProps=function (state){
	console.log(state);
	return {messages: state.dialogs}
}

const DialogBoxWithStyles=withStyles(styles)(DialogBox);

export default connect(mapStateToProps)(DialogBoxWithStyles);