const reservationController = require('./controller/reservationController');
const reservationService = require('./service/reservationService');
const reservationRepository = require('./repository/reservationRepository');
const reservationModel = require('./model/reservationModel');

function init(app, container) {
  container.get('reservationController').configureRoutes(app);
}

module.exports = {
  init,
  reservationRepository,
  reservationService,
  reservationController,
  reservationModel,
};
