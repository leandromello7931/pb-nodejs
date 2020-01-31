const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const autoReap = require('multer-autoreap');
const dotenv = require('dotenv-safe');
const PORT = process.env.PORT || 3333;



require('./database');
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(autoReap);

app.use(routes);
app.listen(PORT);
