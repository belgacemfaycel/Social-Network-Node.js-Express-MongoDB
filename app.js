const express = require('express');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use((req,res,next)=>{
    console.log('Requete reçu');
    next();
});
 
 app.use(bodyParser.json());
 app.use('/api/auth',userRoutes);
module.exports = app;