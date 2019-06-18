var amqplib=require("amqplib");
var url = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672';
const queue='queue';
amqplib.connect(url).then(connection=>{
    return connection.createChannel();
}).then(channel=>{
    return channel.assertQueue(queue,{durable:true}).then((messgage)=>{
        setInterval(() => {
            channel.sendToQueue(queue,Buffer.from("Hi This is Producer"));
        }, 2000);
    });
});