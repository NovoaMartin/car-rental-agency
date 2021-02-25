const Sequelize = require('sequelize');
const CarRepository = require('../carRepository');
const carModel = require('../../model/carModel');
const createCar = require("../../controller/__tests__/cars.fixture")
const { fromDataToEntity } = require("../../mapper/carMapper")

describe('Testing car repository', () => {
  let carRepository;
  let sequelize;
  let CarModel;
  beforeEach(async (done) => {
    sequelize = new Sequelize("sqlite::memory")
    CarModel = carModel.setup(sequelize);
    carRepository = new CarRepository(CarModel);
    await CarModel.sync({ force: true })
    done()
  });

  test("save creates a car the DB", async ()=>{
    let car = createCar(undefined);
    let savedCar = await carRepository.save(car);
    let expectedCar = fromDataToEntity(car);
    expectedCar.id = 1;
    savedCar.updatedAt = undefined;
    savedCar.createdAt = undefined;
    expect(savedCar).toMatchObject(expectedCar);
  })

  test("updates a car in the DB", async()=>{
    let newCar = createCar(undefined);
    let carToUpdate = createCar(1);
    carToUpdate.brand = "Test"
    await carRepository.save(newCar);
    let updatedCar = await carRepository.save(carToUpdate);

    expect(updatedCar.id).toEqual(1);
    expect(updatedCar.brand).toEqual("Test")
  })

  test("Deletes a car from the DB", async ()=>{
    const car = createCar(undefined);
    await carRepository.save(car);
    await carRepository.save(car);
    await carRepository.save(car);

    const result = await carRepository.delete(2);
    const remainingCars = await carRepository.getAll();

    expect(result).toEqual(true)
    expect(remainingCars[0].id).toEqual(1);
    expect(remainingCars[1].id).toEqual(3)
  })

  test("Get all returns all cars", async ()=>{
    const car = createCar(undefined);
    await carRepository.save(car);
    await carRepository.save(car);
    await carRepository.save(car);

    const result = await carRepository.getAll();

    expect(result).toHaveLength(3)
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);
    expect(result[2].id).toEqual(3)
  })

  test("getById returns specified car", async ()=>{
    const carOne = createCar(undefined);
    carOne.brand = "Test1";
    const carTwo = createCar(undefined);
    carTwo.brand = "Test2";
    await carRepository.save(carOne);
    await carRepository.save(carTwo);

    const firstCar = await carRepository.getById(1);
    const secondCar = await carRepository.getById(2)
    expect(firstCar.brand).toEqual("Test1");
    expect(secondCar.brand).toEqual("Test2")

  })

});
