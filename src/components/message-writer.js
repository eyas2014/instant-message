import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


const styles={
	wrapper: {
		position: 'absolute',
		bottom: '0px',
		width: '100%',
		height: '150px',
	},
	iconButton: {
		backgroundColor: 'red',
		borderRadius: '50%'
	},
	messageInput: {
		width: "95%",
		marginTop: "20px"
	}

};

class MessageWriter extends Component {
	render(){
		const { classes } =this.props;
		return(
			<Grid container className={classes.wrapper} justify="center">
				<Grid item xs={1}>
					<IconButton className={classes.iconButton}>YS</IconButton>
				</Grid>
				<Grid item xs={8}>
					<TextField className={classes.messageInput} multiline></TextField>
					<Grid container>
						<Grid container xs={4}>
							<Grid item xs={4}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
							<Grid item xs={4}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
							<Grid item xs={4}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
						</Grid>
						<Grid container xs={8}>
							<Grid container xs={9}>
								<Grid item xs={1}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
								<Grid item xs={1}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
								<Grid item xs={1}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
								<Grid item xs={1}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
								<Grid item xs={1}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
								<Grid item xs={1}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
							</Grid>
							<Grid container xs={3}>
								<Grid item xs={12}><IconButton className={classes.iconButton}>Y</IconButton></Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={1}>
					<IconButton className={classes.iconButton}>YS</IconButton>
				</Grid>
			</Grid>

		)


	}


}


export default withStyles(styles)(MessageWriter);