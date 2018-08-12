var socket = io();

socket.on("connect", function(){
    console.log("Connected to server");
});


socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  console.log(message.text);
  var li = $(`<li>${message.text}</li>`);
  
  $('#messages').append(li);
});


socket.on("disconnect", function(){
    console.log("Disconnected from server");
});

$('#message-form').on('submit',function(e)
{
    e.preventDefault();
    socket.emit("createMessage",
    {from:'User', text:$('#txtmessage').val()},
    function(){

    }
);
});

