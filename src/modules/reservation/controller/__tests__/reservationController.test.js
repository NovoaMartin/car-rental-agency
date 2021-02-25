const ReservationController = require('../reservationController');
const createReservation = require('./reservation.fixture');
const createCar = require('../../../car/controller/__tests__/cars.fixture');
const createUser = require('../../../user/controller/__tests__/user.fixture');
const {fromDataToEntity} = require("../../mapper/reservationMapper")

const reservationServiceMock = {
  getAll: jest.fn(() => Array.from({ length: 5 }, (id) => createReservation(id + 1))),
  delete: jest.fn(),
  get: jest.fn((id) => createReservation(id)),
  save: jest.fn(),
};

const carServiceMock = {
  getAll: jest.fn(() => Array.from({ length: 5 }, (id) => createCar(id + 1))),
  delete: jest.fn(),
  get: jest.fn((id) => createCar(id)),
  save: jest.fn(),
};

const userServiceMock = {
  getAll: jest.fn(() => Array.from({ length: 5 }, (id) => createUser(id + 1))),
  delete: jest.fn(),
  get: jest.fn((id) => createUser(id)),
  save: jest.fn(),
};

const reqMock = {
  params: {
    id: 1,
  },
};

const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const reservationController = new ReservationController(reservationServiceMock, carServiceMock, userServiceMock);

describe('Testing reservation controller', () => {
  afterEach(() => {
    Object.values(reservationServiceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(carServiceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(userServiceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('Configure routes', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };

    reservationController.configureRoutes(app);

    expect(app.get).toHaveBeenCalled();
    expect(app.post).toHaveBeenCalled();
  });

  test('List function renders list.njk with all reservations', async ()=>{
    const reservations = reservationServiceMock.getAll();
    await reservationController.list(reqMock, resMock)

    expect(reservationServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith("reservation/views/list.njk", {
      reservations
    })
  });

  test("Add function renders add.njk", async()=>{
    const cars = carServiceMock.getAll();
    const users = userServiceMock.getAll();
    await reservationController.add(reqMock,resMock);

    expect(carServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(userServiceMock.getAll).toHaveBeenCalledTimes(2)

    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith("reservation/views/add.njk", { cars, users })
  })


  test("Delete function", async()=>{
    await reservationController.delete(reqMock,resMock);

    expect(reservationServiceMock.delete).toHaveBeenCalledWith(1);
    expect(reservationServiceMock.delete).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith("/reservation/list")
  })

  test("Edit function renders edit.njk with reservation data", async()=>{
    const reservation = reservationServiceMock.get(1);
    const cars = carServiceMock.getAll();
    const users = userServiceMock.getAll();
    await reservationController.edit(reqMock,resMock);

    expect(reservationServiceMock.get).toHaveBeenCalledTimes(2);
    expect(carServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(userServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1)
    expect(resMock.render).toHaveBeenCalledWith("reservation/views/edit.njk",{cars, users, reservation})
  })


  test("Save function saves a reservation", async()=>{
    const reqMockWithBody = {
      body: {
        id: 1,
        startDate: '02-24-2021',
        endDate: '02-25-2021',
        pricePerDay: "500",
        totalPrice: "1000",
        paymentMethod: 'cash',
        paid: "1",
        carId: "1",
        userId:"2",
      }
    }

    const expectedReservation = fromDataToEntity(createReservation(1))
    const expectedCar = carServiceMock.get(1)
    await reservationController.save(reqMockWithBody,resMock);
    expect(reservationServiceMock.save).toHaveBeenCalledTimes(1);
    expect(carServiceMock.get).toHaveBeenCalledTimes(2)
    expect(carServiceMock.get).toHaveBeenCalledWith(1)
    expect(reservationServiceMock.save).toHaveBeenCalledWith(expectedReservation, expectedCar);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith("/reservation/list")
  })

  test("View function renders view.njk with reservation details", async()=>{
    const reservation = reservationServiceMock.get(1);
    await reservationController.view(reqMock,resMock);
    expect(reservationServiceMock.get).toHaveBeenCalledTimes(2)
    expect(resMock.render).toHaveBeenCalledTimes(1)
    expect(resMock.render).toHaveBeenCalledWith("reservation/views/view.njk", {reservation})
  })

  test("setPaid changes the value of paid to true", async ()=>{
    const reservation = createReservation(1);
    reservation.paid = false;

    reservationServiceMock.get.mockImplementationOnce(()=>reservation)
    await reservationController.setPaid(reqMock,resMock);

    expect(reservationServiceMock.get).toHaveBeenCalledWith(1);
    expect(reservationServiceMock.get).toHaveBeenCalledTimes(1)

    reservation.paid = true;
    expect(reservationServiceMock.save).toHaveBeenCalledTimes(1)
    expect(reservationServiceMock.save).toHaveBeenCalledWith(reservation);

    expect(resMock.redirect).toHaveBeenCalledWith("/reservation/list");
    expect(resMock.redirect).toHaveBeenCalledTimes(1)

  })

});
