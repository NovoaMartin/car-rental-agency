const { DataTypes, Model } = require('sequelize');

module.exports = class carModel extends Model {
  /**
   *
   * @param sequelizeInstance
   */
  static setup(sequelizeInstance) {
    carModel.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      docType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      docNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'User',
      tableName: 'users',
      underscored: 'true',
    });
    return carModel;
  }
};
