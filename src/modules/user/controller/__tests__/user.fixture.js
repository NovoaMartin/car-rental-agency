const User = require('../../entity/User');

module.exports = function createUser(id) {
  return new User(
    id,
    'First name',
    'Last name',
    'DNI',
    '30123567',
    'Arg',
    'lalala 123',
    '1111112222',
    'asd@gmail.com',
    undefined,
    undefined,
  );

};
