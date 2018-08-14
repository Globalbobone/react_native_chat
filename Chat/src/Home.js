import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';



export default class Home extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>
          Name :
        </Text>
        <TextInput style={styles.nameInput} placeholder='Enter name...' />
        <Text style={styles.title}>
          Password :
        </Text>
        <TextInput style={styles.nameInput} placeholder='Enter password...' />
        <Button style={{width: 250}} key='btn' color='black'
            onPress={() => {
              Alert.alert('You tapped the button!');
            }} title='Sign in!'/>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameInput: {
    height: 40,
    margin: 20,
    marginLeft: 25,
  },
});
