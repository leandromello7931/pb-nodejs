const express = require('express');
const routes = require('./routes');

const cors = require('cors');
const autoReap = require('multer-autoreap');
const dotenv = require('dotenv-safe');
const PORT = process.env.PORT || 3333;
const UserController = require('./controller/UserController');

require('./database');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use(cors({
  exposeHeaders: ['x-access-token'],
}));

app.options('*', function(req, res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
});

dotenv.config();

app.use(autoReap);
app.post('/users/index', UserController.index);
app.use(routes);
app.listen(PORT);
