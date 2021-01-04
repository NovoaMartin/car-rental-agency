const carController = require('./controller/carController');
const carService = require('./service/carService');
const carRepository = require('./repository/carRespository');
const carModel = require('./model/carModel');

function init(app, container) {
  container.get('carController').configureRoutes(app);
}

module.exports = {
  init,
  carController,
  carService,
  carRepository,
  carModel,
};
