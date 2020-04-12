const { Model, DataTypes } = require('sequelize');

class Category extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      image: DataTypes.STRING
    },{
      sequelize,
      tableName: 'categories'
    })
  }
}

module.exports = Category;