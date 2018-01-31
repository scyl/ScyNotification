// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function () {
  var socket = io();
  var username = getParam('username');
  $('form').submit(function(){
    socket.emit('message');
    return false;
  });
  
  socket.on('connect', function(){
    $('#myId').html(username + ' ' + socket.id);
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
      $('#users').append($('<li>').text(usersList[i]));
    }
  });
});

function reset() {
  $('body').css('background-color', 'white');
}

function getParam(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}