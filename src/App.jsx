import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    };
    this.handleInputMessage = this.handleInputMessage.bind(this);
    this.socketConnection = new WebSocket("ws://localhost:3001");
    this.sendMessage = this.sendMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  sendMessage = (message) => {
    this.socketConnection.send(JSON.stringify(message));
    console.log('message sent to the server from client');
  }
  //handleInputMessage = message() {}
  handleInputMessage = (message) => {
    console.log(message);
    if(this.state.currentUser.name !== message.username) {
      const newNotification = {type: "postNotification", content: `${this.state.currentUser.name} has changed their name to ${message.username}`}
      this.state.currentUser.name = message.username;
      console.log('newNotification: ', newNotification);
      this.sendMessage({message: newNotification});
    }
    // send message to server
    const newMessage = {type: "postMessage", username: message.username, content: message.content};
    console.log('newMessage: ', newMessage);
    this.sendMessage({message: newMessage});
  }

  componentDidMount() {
    this.socketConnection.onmessage = (event) => {
      let serverData = JSON.parse(event.data);
      console.log("data receiving from server: ", serverData);
      console.log('serverdata.message', serverData.message);
      const serverDataArray = [];
      if(Number.isInteger(serverData.counter)) {
        this.state.onlineUsers = serverData.counter;
      } 
      else {
        switch(serverData.message.type) {
          case "incomingMessage":
          serverDataArray.push(serverData.message);
          break;
          case "incomingNotification":
          serverDataArray.push(serverData.message);
          break;
          default:
          throw new Error("Unknown event type: " + serverData.message.type);
         }
       }
      //add new data to list, fetch all data from server
      this.setState({messages: this.state.messages.concat(serverDataArray)});
    }

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">ChatApp</a>
        </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar handleInputMessage={this.handleInputMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
