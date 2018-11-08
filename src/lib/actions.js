export function addContact(sender, contact){
	return function(dispatch){
		dispatch({type: 'addContactStart'})
		return fetch('http://localhost:3000/addContact',{
					method: "POST", 
			        mode: "cors", 
			        cache: "no-cache", 
			        credentials: "same-origin", 
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",	       
			        },
			        redirect: "follow", 
			        referrer: "no-referrer", 
			        body: JSON.stringify({sender, contact})
				})
				.then((response)=>{return response.json()})
				.then((res)=>{
					dispatch({type: 'addContactSuccess', name: res.name, lastVisited: res.lastVisited})
				})

	}

}

export function loadAccounts(sender){
	return function(dispatch){
		return fetch('http://localhost:3000/loadAccounts',{
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
				.then((accounts)=>{
					dispatch({type:'loadAccounts', accounts})
				})
	}
}

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


export function updateDialog(sender, receiver){
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
			        body: JSON.stringify({sender, receiver})
				})
				.then((response)=>{return response.json()})
				.then((events)=>{
						dispatch({type: 'checkConnection', status: true})
						events.forEach((item)=>{
							dispatch(item)
						})
				})
				.catch((e)=>{
					dispatch({type: 'checkConnection', status: false})
					console.log(e);
				})
	}
}

export function refetchDialog(sender, receiver){
		return function(dispatch){
			dispatch({type:'refetchStart', receiver})
			return fetch('http://localhost:3000/refetchDialog',{
						method: "POST", 
				        mode: "cors", 
				        cache: "no-cache", 
				        credentials: "same-origin", 
				        headers: {
				            "Content-Type": "application/json; charset=utf-8",	       
				        },
				        redirect: "follow", 
				        referrer: "no-referrer", 
				        body: JSON.stringify({sender, receiver})
					})
					.then((response)=>{return response.json()})
					.then((ev)=>{
						ev.forEach((item)=>{
							dispatch(item);
						})

					})
		}
}

export function sendMessage(ev){
		return function(dispatch){
			dispatch(ev);
			return fetch('http://localhost:3000/sendNewMessage',{
						method: "POST", 
				        mode: "cors", 
				        cache: "no-cache", 
				        credentials: "same-origin", 
				        headers: {
				            "Content-Type": "application/json; charset=utf-8",	       
				        },
				        redirect: "follow", 
				        referrer: "no-referrer", 
				        body: JSON.stringify(ev)
					})
					.then((response)=>{return response.json()})
					.then((inEvent)=>{
						dispatch(inEvent);
					})
		}
}

export function deleteMessages(sender, receiver, list){
		return function(dispatch){
			dispatch({type: 'deleteMessages'});
			return fetch('http://localhost:3000/deleteMessages',{
						method: "POST", 
				        mode: "cors", 
				        cache: "no-cache", 
				        credentials: "same-origin", 
				        headers: {
				            "Content-Type": "application/json; charset=utf-8",	       
				        },
				        redirect: "follow", 
				        referrer: "no-referrer", 
				        body: JSON.stringify({sender, receiver, list})
					})
					.then((response)=>{return response.json()})
					.then((ev)=>{
						dispatch(ev);
					})
		}
}