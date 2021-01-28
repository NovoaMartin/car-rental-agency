module.exports = class User {
  /**
   * @param {number} id
   * @param {string} name
   * @param {string} surname
   * @param {string} docType
   * @param {number} docNumber
   * @param {string} nationality
   * @param {string} address
   * @param {number} phone
   * @param {string} email
   * @param {string} createdAt
   * @param {string} updatedAt
   */
  constructor(id, name, surname, docType, docNumber, nationality, address, phone, email, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.docType = docType;
    this.docNumber = docNumber;
    this.nationality = nationality;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};
