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

  static associate(models){
    this.belongsTo(models.Table, { foreignKey: 'table_id'});
  }
}

module.exports = Order;