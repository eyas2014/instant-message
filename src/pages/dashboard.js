import React, { Component } from 'react';
import HeaderBar from '../components/header-bar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Navigation from '../components/navigation';
import MessageComposer from '../components/message-composer';
import DialogBox from '../components/dialog-box';
import MessageControl from '../components/message-control';

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
	constructor(){
		super();
		this.state={numberSelected: 0};
	}

	toggleMessage(toggle){
		if(toggle)this.setState({numberSelected: this.state.numberSelected+1});
		else this.setState({numberSelected: this.state.numberSelected-1});
	}

	cancelSelect(){
		this.setState({numberSelected: 0});
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
								<DialogBox toggleMessage={this.toggleMessage.bind(this)} cancelSelect={this.state.numberSelected}></DialogBox>
								{this.state.numberSelected?<MessageControl cancelSelect={this.cancelSelect.bind(this)}></MessageControl>:<MessageComposer></MessageComposer>}
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>)

	}

}


export default withStyles(styles)(App);