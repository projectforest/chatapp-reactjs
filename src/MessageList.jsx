import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return(
      <main className="messages">
        <Message/>
        {
           this.props.messages.map((chatObj, index) => <Message index= {index} chatUsername= {chatObj.username} chatMessage={chatObj.content} />)
         }
        <div className="message system">
        </div>
      </main>
    );
  }
}

export default MessageList;