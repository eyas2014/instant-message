import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles={
	avartar: {
		width: '50px',
		height: '60px',
		border: 'solid 1px #538fbe',
		borderRadius: '50%',
		backgroundImage: 'url("profilePhoto.jpg")',
		backgroundSize: '200px 480px',
		'&:hover': {
			boxShadow: 'inset 0px 0px 4px #618833',
			border: 'solid 2px #618833',

		}
	}

}

class AvartarPopper extends Component {


	render(){
		const classes=this.props.classes;
		return (<table>
					<tbody>
					{[0, 1, 2, 3, 4, 5, 6, 7].map((row, iRow)=>{
						return (
							<tr key={iRow}>
								{[0, 1, 2, 3].map((column, iColumn)=>{
																const x=-6-column*46;
																const y=-16-row*56;
																const position=x+'px '+y+'px';
																return (<td key={iColumn}>
																			<div className={classes.avartar}
																				style={{backgroundPosition:position}}
																				onClick={()=>this.props.chooseAvartar(column, row)}>
																			</div>
																		</td>)
														})
								}
							</tr>)
					})}
					</tbody>
				</table>)
	}


}



export default connect()(withStyles(styles)(AvartarPopper));

