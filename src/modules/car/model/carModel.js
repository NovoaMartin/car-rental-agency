const { DataTypes, Model } = require('sequelize');

module.exports = class carModel extends Model {
  /**
   *
   * @param {import('sequelize').Sequelize} sequelizeInstance
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
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airConditioner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      passengerMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      automatic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'Car',
      tableName: 'cars',
      underscored: 'true',
    });
    return carModel;
  }
};
