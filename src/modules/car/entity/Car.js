module.exports = class Car {
  /**
   * @param {number} id
   * @param {string} brand
   * @param {string} model
   * @param {number} year
   * @param {number} kms
   * @param {string} color
   * @param {boolean} airConditioner
   * @param {number} passengerMax
   * @param {boolean} automatic
   * @param {number} price
   * @param {string} img
   * @param {string} createdAt
   * @param {string} updatedAt
   */
  constructor(id,
    brand,
    model,
    year,
    kms,
    color,
    airConditioner,
    passengerMax,
    automatic,
    price,
    img,
    createdAt,
    updatedAt) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.airConditioner = airConditioner;
    this.passengermax = passengerMax;
    this.automatic = automatic;
    this.price = price;
    this.img = img;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};
