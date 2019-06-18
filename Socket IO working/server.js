const express=require("express");
const http=require("http");
const path=require("path")
const app=express();
const server=http.createServer(app)
const users=[];
app.get("/",(request,response,next)=>{
    response.sendFile(path.resolve(__dirname,"./index.html"))
});

const io=require("socket.io")(server);
io.on("connection",function(socket){
    console.log("connected")
    socket.on("registeruser",function(msg){
        users.push({name:msg.name,clientId:socket.client.id});
        console.log(users)
    });
    socket.on("disconnect",function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen({host:'0.0.0.0',port:4000});