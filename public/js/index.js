var socket = io();

socket.on("connect", function(){
    console.log("Connected to server");
});


socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  console.log(message.text);
  var li = $(`<li>${message.from}:${message.text}</li>`);
  
  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    console.log('newLocationMessage', message);
    console.log(message.from);
    var li = $(`<li><a target='_blank' href=${message.url}>My current Location</a></li>`);
    //var li = $(`<li>${message.from}</li>`);
    $('#messages').append(li);
  });
  
socket.on("disconnect", function(){
    console.log("Disconnected from server");
});

$('#message-form').on('submit',function(e)
{
    e.preventDefault();
    var messageTexBox = $('#txtmessage');
    socket.emit("createMessage",
    {from:'User', text:messageTexBox.val()},
    function(){
        messageTexBox.val('');
    }
);
});
var sendlocation = $('#send-location');
sendlocation.on('click', function(){
    if (navigator.geolocation){
        alert("Geolocation not supported by your browser.");
    }
    sendlocation.attr('disabled','disabled').text('Sending Location..');

    navigator.geolocation.getCurrentPosition(
        function(position){
            sendlocation.removeAttr('disabled').text('Send Location');
    
            socket.emit('createLocationMessage',{
            
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            });
        },
        function(){
            sendlocation.removeAttr('disabled').text('Send Location');;
            alert('Unable to fetch location');

        });
});
