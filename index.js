const express = require('express');
const morgan = require('morgan');
const { conn } = require('./database/config');
const Routes = require('./routes/index');
const path = require('path');

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