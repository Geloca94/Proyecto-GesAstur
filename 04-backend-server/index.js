require('dotenv').config();
const express = require('express');
const cors = require('cors')


const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// Configurar COORS 
app.use(cors());

//Carpeta publica
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());



// Base de datos
dbConnection();




// Rutas
app.use('/api/administradores', require('./routes/administradores'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/enfemeros', require('./routes/enfermeros'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploades'));
app.use('/api/incidencias', require('./routes/incidencias'));
app.use('/api/citas', require('./routes/citas'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});