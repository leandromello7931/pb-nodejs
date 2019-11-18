const { Model, DataTypes } = require('sequelize');

class Table extends Model{
  static init(sequelize){
    super.init({
      identification: DataTypes.STRING,
      code: DataTypes.STRING,
      observation: DataTypes.TEXT,
      active: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'tables'
    })
  }

  static associate(models){
    this.hasMany(models.Order, { foreignKey: 'table_id' });
  }

}

module.exports = Table;