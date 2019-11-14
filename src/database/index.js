const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Category = require('../models/Category');
const Items = require('../models/Items');
const TableBar = require('../models/TableBar');

const connection = new Sequelize(dbConfig);

User.init(connection);
Category.init(connection);
Items.init(connection);
TableBar.init(connection);
Order.init(connection);

module.exports = connection;