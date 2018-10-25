export function sendMessage(e){
	var date=new Date();
	var dateString=date.toTimeString().substring(0, 9)+date.getMonth()+'/'+ date.getDate()+'/'+date.getFullYear();
	var message= {sender: e.sender,
		date: dateString,
		message: e.message}

	return function(dispatch){
		dispatch({type: 'newMessageStart', message});
		return fetch('http://localhost:3000/sendMessage', {
			method: "POST", 
	        mode: "cors", 
	        cache: "no-cache", 
	        credentials: "same-origin", 
	        headers: {
	            "Content-Type": "application/json; charset=utf-8",	       
	        },
	        redirect: "follow", 
	        referrer: "no-referrer", 
	        body: JSON.stringify({message: message.message, date: message.date, sender:e.sender, receiver: e.receiver, id: e.id})
		}).then(()=>{
			dispatch({type: 'newMessageFinish', id:e.id});
		})
	}
}

export function updateContacts(e){
	if(e.newContact){

	}else {
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
				        body: JSON.stringify({clientName: e.clientName})
					})
					.then((response)=>{return response.json()})
					.then((data)=>{
						dispatch({type: 'loadContacts', contacts: data})
					})
		}
	}
}



export function loadDialog(conversation){
	var {sender, receiver}=conversation;

	return function(dispatch){
		dispatch({type: 'requestDialog'});
		return fetch('http://localhost:3000/loadDialog',{
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
					.then((data)=>{
						dispatch({type: 'loadDialog', dialog: data})
					})
	}
}

export function deleteMessage(list, sender, receiver){
	return function(dispatch){
		dispatch({type: 'deleteMessageStart'})
		return fetch('http://localhost:3000/deleteMessage',{
						method: "POST", 
				        mode: "cors", 
				        cache: "no-cache", 
				        credentials: "same-origin", 
				        headers: {
				            "Content-Type": "application/json; charset=utf-8",	       
				        },
				        redirect: "follow", 
				        referrer: "no-referrer", 
				        body: JSON.stringify({list, sender, receiver})
				    })
					.then((response)=>{
						dispatch({type: 'deleteMessageFinish'})
						}
					)
	}





}