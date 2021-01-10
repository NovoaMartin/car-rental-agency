const Car = require('../entity/Car');
const { fromModelToEntity } = require('../mapper/carMapper');

module.exports = class CarRepository {
  /**
   *
   * @param {import("../model/carModel")}CarModel
   */
  constructor(CarModel) {
    this.CarModel = CarModel;
  }

  async save(car) {
    const instance = this.CarModel.build(car, {
      isNewRecord: !car.id,
    });
    await instance.save();
  }

  async delete(id) {
    return await this.CarModel.destroy({
      where: {
        id,
      },
    });
  }

  async getAll() {
    const cars = await this.CarModel.findAll();
    return cars.map((car) => fromModelToEntity(car));
  }

  async getById(id) {
    const instance = await this.CarModel.findById(id);
    return fromModelToEntity(instance);
  }
};
