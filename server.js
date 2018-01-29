// server.js
// where your node app starts

// Init project
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Handle HTML
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/public/style.css');
});

app.get('/client.js', function(req, res){
  res.sendFile(__dirname + '/public/client.js');
});

// Main app communications
io.on('connection', function(socket){
  currentClients.push(socket.id);
  io.emit('updateUsers', currentClients);
  console.log('a user connected: ' + socket.id);
  printCurClients();
  
  socket.on('message', function(){
    io.emit('flash')
    console.log('PING!');
  });
  
  socket.on('disconnect', function(){
    userDisconnect(socket.id);
    io.emit('updateUsers', currentClients);
    console.log('a user disconnected');
    printCurClients();
  });
});

var currentClients = [];

function printCurClients() {
  console.log('Current users:');
  var i = 0;
  for (i = 0; i < currentClients.length; i++) {
    console.log(currentClients[i]);
  }
  console.log()
}

function userDisconnect(id) {
  var i = 0;
  while (currentClients[i] != id && i < currentClients.length) {
    i++;
  }
  currentClients.splice(i,1);
}

// Node.js listen
var listener = http.listen(process.env.PORT, function(){
  console.log('Your app is listening on port ' + listener.address().port);
});

