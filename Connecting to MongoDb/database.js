var mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test",{useNewUrlParser:true});
var db= mongoose.connection;
db.once("open",()=>{
    console.log("connection open")
});
db.on("error",(err)=>{
    console.log("error:", err);
});

mongoose.connection.db.listCollections()
var kittySchema=new mongoose.Schema({
    name:mongoose.Schema.Types.String
});
kittySchema.methods.speak=function(){
    var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
    console.log(greeting);
}
var Kitten = mongoose.model('Kitten', kittySchema);
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak();
fluffy.save((error,obj)=>{
    if (error) return console.error(err);
    obj.speak();
});