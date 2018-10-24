import React, { Component } from 'react';
import HeaderBar from '../components/header-bar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Navigation from '../components/navigation';
import MessageComposer from '../components/message-composer';
import DialogBox from '../components/dialog-box';
import MessageControl from '../components/message-control';
import { connect } from 'react-redux';
import spinner from '../images/spinner.gif';
import quickMessage from '../images/quickMessage.jpg';

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
	constructor(props){
		super(props);
		this.state={numberSelected: 0};
		this.selected=new Array(this.props.messages.length).fill(false);
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
		this.selected.fill(false);
	}

	render(){
		const { classes, messages, loading, pending} =this.props;
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
								{loading==='loading'&&<img src={spinner} className={classes.spinner} alt="spinner"></img>}
								{loading==='loaded'&&<DialogBox messages={messages} 
																toggleMessage={this.toggleMessage.bind(this)} 
																selected={this.selected}
																pending={pending}>
													 </DialogBox>}
								{loading==='empty'&&<img src={quickMessage} className={classes.spinner} alt="default"></img>}
								{this.state.numberSelected?<MessageControl cancelSelect={this.cancelSelect.bind(this)}></MessageControl>:<MessageComposer></MessageComposer>}
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>)

	}

}

const mapStateToProps=function (state){
	return {messages: state.dialogs.data,
			pending: state.dialogs.pending,
			loading: state.dialogs.loading
			}
}

const AppWithStyles=withStyles(styles)(App);

export default connect(mapStateToProps)(AppWithStyles);