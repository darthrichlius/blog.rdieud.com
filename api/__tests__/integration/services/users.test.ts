import { describe, it, expect } from "@jest/globals";
import { SQLiteDBService } from "../../../src/services/DBService";
import {
  UserCreationAttributes,
  UserModel,
  UserModelType,
} from "../../../src/resources/models/UserModel";
import UserService from "../../../src/resources/services/UserService";
import { ModelDefined } from "sequelize";
import { encryptMe } from "../../../src/utils/security";

const jsonUserData = require("../../../data/users.json");

const sequelize = SQLiteDBService.init(`__tests__/_db/test.db`);

let User: ModelDefined<UserModelType, UserCreationAttributes>;

const setup = async () => {
  User = await UserModel.initialize(sequelize);
  await sequelize.sync();

  await jsonUserData.forEach((record: Omit<UserModelType, "id">) => {
    // @ts-ignore
    User.create({
      username: record.username,
      email: record.email,
      password: encryptMe(record.password) as "password",
      firstname: record.firstname,
      lastname: record.lastname,
    });
  });
};

const dbTeardown = async () => {
  await User.destroy({ truncate: true });
  await sequelize.sync({ force: true });
};

describe("UserService", () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await dbTeardown();
  });

  // ################### FIND ################### //

  it("UserDALService:findAll()", async () => {
    const found = await UserService.findAll({}, User);
    expect(found.length).toEqual(3);
  });

  it("UserDALService:findOne(:id)", async () => {
    const payload = {
      id: 1,
    };
    const found = await UserService.findOne(payload, User);
    // @ts-ignore
    expect(found.username).toEqual("rdpirate1");
  });

  it("UserDALService:findOne(:username)", async () => {
    const payload = {
      username: "rdpirate1",
    };
    const found = await UserService.findOne(payload, User);
    // @ts-ignore
    expect(found.username).toEqual("rdpirate1");
  });

  // ################### ADD ################### //

  it("UserDALService:add()", async () => {
    const payload = {
      username: "uadd_4",
      email: "uadd_4@domain.tld",
      password: encryptMe("pwd.12345678"),
      firstname: "John",
      lastname: "Doe",
    };
    // @ts-ignore
    const found = await UserService.add(payload, User);
    // @ts-ignore
    expect(found.username).toEqual("uadd_4");
  });

  // ################### UPDATE ################### //

  it("UserDALService:update()", async () => {
    const payload = {
      password: encryptMe("pwd.12345678.new"),
    };
    const affected = await UserService.update(
      { username: "uadd_4" },
      payload,
      User
    );
    expect(affected).toEqual([1]);

    const found = await UserService.findOne({ username: "uadd_4" }, User);
    // @ts-ignore
    expect(found?.password).toEqual(encryptMe("pwd.12345678.new"));
  });

  // ################### DELETE ################### //

  it("UserDALService:delete()", async () => {
    const payload = {
      password: encryptMe("pwd.12345678.new"),
    };
    const affected = await UserService.delete({ username: "uadd_4" }, User);
    expect(affected).toEqual(1);

    const found = await UserService.findOne({ username: "uadd_4" }, User);
    // @ts-ignore
    expect(found).toEqual(null);
  });
});
