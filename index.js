const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const { conn } = require('./database/config');
const Routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

conn();

app.use(morgan('dev'));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});

const upload = multer({ storage: storage });

// Rutas
app.use('/api', Routes);

app.post('/upload', upload.single('avatar'), (req, res) => {
  if (req.file) {
    res.send('Archivo subido exitosamente');
  } else {
    res.status(400).send('No se ha subido ningún archivo');
  }
});

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
