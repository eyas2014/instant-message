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
	var nameOutbound=req.body.sender+'-'+req.body.receiver;
	var nameInbound=req.body.receiver+'-'+req.body.sender;
	events[nameInbound]=events[nameInbound]||[];
	events[nameOutbound]=events[nameOutbound]||[];
	var respondEvents=[];
 
	events[nameInbound]=events[nameInbound].reduce((acc, cur)=>{
		if (cur.type==='sendNewMessage'&&!cur.serverTime){
			cur.serverTime=new Date().getTime();
			acc.push(cur);
			events[nameOutbound].push({type:'sentToReceiver', clientTime: cur.clientTime});
			respondEvents.push(Object.assign(cur, {type: 'receiveNewMessage'}));
		}
		else if (cur.type==='sentToReceiver'){
			respondEvents.push(cur);
		}
		else if(cur.type==='receiveDeleteMessages'){
			respondEvents.push(cur);
			events[nameOutbound].push({type:'deleteSuccess', list: cur.list});
		}
		else if(cur.type==='deleteSuccess'){
			respondEvents.push(cur);
		}
		else acc.push(cur);
		return acc;
	},[]);
	res.send(JSON.stringify(respondEvents));
	console.log(events[nameInbound]);
});

app.post('/refetchDialog', function(req, res){
	var respondEvents=[];
	var nameOutbound=req.body.sender+'-'+req.body.receiver;
	var nameInbound=req.body.receiver+'-'+req.body.sender;
	events[nameInbound]=events[nameInbound]||[];
	events[nameOutbound]=events[nameOutbound]||[];
	events[nameInbound]=events[nameInbound].reduce((acc, cur)=>{
		if(cur.type==='receiveNewMessage'&&cur.serverTime){
			if(cur.deleteTimer!=='forever'){
			var currentTime=new Date().getTime();
			var timePassed=currentTime-cur.serverTime;
			var timeLeft=cur.deleteTimer-timePassed/1000;
				if(timeLeft>0){ 
					cur.deleteTimer=timeLeft;
					acc.push(cur);
					respondEvents.push(cur);
				}
			}else {
				acc.push(cur);
				respondEvents.push(cur);
			}
		}else acc.push(cur);
		return acc;
	}, []);
	events[nameOutbound]=events[nameOutbound].reduce((acc, cur)=>{
		if(cur.type==='sendNewMessage'&&cur.deleteTimer==='forever'){
			cur.status='sentToReceiver'
			acc.push(cur);
			respondEvents.push(cur);
		}else if(cur.type==='sendNewMessage'&&!cur.serverTime&&cur.deleteTimer!=='forever'){
			cur.status='sentToServer';
			acc.push(cur);
			respondEvents.push(cur);
		}else if(cur.type==='sendNewMessage'&&cur.serverTime&&cur.deleteTimer!=='forever'){
			var currentTime=new Date().getTime();
			var timePassed=currentTime-cur.serverTime;
			var timeLeft=cur.deleteTimer-timePassed/1000;
			if(timeLeft>0){ 
				cur.deleteTimer=timeLeft;
				cur.status='sentToReceiver';
				acc.push(cur);
				respondEvents.push(cur);
			}
		}
		else acc.push(cur);
		return acc;
	}, []);
	res.send(JSON.stringify(respondEvents));
});


app.post('/deleteMessages', function(req, res){
	const {sender, receiver, list}=req.body;
	const nameOutbound=sender+'-'+receiver;
	const nameInbound=receiver+'-'+sender;
	events[nameInbound]=events[nameInbound]||[];
	events[nameOutbound]=events[nameOutbound]||[];
	var respondEvents={type: 'deleteSuccess', list: []};
	list.forEach((item)=>{
		if (item.sender===sender){
			events[nameOutbound]=events[nameOutbound].reduce((acc, cur)=>{
				if((cur.type==='sendNewMessage'||cur.type==='receiveNewMessage')&&cur.clientTime===item.clientTime){
					if(!cur.serverTime) {
						respondEvents.list.push({sender: cur.sender, clientTime: cur.clientTime});
					}
				}else acc.push(cur);
				return acc;
			}, []);
		}else if(item.sender===receiver){
			events[nameInbound]=events[nameInbound].filter((el)=>{
				return el.type!=='sendNewMessage'&&el.type!=='receiveNewMessage'||el.clientTime!==item.clientTime
			});
		}
	});
	events[nameOutbound].push({type:'receiveDeleteMessages', list});
	res.send(JSON.stringify(respondEvents));
});


app.post('/sendNewMessage', function(req, res){
	const {sender, receiver, clientTime}=req.body;
	nameOutbound=sender+'-'+receiver;
	events[nameOutbound]=events[nameOutbound]||[];
	events[nameOutbound].push(req.body);
	res.send(JSON.stringify({type:'sentToServer', clientTime, sender}));
})




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