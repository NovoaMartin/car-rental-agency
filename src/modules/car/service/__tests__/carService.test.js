const CarService = require('../carService');
const createCar = require('../../controller/__tests__/cars.fixture');

const repositoryMock = {
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
};

const serviceMock = new CarService(repositoryMock);

describe('Testing car service', () => {
  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('getAll calls the repository', () => {
    serviceMock.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test('save calls the repository', () => {
    const car = createCar(1);
    serviceMock.save(car);

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(car);
  });

  test('delete calls the repository', () => {
    serviceMock.delete(1);
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(1);
  });

  test('get calls the repository', () => {
    repositoryMock.getById.mockImplementationOnce((id) => createCar(id));
    serviceMock.get(1);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  test('get modifies the img property of the car', async () => {
    repositoryMock.getById.mockImplementationOnce((id) => createCar(id));
    const car = await serviceMock.get(1);
    const expectedCar = createCar(1);
    expectedCar.img = '\\img\\default.jpg';
    expect(car).toMatchObject(expectedCar);
  });
});
