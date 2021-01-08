module.exports = class CarService {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  async getAll() {
    const cars = await this.carRepository.getAll();
    return cars;
  }

  async save(car) {
    this.carRepository.save(car);
  }

  async delete(id) {
    this.carRepository.delete(id);
  }

  async get(id) {
    const car = await this.carRepository.getById(id);
    return car;
  }
};
