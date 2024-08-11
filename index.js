const express = require('express');
const morgan = require('morgan');
const { conn } = require('./database/config');
const Routes = require('./routes/index');
const path = require('path');
const { Server } = require('socket.io'); 
const { createServer } = require('node:http'); 

const app = express();
const port = process.env.PORT || 3000;

conn();

app.use(morgan('dev'));
app.use('/api/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', Routes);

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Connected to socket.io');
  socket.on('setup', (userData) => {
  //console.log(userData);

    socket.emit('connected');
  });
  
  socket.on('join chat', (room) => {
    socket.join(room);
  });

  socket.on('new message', async (newMessageRecieved) => {

  })
  socket.emit('message received', 
    // updatedChat.messages
    );
    socket.off('setup', () => {
      //console.log('USER DISCONNECTED');
      // socket.leave(userData._id);
    });
});