const User = require('../entity/User');

function fromModelToEntity({
  id,
  name,
  surname,
  docType,
  docNumber,
  nationality,
  address,
  phone,
  email,
  createdAt,
  updatedAt,
}) {
  return new User(
    Number(id),
    name,
    surname,
    docType,
    Number(docNumber),
    nationality,
    address,
    Number(phone),
    email,
    createdAt,
    updatedAt,
  );
}

function fromDataToEntity({
  id,
  name,
  surname,
  docType,
  docNumber,
  nationality,
  address,
  phone,
  email,
  createdAt,
  updatedAt,
}) {
  return new User(id, name, surname, docType, docNumber, nationality, address,
    phone, email, createdAt, updatedAt);
}

module.exports = { fromModelToEntity, fromDataToEntity };
