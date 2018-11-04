var cookieParser=require("cookie-parser");
const express=require("express");
const app=express();
const port=3001;
var bodyParser = require('body-parser');
var fs=require('fs');
var crypto=require('crypto');
var events={};

app.use(bodyParser.json());
app.use(cookieParser());

var account={};

app.get('/prelogin', function(req, res){
	if(req.cookies.sessionID) res.send({validated: true});
	else res.send({validated:false});

});

app.post('/authenticate', function(req, res){
	crypto.pbkdf2(req.body.password, req.body.userName, 5000, 512, 'sha512', (err, key)=>{
		if(account[req.body.userName]===key.toString('base64')){
			res.cookie("sessionID", req.body.userName);
			res.send(JSON.stringify({validated: true}));
		}else{
			res.send(JSON.stringify({validated: false}));
		};
	});
});

app.post('/registration', function(req, res){
		if(account[req.body.userName]){
			res.send(JSON.stringify({success: false}));
		}else{
			crypto.pbkdf2(req.body.password, req.body.userName, 5000, 512, 'sha512', (err, key)=>{
				account[req.body.userName]=key.toString('base64');
				fs.writeFile('./database/account.json', JSON.stringify(account), {encoding: 'utf8'}, ()=>{
					res.send(JSON.stringify({success: true}));
				  	console.log(`created an account for: ${req.body.userName}`)
				});
			});
		}
});

app.post('/updateDialog', function(req, res){ 
	var getEvents=events[req.body.sender]||[];
	var respondEvents=[];
	var currentTime=new Date();
	var putEvents=events[req.body.receiver]||[];

	req.body.putEvents.reduce((acc, cur)=>{
		if(cur.type==="sendNewMessage"){
			respondEvents.push({type:'sentToServer', clientTime: cur.clientTime, sender: cur.sender});
			putEvents.push(cur);
		}
		else if(cur.type==="deleteSuccess"){
			acc.push(cur);
		}else if (cur.type==="deleteMessage"&&cur.sender===req.body.sender){
			var deleteElement=events[req.body.receiver].find((el)=>{
				return el.type==='newMessage'&&el.clientTime===cur.clientTime});
			if(!deleteElement||!deleteElement.serverTime) {
				respondEvents.push({type:'deleteSuccess', sender: cur.sender, clientTime: cur.clientTime});
			}
		}else if(cur.type==="deleteMessage"&&cur.sender===req.body.receiver){
			events[req.body.sender]=events[req.body.sender].filter((el)=>{
				return el.type==='newMessage'&&el.clientTime!==element.clientTime
			});
			acc.push(cur);
		}
		return acc;

	}, putEvents)
 
	events[req.body.sender]=getEvents.reduce((acc, cur)=>{
		if (cur.type==='sendNewMessage'&&!cur.serverTime){
			cur.serverTime=new Date().getTime();
			acc.push(cur);
			putEvents.push({type:'sentToReceiver', clientTime: cur.clientTime});
			respondEvents.push(Object.assign(cur, {type: 'receiveNewMessage'}));
		}
		if (cur.type==='sentToReceiver'){
			respondEvents.push(cur);
		}
		return acc;
	},[]);

	events[req.body.receiver]=putEvents; 
	res.send(JSON.stringify(respondEvents));
});

app.post('/refetch', function(req, res){
	respondEvents=[];
	if(!events[req.body.sender])events[req.body.sender]=[];
	events[req.body.sender].reduce((acc, cur)=>{
		if(acc.type==='newMessage'&&serverTime){
			var currentTime=new Date();
			var timePassed=currentTime.getTime()-cur.serverTime.getTime();
			var timeLeft=cur.deleteTimer-timePassed/1000;
			if(timeLeft>0){ 
				acc.deleteTimer=timeLeft;
				acc.push(cur);
			}
		}
		return acc;
	}, respondEvents);
	events[req.body.sender]=respondEvents;
});





app.get('/logout', function(req, res){
	res.clearCookie('sessionID');
    res.send({loggedOut: true});
});

app.post('/getContacts', function(req, res){
	var contactsFile= `./database/${req.body.sender}-contact.json`;
	fs.readFile(contactsFile, {encoding: 'utf8'}, function(err, target){
		if(target){
			var json=JSON.parse(target)
			setTimeout(function(){
				console.log("sending contacts");
				res.send(target);
			}, 1000)
		}else{
			console.log('failed to read contacts of');
		}

	});
	
});



app.listen(port, function(){console.log(`app is listening at port${port}`)});