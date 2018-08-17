const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.set('transports', ['websocket']);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("BD open");
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
});

const MessageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);
const Message = mongoose.model('Message', MessageSchema);

io.on('connection', function (socket) {
  console.log('---------socket connect----------');

  socket.on('message', function (message) {
    const msg = new Message({message, author: socket.user});
    msg.save((err, message) => {
      if (err) {
        return console.error(err);
      }
      Message.findOne({_id: message._id}).populate('author').exec((err, message)=> {
        if(err){
          return console.error(err);
        }
        socket.broadcast.emit('message', message);
      });

    });
  });

  socket.on('user', function (user) {
    User.findOne({name: user.name}, (err, u)=>{
      if(err || !u){
        const newUser = new User(user);
        return newUser.save((err, user) => {
          if (err) {
            return console.error(err);
          }
          socket.user = user;
          socket.emit('authSuccess', socket.user);
        });
      }
      socket.user = u;
      socket.emit('authSuccess', socket.user);
    });
  });

  socket.on('getHistory', () => {
    Message.find({}).populate('author').exec((err, messages) => {
      if (err) {
        return console.error(err);
      }
      socket.emit('messages', messages);
    });
  });


});

app.get('/', (req, res, next) => {
  res.send({msg: 'Testing'});
});

http.listen(3000, () => console.log('Server port http://localhost:3000/'));
