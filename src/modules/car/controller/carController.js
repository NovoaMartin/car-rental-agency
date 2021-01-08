const Car = require('../entity/Car');

module.exports = class CarController {
  constructor(carService) {
    this.carService = carService;
    this.ROUTE = '/car';
    this.views = 'car/views';
  }

  configureRoutes(app) {
    app.get('/', this.index.bind(this));
    app.get(`${this.ROUTE}/list`, this.list.bind(this));
    app.get(`${this.ROUTE}/delete/:id`, this.delete.bind(this));
    app.get('/testadd', this.testadd.bind(this));
  }

  async index(req, res) {
    res.render(`${this.views}/index.njk`, {
      title: 'Test',
    });
  }

  async list(req, res) {
    const cars = await this.carService.getAll();
    console.log(cars);

    res.render(`${this.views}/list.njk`, { cars });
  }

  async delete(req, res) {
    this.carService.delete(req.params.id);
  }

  async testadd(req, res) {
    const car = new Car(null, 'brand', 'model', 2000, 2, 'color', true, 5, true, 42, 'asd');
    this.carService.carRepository.save(car);
  }
};
