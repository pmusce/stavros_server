'use strict';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
const fs = require('fs');
var app = express();
const nodemailer = require('nodemailer');

function sendMail(content) {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: '',
	        pass: ''
	    }
	});

	// setup email data with unicode symbols
	let mailOptions = {
	    from: '"Name" <asdasd@gmail.com>', // sender address
	    to: '', // list of receivers
	    subject: 'Log exam', // Subject line
	    text: content, // plain text body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	});
}

app.use(express.static('app'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function getDatetime() {
	var today = new Date();
	var date = (today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
	return date+'_'+time;
}

function createLog(req) {
	var content = 'type: '+body.type+'\n';
	content = content + 'seconds: '+body.seconds+'\n';
	content = content + 'words: '+body.text_body.split(' ').length+'\n';
	content = content + 'chars: '+body.text_body.length+'\n';
	content = content + 'text: '+body.text_body+'\n';
	return content;
}

app.post('/first', function (req, res) {
	var file = 'log/'+getDatetime();
	var content = '1 of 2\n' + createLog(req.body);
	fs.appendFileSync(file, content) // body
	sendMail(content);

	if(req.body.type=='normal') {
		res.redirect('waiting.html')
	} else if(req.body.type=='enhanced') {
		res.redirect('waiting1.html')
	} else {
		res.redirect('waiting2.html')
	}
})

app.post('/second', function (req, res) {
	var file = 'log/'+getDatetime()+'_2';
	var content = '2 of 2\n' + createLog(req.body);
	fs.appendFileSync(file, content) // body
	sendMail(content);
	res.redirect('end.html')
})

app.post('/permit', function (req, res) {
	fs.writeFile('lock', '1', function() {})
	res.statusCode = 200;
    res.redirect('admin.html')
})

app.get('/wait', function (req, res) {
	fs.readFile('lock', 'utf8', (err, data) => {
	  	if (err) throw err;
	  	res.statusCode = 200;
	  	if (data == '0') {
	  		res.write('wait');
	  	} else {
	  		fs.writeFileSync('lock', '0')
	  		res.write('go');
	  	}
    	res.end();
	});
})

app.listen(3000, function () {
  	console.log('Example app listening on port 3000!')
})