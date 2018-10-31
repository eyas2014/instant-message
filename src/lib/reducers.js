import { combineReducers } from 'redux';


function sender(state='Yaming', action){
	if(action.type==="updateSender"){

	}
	return state;
}


function receiver(state='', action){
	if(action.type==="updateReceiver"){
		state=action.receiver;
	}
	return state;
}


function contacts(state={loading: true, data:[]}, action){
	if(action.type==="requestContacts"){
		state={loading:true, data:[]}
	}
	if(action.type==="loadContacts"){
		state={loading:false, data:action.contacts}
	}
	return state;
}

function scrollBox(state=false, action){
	switch(action.type){
		case 'scrollStart':
			state=true;
			break;
		case 'scrollEnd':
			state=false;
			break;
	}
	return state;
}


function dialog(state=[], action){
	switch(action.type){
		case 'requestDialog':
			state={loading:'loading', data:[]};
			break;

		case 'newMessage':
			const {message, deleteTimer, sender}=action;
			const receiveTime=new Date();
			var newMessage={message, deleteTimer, selected: false, sender, receiveTime};
			state=[...state, newMessage];
			break;

		case 'selectMessage':
			state.data[action.id].selected=true;
			state={loading:'loaded', data: [...state.data]}
			break;
			
		case 'deselectMessage':
			state.data[action.id].selected=false;
			state={loading:'loaded', data: [...state.data]}
			break;

		case 'deleteMessage': 
			state=state.reduce((acc, cur)=>{
					if(cur.clientTime!==action.clientTime||cur.sender!==action.sender) acc.push(cur);
					return acc;
				}, []);
			break;
		case 'deleteMessageFinish': 
			var data=state.data.reduce((acc, cur)=>{
					if(!cur.selected) acc.push(cur);
					return acc;
				}, []);
			state={loading:'loaded', data};
			break;
		case 'cancelSelect': 
			var data=state.data.map((item)=>{
					item.selected=false;
					return item
				});
			state={loading:'loaded', data};
			break;
		case 'cleanDeletion':
			state=state.reduce((acc, cur)=>{
					var timeLeft=cur.deleteTimer*1000-(action.currentTime.getTime()-cur.receiveTime.getTime());
					if(timeLeft>0) acc.push(cur);
					return acc;
				}, []);
			break;
	}

	return state;
}


function numberSelected(state=0, action){
	if(action.type==="selectMessage") state++;
	if(action.type==="deselectMessage") state--;
	if(action.type==="deleteMessageFinish") state=0;
	if(action.type==="cancelSelect") state=0;
	return state
}

function searchDialog(state='', action){
	if(action.type=="searchDialog"){
		state=action.str}
	return state;
}

function searchContacts(state='', action){
	if(action.type=="searchContacts"){
		state=action.str}
	return state;
}

function modifications(state=[], action){
	if(action.type=="newMessage"||action.type=="deleteMessages") state.push(action);
	return state
}




const Reducers=combineReducers({contacts, sender, receiver, dialog,
						scrollBox, numberSelected, searchDialog, searchContacts, modifications});

export default Reducers;