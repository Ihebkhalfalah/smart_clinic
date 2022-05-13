const detenv=require('dotenv');
const express=require('express');
const bodyParser = require('body-parser');
const path =require('path');
const cors =require('cors');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('./Routers/user')
const message=require('./Routers/message')
const model=require('./Routers/model')
  const auth =require('./auth/auth')  
const app = express();
const mongoose=require('mongoose');
const { nextTick } = require('process');
var corsOptions = {
  origin: ['http://localhost:3000','http://localhost:3002'],
  optionsSuccessStatus: 200 ,// some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true 
}
mongoose.connect('mongodb://127.0.0.1:27017/Iheb',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error));
app.use(cors(corsOptions));
  app.use(bodyParser.json())
 
app.use('/user',User)
app.use('/message',message)
app.use('/model',model)
module.exports = app;