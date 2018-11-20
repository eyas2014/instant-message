import logo from './logo.svg';
import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import AvatarPopper from '../components/avatar-popper';
import { apiAddress } from '../config.js';


const Image=styled.img`
	height: 200px;
	width: auto;
	marginBottom: -100px
`;

const Span=styled.span`
	margin-left: 10px;
`;

const P=styled.p`
	color: red;
`;

const Form=styled.form`
		margin: auto;
		width: 200px;
		position: relative;

`;



const AvatarDiv=styled.div`
	border: solid 1px #618833;
	box-shadow: inset 0px 0px 3px #618833;
	position: absolute;
	top: 10px;
	left: -70px;
	height: 60px;
	width: 50px;
	border-radius: 50%;
	background-image: url("profilePhoto.jpg");
	background-position: ${(props)=>{ 
		const x=-6-props.column*46;
		const y=-16-props.row*56;
		return x+'px '+y+'px'}};
	background-size: 200px 480px;

`;


// first avatar: -6 -16, last avatar:  -149 -408; shift: 47.66,  56
class Register extends Component {
	constructor(){
		super();
		this.state={openPopper:false, column: 0, row: 0};
	}

	_handleChange(e){
		this.setState({accountExist: false});
		var obj={};
		obj[e.target.id]=e.target.value;
		this.setState(obj);
	}


	submit(){
		fetch(apiAddress+'/registration', {
			method: "POST", 
	        mode: "cors", 
	        cache: "no-cache", 
	        credentials: "same-origin", 
	        headers: {
	            "Content-Type": "application/json; charset=utf-8",	       
	        },
	        redirect: "follow", 
	        referrer: "no-referrer", 
	        body: JSON.stringify({userName: this.state.userName, 
        						password: this.state.password1, 
        						column: this.state.column, 
        						row: this.state.row}), 
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			if(data.success) {
				window.location.href=apiAddress+"#/dashboard/"+this.state.userName;
			}
			else this.setState({accountExist: true});
		})
	}

	chooseAvartar(column, row){
		console.log([column, row]);
		this.setState({openPopper: false, column, row});
	}

	openPopper(e){
		this.setState({openPopper: true,
						anchorEl: e.currentTarget
					});

	}

	render(){
		const {openPopper, anchorEl, column, row}=this.state;
		return (<div>
					<Menu open={openPopper}  anchorEl={anchorEl}>
			    		<AvatarPopper chooseAvartar={this.chooseAvartar.bind(this)}></AvatarPopper>
		    		</Menu>
					<Image src={logo} alt='logo'></Image>
					<Form>
						<AvatarDiv column={column} row={row} onClick={this.openPopper.bind(this)}></AvatarDiv>
				        <TextField onChange={(e)=>this._handleChange(e)}
				          id="userName"
				          label="User Name"
				          name="userName"
				          margin="normal"
				          variant="outlined"
				        />
				        <br />
				        <TextField onChange={(e)=>this._handleChange(e)}
				          id="password1"
				          label="Password"
				          type="password"
				          margin="normal"
				          variant="outlined"
				        />
				        <br />
				        <TextField onChange={(e)=>this._handleChange(e)}
				          id="password2"
				          label="Re-enter Password"
				          type="password"
				          margin="normal"
				          variant="outlined"
				        />
				        {this.state.password1!==this.state.password2&&this.state.password2&&<P>password mismatch!</P>}
				        <br />
				        {this.state.accountExist&&<P>Account already exists!</P>}
				        <br />
			            <Button variant="contained" onClick={()=>this.submit()}>
			              	<i className="fas fa-sign-in-alt"></i>
			              	<Span>Sign Up</Span>
			   			</Button>
			        </Form>
				</div>)
	}
}

export default connect()(Register);