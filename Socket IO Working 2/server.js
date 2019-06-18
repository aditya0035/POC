const express=require("express");
const http=require("http");
const app=express()
app.get("/",(request,response,next)=>{
    response.send("<h1>Welcome to Node JS</h1>")
});
const server=http.createServer(app);
const io=require("socket.io")(server);
// const io=socketIO(server);
io.on("connection",(socket)=>{
    console.log("a user Connected")
    socket.on("disconnect",()=>{
        console.log("user disconected");
    });
    socket.on("message",(data)=>{
        io.emit("messageRecieved",data)
    })
});
server.listen(4000,"0.0.0.0");