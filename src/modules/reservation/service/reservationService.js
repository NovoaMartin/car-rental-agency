module.exports = class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async delete(id) {
    this.reservationRepository.delete(id);
  }

  async save(reservation, car) {
    const reservationTime = (reservation.endDate.getTime() - reservation.startDate.getTime())
      / (1000 * 60 * 60);
    reservation.price = reservationTime * car.price;
    this.reservationRepository.save(reservation);
  }

  async getAll() {
    return this.reservationRepository.getAll();
  }
};
