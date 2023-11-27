import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path';
import {Server} from 'socket.io';
import http from 'http';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const server=http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.get('/', function (req, res) {
  var option=
  {
    root:path.join(__dirname)
  }
  res.sendFile('index.html', option)
})

var users=0
io.on('connection', function(socket){
  console.log(' A user connected')
  socket.on('disconnect', function(){
    console.log(' A user disconnected')
    users--;
    socket.broadcast.emit('newUserConnected',`${users} users are connected`)
    // io.sockets.emit('broadcast',`${users} users are disconnected`)
  })
  users++;
  socket.emit('newUserConnected','hi , welcome dear')

  socket.broadcast.emit('newUserConnected',`${users} users are connected`)
  // io.sockets.emit('broadcast',`${users} users are connected`)
  setTimeout(function(){
    socket.send("message sent howa hai server side say ") /// message event fire howa tha 

    socket.emit('myCustomEvent',{
      id:1,
      description:"A custom message for client Side"
    })
    
    
  })
  
})


// app.listen nahi hooga woh express ka tariqa hai node js ka server ko start karne ka but wese originaly server.listen hota tha  
server.listen(3000,()=>{ // this is crucial 
    console.log('listening on port 3000')
})