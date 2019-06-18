var queue = 'task_queue';
const amqplib=require("amqplib/callback_api");
amqplib.connect("amqp://localhost",(err,connection)=>{
    connection.createChannel((err,channel)=>{
        channel.assertQueue(queue,{durable:true});
        channel.consume(queue,(msg)=>{
            var secs = msg.content.toString().split('.').length - 1;
            channel.prefetch(1);
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg)
              }, secs * 1000);
        },{noAck:false});
    })

})