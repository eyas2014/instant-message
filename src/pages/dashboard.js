import React, { Component } from 'react';
import HeaderBar from '../components/header-bar';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';


export default class App extends Component {
	render(){
		const { classes } =this.props;
		return (
			<Grid container justify='center'>
				<Grid item xs={12} md={8}>
					<HeaderBar></HeaderBar>
					<Grid container>
						<Grid item xs={4}>
							<FormControl>
								<TextField placeholder="search"
											variant="outlined"
											margin="normal"
								          InputProps={{
								            startAdornment: (
								              <InputAdornment>
								                <IconButton aria-label="search">
													<SearchIcon />
								                </IconButton>
								              </InputAdornment>
								            ),
								        	endAdornment: (
								              <InputAdornment>
								                <IconButton aria-label="close">
													<ClearIcon />
								                </IconButton>
								              </InputAdornment>
								            ),
								          }}>
								</TextField>
						     </FormControl>
						</Grid>
						<Grid item xs={8}>
						</Grid>
					</Grid>
					<p>main!</p>
				</Grid>
			</Grid>)

	}

}
