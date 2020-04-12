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

//User routes
routes.post('/users/login', (req, res, next) => {UserController.login(req, res, next)});
routes.post('/users/store', UserController.store);
// routes.post('/users/store', auth.verifyJWT, (req, res, next) => {UserController.store(req, res, next)});

//Categories routes
routes.get('/categories', auth.verifyJWT, (req, res, next) => {CategoryController.index(req, res, next)});
routes.post('/categories', upload.single('image'), auth.verifyJWT, (req, res, next) => {CategoryController.store(req, res, next)});
routes.put('/categories/:id', upload.single('image'), auth.verifyJWT, (req, res, next)=> {CategoryController.update(req, res, next)});
routes.delete('/categories/:id', auth.verifyJWT, (req, res, next) => {CategoryController.delete(req, res, next)})

//Items routes
routes.get('/items',  auth.verifyJWT, (req, res, next) => {ItemController.index(req, res, next)});
routes.post('/items', upload.single('image'), auth.verifyJWT, (req, res, next) => {ItemController.store(req, res, next)});
routes.put('/items/:id', upload.single('image'), auth.verifyJWT, (req, res, next)=> {ItemController.update(req, res, next)});
routes.delete('/items/:id', auth.verifyJWT, (req, res, next) => {ItemController.delete(req, res, next)});
routes.get('/categories/:id/items', auth.verifyJWT, (req, res, next) => {ItemController.itemsWithCategory (req, res, next)});
routes.post('/categories/:id/items', upload.single('image'), auth.verifyJWT, (req, res, next) => {ItemController.storeWithinCategory(req, res, next)});
routes.post('/categories/:id/items/associate', auth.verifyJWT, (req, res, next) => {ItemController.associateItemWithCategory(req, res, next)})
routes.post('/categories/:id/items/disassociate', auth.verifyJWT, (req, res, next) => {ItemController.disassociateAnItemFromACategory(req, res, next)})


routes.post('/tables', TableController.store);
routes.get('/tables', TableController.index);
routes.post('/tables/:table_id/orders', OrderController.store);

module.exports = routes; 