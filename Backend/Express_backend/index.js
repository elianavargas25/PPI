const express= require('express');
const app= express();

const moviesApi = require('./routes/users');
app.use(express.json);
moviesApi(app);

const  {config } = require('./config/index');
app.get('/', (req, res)=>{
    res.send("Hello word !");
});

app.listen(config.port, ()=> {
    console.log(`Escuchando por el puerto http://localhost:${config.port}`);
})