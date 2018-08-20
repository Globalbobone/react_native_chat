import React from 'react';
import { socket } from '../socket';

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
    console.log(this.state.messages)
    return this.state.messages.map((item, i) => {
      return (
        <li className="msg other" key={i}>
          <p>{item.author.name + ': ' + item.message}</p>
        </li>
      );
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, welcome to chat</h1>
        <ol className="chat">
          {this.getItems()}
        </ol>
        <form onSubmit={this.postMessage.bind(this)}>
          <input type="text" placeholder="Enter your message..."
            style={input}
            value={this.state.message}
            onChange={(text) => this.setState({ message: text.target.value })} />
          <button>Send message</button>
        </form>
      </div>
    )
  }
};

const input = {
  height: 40,
  margin: 15,
};