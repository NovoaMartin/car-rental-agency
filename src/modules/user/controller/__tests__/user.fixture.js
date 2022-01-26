const User = require('../../entity/User');

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Fixture file', () => 1);

// eslint-disable-next-line jest/no-export
module.exports = function createUser(id) {
  return new User(
    id,
    'First name',
    'Last name',
    'DNI',
    30123567,
    'Arg',
    'lalala 123',
    1111112222,
    'asd@gmail.com',
    undefined,
    undefined,
  );
};
