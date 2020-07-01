const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const morgan = require('morgan');

const { config } = require('./config/index');

const usersApi = require('./routes/users');
const ingresosApi = require('./routes/ingresos');
const sesionApi = require('./routes/sesion');
const cambio = require('./routes/cambio');
const categoria = require('./routes/categorias');
const egresosApi = require('./routes/egresos');
const tipoApi = require('./routes/tipo');
//body-parser
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
//app.user(express.urlencoded({extended: false}));

//routes
usersApi(app);
ingresosApi(app);
sesionApi(app);
egresosApi(app);
cambio(app);
categoria(app);
tipoApi(app)

app.listen(config.port, () => {
    console.log(`Escuchando por el puerto http://localhost:${config.port}`);
})