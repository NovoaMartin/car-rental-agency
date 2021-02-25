const { fromModelToEntity } = require('../mapper/userMapper');

module.exports = class UserRepository {
  /**
   *
   * @param {import("../model/userModel")}UserModel
   */
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async save(user) {
    const instance = this.UserModel.build(user, {
      isNewRecord: !user.id,
    });
    return fromModelToEntity(await instance.save());
  }

  async delete(id) {
    return Boolean(this.UserModel.destroy({
      where: {
        id,
      },
    }));
  }

  async getAll() {
    const users = await this.UserModel.findAll();
    return users.map((user) => fromModelToEntity(user));
  }

  async getById(id) {
    const instance = await this.UserModel.findByPk(id);
    return fromModelToEntity(instance);
  }
};
