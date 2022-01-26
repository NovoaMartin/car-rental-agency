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

    return this;
  }

  static setupAssociations(CarModel, UserModel) {
    CarModel.hasMany(this, { foreignKey: 'carId', onDelete: 'CASCADE' });
    this.belongsTo(CarModel, { foreignKey: 'carId' });
    UserModel.hasMany(this, { foreignKey: 'userId', onDelete: 'CASCADE' });
    this.belongsTo(UserModel, { foreignKey: 'userId' });

    return ReservationModel;
  }
}

module.exports = ReservationModel;
