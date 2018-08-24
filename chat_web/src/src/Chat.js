import React, {Fragment} from 'react';
import { socket } from '../socket';

//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
//import CssBaseline from '@material-ui/core/CssBaseline';
//import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
//import InputLabel from '@material-ui/core/InputLabel';
//import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
//import Typography from '@material-ui/core/Typography';
//import withStyles from '@material-ui/core/styles/withStyles';

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
        <Fragment>
          <li className="chat chats" key={i}>
            <p>{item.author.name + ': ' + item.message}</p>
          </li>
        </Fragment>
      );
    })
  }

  render() {
    return (
      <div style={paper}>
        <h3>Hello, welcome to chat</h3>
        <Paper style={paper}>
          <ol className="chatroom">
            {this.getItems()}
          </ol>
        </Paper>
        <form onSubmit={this.postMessage.bind(this)}>
          <Input type="text" placeholder="Enter your message..."
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
};