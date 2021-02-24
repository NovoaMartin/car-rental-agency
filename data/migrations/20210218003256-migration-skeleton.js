const CarModel = require('../../src/modules/car/model/carModel');
const UserModel = require('../../src/modules/user/model/userModel');
const ReservationModel = require('../../src/modules/reservation/model/reservationModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    CarModel.setup(queryInterface.sequelize).sync({ force: true });
    UserModel.setup(queryInterface.sequelize).sync({ force: true });
    ReservationModel.setup(queryInterface.sequelize).setupAssociations(CarModel, UserModel).sync({ forced: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cars');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('reservations');
  },
};
