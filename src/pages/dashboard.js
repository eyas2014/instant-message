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
	}
}

class App extends Component {
	constructor(props){
		super(props);
		this.state={numberSelected: 0};
		this.selected=new Array(this.props.messages.length).fill(false);
		this.state.messages=this.props.messages;
	}

	toggleMessage(toggle){
		if(toggle.status){
			this.setState({numberSelected: this.state.numberSelected+1});
			this.selected[toggle.id]=true;
		}
		else {
			this.setState({numberSelected: this.state.numberSelected-1});
			this.selected[toggle.id]=false;
		}
	}

	cancelSelect(){
		this.setState({numberSelected: 0});
		this.selected.fill(0);
	//	this.setState({messages: this.props.messages.slice(0)});
	}

	render(){
		const { classes } =this.props;
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
								<DialogBox messages={this.state.messages} toggleMessage={this.toggleMessage.bind(this)}></DialogBox>
								{this.state.numberSelected?<MessageControl cancelSelect={this.cancelSelect.bind(this)}></MessageControl>:<MessageComposer></MessageComposer>}
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>)

	}

}

const mapStateToProps=function (state){
	return {messages: state.dialogs}
}

const AppWithStyles=withStyles(styles)(App);

export default connect(mapStateToProps)(AppWithStyles);