var cookieParser=require("cookie-parser");
const express=require("express");
const app=express();
const port=3001;
var bodyParser = require('body-parser');
var fs=require('fs');
var crypto=require('crypto');
var events={};
var contacts={};
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS=require('aws-sdk');
const mysql=require('mysql');

const connection=mysql.createConnection({
	host: 'instantmessagedb.co3mwqwrfilr.us-east-2.rds.amazonaws.com',
	user: 'yamingshao',
	password: 'sym123456',
	port:  3306
});

app.use(express.static('public'));

AWS.config.loadFromPath('./s3_config.json');
var s3 = new AWS.S3();

const multerConfig = {
	storage: multerS3({
	    s3: s3,
	    bucket: 'yaminginstantmessage',
	    acl: 'public-read',
	    metadata: function (req, file, cb) {
	      cb(null, {fieldName: file.fieldname});
	    },
	    key: function (req, file, cb) {
	      cb(null, Date.now().toString()+'.'+file.mimetype.split('/')[1])
	    }
  	}),

    fileFilter: function(req, file, next){
          if(!file){
            next();
          }
        const image = file.mimetype.startsWith('image/');
        if(image){
          console.log('photo uploaded');
          next(null, true);
        }else{
          console.log("file not supported")
          return next();
        }
    }
  };

app.use(bodyParser.json());
app.use(cookieParser());

var accounts={};
var contacts={};
connection.connect();
connection.query('use messages;');
connection.query('select * from accounts;', function(error, results, fieldName){
	results.reduce((acc, cur)=>{
		acc[cur.name]={key: cur.passcode,
						column: cur.avatarx,
						row: cur.avatary,
						lastVisited: cur.last_visited
					};
		return acc;
	}, accounts);
});
connection.query('select * from contacts', function(error, results, fieldName){
	results.reduce((acc, cur)=>{
		contacts[cur.user1]=contacts[cur.user1]||[];
		contacts[cur.user2]=contacts[cur.user2]||[];
		contacts[cur.user1].push(cur.user2);
		contacts[cur.user2].push(cur.user1);
	}, contacts)
});


//setTimeout(()=>{console.log(accounts)},2000);

function getTime(){
	var t=new Date();
	var str=t.toTimeString().substring(0,8)+' '+(t.getMonth()+1)+'/'+(t.getDate()+1)+'/'+t.getFullYear();
	return str;
}

app.post('/uploadImg', multer(multerConfig).single('file'), function(req, res){
	const storeName=req.file.key;
	const {sender, receiver,  originalName}=req.body;
	req.body.sender={name: sender, 
					column: accounts[sender].column, 
					row:accounts[sender].row};
	req.body.clientTime=parseInt(req.body.clientTime);
	nameOutbound=sender+'-'+receiver;
	events[nameOutbound]=events[nameOutbound]||[];
	events[nameOutbound].push({...req.body, storeName, type: "sendNewMessage"});
	res.send(JSON.stringify({originalName, storeName}));
})




app.post('/loadAccounts', function(req, res){
	var list=Object.keys(accounts);
	contacts[req.body.sender].forEach((item)=>{
		list=list.filter((element)=>{
			return item!==element
		})
	});
	list=list.filter((element)=>{return req.body.sender!==element});
	list=list.map((item)=>{
		return {name: item,
				column: accounts[item].column, 
				row: accounts[item].row		
		}
	});
	res.send(list);
});


app.post('/addContact', function(req, res){
	contacts[req.body.sender].push(req.body.contact);
	contacts[req.body.contact].push(req.body.sender);
	const q=`insert into contacts (user1, user2) values ('${req.body.sender}', '${req.body.contact}');`
	connection.query(q, (error)=>{
		if(error)console.log('failed to save new contact to database');
		else res.send({name:req.body.contact, lastVisited: accounts[req.body.contact].lastVisited});
	});
});



app.post('/postLogin', function(req, res){
	if(req.cookies[req.body.username]) res.send({validated: true, 
									column: accounts[req.body.username].column, 
									row: accounts[req.body.username].row});
	else res.send({validated:false});

});

