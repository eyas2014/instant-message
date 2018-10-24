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


function dialogs(state=[], action){
	if(action.type==='loadDialog') {
		state=[...action.dialog]
	}
	if(action.type==='newMessage') {
		state=[...state, action.message];
	}
	return state;
}


const Reducers=combineReducers({dialogs, contacts, sender, receiver});

export default Reducers;