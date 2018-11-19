import { apiAddress } from '../config.js';

export function postLogin(username){
	return function(dispatch){
		fetch(apiAddress+"/postLogin", {
	        method: "POST", 
	        mode: "cors", 
	        cache: "no-cache", 
	        credentials: "same-origin", 
	        headers: {
	            "Content-Type": "application/json; charset=utf-8",	       
	        },
	        redirect: "follow", 
	        referrer: "no-referrer", 
	        body: JSON.stringify({username}), 
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			if(data.validated) {
				dispatch({type: 'login', 
					name: username, 
					column: data.column, 
					row: data.row});
				dispatch(updateContacts(username));
			}
			else window.location.href=apiAddress+"#/login";
		})
	}
}

export function uploadImg(sender, receiver, deleteTimer, f){
	return function(dispatch){
		var formData = new FormData();
		var clientTime= new Date().getTime();
	    formData.append("file", f);
	    formData.append("sender", sender.name);
	    formData.append("receiver", receiver);
	    formData.append("clientTime", clientTime);
	    formData.append("deleteTimer", deleteTimer);

		return fetch(apiAddress+'/uploadImg',{
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
				dispatch({type: 'sendNewMessage', clientTime, sender, deleteTimer, storeName: res.storeName, originalName: res.originalName });
				dispatch({type:'sentToServer', sender, clientTime })
			})
			.catch((e)=>{
				console.log(e)

			})
	}
};

export function addContact(sender, contact){
	return function(dispatch){
		dispatch({type: 'addContactStart'})
		return fetch(apiAddress+'/addContact',{
					method: "POST", 
			        mode: "cors", 
			        cache: "no-cache", 
			        credentials: "same-origin", 
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",	       
			        },
			        redirect: "follow", 
			        referrer: "no-referrer", 
			        body: JSON.stringify({sender, contact: contact.name})
				})
				.then((response)=>{return response.json()})
				.then((res)=>{
					dispatch({type: 'addContactSuccess', name: res.name, lastVisited: res.lastVisited})
				})

	}

}

export function loadAccounts(sender){
	return function(dispatch){
		return fetch(apiAddress+'/loadAccounts',{
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
		return fetch(apiAddress+'/getContacts',{
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
		return fetch(apiAddress+'/updateDialog',{
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
			return fetch(apiAddress+'/refetchDialog',{
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
			return fetch(apiAddress+'/sendNewMessage',{
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
			return fetch(apiAddress+'/deleteMessages',{
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