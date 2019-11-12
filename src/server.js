const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const autoReap = require('multer-autoreap');

require('./database');

app.use(express.json());
app.use(cors());
app.use(autoReap);

app.use(routes);
app.listen(3333);
