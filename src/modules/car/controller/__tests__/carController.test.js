const CarController = require('../carController');
const createCar = require('./cars.fixture');
const {fromDataToEntity} = require("../../mapper/carMapper")

const serviceMock = {
  get: jest.fn((id) => createCar(id)),
  save: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(() => Array.from({ length: 5 }, (id) => createCar(id + 1))),
};

const uploadMock = {
  single: jest.fn(),
};

const reqMock = {
  params: {
    id: 1
  }
}

const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const mockController = new CarController(serviceMock, uploadMock);

describe('Testing car controller', () => {
  afterEach(() => {
    Object.values(serviceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('Configure routes', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };

    mockController.configureRoutes(app);

    expect(app.get).toHaveBeenCalled();
    expect(app.post).toHaveBeenCalled();
    expect(uploadMock.single).toHaveBeenCalled();
  });

  test('List function renders list.njk with all cars', async ()=>{
    const cars = serviceMock.getAll();
    console.log(cars)
    await mockController.list(reqMock, resMock)

    expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith("car/views/list.njk", {
      cars
    })
  });

  test("Add function renders add.njk", async()=>{
    await mockController.add(reqMock,resMock);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith("car/views/add.njk")
  })

  test("Delete function", async()=>{
    await mockController.delete(reqMock,resMock);

    expect(serviceMock.delete).toHaveBeenCalledWith(1);
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith("/car/list")
  })

  test("Edit function renders edit.njk with car data", async()=>{
    const car = serviceMock.get(1)

    await mockController.edit(reqMock,resMock);

    expect(serviceMock.get).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1)
    expect(resMock.render).toHaveBeenCalledWith("car/views/edit.njk",{car})
  })

  test("Save function saves a car", async()=>{
    const reqMockWithBody = {
      body: {
        id: 1,
        brand: 'Volkswagen',
        model: 'Gol',
        year: "2020",
        kms: "50000",
        color: 'Red',
        airConditioner: "1",
        passengerMax: "5",
        automatic:"1",
        price: '500',
      },
      file: {path: "public\\img\\default.jpg"}
    }

    await mockController.save(reqMockWithBody,resMock);
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(fromDataToEntity(createCar(1)));
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith("/car/list")

  })

  test("View function renders view.njk with car details", async()=>{
    const car = serviceMock.get(1);
    await mockController.view(reqMock,resMock);
    expect(serviceMock.get).toHaveBeenCalledTimes(2)
    expect(resMock.render).toHaveBeenCalledTimes(1)
    expect(resMock.render).toHaveBeenCalledWith("car/views/view.njk", {car})
  })

});
