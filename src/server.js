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
app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Set to true if you need the website to include cookies in the requests sent
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});



app.use(autoReap);

app.use(routes);
app.listen(PORT);
