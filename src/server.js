const express = require('express');
const routes = require('./routes');

const cors = require('cors');
const autoReap = require('multer-autoreap');
const dotenv = require('dotenv-safe');
const PORT = process.env.PORT || 3333;
require('./database');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use(cors());

app.use(( req, res, next ) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if(req.method == 'OPTIONS'){
    return res.sendStatus(200);
  }
  next();
});

dotenv.config();

app.use(autoReap);

app.use(routes);
app.listen(PORT);
