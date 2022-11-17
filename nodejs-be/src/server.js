require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const mongoose = require('mongoose');
// const session = require('express-session');

const app = express();
const port = process.env.PORT || 8000;

const http = require('http').createServer(app);

const socketIo = require('socket.io');

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

http.listen(port);

app.set('socketio', io);

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => {
    console.log('All good, connection good');
  })
  .catch((e) => {
    console.log('Error:', e);
  });

// Middleware

// app.use(
//   session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
app.use(morgan('dev'));

// Routes

io.on('connect', (socket) => {
  socket.on('', (data) => {
    console.log('Data ==> ', data);
  });
});
