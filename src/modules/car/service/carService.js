module.exports = class CarService {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  async getAll() {
    return await this.carRepository.getAll();
  }

  async save(car) {
    this.carRepository.save(car);
  }

  async delete(id) {
    this.carRepository.delete(id);
  }

  async get(id) {
    const car = await this.carRepository.getById(id);
    if (car.img) {
      car.img = car.img.split('public')[1];
    }
    return car;
  }
};
