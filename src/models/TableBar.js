const { Model, DataTypes } = require('sequelize');

class TableBar extends Model{
  static init(sequelize){
    super.init({
      identification: DataTypes.STRING,
      code: DataTypes.STRING,
      observation: DataTypes.TEXT,
      active: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'tablesBar'
    })
  }
}

module.exports = TableBar;