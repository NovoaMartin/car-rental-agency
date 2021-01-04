const Car = require('../entity/Car');
const fromModelToEntity = require('../mapper/carMapper');

module.exports = class CarRepository {
  /**
   *
   * @param {import("../model/carModel")}CarModel
   */
  contructor(CarModel) {
    this.CarModel = CarModel;
  }

  async save(car) {
    const instance = this.CarModel.build(car, {
      isNewRecord: !car.id,
    });

    return await instance.save();
  }

  async delete(id) {
    return await this.CarModel.destroy({
      where: {
        id,
      },
    });
  }

  async getAll() {
    await this.CarModel.findAll().map((instance) => fromModelToEntity(instance));
  }

  async getById(id) {
    const instance = await this.CarModel.findById(id);
    return fromModelToEntity(instance);
  }
};
