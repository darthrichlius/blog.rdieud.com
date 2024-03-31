import parameters from "~/config/parameters";
import { safeRegExpToString } from "~/utils/string";

/**
 * @see https://ajv.js.org/json-schema.html
 */
const payload = {
  type: "object",
  properties: {
    /** @todo Be more explicit by using a REGEX */
    firstname: { type: "string" },
    /** @todo Be more explicit by using a REGEX */
    lastname: { type: "string" },
    username: {
      type: "string",
      pattern: safeRegExpToString(parameters.patterns?.username as RegExp),
    },
    email: {
      type: "string",
      // Custom validation (IMPORTANT: Implies that the keyword has been previously set)
      emailFormat: true,
    },
    password: {
      type: "string",
      pattern: safeRegExpToString(parameters.patterns?.password as RegExp),
    },
  },
  required: ["firstname", "lastname", "username", "email", "password"],
  additionalProperties: false,
};

export default payload;
