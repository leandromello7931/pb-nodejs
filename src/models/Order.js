const { Model, DataTypes } = require('sequelize');

class Order extends Model{
  static init(sequelize){
    super.init({
      total: DataTypes.DECIMAL(13, 2),
      status: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'orders'
    })
  }
}

module.exports = Order;