const { fromDataToEntity } = require('../mapper/reservationMapper');

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
    app.get(`${this.ROUTE}/edit/:id`, this.edit.bind(this));
    app.get(`${this.ROUTE}/delete/:id`, this.delete.bind(this));
    app.get(`${this.ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${this.ROUTE}/pay/:id`, this.setPaid.bind(this));
    app.post(`${this.ROUTE}/save`, this.save.bind(this));
  }

  async save(req, res) {
    const reservation = fromDataToEntity(req.body);
    const car = await this.carService.get(reservation.carId);
    await this.reservationService.save(reservation, car);
    res.redirect('/reservation/list');
  }

  async add(req, res) {
    const cars = await this.carService.getAll();
    const users = await this.userService.getAll();
    res.render(`${this.views}/add.njk`, { cars, users });
  }

  async edit(req, res) {
    const reservation = await this.reservationService.get(req.params.id);
    const cars = await this.carService.getAll();
    const users = await this.userService.getAll();
    res.render(`${this.views}/edit.njk`, {
      cars, users, reservation,
    });
  }

  async setPaid(req, res) {
    const reservation = await this.reservationService.get(req.params.id);
    reservation.paid = true;
    await this.reservationService.save(reservation);
    res.redirect('/reservation/list');
  }

  async view(req, res) {
    const reservation = await this.reservationService.get(req.params.id);
    res.render(`${this.views}/view.njk`, {
      reservation,
    });
  }

  async delete(req, res) {
    await this.reservationService.delete(req.params.id);
    res.redirect('/reservation/list');
  }

  async list(req, res) {
    const reservations = await this.reservationService.getAll();
    res.render(`${this.views}/list.njk`, { reservations });
  }
};
