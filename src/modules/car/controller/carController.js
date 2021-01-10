const Car = require('../entity/Car');
const { fromDataToEntity } = require('../mapper/carMapper');

module.exports = class CarController {
  constructor(carService, uploadMiddleware) {
    this.carService = carService;
    this.uploadMiddleware = uploadMiddleware;
    this.ROUTE = '/car';
    this.views = 'car/views';
  }

  configureRoutes(app) {
    app.get('/', this.index.bind(this));
    app.get(`${this.ROUTE}/add`, this.add.bind(this));
    app.get(`${this.ROUTE}/list`, this.list.bind(this));
    app.get(`${this.ROUTE}/delete/:id`, this.delete.bind(this));
    app.get('/testadd', this.testadd.bind(this));
    app.post(`${this.ROUTE}/save`, this.uploadMiddleware.single('img'), this.save.bind(this));
  }

  async index(req, res) {
    res.render(`${this.views}/index.njk`, {
      title: 'Test',
    });
  }

  async add(req, res) {
    res.render(`${this.views}/add.njk`);
  }

  async list(req, res) {
    const cars = await this.carService.getAll();
    res.render(`${this.views}/list.njk`, { cars });
  }

  async delete(req, res) {
    this.carService.delete(req.params.id);
  }

  async save(req, res) {
    try {
      const car = fromDataToEntity(req.body);
      if (req.file) {
        const { path } = req.file;
        car.img = path;
      }
      await this.carService.save(car);
    } catch (e) {
    }
    res.redirect('/car/list');
  }

  async testadd(req, res) {
    const car = new Car(null, 'brand', 'model', 2000, 2, 'color', true, 5, true, 42, 'asd');
    this.carService.carRepository.save(car);
  }
};
