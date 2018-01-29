// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('message');
    return false;
  });
  
  socket.on('connect', function(){
    $('#myId').html(socket.id);
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