module.exports = class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async getAll() {
    const instances = await this.reservationRepository.getAll();
    return instances;
  }
};
