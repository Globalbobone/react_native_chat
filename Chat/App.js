import React from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from './src/Home';
import Chat from './src/Chat';

//AppRegistry.registerComponent('ChatApp', () => App);

export default class App extends React.Component {
  render() {
    return (
      <Router>
          <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}>
              <Scene key='Home' component={Home} title='Messenger'/>
              <Scene key='Chat' component={Chat} title='Chat'/>
          </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
