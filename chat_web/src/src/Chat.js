import React from 'react';
import { socket } from '../socket';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
//import * as ReactDOM from 'react-dom';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    };
  }
  componentDidMount() {
    socket.on('message', this.addMessage.bind(this));
    socket.on('messages', (messages) => {
      this.setState({ messages });
    });
    socket.emit('getHistory');
  }

  addMessage(message) {
    const messages = [...this.state.messages, message];
    this.setState({ messages });
  }

  postMessage(e) {
    e.preventDefault();
    this.addMessage({
      message: this.state.message,
      author: this.props.user
    });
    socket.emit('message', this.state.message);
    this.setState({ message: '' });
  }

  getItems() {
    return this.state.messages.map((item, i) => {
      return (
        <li className={`chat msg ${this.props.user.name === item.author.name ? " right" : " left"}`} key={i}>
          <p className="name"><span>{item.author.name + ':  '}</span></p>
          <p className="message">{item.message}</p>
        </li>
      );
    })
  }
  componentDidUpdate(prevProps, prevState){
    this.scrollToBottom();
  }
  
  scrollToBottom() {
    const {thing} = this.refs;
    thing.scrollTop = thing.scrollHeight - thing.clientHeight;
  }
  render() {
    return (
      <div style={paper}>
        <div className="chatroom" ref={`thing`}>
          <h3>Hello,welcome to chat</h3>
          <ul className="chats" things={1} >
            {this.getItems()}
          </ul>
        </div>
        <form onSubmit={this.postMessage.bind(this)}>
          <Input type="text" placeholder="Enter your message..."
            ref="msg"
            style={input}
            value={this.state.message}
            onChange={(text) => this.setState({ message: text.target.value })} />
          <Button
            type="submit"
            variant="raised"
            color="primary">Send message
          </Button>
        </form>
      </div>
    )
  }
};

const input = {
  height: 40,
  margin: 15,
};

let paper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 600,
  margin: 'auto',
  marginTop: 10,
};