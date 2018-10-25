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


function dialogs(state={loading: 'empty', data:[]}, action){
	switch(action.type){
		case 'requestDialog':
			state={loading:'loading', data:[]};
			break;

		case 'loadDialog':
			var data=action.dialog.map((item)=>{
				item.selected=false;
				item.pending=false;
				return item
			});
			state={loading:'loaded', data};
			break;

		case 'newMessageStart':
			var newMessage={...action.message, selected: false, pending: true};
			state={loading:'loaded', data: [...state.data, newMessage]};
			break;

		case 'newMessageFinish':
			state.data[action.id].pending=false;
			state={loading:'loaded', data: [...state.data]}
			break;

		case 'selectMessage':
			state.data[action.id].selected=true;
			state={loading:'loaded', data: [...state.data]}
			break;
		case 'deselectMessage':
			state.data[action.id].selected=false;
			state={loading:'loaded', data: [...state.data]}
			break;
		case 'deleteMessageStart': 
			var data=state.data.map((item)=>{
					if(item.selected) item.pending=true;
					return item;
				});
			state={loading:'loaded', data};
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


const Reducers=combineReducers({dialogs, contacts, sender, receiver, scrollBox, numberSelected});

export default Reducers;