module.exports = class ReservationController {
  constructor(reservationService) {
    this.reservationService = reservationService;
    this.ROUTE = '/reservation';
    this.views = 'reservation/views';
  }

  configureRoutes(app) {

  }
};
