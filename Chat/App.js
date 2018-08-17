import React from 'react';
import { AppRegistry, Platform, StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from './src/Home';
import Chat from './src/Chat';

//AppRegistry.registerComponent('Home', () => App);

export default class App extends React.Component {
  
  render() {
    return (
      <Router>
          <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}>
              <Scene key='home' component={Home} title='Messenger'/>
              <Scene key='chat' component={Chat} title='Chat'/>
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
