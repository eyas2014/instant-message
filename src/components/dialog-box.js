import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Message from './message';
import {updateDialog} from '../lib/actions';

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
	constructor(){
		super();
		this.state={currentTime: new Date()};
	}

	componentDidMount(){
		const {sender, dispatch}= this.props;
		setInterval(()=>{
			var currentTime=new Date();
			this.setState({currentTime});
			dispatch(updateDialog(sender, this.props.receiver, currentTime ));
		}, 1000)
	}


	render(){
		const {classes, messages}=this.props;
		return (
		<div className={classes.root} ref="dialogBox" >
			{messages.map((item,index)=>{
				return (<Message message={item} key={index} currentTime={this.state.currentTime}>
						</Message>)}
			)}
		</div>)
	}

}


function mapStateTopProps(state){
	return {scrollBox: state.scrollBox,
			receiver: state.receiver,
			sender: state.sender,
			messages: state.dialog
		}
}


export default connect(mapStateTopProps)(withStyles(styles)(DialogBox));

