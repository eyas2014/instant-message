const sender="Tom", receiver="Yaming";



export default function sendMessage(text){
	var date=new Date();
	var dateString=date.toTimeString().substring(0, 9)+date.getMonth()+'/'+ date.getDate()+'/'+date.getFullYear();
	var message= {name: sender,
		date: dateString,
		message: text}

	return function(dispatch){
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
	        body: JSON.stringify({message: message.message, date: message.date, sender, receiver})
		}).then(()=>{
			dispatch({type: 'message', data: message});
		})
	}



}