// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function () {
  var socket = io();
  var username = getParam('username');/*
  $('form').submit(function(){
    socket.emit('message');
    return false;
  });*/
  
  $("#users").on('click', '.pingBtn', function() {
    console.log(this.value);
    socket.emit('pingUser', this.value);
  });
  
  $("#users").on('click', '.pingAllBtn', function() {
    socket.emit('pingAll');
  });
  
  socket.on('connect', function(){
    $('#myId').html(username.substring(0,20) + ' ' + socket.id);
    socket.emit('name', username);
  });
  
  socket.on('flash', function(msg){
    $('body').css('background-color', 'red');
    setTimeout(reset, 300)
    console.log('FLASH!');
  });
  
  socket.on('updateUsers', function(usersList){
    $('#users').html("");
    var i = 0;
    for (i = 0; i < usersList.length; i++) {
      $('#users').append($('<li>').html(genRoll(usersList[i])));
    }
    $('#users').append($('<li>').html("<button class='pingAllBtn'>Ping Everyone</button>"));
  });
});

function reset() {
  $('body').css('background-color', '#222222');
}

function getParam(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function genRoll(user) {
  return "<table><tr><th class='names'>" + user[1] + "</th><th><button class='pingBtn' value='" + user[0] + "'>Ping</button></th>";
}