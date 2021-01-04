const CarModel = require('../../src/modules/car/model/carModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    CarModel.setup(queryInterface.sequelize).sync({ forced: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cars');
  },
};
