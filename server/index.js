const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
var jwtAuth = require('socketio-jwt-auth');
var mysql = require('mysql2');
var socketioJwt = require('socketio-jwt')

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'mc1982118',
    database: 'userChat',
    debug:   false
})

app.use(cors());
// io.sockets
//   .on('connection', socketioJwt.authorize({
//     secret: 'your secret or public key',
//     timeout: 15000 // 15 seconds to send the authentication message
//   }))
//   .on('authenticated', (socket) => {
    //this socket is authenticated, we are good to handle more events from it.
  //   console.log(`hello! ${socket.decoded_token.name}`);
  // });

// io.use(jwtAuth.authenticate({
//   secret: 'Your Secret',   
//   algorithm: 'HS256'        
// }, function(payload, done) {
//   User.findOne({id: payload.sub}, function(err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (!user) {
//       return done(null, false, 'user does not exist');
//     }
//     return done(null, user);
//   });
// }));

io.on('connect', (socket) => {
  // console.log('Authentication passed!');
  // socket.emit('success', {
  //   message: 'success logged in!',
  //   user: socket.request.user
  // });
  socket.on('join', ({ name }, callback) => {
    const user = name
    // const user = newUser({ id: socket.id, name });
    // if (error) return callback(error);
    socket.join(user);
    socket.emit('message', { user: 'admin', text: `${user}, welcome!!` });
    socket.broadcast.to(user).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    pool.query("INSERT INTO usersList (name) VALUES ('" + name + "')", function (err, data) {
      if (err) return console.log(err);
    });
    // pool.query("SELECT messages FROM usersList", function (req, res) {
    //   io.emit('message', { 
    //     text: res.messages
    //   });
    //   console.log(res)
    // })
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    console.log("Client says", message);
    const user = socket.id;
    console.log(user)
    pool.query("INSERT INTO usersList (messages) VALUES ('" + message + "')", function (err, result) {
      io.emit('message', {
        text: message
      });
      if (err) return console.log(err);
    });
    callback();
  });
  socket.on('disconnect', () => {
    const user = socket.id;
    if(user) {
      io.to(user).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    }
  })


});
server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));

