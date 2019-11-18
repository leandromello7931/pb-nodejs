const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Category = require('../models/Category');
const Items = require('../models/Items');
const Table = require('../models/Table');
const Order = require('../models/Order');

const connection = new Sequelize(dbConfig);

User.init(connection);
Category.init(connection);
Items.init(connection);
Table.init(connection);
Order.init(connection);

Order.associate(connection.models);
Table.associate(connection.models);
module.exports = connection;