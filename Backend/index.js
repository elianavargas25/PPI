const express= require('express');
const cors = require('cors');
const app = express();

const  {config } = require('./config/index');

const usersApi = require('./routes/users');
const ingresosApi = require('./routes/ingresos');

//body-parser
app.use(express.json());
app.use(cors());

//routes
usersApi(app);
ingresosApi(app);

app.listen(config.port, ()=> {
    console.log(`Escuchando por el puerto http://localhost:${config.port}`);
})