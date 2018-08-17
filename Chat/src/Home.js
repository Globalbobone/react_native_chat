import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { socket } from '../socket';
//import SocketIOClient from 'socket.io-client';

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      //password: ''
    };
  }
  
  registrationUser(e) {
    e.preventDefault();
    socket.connect();
    if(this.state.name){
      socket.emit('user', this.state);
      alert (this.state.name);
    } else {
      alert('You must enter name!');
    }
  }
 
  render() {
    return (
      <View>
        <Text style={styles.title}>
          Name :
        </Text>
        <TextInput 
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
            style={styles.nameInput} placeholder='  Enter name...' />
        <View style={styles.button}>
          <Button 
            color='grey'
            onPress={() => {
              Actions.chat({
                name: this.state.name,
              });
            }}
            title='Sign in!' />
        </View>
        <Text onPress={()=> (alert('let`s create new account'))} style={styles.headline}>
          Create account >>>
        </Text>
        <View style={styles.button}>
          <Button onPress={this.registrationUser.bind(this)} color='red' title='TO DB >>>'/>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
  },
  nameInput: {
    height: 40,
    margin: 15,
  },
  button: {
    width: '90%', 
    margin: 10, 
    marginLeft: 15 
  },
  headline: {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
  }
});


/*  -- PASSWORD SECTION

<Text style={styles.title}>
          Password :
        </Text>
        <TextInput 
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            style={styles.nameInput} placeholder='  Enter password...' />

            */