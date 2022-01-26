const Sequelize = require('sequelize');
const UserRepository = require('../userRepository');
const userModel = require('../../model/userModel');
const createUser = require('../../controller/__tests__/user.fixture');
const { fromDataToEntity } = require('../../mapper/userMapper');

describe('Testing user repository', () => {
  let userRepository;
  let sequelize;
  let UserModel;
  beforeEach(async (done) => {
    sequelize = new Sequelize('sqlite::memory');
    UserModel = userModel.setup(sequelize);
    userRepository = new UserRepository(UserModel);
    await UserModel.sync({ force: true });
    done();
  });

  test('save creates a user the DB', async () => {
    const user = createUser(undefined);
    const savedUser = await userRepository.save(user);
    const expectedUser = fromDataToEntity(user);
    expectedUser.id = 1;
    savedUser.updatedAt = undefined;
    savedUser.createdAt = undefined;
    expect(savedUser).toMatchObject(expectedUser);
  });

  test('updates a user in the DB', async () => {
    const newUser = createUser(undefined);
    const userToUpdate = createUser(1);
    userToUpdate.name = 'Test';
    await userRepository.save(newUser);
    const updatedCar = await userRepository.save(userToUpdate);

    expect(updatedCar.id).toEqual(1);
    expect(updatedCar.name).toEqual('Test');
  });

  test('Deletes a user from the DB', async () => {
    const user = createUser(undefined);
    await userRepository.save(user);
    await userRepository.save(user);
    await userRepository.save(user);

    const result = await userRepository.delete(2);
    const remainingUsers = await userRepository.getAll();

    expect(result).toEqual(true);
    expect(remainingUsers[0].id).toEqual(1);
    expect(remainingUsers[1].id).toEqual(3);
  });

  test('Get all returns all users', async () => {
    const user = createUser(undefined);
    await userRepository.save(user);
    await userRepository.save(user);
    await userRepository.save(user);

    const result = await userRepository.getAll();

    expect(result).toHaveLength(3);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);
    expect(result[2].id).toEqual(3);
  });

  test('getById returns specified user', async () => {
    const userOne = createUser(undefined);
    userOne.name = 'Test1';
    const userTwo = createUser(undefined);
    userTwo.name = 'Test2';
    await userRepository.save(userOne);
    await userRepository.save(userTwo);

    const firstUser = await userRepository.getById(1);
    const secondUser = await userRepository.getById(2);
    expect(firstUser.name).toEqual('Test1');
    expect(secondUser.name).toEqual('Test2');
  });
});
