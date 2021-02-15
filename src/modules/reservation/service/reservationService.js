module.exports = class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async save(reservation, car, user) {
    // TODO
  }

  async getAll() {
    const instances = await this.reservationRepository.getAll();
    return instances;
  }
};
