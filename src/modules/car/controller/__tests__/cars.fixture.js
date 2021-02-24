const Car = require('../../entity/Car');

module.exports = function createCar(id) {
  return new Car(
    id,
    'Volkswagen',
    'Gol',
    '2020',
    '50000',
    'Red',
    '1',
    '5',
    '1',
    '500',
    'public\\img\\default.jpg',
    undefined,
    undefined,
  );

}
