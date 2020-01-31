const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const auth = require('./services/auth');
const cors = require('cors');

const UserController = require('./controller/UserController');
const CategoryController = require('./controller/CategoryController');
const ItemController = require('./controller/ItemController');
const TableController = require('./controller/TableController');
const OrderController = require('./controller/OrderController');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.post('/users/index', cors(), UserController.index);


// routes.post('/users/store', auth.verifyJWT, (req, res, next) => {UserController.store(req, res, next)});
// routes.post('/categories', auth.verifyJWT, (req, res, next) => {CategoryController.store(req, res, next)});
// routes.post('/items', upload.single('image'), ItemController.store);
// routes.post('/tables', TableController.store);
// routes.get('/tables', TableController.index);
// routes.post('/tables/:table_id/orders', OrderController.store);

module.exports = routes; 