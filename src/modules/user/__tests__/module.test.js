const { init } = require('../module');

const app = jest.fn();

const controller = {
  configureRoutes: jest.fn(),
};

const container = {
  get: jest.fn(() => controller),
};

test('User module is initialized correctly', () => {
  init(app, container);

  expect(container.get).toHaveBeenCalledTimes(1);
  expect(container.get).toHaveBeenCalledWith('userController');

  expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
  expect(controller.configureRoutes).toHaveBeenCalledWith(app);
});
