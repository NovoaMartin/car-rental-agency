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
    return fromModelToEntity(instance);
  }

  async delete(id) {
    return Boolean(await this.CarModel.destroy({
      where: {
        id,
      },
    }));
  }

  async getAll() {
    const cars = await this.CarModel.findAll();
    return cars.map((car) => fromModelToEntity(car));
  }

  async getById(id) {
    const instance = await this.CarModel.findByPk(id);
    return fromModelToEntity(instance);
  }
};
