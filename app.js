console.log("Starting server...");

var express = require('express');
var fs = require('fs');
var app = express();
var serv = require('https');

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

// serv.listen(2000);

serv.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/techunlimitedgroup.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/techunlimitedgroup.com/fullchain.pem')
    //, passphrase: 'YOUR PASSPHRASE HERE'
}, app).listen(2000);

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket) {
   console.log('socket connection...'); 
});