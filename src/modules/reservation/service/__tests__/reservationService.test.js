const ReservationService = require('../reservationService');
const createReservation = require('../../controller/__tests__/reservation.fixture');

const repositoryMock = {
  get: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
};

const serviceMock = new ReservationService(repositoryMock);

describe('Testing reservation service', () => {
  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('getAll calls the repository', () => {
    serviceMock.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test('delete calls the repository', () => {
    serviceMock.delete(1);
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(1);
  });

  test('get calls the repository', () => {
    serviceMock.get(1);
    expect(repositoryMock.get).toHaveBeenCalledTimes(1);
    expect(repositoryMock.get).toHaveBeenCalledWith(1);
  });

  test('save updates a reservation', () => {
    const reservation = createReservation(1);
    serviceMock.save(reservation);

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
  });

  test('saves a new reservation and set the totalPrice property', () => {
    const reservation = createReservation(undefined);
    const carMock = {
      price: 500,
    };
    serviceMock.save(reservation, carMock);

    reservation.totalPrice = 500;

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
  });
});
