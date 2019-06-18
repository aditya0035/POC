var queue = 'task_queue';
const amqplib=require("amqplib/callback_api")
var msg = process.argv.slice(2).join(' ') || "Hello World!";
amqplib.connect("amqp://localhost",(err,connection)=>{
    connection.createChannel((err,channel)=>{
        channel.assertQueue(queue,{ durable: true})
        channel.sendToQueue(queue,Buffer.from(msg),{persistent:true})
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { 
        connection.close(); 
        process.exit(0) 
    }, 500);
});