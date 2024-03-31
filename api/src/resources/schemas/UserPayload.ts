import { JSONSchemaType } from "ajv";
import parameters from "~/config/parameters";
import { UserType } from "~/typings/appModels";
import { safeRegExpToString } from "~/utils/string";

// Omit "id" as it is created by the database and should never be editable
type CreateUserType = Omit<UserType, "id" | "createdAt" | "updatedAt">;

// Make all properties of UserType optional
type UpdateUserType = NonNullable<{
  [P in keyof CreateUserType]?: CreateUserType[P];
}>;

/**
 * This schema is used to allows flexibility for incoming payloads, permitting only a defined set of properties
 * This is particulary usefull for example for UPDATE queries
 *
 * @see https://ajv.js.org/json-schema.html
 */
export const createPayload: JSONSchemaType<CreateUserType> = {
  type: "object",
  properties: {
    username: {
      type: "string",
      pattern: safeRegExpToString(parameters.patterns?.username as RegExp),
    },
    email: { type: "string" },
    password: {
      type: "string",
      pattern: safeRegExpToString(parameters.patterns?.password as RegExp),
    },
    firstname: { type: "string" },
    lastname: { type: "string" },
  },
  required: ["username", "email", "password", "firstname", "lastname"],
  additionalProperties: false,
};

// @ts-ignore
export const updatePayload: JSONSchemaType<UpdateUserType> = {
  type: "object",
  properties: {
    username: {
      type: "string",
      pattern: safeRegExpToString(parameters.patterns?.username as RegExp),
    },
    email: { type: "string" },
    password: {
      type: "string",
      pattern: safeRegExpToString(parameters.patterns?.password as RegExp),
    },
    firstname: { type: "string" },
    lastname: { type: "string" },
  },
  additionalProperties: false,
};
