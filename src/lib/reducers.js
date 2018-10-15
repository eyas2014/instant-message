import { combineReducers } from 'redux';

const initialContact=[{user:'Tom', date: '10/18/2018', lastMessage: {Name: 'Tom', message: 'How are you xxxxx'}},
					{user:'Tom', date: '10/18/2018', lastMessage: {Name: 'Tom', message: 'How are you xxxxx'}},
					{user:'Tom', date: '10/18/2018', lastMessage: {Name: 'Tom', message: 'How are you xxxxx'}},
					{user:'Tom', date: '10/18/2018', lastMessage: {Name: 'Tom', message: 'How are you xxxxx'}},
					{user:'Tom', date: '10/18/2018', lastMessage: {Name: 'Tom', message: 'How are you xxxxx'}},
					{user:'Tom', date: '10/18/2018', lastMessage: {Name: 'Tom', message: 'How are you xxxxx'}},
					{user:'Tom', date: '10/18/2018', lastMessage: {Name: 'Tom', message: 'How are you xxxxx'}}];


const messages=[{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'},
				{name:'Tom', date: '10/18/2018', message: 'How are you xxxxx'}];



function contacts(state=initialContact, action){

	return state;

}


function dialogs(state=messages, action){

	return state;
}


const Reducers=combineReducers({dialogs, contacts});

export default Reducers;