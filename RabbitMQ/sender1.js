const amqplib=require("amqplib/callback_api");
var msg = process.argv.slice(2).join(' ') || "Hello World!";
amqplib.connect("amqp://localhost",(err,conn)=>{
    conn.createChannel((err,ch)=>{
        ch.assertExchange("logs","fanout",{durable:true});
        ch.publish("logs",'',Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { 
        conn.close(); 
        process.exit(0); 
      }, 500);

})