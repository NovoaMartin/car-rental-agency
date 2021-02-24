const CarModel = require('../../src/modules/car/model/carModel');
const UserModel = require('../../src/modules/user/model/userModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    CarModel.setup(queryInterface.sequelize).sync({ force: true });
    UserModel.setup(queryInterface.sequelize).sync({ force: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cars');
    await queryInterface.dropTable('users');
  },
};
