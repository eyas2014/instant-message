var cookieParser=require("cookie-parser");
const express=require("express");
const app=express();
const port=3001;
var bodyParser = require('body-parser');
var account;
var fs=require('fs');
var crypto=require('crypto');

fs.readFile('./database/account.json', {encoding: 'utf8'}, function(err, target){
	account=JSON.parse(target);
});



app.use(bodyParser.json());
app.use(cookieParser());

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


app.post('/loadDialog', function(req, res){ 
	var name=req.body.sender>req.body.receiver?req.body.receiver+'-'+req.body.sender : req.body.sender+'-'+req.body.receiver;
	fs.readFile(`./database/${name}.json`, {encoding: 'utf8'}, function(err, target){
		setTimeout(function(){
			res.send(target);
		},1000)
	});
});


app.get('/logout', function(req, res){
	res.clearCookie('sessionID');
    res.send({loggedOut: true});
});

app.post('/getContacts', function(req, res){
	var contactsFile= `./database/${req.body.clientName}-contact.json`;
	fs.readFile(contactsFile, {encoding: 'utf8'}, function(err, target){
		var json=JSON.parse(target)
		setTimeout(function(){
			console.log("sending contacts");
			res.send(target);
		}, 1000)
		
	});
	
});


app.post('/sendMessage', function(req, res){
	const {sender, receiver, message, date, id}=req.body;
	var name=sender>receiver?receiver+'-'+sender : sender+'-'+receiver;
	var messagesFile= `./database/${name}.json`;
	fs.readFile(messagesFile, {encoding: 'utf8'}, function(err, target){
		var messages=JSON.parse(target);
		messages.push({sender, message, date});
		fs.writeFile(messagesFile, 
					 JSON.stringify(messages), 
					 {encoding: 'utf8'}, 
					 ()=>{
						console.log("message added successfully");
						setTimeout(function(){
							res.send(JSON.stringify({id}));																			
					 }, 5000);
		});
	});

})


app.post('/deleteMessage', function(req, res){
	var name=req.body.sender>req.body.receiver?req.body.receiver+'-'+req.body.sender : req.body.sender+'-'+req.body.receiver;
	var messagesFile= `./database/${name}.json`;
	fs.readFile(messagesFile, {encoding: 'utf8'}, function(err, target){
		var messages=JSON.parse(target);
		var deletedMessages=req.body.list.reduce((acc, cur, index)=>{
			if(!cur)acc.push(messages[index]);
			return acc;
		}, []);
		fs.writeFile(messagesFile, 
					 JSON.stringify(deletedMessages), 
					 {encoding: 'utf8'}, 
					 ()=>{
						console.log("message deleted successfully");
						setTimeout(function(){
							res.send(JSON.stringify({success: true}));																			
					 }, 5000);
		});
	});
})

app.listen(port, function(){console.log(`app is listening at port${port}`)});