const carController = require('./controller/carController');
const carService = require('./service/carService');
const carRepository = require('./repository/carRespository');

function init(app, container) {
  container.get('carController').configureRoutes(app);
}

module.exports = {
  init,
  carController,
  carService,
  carRepository,
};
