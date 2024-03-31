import { ModelDefined, DataTypes, Optional, Sequelize } from "sequelize";

import { UserSchema } from "./UserModel";

import { AppModelType, PostType } from "~/typings/appModels";

/*
  @devnotes @academics
    * Post uses Sequelize#define
*/
export type PostModelType = AppModelType<PostType>;

/*
  @devnotes @academics
    * Post uses Sequelize#define
*/
export type PostCreationAttributes = Optional<PostModelType, "id">;

/* ########### MODEL SCHEMA ########### */

export const PostSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  /*
    By default, Sequelize automatically adds the attributes `createdAt` and `updatedAt` to every model, using the data type DataTypes.DATE.
    This can be deativated but if we want to keep it, we must ensure the column has default values that will be created even if we import data rather than relying on the ORM
  */
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("(STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW'))"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal("(STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW'))"),
  },
};

/* ########### DATA_SERVICE ########### */

/*
  Data Service manage the relation between the DB and the outside world
  It determines how data should be saved and manipulate before / after DB exchange
  It is not aware of the logic of data, it just perform basic ORM actions
  The logic lies into the Controller
*/
export class PostModel {
  // #model: ModelDefined<PostType, PostCreationAttributes>;

  static initialize(sequelize: Sequelize) {
    /*
      @devnotes @academics
        * Sequelize will pluralize the "key" under the hood using a package called inflection
        * Another option consists in explicilty provide the table name
        * Check User for the alternative way of dealing with defining a Model
    */
    // this_model = sequelize.define("Post", PostSchema);
    const this_model: ModelDefined<PostType, PostCreationAttributes> =
      sequelize.define("Post", PostSchema);

    const UserModel = sequelize.define("User", UserSchema);

    this_model.belongsTo(UserModel, { foreignKey: "userId" });

    return this_model;
  }

  
}
