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
	componentDidMount(){
		this.refs.dialogBox.scrollTop=this.refs.dialogBox.scrollHeight
	}
	componentDidUpdate(){
		if(this.props.scrollBox){
			this.refs.dialogBox.scrollTop=this.refs.dialogBox.scrollHeight;
			this.props.dispatch({type: 'scrollEnd'});
		}
	}

	render(){
		const {classes, messages, searchStr}= this.props;
		return (
		<div className={classes.root} ref="dialogBox" >
			{messages.map((item,index)=>{
				if(item.message.indexOf(searchStr)==-1) return null;
				else {
					return (<Message message={{...item, id: index}} 
								 key={index}>
						</Message>)
				}
			})}
		</div>)
	}

}


function mapStateTopProps(state){
	return {scrollBox: state.scrollBox,
			searchStr: state.searchDialog}
}


export default connect(mapStateTopProps)(withStyles(styles)(DialogBox));

