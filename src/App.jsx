import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const chatData = {
  currentUser: {username: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
   {
     id: 1,
     username: "Bob",
     content: "123"
   },
   { 
     id: 2,
     username: "deadpool",
     content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
   }
  ]
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = chatData;
    this.handleInputMessage = this.handleInputMessage.bind(this);
    this.socketConnection = new WebSocket("ws://localhost:3001");
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = (message) => {
    this.socketConnection.send(JSON.stringify(message));
    console.log('message sent to the server from client');
  }
  //handleInputMessage = message() {}
  handleInputMessage = (message) => {
    const newMessage = {id: 3, username: message.username, content: message.content}
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages});
    this.sendMessage({message: message});
  }

  componentDidMount() {

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
