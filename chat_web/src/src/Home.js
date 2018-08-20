import React from 'react';
//import { Button } from 'react-bootstrap';
import { socket } from '../socket';
import PropTypes from 'prop-types';

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      //password: ''
    };
  }

  componentDidMount() {
    socket.on('authSuccess', (user)=>{
      this.props.onAuth(user);
    });
  }

  registrationUser(e) {
    e.preventDefault();
    socket.connect();
    if(this.state.name){
      socket.emit('user', this.state);
    } else {
      alert('You must enter name!');
    }
  }
 
  render() {
    return (
      <div>
        <p style={title}>
          Name :
        </p>
        <input 
            style={input}
            onChange={(text) => this.setState({name: text.target.value})}
            value={this.state.name}
            autoFocus={true}
            placeholder='  Enter name...' />
          <div>
            <button onClick={this.registrationUser.bind(this)}> 
            Sign in!</button>
          </div>
        <p onClick={()=> (alert('let`s create new account'))} style={headline}>
          Create account >>>  
        </p>
      </div>
    )
  }
};

const title = {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
  };

const input = {
  height: 40,
  margin: 15,
};

const headline = {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  };

  Home.defaultProps = {
    name: 'max',
  };
  
  Home.propTypes = {
    name: PropTypes.string,
  }

/*  -- PASSWORD SECTION

<Text style={styles.title}>
          Password :
        </Text>
        <input 
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            style={styles.nameInput} placeholder='  Enter password...' />

            */