const port = process.env.PORT || 5000
const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {

res.send('Server is running')
});
io.on('connection', (socket) => {
console.log('user connected')
socket.on('join', function(userNickname) {
        console.log(userNickname +" : has joined the chat "  );
        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined");
    });
socket.on('messagedetection', (senderNickname,messageContent,ypos) => {
        //create a message object 
       let  message = {"x":messageContent, "id":senderNickname,"y":ypos}
          // send the message to the client side  
       io.emit('message', message );
     
      });
 socket.on('disconnect', function() {
    console.log( ' user has left ')
    socket.broadcast.emit("disconnect"," user has left ") 

});
});
server.listen(port,()=>{
console.log('Node app running');
});
