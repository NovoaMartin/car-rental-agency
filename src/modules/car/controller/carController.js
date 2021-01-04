module.exports = class CarController {
  constructor(carService) {
    this.carService = carService;
    this.ROUTE = '/car';
    this.views = 'car/views';
  }

  configureRoutes(app) {
    app.get('/', this.index.bind(this));
  }

  async index(req, res) {
    res.render(`${this.views}/index.njk`, {
      title: 'Test',
    });
  }
};
