const Car = require('../entity/Car');

function fromModelToEntity({
  id,
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
  updatedAt,
}) {
  return new Car(
    Number(id),
    brand,
    model,
    Number(year),
    Number(kms),
    color,
    airConditioner,
    Number(passengerMax),
    automatic,
    Number(price),
    img,
    createdAt,
    updatedAt,
  );
}

function fromDataToEntity({
  id,
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
  updatedAt,
}) {
  return new Car(id, brand, model, year, kms, color, airConditioner, passengerMax,
    automatic, price, img, createdAt, updatedAt);
}

module.exports = { fromModelToEntity, fromDataToEntity };
