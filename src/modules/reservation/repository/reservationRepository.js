const { fromModelToEntity } = require('../mapper/reservationMapper');

module.exports = class ReservationRepository {
  constructor(ReservationModel) {
    this.ReservationModel = ReservationModel;
  }

  async getAll() {
    const instances = await this.ReservationModel.findAll();
    instances.map((instance) => fromModelToEntity(instance));
    return instances;
  }
};
