import React, {Component} from 'react';

class Message extends Component {
  render(){
    return(
      <div className="message" key={this.props.index}>
         <span className="message-username">{this.props.chatUsername}</span>
         <span className="message-content">{this.props.chatMessage}</span>
      </div>
    );
  }
}

export default Message;