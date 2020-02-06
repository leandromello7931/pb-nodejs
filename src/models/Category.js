const { Model, DataTypes } = require('sequelize');

class Category extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      image: DataTypes.BLOB
    },{
      sequelize,
      tableName: 'categories'
    })
  }

  static associate(models){
    this.belongsToMany(models.Items)
  }
}

module.exports = Category;