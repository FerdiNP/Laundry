'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // outlet to transaksi
      // outlet ke user
      this.belongsTo(models.user,{
        foreignKey: "id_user",
        as: "user"
      })
    }
  };
  outlet.init({
    id_outlet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    tempat: DataTypes.STRING,
    alamat: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet'
  });
  return outlet;
};
