export function updateContacts(sender){
	return function(dispatch){
		return fetch('http://localhost:3000/getContacts',{
					method: "POST", 
			        mode: "cors", 
			        cache: "no-cache", 
			        credentials: "same-origin", 
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",	       
			        },
			        redirect: "follow", 
			        referrer: "no-referrer", 
			        body: JSON.stringify({sender})
				})
				.then((response)=>{return response.json()})
				.then((data)=>{
					dispatch({type: 'loadContacts', contacts: data})
				})
	}
}


export function updateDialog(sender, receiver, putEvents){
	if(receiver){
		return function(dispatch){
			return fetch('http://localhost:3000/updateDialog',{
						method: "POST", 
				        mode: "cors", 
				        cache: "no-cache", 
				        credentials: "same-origin", 
				        headers: {
				            "Content-Type": "application/json; charset=utf-8",	       
				        },
				        redirect: "follow", 
				        referrer: "no-referrer", 
				        body: JSON.stringify({sender, receiver, putEvents})
					})
					.then((response)=>{return response.json()})
					.then((events)=>{
							events.forEach((item)=>{
								dispatch(item)
							})
					})
		}
	}else{
		return {type: 'cc'}

	}

}