const Reservation = require('../../entity/Reservation');
// eslint-disable-next-line jest/no-disabled-tests
test.skip('Fixture file', () => 1);

// eslint-disable-next-line jest/no-export
module.exports = function createReservation(id) {
  return new Reservation(
    id,
    '02-24-2021',
    '02-25-2021',
    500,
    1000,
    'cash',
    'true',
    1,
    1,
    undefined,
    undefined,
  );
};
