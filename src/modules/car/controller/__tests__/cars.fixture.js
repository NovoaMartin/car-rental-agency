const Car = require('../../entity/Car');
// eslint-disable-next-line jest/no-disabled-tests
test.skip('Fixture file', () => 1);

// eslint-disable-next-line jest/no-export
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
};
