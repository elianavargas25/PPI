const express= require('express');
const cors = require('cors');
const app = express();

const  {config } = require('./config/index');

const usersApi = require('./routes/users');
const ingresosApi = require('./routes/ingresos');
const egresosApi = require('./routes/egresos');
//body-parser
app.use(express.json());
app.use(cors());

//routes
usersApi(app);
ingresosApi(app);
egresosApi(app);

app.listen(config.port, ()=> {
    console.log(`Escuchando por el puerto http://localhost:${config.port}`);
})