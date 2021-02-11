module.exports = class ReservationController {
  constructor(reservationService, carService, userService) {
    this.reservationService = reservationService;
    this.userService = userService;
    this.carService = carService;
    this.ROUTE = '/reservation';
    this.views = 'reservation/views';
  }

  configureRoutes(app) {
    app.get(`${this.ROUTE}/list`, this.list.bind(this));
    app.get(`${this.ROUTE}/add`, this.add.bind(this));
  }

  async add(req, res) {
    const cars = await this.carService.getAll();
    const users = await this.userService.getAll();
    res.render(`${this.views}/add.njk`, { cars, users });
  }

  async list(req, res) {
    const reservations = await this.reservationService.getAll();
    res.render(`${this.views}/list.njk`, { reservations });
  }
};
