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
//socket.on('join', function(userNickname) {
//        console.log(userNickname +" : has joined the chat "  );
//        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined");
//    });
socket.on('messagedetection', (id,x,y) => {
        //create a message object 
       let  message = {"x":x, "id":id,"y":y}
          // send the message to the client side  
       io.emit('message', message );
     
      });
});
server.listen(port,()=>{
console.log('Node app running');
});
