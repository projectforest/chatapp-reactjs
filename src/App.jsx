import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const chatData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
   {
     username: "Bob",
     content: "123"
   },
   { 
     username: "deadpool",
     content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
   }
  ]
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = chatData;
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">ChatApp</a>
        </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
