import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles={
	floatRight: {
		minHeight: '0px',
		float: 'right'
	},
	floatLeft: {
		float: 'left',
		minHeight: '0px'
	},
	fullWidth: {
		width: '100%'
	},
	typography1: {
		lineHeight: '48px',
		marginLeft: '10px'

	},
	typography2: {
		lineHeight: '48px',
		marginLeft: '10px',
		color:  '#ccc'
	},
	noShadow: {
		boxShadow: "none"
	}
}

class HeaderBar extends Component {
	render(){
		const { classes } = this.props;
		return (
			<AppBar position='static' classes={{root: classes.noShadow}}>
				<Grid container>
						<Grid item xs={4}>
							<Toolbar  classes={{root: classes.floatLeft}} >
					          <IconButton aria-label="Menu" color="inherit">
					            <MenuIcon />
					          </IconButton>
					          <Typography variant='inherit' color="inherit">
					            Telegram
					          </Typography>
				        	</Toolbar>
				        </Grid>
				        <Grid item xs={8}>
					        <Toolbar  classes={{root: classes.floatLeft}} >
					          <Typography variant='inherit' className={classes.typography1}>
					            Contact
					          </Typography>
					          <Typography variant='inherit'  className={classes.typography2}>
					            friend
					          </Typography>
					        </Toolbar>
					        <Toolbar   classes={{root: classes.floatRight}} >
					          <IconButton aria-label="Menu" color="inherit">
					            <SearchIcon />
					          </IconButton>
					          <IconButton aria-label="Menu" color="inherit">
					            <MoreVertIcon />
					          </IconButton>
					    	</Toolbar>
				        </Grid>
				    </Grid>
			    </AppBar>)

	}

}

export default withStyles(styles)(HeaderBar);



// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton className={classes.menuButton} color="primary" aria-label="Menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" color="inherit" className={classes.grow}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ButtonAppBar);
