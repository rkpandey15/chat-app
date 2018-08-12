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
var sendlocation = $('#send-location');
sendlocation.on('click', function(){
    if (navigator.geolocation){
        alert("Geolocation not supported by your browser.");
    }
    navigator.geolocation.getCurrentPosition(
        function(position){
            socket.emit('createLocationMessage',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            });
        },
        function(){
            alert('Unable to fetch location');
        });
});
