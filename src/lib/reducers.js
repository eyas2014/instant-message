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


function dialogs(state={loading: 'empty', data:[]}, action){
	if(action.type==='requestDialog'){
		state={loading:'loading', data:[]};
	}
	if(action.type==='loadDialog') {
		state={loading:'loaded', data:action.dialog, pending:0};
	}
	if(action.type==='newMessageStart') {
		state={loading:'loaded', data: [...state.data, action.message], pending: ++state.pending}
	}
	if(action.type==='newMessageFinish') {
		state={loading:'loaded', data: state.data, pending: --state.pending}
	}
	return state;
}


const Reducers=combineReducers({dialogs, contacts, sender, receiver});

export default Reducers;