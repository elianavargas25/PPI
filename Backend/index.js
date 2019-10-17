const express= require('express');
const app= express();
const  {config } = require('./config/index');

app.use(express.json);

app.listen(config.port, ()=> {
    console.log(`Escuchando por el puerto http://localhost:${config.port}`);
})