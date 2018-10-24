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
	componentDidUpdate(){
		this.refs.dialogBox.scrollTop=this.refs.dialogBox.scrollHeight
	}


	render(){
		const {classes, messages, selected, toggleMessage, pending}= this.props;
		return (
		<div className={classes.root} ref="dialogBox">
			{messages.slice(0, messages.length-pending).map((item,index)=>{
				return (<Message toggleMessage={toggleMessage} 
								 message={{...item, id: index}} 
								 key={index} 
								 selected={selected[index]}>
						</Message>)
			})}
			{messages.slice(messages.length-pending).map((item,index)=>{
				return (<Message toggleMessage={toggleMessage} 
								 message={{...item, id: index, loading: true}} 
								 key={index} 
								 selected={selected[index]}
								 pending>
						</Message>)
			})}
		</div>)
	}

}

export default withStyles(styles)(DialogBox);

