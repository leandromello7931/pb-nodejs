const { Model, DataTypes } = require('sequelize');

class Item extends Model{
  static init(sequelize){
    super.init({
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.BLOB,
      price: DataTypes.DECIMAL(13, 2),
      active: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'items'
    })
  }
}

module.exports = Item;