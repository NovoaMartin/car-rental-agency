const { DataTypes, Model } = require('sequelize');
const CarModel = require('../../car/model/carModel');
const UserModel = require('../../user/model/userModel');

module.exports = class ReservationModel extends Model {
  static setup(sequelizeInstance) {
    ReservationModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        price: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Reservation',
        tableName: 'reservations',
        underscored: 'true',
      },
    );

    return ReservationModel;
  }

  static associations(CarModel, UserModel) {
    CarModel.hasMany(ReservationModel, { foreignKey: 'carId' });
    ReservationModel.belongsTo(CarModel, { foreignKey: carId });
    UserModel.hasMany(ReservationModel, { foreignKey: 'userId' });
    ReservationModel.belongsTo(UserModel, { foreignKey: 'userId' });

    return ReservationModel;
  }
};
