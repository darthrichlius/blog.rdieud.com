import parameters from "~/config/parameters";
import { safeRegExpToString } from "~/utils/string";

/**
 * @see https://ajv.js.org/json-schema.html
 */
const payload = {
  type: "object",
  properties: {
    username: {
      type: "string",
      pattern: safeRegExpToString(parameters.patterns?.username as RegExp),
    },
    password: {
      type: "string",
      pattern: safeRegExpToString(parameters.patterns?.password as RegExp),
    },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

export default payload;
