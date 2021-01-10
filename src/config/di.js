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

function setupCarModule(container) {
  return carModel.setup(container.get('sequelize'));
}

function addCarModuleDefinitions(container) {
  container.addDefinitions({
    carController: object(carController).construct(get('carService'), get('Multer')),
    carService: object(carService).construct(get('carRepository')),
    carRepository: object(carRepository).construct(get('carModel')),
    carModel: factory(setupCarModule),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  return container;
};
