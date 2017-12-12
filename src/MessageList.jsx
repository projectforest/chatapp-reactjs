import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return(
      <main className="messages">
        <Message/>
        {
           this.props.messages.map(chatObject => <Message index={chatObject.id} chatUsername= {chatObject.username} chatMessage={chatObject.content} />)
         }
        <div className="message system">
        </div>
      </main>
    );
  }
}

export default MessageList;