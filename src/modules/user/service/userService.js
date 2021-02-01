module.exports = class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  async save(user) {
    this.userRepository.save(user);
  }

  async delete(id) {
    this.userRepository.delete(id);
  }

  async get(id) {
    return this.userRepository.getById(id);
  }
};
