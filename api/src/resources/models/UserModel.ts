import { Sequelize, DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { PostSchema } from "./PostModel";
import { AppModelType, UserType } from "~/typings/appModels";

export type UserModelType = AppModelType<UserType>;

export type UserCreationAttributes = Optional<UserModelType, "id">;

/* ########### MODEL SCHEMA ########### */

/*
  Data Service manage the relation between the DB and the outside world
  It determines how data should be saved and manipulate before / after DB exchange
  It is not aware of the logic of data, it just perform basic ORM actions
  The logic lies into the Controller
*/

export const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  /*
    By default, Sequelize automatically adds the attributes createdAt and updatedAt to every model, using the data type DataTypes.DATE.
    This can be deativated but if we want to keep it, we must ensure the column has default values that will created if we import data rather than relying on the ORM
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

export class UserModel extends Model {
  static initialize(
    sequelize: Sequelize
  ): ModelDefined<UserModelType, UserCreationAttributes> {
    /*
      @devnotes @academics
        * Sequelize will pluralize the "key" under the hood using a package called inflection
        * Another option consists in explicilty provide the table name
        
      @devnotes @academics
        * This is a more modern way to deal with Model Definition
        * Check Post for the alternative way of dealing with defining a Model
    */
    const this_model: ModelDefined<UserModelType, UserCreationAttributes> =
      this.init(UserSchema, {
        sequelize,
        modelName: "User",
      });

    const PostModel = sequelize.define("Post", PostSchema);

    // Defining association(s)
    this_model.hasMany(PostModel);

    return this_model;
  }
}
