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
        
socket.on('played', function(dane) {
        socket.broadcast.emit('play_res',dane);
    });
socket.on('messagedetection', (id,x,y,devid) => {
        //create a message object 
       let  message = {"x":x, "id":id,"y":y,"devid":devid}
          // send the message to the client side  
       io.emit('message', message );
      });
        
        
//socket.on('played', (dane,devids) => {
//       let  play_res = {"dane":dane,devids":devids}
          // send the message to the client side  
//       io.emit('play_res', play_res );
//      });
        
});
server.listen(port,()=>{
console.log('Node app running');
});
