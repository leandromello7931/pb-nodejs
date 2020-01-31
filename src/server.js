const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const autoReap = require('multer-autoreap');
const dotenv = require('dotenv-safe');
const PORT = process.env.PORT || 3333;
require('./database');

const whitelist = ['http:/localhost:3333', 'https://backend-pb.herokuapp.com/', 'http://localhost:3000'];
const corsOptions = {
  origin: function(origin, callback){
    if (whitelist.indexOf(origin) !== -1){
      callback(null, true);
    }else{
      callback(new Error('Not allowed by CORS'));
    }
  }
}

dotenv.config();

app.use((req, res) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  req.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(autoReap);

app.use(routes);
app.listen(PORT);
