const { DataTypes, Model } = require('sequelize');

class ReservationModel extends Model {
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
        totalPrice: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        pricePerDay: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        paymentMethod: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paid: {
          type: DataTypes.BOOLEAN,
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

  static setupAssociations(CarModel, UserModel) {
    CarModel.hasMany(ReservationModel, { foreignKey: 'carId' });
    ReservationModel.belongsTo(CarModel, { foreignKey: 'carId' });
    UserModel.hasMany(ReservationModel, { foreignKey: 'userId' });
    ReservationModel.belongsTo(UserModel, { foreignKey: 'userId' });

    return ReservationModel;
  }
}

module.exports = ReservationModel;