app.post('/authenticate', function(req, res){
	crypto.pbkdf2(req.body.password, req.body.userName, 5000, 512, 'sha512', (err, key)=>{
		if(accounts[req.body.userName].key===key.toString('base64')){
			res.cookie(req.body.userName, accounts[req.body.userName].row+"#"+accounts[req.body.userName].column);
			const timeNow=getTime();
			accounts[req.body.userName].lastVisited=timeNow;
			connection.query(`update accounts set last_visited='${timeNow}' where name='${req.body.userName}'`, (error, results, fields)=>{
				if(error) console.log(error);
				else {
					console.log('update lastVisited to database');
					res.send(JSON.stringify({validated: true}));
				};
			});
		}else{
			res.send(JSON.stringify({validated: false}));
		};
	});
});

app.post('/registration', function(req, res){
		if(accounts[req.body.userName]){
			res.send(JSON.stringify({success: false}));
		}else{
			crypto.pbkdf2(req.body.password, req.body.userName, 5000, 512, 'sha512', (err, key)=>{
				key=key.toString('base64');
				const timeNow=getTime();
				accounts[req.body.userName]={key, 
											column:req.body.column, 
											row: req.body.row};
				accounts[req.body.userName].lastVisited=timeNow;
				contacts[req.body.userName]=[];
				res.cookie(req.body.userName, accounts[req.body.userName].row+"#"+accounts[req.body.userName].column);
				const q=`insert into accounts (name, avatarx, avatary, last_visited, passcode) values 
					('${req.body.userName}', '${req.body.row}', '${req.body.column}', '${timeNow}', '${key}')`;
				connection.query(q, (error)=>{
					if(error) console.log(error);
					else res.send(JSON.stringify({success: true}));
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
});

app.post('/refetchDialog', function(req, res){
	var respondEvents=[];
	var nameOutbound=req.body.sender.name+'-'+req.body.receiver;
	var nameInbound=req.body.receiver+'-'+req.body.sender.name;
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
		if((cur.type==='sendNewMessage'||cur.type==='receiveNewMessage')&&cur.deleteTimer==='forever'){
			cur.status='sentToServer'
			acc.push(cur);
			respondEvents.push(cur);
		}else if(cur.type==='sendNewMessage'&&cur.deleteTimer!=='forever'){
			cur.status='sentToServer';
			acc.push(cur);
			respondEvents.push(cur);
		}else if(cur.type==='receiveNewMessage'&&cur.deleteTimer!=='forever'){
			var currentTime=new Date().getTime();
			var timePassed=currentTime-cur.serverTime;
			var timeLeft=cur.deleteTimer-timePassed/1000;
			if(timeLeft>0){ 
				cur.deleteTimer=timeLeft;
				cur.serverTime=currentTime;
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
	const nameOutbound=sender.name+'-'+receiver;
	const nameInbound=receiver+'-'+sender.name;
	events[nameInbound]=events[nameInbound]||[];
	events[nameOutbound]=events[nameOutbound]||[];
	var respondEvents={type: 'deleteSuccess', list: []};
	list.forEach((item)=>{
		if (item.sender.name===sender.name){
			events[nameOutbound]=events[nameOutbound].reduce((acc, cur)=>{
				if((cur.type==='sendNewMessage'||cur.type==='receiveNewMessage')&&cur.clientTime===item.clientTime){
					if(!cur.serverTime) {
						respondEvents.list.push({sender: cur.sender, clientTime: cur.clientTime});
					}
				}else acc.push(cur);
				return acc;
			}, []);
		}else if(item.sender.name===receiver){
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
	nameOutbound=sender.name+'-'+receiver;
	events[nameOutbound]=events[nameOutbound]||[];
	events[nameOutbound].push(req.body);
	res.send(JSON.stringify({type:'sentToServer', clientTime, sender}));
})

app.post('/logout', function(req, res){
	res.clearCookie(req.body.username);
    res.send({loggedOut: true});
});

app.post('/getContacts', function(req, res){
	var responseList=contacts[req.body.sender].map((item, index)=>{
		return {name: item, 
				lastVisited: accounts[item].lastVisited, 
				column: accounts[item].column, 
				row: accounts[item].row
			}
	})
	res.send(responseList);
});



app.listen(port, function(){console.log(`app is listening at port${port}`)});