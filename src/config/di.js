// const path = require('path');
// const fs = require('fs');
const { Sequelize } = require('sequelize');

const {
  default: DIContainer, object, get, factory,
} = require('rsdi');

const { carController, carService, carRepository } = require('../modules/car/module');

function configureSequelize() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env['DB_PATH '],
  });
}

function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureSequelize),
  });
}

function addCarModuleDefinitions(container) {
  container.addDefinitions({
    carController: object(carController).construct(get('carService')),
    carService: object(carService).construct(get('carRepository')),
    carRepository: object(carRepository).construct(),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCarModuleDefinitions(container);
  return container;
};
