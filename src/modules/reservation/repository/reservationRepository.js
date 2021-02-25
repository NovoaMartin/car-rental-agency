const { fromModelToEntity } = require('../mapper/reservationMapper');

module.exports = class ReservationRepository {
  /**
   * @param {import("../model/reservationModel")} ReservationModel
   */
  constructor(ReservationModel) {
    this.ReservationModel = ReservationModel;
  }

  async save(reservation) {
    const instance = this.ReservationModel.build(reservation, {
      isNewRecord: !reservation.id,
    });
    return fromModelToEntity(await instance.save());
  }

  async delete(id) {
    return Boolean(this.ReservationModel.destroy({
      where: {
        id,
      },
    }));
  }

  async get(id) {
    const instance = await this.ReservationModel.findByPk(id);
    return fromModelToEntity(instance);
  }

  async getAll() {
    const instances = await this.ReservationModel.findAll();
    instances.map((instance) => fromModelToEntity(instance));
    return instances;
  }
};
