import React, { Component } from 'react';
import './App.css';
import Home from './src/Home';
import Chat from './src/Chat';

class App extends Component {
  state = {
    auth: false,
    user: null
  };

  onAuth(user) {
    this.setState({ auth: true, user: user });
  }

  render() {
    const { auth } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Messenger</h1>
        </header>
        <div>
          {auth ? <Chat user={this.state.user} /> : <Home onAuth={this.onAuth.bind(this)} />}
        </div>
      </div>
    );
  }
}

export default App;
