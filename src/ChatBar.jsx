import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props){
    super()
    this.state = {usename: props.currentUser.name, content: ''}

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleContentSubmit = this.handleContentSubmit.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handleNameSubmit = (event) => {
    if(event.key === "Enter") {
      this.props.currentUser(this.state);
      this.setState({username: event.target.value});
    }
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value});
  }

  handleContentSubmit = (event) => {
    if(event.key === "Enter") {
      this.props.handleInputMessage(this.state);
      this.setState({content: ''});
    }
  }

  render(){
    console.log('chatbar this.props', this.props);
    return(
      <footer className="chatbar">
        <input className="chatbar-username" type="text" value={this.state.username} onChange={this.handleNameChange} onKeyPress={this.handleNameSubmit}/>
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.handleContentChange} onKeyPress={this.handleContentSubmit}/>
      </footer>
    );
  }
}

export default ChatBar;