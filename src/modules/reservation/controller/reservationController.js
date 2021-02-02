module.exports = class ReservationController {
  constructor(reservationService) {
    this.reservationService = reservationService;
    this.ROUTE = '/reservation';
    this.views = 'reservation/views';
  }

  configureRoutes(app) {
    app.get(`${this.ROUTE}/list`, this.list.bind(this));
  }

  async list(req, res) {
    const reservations = await this.reservationService.getAll();
    res.render(`${this.views}/list.njk`, { reservations });
  }
};
