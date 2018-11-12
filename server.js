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

app.use(express.static('public'));

const multerConfig = {

    storage: multer.diskStorage({
      destination: function(req, file, next){
        next(null, './public');
      },

      filename: function(req, file, next){
        const ext = file.mimetype.split('/')[1];
        const storeName=file.fieldname + '-' + Date.now() + '.'+ext;
        req.body.storeName=storeName;
        req.body.originalName=file.originalname;
        next(null, storeName);
      }
    }),

    fileFilter: function(req, file, next){
    		console.log('here');
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

contacts.Tom=["Yaming","Kate"];

contacts.Yaming=["Tom", "Kate"];


app.use(bodyParser.json());
app.use(cookieParser());

var accounts={Yaming:"iD/EvDLtLnOahOP4XCJdGZQLL1NhTDiHXjYTGdbUuZGO9xIiHgWLvHbjHlYkhmH5EXOnCguPr4Mc6UTvq8V5MSRRbwZD+ChX8YmtVS5+i2E+ajZPSHuhnQHOC7CT9e2WFke+G+YRSR1I0WrfB9AVpq/RxnXMYhdSBVr7sypNytuN48318YubvyoMBzsfYN2K5vRSGx81yNt99pT+evmbXY8rS6MWGTC69bp4efYUPbP9f0cFinqDOG7xXA9ariKMdJT4B+jTDLURFtGLBR2mjW1Uo7nVFBzRMkNojKdU+3lNqytrU1ujNBUK8m3fmN9ytdZ8H6dTHTc8vCE6lOonngZtKTRNEmdSnDB6SGw6FSc5PDWhkUHC4m4k5N8gl6cwCqijAUMrizRef/wC9v1aASVPW0F0mlmbceGDGd6IJvr1zG9lDp3Doqylt1kUtAzjeqw1eKNO6DTRKPGjO5LU/FDe6INWoWy5TrYqau7l0T/vYXp7XWPji7i4FoBoox6gCzCSIElC57BAuQK4mVD3nn9OFnGoIiefN/GPGa05aoRSKjxYd/SHj65jArR6OGnjr+eSeFqHx7Ma7xjMpp/wY1Ol0lX7LQ+oACQubYl2+GHq48VsF0SJRSuaIzTgCZl79JqT3brsGvj+LLzTFapCjBSAtdyLMGj0v9UT/Or7AwI=",
Tom:"18Sd16s51Nmg1r75B+JuxGVdSjObnagS8BEoARoDG3L4ImFnPBQ/zVsnuQxjhQgy62R/BW6shVwKQQogOBumg1SKYgzfLPOY1SWM6eNimLZhZa/DDX7tQI4PICKfWnSOZbjUv7STASb/AXp61pd6aN1Em8vr4nNOjkNGYBFdV3w2zGgWyvOZ/8wF2jtXmWV+3LVu7mHBBo2TIKmoY2GPG5i4wnZRKWbvtC5+lROcwebzG0mhYqTkPmdG59dZDGY/nQEAooBN2Xvzh7zfcDY3AU/CadpEd1YKk86GhB/m2Bghc7RXB7ppeFBJe7FLGPXnUVrdWhS56beUNNDNGcY/QksacrI2HaWLrxpHXMpwLFQVNT0faewqfWgLZNEpHh5S1jDQYf4de57wxlkffA/6ooHm+jDHiqduCO0avVeGwnX26/OnJAqtOi7fBtkHJBwIFQeNkivD3zfUR87mBSHnuQO3He9GJOwlogtU5myysha9g3pyNh7Xe/x4B7HiMxfTRsyl+86bxlzddcXNUrPAkMdVseF5zmCsz6DKmTRtyohb8Uj/hwNfqGeEv1mKXv8zt82TSElocwtXGXAa9pGS5RLUbl4djUEOCLoU2biCEPS5QJYPfAB5xnY8Z0ZgiW3vGjSoE99zB3lDeLErHRg+PFxrr2P7HDmGS6cINeD6nWQ="};


var lastVisited={Yaming: getTime(), Tom: getTime()};

function getTime(){
	var t=new Date();
	var str=t.toTimeString().substring(0,8)+' '+(t.getMonth()+1)+'/'+(t.getDate()+1)+'/'+t.getFullYear();
	return str;
}

app.post('/uploadImg', multer(multerConfig).single('file'), function(req, res){
	const {sender, receiver, storeName, originalName}=req.body;
	req.body.clientTime=parseInt(req.body.clientTime);
	nameOutbound=sender+'-'+receiver;
	events[nameOutbound]=events[nameOutbound]||[];
	events[nameOutbound].push({...req.body, type: "sendNewMessage"});
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
	res.send(list);
});


app.post('/addContact', function(req, res){
	contacts[req.body.sender].push(req.body.contact);
	contacts[req.body.contact].push(req.body.sender);
	res.send({name:req.body.contact, lastVisited: lastVisited[req.body.contact]});

});



app.get('/prelogin', function(req, res){
	if(req.cookies.sessionID) res.send({validated: true});
	else res.send({validated:false});

});

app.post('/authenticate', function(req, res){
	crypto.pbkdf2(req.body.password, req.body.userName, 5000, 512, 'sha512', (err, key)=>{
		if(accounts[req.body.userName]===key.toString('base64')){
			res.cookie("sessionID", req.body.userName);
			lastVisited[req.body.userName]=getTime();
			res.send(JSON.stringify({validated: true}));
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
				accounts[req.body.userName]=key.toString('base64');
				lastVisited[req.body.userName]=getTime();
				fs.writeFile('./database/account.json', JSON.stringify(accounts), {encoding: 'utf8'}, ()=>{
					contacts[req.body.userName]=[];
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
	var responseList=contacts[req.body.sender].map((item, index)=>{
		return {name: item, lastVisited: lastVisited[item]}
	})
	res.send(responseList);
});



app.listen(port, function(){console.log(`app is listening at port${port}`)});