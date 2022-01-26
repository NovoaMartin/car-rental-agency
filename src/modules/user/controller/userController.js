const { fromDataToEntity } = require('../mapper/userMapper');

module.exports = class UserController {
  constructor(userService) {
    this.userService = userService;
    this.ROUTE = '/user';
    this.views = 'user/views';
  }

  configureRoutes(app) {
    app.get(`${this.ROUTE}/add`, this.add.bind(this));
    app.get(`${this.ROUTE}/list`, this.list.bind(this));
    app.get(`${this.ROUTE}/delete/:id`, this.delete.bind(this));
    app.get(`${this.ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${this.ROUTE}/edit/:id`, this.edit.bind(this));
    app.post(`${this.ROUTE}/save`, this.save.bind(this));
  }

  async add(req, res) {
    res.render(`${this.views}/add.njk`);
  }

  async list(req, res) {
    const users = await this.userService.getAll();
    res.render(`${this.views}/list.njk`, { users });
  }

  async delete(req, res) {
    this.userService.delete(req.params.id);
    res.redirect(`${this.ROUTE}/list`);
  }

  async edit(req, res) {
    const user = await this.userService.get(req.params.id);
    res.render(`${this.views}/edit.njk`, { user });
  }

  async save(req, res) {
    const user = fromDataToEntity(req.body);
    await this.userService.save(user);

    res.redirect('/user/list');
  }

  async view(req, res) {
    const user = await this.userService.get(req.params.id);
    res.render(`${this.views}/view.njk`, { user });
  }
};
