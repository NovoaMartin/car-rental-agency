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
    app.get('/', this.list.bind(this));
    app.get(`${this.ROUTE}/add`, this.add.bind(this));
    app.get(`${this.ROUTE}/list`, this.list.bind(this));
    app.get(`${this.ROUTE}/delete/:id`, this.delete.bind(this));
    app.get(`${this.ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${this.ROUTE}/edit/:id`, this.edit.bind(this));
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
    res.redirect(`${this.ROUTE}/list`);
  }

  async edit(req, res) {
    const car = await this.carService.get(req.params.id);
    res.render(`${this.views}/edit.njk`, { car });
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

  async view(req, res) {
    const car = await this.carService.get(req.params.id);
    res.render(`${this.views}/view.njk`, { car });
  }
};
