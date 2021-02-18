const Reservation = require('../entity/Reservation');

function fromDataToEntity({
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
}) {
  return new Reservation(
    Number(id),
    startDate,
    endDate,
    Number(pricePerDay),
    Number(totalPrice),
    paymentMethod,
    Boolean(paid),
    Number(carId),
    Number(userId),
    created_at,
    updated_at,
  );
}

function fromModelToEntity({
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
}) {
  return new Reservation(
    Number(id),
    startDate,
    endDate,
    Number(pricePerDay),
    Number(totalPrice),
    paymentMethod,
    Boolean(paid),
    Number(carId),
    Number(userId),
    created_at,
    updated_at,
  );
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
