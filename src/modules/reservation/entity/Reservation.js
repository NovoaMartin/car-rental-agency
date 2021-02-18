module.exports = class Reservation {
  /**
   * @param {number} id
   * @param {string} startDate
   * @param {string} endDate
   * @param {number} pricePerDay
   * @param {number} totalPrice
   * @param {string} paymentMethod
   * @param {boolean} paid
   * @param {number} carId
   * @param {number} userId
   * @param {string} created_at
   * @param {string} updated_at
   */
  constructor(
    id,
    startDate,
    endDate,
    pricePerDay,
    totalPrice,
    paymentMethod,
    paid,
    carId,
    userId,
    created_at,
    updated_at,
  ) {
    this.id = id;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.pricePerDay = pricePerDay;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.paid = paid;
    this.carId = carId;
    this.userId = userId;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
};
