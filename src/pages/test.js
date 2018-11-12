import React, { Component } from 'react';

class Parent extends Component{
	constructor(){
		super()
	}

	handleChange(e){
			const fileInput = document.querySelector('#nn') ;
			console.log(fileInput.files);
		    var formData = new FormData();
            formData.append("file", fileInput.files[0]);

	    	fetch('http://localhost:3000/uploadImg',{
					method: "POST", 
			        mode: "cors", 
			        cache: "no-cache", 
			        credentials: "same-origin", 
			        redirect: "follow", 
			        referrer: "no-referrer", 
			        body: formData
				})
				.then((response)=>{return response.json()})
				.then((res)=>{
					alert('req is back');
				})
				.catch((e)=>{
					console.log(e)

				})


	}


	render(){
		return (<div>
					<input type='file' onChange={this.handleChange} id="nn" />
					<img src="http://localhost:3000/file.jpeg" />
					<p>another one</p>
						 <form action="http://localhost:3000/uploadImg" encType="multipart/form-data" method="POST"> 
						   <input type="file" name="photo" />
						   <input type="submit" value="Upload Photo"/>
						</form>

				</div>)


	}

}


export default class App extends Component {
	render(){
		return (<Parent></Parent>)

	}



}