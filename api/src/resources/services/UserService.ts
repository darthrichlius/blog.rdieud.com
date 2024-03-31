import { Model, ModelDefined } from "sequelize";
import { UserCreationAttributes, UserModelType } from "../models/UserModel";

export default class UserService {
  static add(
    user: Omit<UserModelType, "id">,
    _model?: ModelDefined<UserModelType, UserCreationAttributes>
  ): Promise<Model<UserModelType, UserCreationAttributes>> {
    const model: ModelDefined<UserModelType, UserCreationAttributes> =
      global.sequelize?.models.User || _model;
    return model.create(user);
  }

  static findOne(
    where: {},
    _model?: ModelDefined<UserModelType, UserCreationAttributes>
  ): Promise<Model<UserModelType, UserCreationAttributes> | null> {
    const model: ModelDefined<UserModelType, UserCreationAttributes> =
      global.sequelize?.models.User || _model;

    return model.findOne({
      where: where,
    });
  }

  static findAll(
    where: {},
    _model?: ModelDefined<UserModelType, UserCreationAttributes>
  ): Promise<Model<UserModelType, UserCreationAttributes>[]> {
    const model: ModelDefined<UserModelType, UserCreationAttributes> =
      global.sequelize?.models.User || _model;
    return model.findAll({
      where: where,
    });
  }

  static update(
    where: {},
    payload: {},
    _model?: ModelDefined<UserModelType, UserCreationAttributes>
  ): Promise<[number]> {
    const model: ModelDefined<UserModelType, UserCreationAttributes> =
      global.sequelize?.models.User || _model;
    return model.update(payload, {
      where: where,
    });
  }

  static delete(
    where: {},
    _model?: ModelDefined<UserModelType, UserCreationAttributes>
  ): Promise<number> {
    const model: ModelDefined<UserModelType, UserCreationAttributes> =
      global.sequelize?.models.User || _model;

    return model.destroy({
      where: where,
    });
  }
}
