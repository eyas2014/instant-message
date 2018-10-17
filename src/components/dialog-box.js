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
		const {classes, messages, selected, toggleMessage}= this.props;
		return (
		<div className={classes.root}>{messages.map((item,index)=>{
			return (<Message toggleMessage={toggleMessage} message={{...item, id: index}} key={index} selected={selected[index]}></Message>)
		})}
		</div>)
	}

}

export default withStyles(styles)(DialogBox);

