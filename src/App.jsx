import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
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
    const newMessage = {username: message.username, content: message.content};
    console.log('newMessage: ', newMessage);
    this.sendMessage({message: newMessage});
  }

  componentDidMount() {
    this.socketConnection.onmessage = (event) => {
      const serverData = JSON.parse(event.data);
      console.log("data receiving from server: ", serverData);
      const serverDataArray = [];
      serverDataArray.push(serverData.message);
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
