import React from 'react';
import { socket } from '../socket';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    socket.on('authSuccess', (user) => {
      this.props.onAuth(user);
    });
  }

  registrationUser(e) {
    e.preventDefault();
    socket.connect();
    if (this.state.name) {
      socket.emit('user', this.state);
    } else {
      alert('You must enter name!');
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main style={layout}>
          <Paper style={paper}>
            <Avatar style={avatar}>M</Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form style={form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Enter name...</InputLabel>
                <Input
                  onChange={(text) => this.setState({ name: text.target.value })}
                  value={this.state.name}
                  id="name"
                  name="name"
                  autoFocus={true} />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                style={submit}
                onClick={this.registrationUser.bind(this)}
                disabled={!this.state.name}>
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
};

let layout = {
  width: 'auto',
  marginLeft: 'auto',
  marginRight: 'auto',
  justifyContent: 'center',
  display: 'flex',
  height: '50vh',
};

let paper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 600,
  marginTop: 70,
};

let avatar = {
  marginTop: 25,
  backgroundColor: '#b5a4e9'
};

let submit = {
  marginTop: 30,
};

let form = {};

Home.defaultProps = {
  name: 'max',
};

Home.propTypes = {
  name: PropTypes.string,
}


/*
--PASSWORD SECTION

  < Text style = { styles.title } >
    Password :
        </Text >
  <input
    onChangeText={(text) => this.setState({ password: text })}
    value={this.state.password}
    secureTextEntry={true}
    style={styles.nameInput} placeholder='  Enter password...' />
------------------
<FormControl margin="normal" required fullWidth>
  <InputLabel htmlFor="password">Password</InputLabel>
  <Input
    name="password"
    type="password"
    id="password"
    autoComplete="current-password"
  />
</FormControl>
*/
