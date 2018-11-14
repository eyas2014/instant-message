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

		this.intervalId=setInterval(()=>{
			var currentTime=new Date().getTime();
			this.setState({currentTime});
			dispatch({type:'removeTimeout', currentTime});
			if(this.props.receiver)dispatch(updateDialog(this.props.sender, this.props.receiver));
		}, 5000)
	}

	componentWillUnmount(){
		clearInterval(this.intervalId)
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
			sender: state.sender.name,
			messages: state.dialog,
		}
}


export default connect(mapStateTopProps)(withStyles(styles)(DialogBox));

