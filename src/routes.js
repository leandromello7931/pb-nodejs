const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')


const UserController = require('./controller/UserController');
const CategoryController = require('./controller/CategoryController');
const ItemController = require('./controller/ItemController');
const TableController = require('./controller/TableController');
const OrderController = require('./controller/OrderController');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
  return res.json({hello: "World"});
});

routes.post('/users/store', UserController.store);
routes.post('/users/index', UserController.index);
routes.post('/categories', CategoryController.store );
routes.post('/items', upload.single('image'), ItemController.store);
routes.post('/tables', TableController.store);
routes.get('/tables', TableController.index);
routes.post('/tables/:table_id/orders', OrderController.store);

module.exports = routes; 