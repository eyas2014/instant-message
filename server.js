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
		console.log(key.toString('base64'));
		console.log(account[req.body.userName]);
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


app.post('/loadMessage', function(req, res){ 
	fs.readFile(`./database/${req.body.sender}-${req.body.receiver}.json`, {encoding: 'utf8'}, function(err, target){
		res.send(target);
	});
});


app.get('/logout', function(req, res){
	console.log('logging out...');
	res.clearCookie('sessionID');
    res.send({loggedOut: true});
});


app.post('/sendMessage', function(req, res){
	var messagesFile= `./database/${req.body.sender}-${req.body.receiver}.json`;
	fs.readFile(messagesFile, {encoding: 'utf8'}, function(err, target){
		var messages=JSON.parse(target).data;
		messages.push(req.body);
		writeToFile(messagesFile, JSON.stringify({data:messages}), "message added successfully")
	});
	res.send(JSON.stringify({success: true}));
})


function writeToFile(fileName, content, successMessage){
	fs.writeFile(fileName, content, {encoding: 'utf8'}, ()=>console.log(successMessage));
}

app.listen(port, function(){console.log(`app is listening at port${port}`)});