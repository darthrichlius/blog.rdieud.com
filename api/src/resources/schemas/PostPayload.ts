import { JSONSchemaType } from "ajv";
import { PostType } from "~/typings/appModels";

type createType = Omit<PostType, "id" | "slug">;
type updateType = Partial<createType>;

/**
 * @see https://ajv.js.org/json-schema.html
 */
export const createPayload: JSONSchemaType<createType> = {
  type: "object",
  properties: {
    title: { type: "string" },
    body: { type: "string" },
    isPublished: { type: "boolean" },
    userId: { type: "number" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
  required: ["title", "isPublished", "userId"],
  additionalProperties: false,
};

/*
  @ts-ignore because updateType has data that contain "string | undefined"
  HW, this doesn't comply with the JSONSchemaType signature
  The issue is, if we want to make the properties facultative, it automatically implies to have "<property> | undefined"
  At this moment, despite my effort (Mapping the Type, ...) I didn't find the solution
*/
// @ts-ignore
export const updatePayload: JSONSchemaType<updateType> = {
  type: "object",
  properties: {
    title: { type: "string" },
    body: { type: "string" },
    isPublished: { type: "boolean" },
    userId: { type: "number" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
  additionalProperties: false,
};
