import { Model, ModelDefined } from "sequelize";
import { PostCreationAttributes, PostModelType } from "../models/PostModel";

export default class PostService {
  static add(
    post: Omit<PostModelType, "id">
  ): Promise<Model<PostModelType, PostCreationAttributes>> {
    const model: ModelDefined<PostModelType, PostCreationAttributes> =
      global.sequelize.models.Post;
    return model.create(post);
  }

  static findOne(where: {}): Promise<Model<
    PostModelType,
    PostCreationAttributes
  > | null> {
    const model: ModelDefined<PostModelType, PostCreationAttributes> =
      global.sequelize.models.Post;
    return model.findOne({
      where: where,
    });
  }

  static findAll(where: {}): Promise<
    Model<PostModelType, PostCreationAttributes>[]
  > {
    const model: ModelDefined<PostModelType, PostCreationAttributes> =
      global.sequelize.models.Post;
    return model.findAll({
      where: where,
    });
  }

  static update(where: {}, payload: {}): Promise<[number]> {
    const model: ModelDefined<PostModelType, PostCreationAttributes> =
      global.sequelize.models.Post;
    return model.update(payload, {
      where: where,
    });
  }

  static delete(where: {}): Promise<number> {
    const model: ModelDefined<PostModelType, PostCreationAttributes> =
      global.sequelize.models.Post;
    return model.destroy({
      where: where,
    });
  }
}
