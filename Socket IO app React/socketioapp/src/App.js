import React,{Component} from 'react';
import './App.css';
import  socketIOClient  from 'socket.io-client'
class App extends Component{
  constructor(props){
    super(props)
    this.state={
      message:"",
      messages:[],
    }
  }
  endpoint="http://10.199.27.39:4000/"
  socket=socketIOClient(this.endpoint)
  componentDidMount(){
    var socket=this.socket
    socket.on("messageRecieved",(data)=>{
      var messages=this.state.messages;
      messages.push(data);
      console.log(data)
      this.setState((prevState)=>({
        messages:messages
      }));
    });
  }
  OnChangeHandle=(event)=>{
    var value=event.target.value
    this.setState((prevState)=>({
      message:value
    }));
  }
  SendMessageHandler=(event)=>{
    event.preventDefault();
    var socket=this.socket;
    socket.emit("message",{message:this.state.message})

  } 
  render(){
    var messages=this.state.messages;
    var message=null;
    if(messages.length>0){
      message=messages.map((item)=>{
        return <li>{item.message}</li>
      })
    }
    
    return <div>
      {<ul id="messages">{message}</ul>}
      <div className="footer">
      <form onSubmit={this.SendMessageHandler}>
      <input type="text" onChange={this.OnChangeHandle}></input>
      <button type="submit">Send</button>
      </form>
      </div>
    </div>
  }

}
export default App;
