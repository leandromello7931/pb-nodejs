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
dotenv.config();

app.use(autoReap);

app.use(routes);
app.listen(PORT);
