import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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


class Message extends Component {
	render(){
		const {classes, cancelSelect}=this.props;
		return (
			<div className={classes.root}>
				<div className={classes.wrapperLeft}>
				    <Button variant="contained" className={classes.control}>
				       Forward
				    </Button>
				    <Button variant="contained" className={classes.control}>
				       Delete
				    </Button>
				    <Button variant="contained" className={classes.control}>
				       Reply
				    </Button>
	      		</div>
	      		<div className={classes.wrapperRight}>
				    <Button onClick={cancelSelect} className={classes.cancel}>
				        Cancel
				    </Button>
	      		</div>
		</div>)

	}


}


export default withStyles(styles)(Message);