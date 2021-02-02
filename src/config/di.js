const path = require('path');
// const fs = require('fs');
const multer = require('multer');
const { Sequelize } = require('sequelize');

const {
  default: DIContainer, object, get, factory,
} = require('rsdi');

const {
  carController, carService, carRepository, carModel,
} = require('../modules/car/module');

const {
  userController, userService, userRepository, userModel,
} = require('../modules/user/module');

const {
  reservationController, reservationService, reservationRepository, reservationModel,
} = require('../modules/reservation/module');

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.IMG_UPLOAD_DIR);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  return multer({ storage });
}

function configureSequelize() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
}

function addCommonDefinitions(container) {
  container.addDefinitions({
    sequelize: factory(configureSequelize),
    Multer: factory(configureMulter),
  });
}

function setupCarModel(container) {
  return carModel.setup(container.get('sequelize'));
}

function setupUserModel(container) {
  return userModel.setup(container.get('sequelize'));
}

function setupReservationModel(container) {
  const model = reservationModel.setup(container.get('sequelize'));
  model.setupAssociations(carModel, userModel);
  return model;
}

function addCarModuleDefinitions(container) {
  container.addDefinitions({
    carController: object(carController).construct(get('carService'), get('Multer')),
    carService: object(carService).construct(get('carRepository')),
    carRepository: object(carRepository).construct(get('carModel')),
    carModel: factory(setupCarModel),
  });
}

function addUserModuleDefinitions(container) {
  container.addDefinitions({
    userController: object(userController).construct(get('userService')),
    userService: object(userService).construct(get('userRepository')),
    userRepository: object(userRepository).construct(get('userModel')),
    userModel: factory(setupUserModel),
  });
}

function addReservationModuleDefinitions(container) {
  container.addDefinitions({
    reservationController: object(reservationController).construct(get('reservationService')),
    reservationService: object(reservationService).construct(get('reservationRepository')),
    reservationRepository: object(reservationRepository).construct(get('reservationModel')),
    reservationModel: factory(setupReservationModel),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  addUserModuleDefinitions(container);
  addReservationModuleDefinitions(container);
  return container;
};
