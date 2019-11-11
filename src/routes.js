const express = require('express');
const UserController = require('./controller/UserController');
const CategoryController = require('./controller/CategoryController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({hello: "World"});
});

routes.post('/users', UserController.store);
routes.post('/categories', CategoryController.store );

module.exports = routes; 