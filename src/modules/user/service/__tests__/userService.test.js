const UserService = require('../userService');
const createUser = require('../../controller/__tests__/user.fixture');

const repositoryMock = {
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
};

const serviceMock = new UserService(repositoryMock);

describe('Testing user service', () => {
  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('getAll calls the repository', () => {
    serviceMock.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test('save calls the repository', () => {
    const user = createUser(1);
    serviceMock.save(user);

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(user);
  });

  test('delete calls the repository', () => {
    serviceMock.delete(1);
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(1);
  });

  test('get calls the repository', () => {
    serviceMock.get(1);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });
});
