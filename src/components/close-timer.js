import React, { Component } from 'react';
import IconAvTimer from '@material-ui/icons/AvTimer';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export default class CloseTimer extends Component {
	constructor(){
		super();
		this.state={
			anchorEl: null,
    		open: false,
    		timer: '30s'
		}

	}

	togglePopper(e){
		this.setState({
			open: !this.state.open,
			anchorEl: e.currentTarget
		});
	}

	handleClick(txt){
		this.setState({
			open: false,
			anchorEl: null,
			timer: txt
		});
		switch (txt){
			case 'forever':
				this.props.setTimer('forever');
				break;
			case '10s':
				this.props.setTimer(10);
				break;
			case '30s':
				this.props.setTimer(30);
				break;
			case '1min':
				this.props.setTimer(60);
				break;
			case '10min':
				this.props.setTimer(600);
				break;
			default:
		}
		
	}



	render(){
		const {anchorEl, open}=this.state;
		return (
			<div>
				<div onClick={(e)=>this.togglePopper(e)}>
					<IconAvTimer></IconAvTimer>
					<div><span>{this.state.timer}</span></div>
				</div>
				<Menu open={open} anchorEl={anchorEl}>{
					['forever', '10s', '30s', '1min', '10min'].map((item, index)=>{
						return(<MenuItem key={index} onClick={()=>this.handleClick(item)}>
								<IconAvTimer></IconAvTimer>
								<span>{item}</span>
							</MenuItem>)


					})
				}
				</Menu>
			</div>


		)


	}



}