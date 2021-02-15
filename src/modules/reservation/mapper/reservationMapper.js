const Reservation = require('../entity/Reservation');

function fromDataToEntity({
  id,
  startDate,
  endDate,
  price,
  carId,
  userId,
  created_at,
  updated_at,
}) {
  return new Reservation(
    id,
    startDate,
    endDate,
    Number(price),
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
  price,
  carId,
  userId,
  created_at,
  updated_at,
}) {
  return new Reservation(
    Number(id),
    startDate,
    endDate,
    Number(price),
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
