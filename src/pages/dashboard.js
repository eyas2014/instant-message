import React, { Component } from 'react';
import HeaderBar from '../components/header-bar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Navigation from '../components/navigation';
import MessageComposer from '../components/message-composer';
import DialogBox from '../components/dialog-box';
import MessageControl from '../components/message-control';
import { connect } from 'react-redux';

const styles={
	background: {
		backgroundColor: '#ddd',
	},
	fullHeight:{
		position: 'relative',
		height: "100vh"
	}, 
	dialogBox: {
		position: 'relative',
		height: "100%",
		backgroundColor: "#fff"
	},
	fullDiv: {
		width: "100%",
		height: "100%"
	},
	fillRemain: {
		position: 'absolute', 
		top: '48px', 
		bottom: '0px', 
		width: "100%"
	},
	nav: {
		borderRight: "solid 2px #aaa",
		backgroundColor: "#fff",
		height: "100%",
		overflowY: "scroll"
	},
	spinner: {
		width: '40%',
		margin: 'auto',
		marginTop: '20%',
		height: 'auto'
	}
}

class App extends Component {
	componentWillMount(){
		this.props.dispatch({type:'login', username: this.props.match.params.username});
	}

	render(){
		const { classes, numberSelected, receiver} =this.props;
		return (
			<Grid container justify='center' className={classes.background}>
				<Grid item xs={12} md={8} className={classes.fullHeight}>
					<HeaderBar></HeaderBar>
					<div className={classes.fillRemain}>
						<Grid container  className={classes.fullDiv}>
							<Grid item xs={3} className={classes.nav}>
								<Navigation></Navigation>
							</Grid>
							<Grid item xs={9}   className={classes.dialogBox}>
								<DialogBox></DialogBox>
								{numberSelected!==0&&<MessageControl></MessageControl>}
								{receiver&&numberSelected===0&&<MessageComposer></MessageComposer>}
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>)

	}

}

const mapStateToProps=function (state){
	return {numberSelected: state.numberSelected,
			receiver: state.receiver}
}

const AppWithStyles=withStyles(styles)(App);

export default connect(mapStateToProps)(AppWithStyles);