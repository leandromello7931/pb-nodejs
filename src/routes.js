const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')


const UserController = require('./controller/UserController');
const CategoryController = require('./controller/CategoryController');
const ItemController = require('./controller/ItemController');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
  return res.json({hello: "World"});
});

routes.post('/users', UserController.store);
routes.post('/categories', CategoryController.store );
routes.post('/items', upload.single('image'), ItemController.store);

module.exports = routes; 