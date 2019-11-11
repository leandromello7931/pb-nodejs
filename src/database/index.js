const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Category = require('../models/Category');

const connection = new Sequelize(dbConfig);

User.init(connection);
Category.init(connection);

module.exports = connection;