import { combineReducers } from 'redux';


function sender(state='', action){
	if(action.type==="login"){
		state=action.username
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
		default:
	}
	return state;
}


//actions: sendNewMessage, sentToServer, sentToReceiver, deleteMessage, deleteSuccess

function dialog(state=[], action){
	const {message, deleteTimer, sender, clientTime}=action;
	var newMessage;
	switch(action.type){
		case 'receiveNewMessage':
			const timerStart=new Date().getTime();
			newMessage={message, deleteTimer, selected: false, sender, timerStart, clientTime};
			state=[...state, newMessage];
			break;
		case 'sendNewMessage':
			newMessage={message, deleteTimer, selected: false, sender, clientTime, status: 'composed'};
			state=[...state, newMessage];
			break;

		case 'toggleMessage':
			state=state.reduce((acc, cur)=>{
					if(cur.clientTime===action.clientTime&&cur.sender===action.sender) {
						cur.selected=!cur.selected;
						acc.push(cur);
					};
					return acc;
				}, []);
			break;
		case 'deleteMessage': 
			state=state.reduce((acc, cur)=>{
					if(cur.clientTime===action.clientTime&&cur.sender===action.sender) {
						cur.status='deleting';
						acc.push(cur);
					};
					return acc;
				}, []);
			break;
		case 'deleteSuccess': 
			state=state.reduce((acc, cur)=>{
					if(cur.clientTime!==action.clientTime||cur.sender!==action.sender) {
						acc.push(cur);
					};
					return acc;
				}, []);
			break;
		case 'cancelSelect': 
			state=state.reduce((acc, cur)=>{
					if(cur.clientTime===action.clientTime&&cur.sender===action.sender) {
						cur.seleted=false;
						acc.push(cur);
					};
					return acc;
				}, []);
			break;
		case 'removeTimeout':
			state=state.reduce((acc, cur)=>{
					if(cur.timerStart){
						var timeLeft=cur.deleteTimer*1000-(action.currentTime-cur.timerStart);
						if(timeLeft>0) acc.push(cur);
					}
					else acc.push(cur);
					return acc;
				}, []);
			break;
		case 'sentToReceiver':
			state=state.reduce((acc, cur)=>{
					if(!cur.timerStart&&cur.clientTime===action.clientTime)	cur.timerStart=new Date();
					acc.push(cur);
					return acc;
				}, []);
			break;

		case 'sentToServer':
			state=state.reduce((acc, cur)=>{
					if(cur.sender===action.sender&&cur.clientTime===action.clientTime)	{
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
	if(action.type==="selectMessage") state++;
	if(action.type==="deselectMessage") state--;
	if(action.type==="deleteSuccess") state=0;
	if(action.type==="cancelSelect") state=0;
	return state
}

function searchContacts(state='', action){
	if(action.type==="searchContacts"){
		state=action.str}
	return state;
}

function modifications(state=[], action){
	if(action.type==="newMessage"||action.type==="deleteMessages") state.push(action);
	return state
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


const Reducers=combineReducers({contacts, sender, receiver, dialog, putEvents,
						scrollBox, numberSelected, searchContacts, modifications});

export default Reducers;