module.exports = class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async delete(id) {
    this.reservationRepository.delete(id);
  }

  async save(reservation, car) {
    if (!reservation.id) {
      const reservationTime = (reservation.endDate.getTime() - reservation.startDate.getTime())
      / (1000 * 60 * 60 * 24);
      reservation.pricePerDay = car.price;
      reservation.totalPrice = reservationTime * car.price;
    }
    this.reservationRepository.save(reservation);
  }

  async get(id) {
    return this.reservationRepository.get(id);
  }

  async getAll() {
    return this.reservationRepository.getAll();
  }
};
