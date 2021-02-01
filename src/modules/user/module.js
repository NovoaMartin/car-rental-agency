const userController = require('./controller/userController');
const userService = require('./service/userService');
const userRepository = require('./repository/userRepository');
const userModel = require('./model/userModel');

function init(app, container) {
  container.get('userController').configureRoutes(app);
}

module.exports = {
  init,
  userController,
  userService,
  userRepository,
  userModel,
};
