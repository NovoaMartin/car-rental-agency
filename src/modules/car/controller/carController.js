const Car = require('../entity/Car');

module.exports = class CarController {
  constructor(carService) {
    this.carService = carService;
    this.ROUTE = '/car';
    this.views = 'car/views';
  }

  configureRoutes(app) {
    app.get('/', this.index.bind(this));
    app.get(`${this.ROUTE}/car`, this.list.bind(this));
    app.get(`${this.ROUTE}/delete/:id`, this.delete.bind(this));
  }

  async index(req, res) {
    res.render(`${this.views}/index.njk`, {
      title: 'Test',
    });
  }

  async list(req, res) {
    const cars = await this.carService.getAll();
  }

  async delete(req, res) {
    this.carService.delete(req.params.id);
  }
};
