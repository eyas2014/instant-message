import { combineReducers } from 'redux';


function sender(state='', action){
	const {type, name, column, row}=action
	if(type==="login"){
		state={name, row, column}
	}
	return state;
}


function connection(state=true, action){
	if(action.type==="checkConnection")state=action.status;
	return state;
};

function receiver(state='', action){
	if(action.type==="refetchStart"){
		state=action.receiver;
	}
	return state;
}

function accounts(state=[], action){
	if(action.type==='loadAccounts'){
		state=action.accounts
	}
	return state;
}

function contacts(state={loading: true, data:[]}, action){
	if(action.type==="addContactStart"){
		state={loading:true, data: state.data}
	}
	if(action.type==="addContactSuccess"){
		state.data.push({name: action.name, lastVisited: action.lastVisited});
		state={loading:false, data: state.data}
	}
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
		default:
	}
	return state;
}

function dialog(state=[], action){
	const {message, deleteTimer, sender, clientTime}=action;
	var newMessage;
	switch(action.type){
		case 'receiveNewMessage':
			const timerStart=new Date().getTime();
			if(action.message)newMessage={message, deleteTimer, selected: false, sender, timerStart, clientTime, status: 'receivedMessage'};
			else newMessage={storeName: action.storeName, deleteTimer, sender, clientTime, timerStart, originalName: action.originalName};
			state=[...state, newMessage];
			break;
		case 'sendNewMessage':
			if(action.message) newMessage={message, deleteTimer, selected: false, sender, clientTime, status: action.status||'composed'};
			else newMessage={storeName: action.storeName, deleteTimer, sender, clientTime, originalName: action.originalName};
			state=[...state, newMessage];
			break;

		case 'toggleMessage':
			state=state.reduce((acc, cur)=>{
					if(cur.clientTime===action.clientTime&&cur.sender===action.sender) {
						cur=Object.assign({}, cur, {selected: !cur.selected});
						acc.push(cur);
					}else{
						acc.push(cur);
					};
					return acc;
				}, []);
			break;
		case 'deleteMessages': 
			state=state.reduce((acc, cur)=>{
					if(cur.selected) {
						cur=Object.assign({},cur, {selected: false, status: 'deleting'});
						acc.push(cur);
					} 
					else acc.push(cur);
					return acc;
				}, []);
			break;

		case 'receiveDeleteMessages': 
			action.list.forEach((item)=>{
				state=state.reduce((acc, cur)=>{
						if(cur.clientTime!==item.clientTime||cur.sender.name!==item.sender.name) {
							acc.push(cur);
						};
						return acc;
					}, []);
			});
			break;

		case 'deleteSuccess': 
			action.list.forEach((item)=>{
				state=state.reduce((acc, cur)=>{
						if(cur.clientTime!==item.clientTime||cur.sender.name!==item.sender.name) {
							acc.push(cur);
						};
						return acc;
					}, []);
			});
			break;
		case 'cancelSelect': 
			state=state.reduce((acc, cur)=>{
						cur=Object.assign({}, cur, {selected: false});
						acc.push(cur);
						return acc;
				}, []);
			break;
		case 'removeTimeout':
			state=state.reduce((acc, cur)=>{
					if(cur.timerStart&&cur.deleteTimer!=='forever'){
						var timeLeft=cur.deleteTimer*1000-(action.currentTime-cur.timerStart);
						if(timeLeft>0) acc.push(cur);
					}
					else acc.push(cur);
					return acc;
				}, []);
			break;
		case 'sentToReceiver':
			state=state.reduce((acc, cur)=>{
					if(!cur.timerStart&&cur.clientTime===action.clientTime)	{
						cur={...cur, timerStart: new Date(), status: 'sentToReceiver'}
					}
					acc.push(cur);
					return acc;
				}, []);
			break;

		case 'refetchStart':
			state=[];
			break;

		case 'refetchSuccess':
			state=action.messages;
			break;

		case 'sentToServer':
			state=state.reduce((acc, cur)=>{
					if(cur.sender.name===action.sender.name&&cur.clientTime===action.clientTime)	{
						cur.status='sentToServer';
					}
					acc.push(cur);
					return acc;
				}, []);
			break;
		default:
	}

	return state;
}


function numberSelected(state=0, action){
	if(action.type==="toggleMessage") {
		if(action.selected)state++;
		else state--;
	}
	if(action.type==="deleteMessages") state=0;
	if(action.type==="refetchStart") state=0;
	if(action.type==="deleteSuccess") state=0;
	if(action.type==="cancelSelect") state=0;
	return state
}

function searchContacts(state='', action){
	if(action.type==="searchContacts"){
		state=action.str}
	return state;
}


function putEvents(state=[], action){
	if(action.type==="sendNewMessage"||action.type==="deleteMessage"){
		state.push(action)
	}
	else if (action.type==="resetEvents"){
		state=[]
	}
	return state;
}


const Reducers=combineReducers({contacts, sender, receiver, dialog, putEvents, connection,
						scrollBox, numberSelected, searchContacts, accounts});

export default Reducers;