const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const { conn } = require('./database/config');
const Routes = require('./routes/index');

conn();

app.use(morgan('dev')); 
app.use(express.json());

app.use('/api', Routes);

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
