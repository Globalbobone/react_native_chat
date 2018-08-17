import React from 'react';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import { socket } from '../socket';
import { Keyboard, TextInput } from 'react-native';

export default class Chat extends React.Component {

  state = {
    message: '',
    messages: []
  };
  
  componentDidMount() {
    socket.on('message', this.addMessage.bind(this));
    socket.on('messages', (messages) => {
      this.setState({messages});
    });
    socket.emit('getHistory');
  }

  addMessage(message) {
    const messages = [...this.state.messages, message];
    this.setState({messages});
  }

  postMessage(e) {
    e.preventDefault();
    this.addMessage({
      message: this.state.message,
      author: this.props.user
    });
    socket.emit('message', this.state.message);
    this.setState({message: ''});
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello my friend!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.postMessage.bind(messages);
    //Keyboard.dismiss();
    socket.emit('message', this.state.message);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)} 
        user={{
          _id: 1,
          name: this.props.name,
        }}
      />
    )
  }
};

Chat.defaultProps = {
  name: '',
};

Chat.propTypes = {
  name: PropTypes.string,
}