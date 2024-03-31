// Autyhentication
export { default as registerPayload } from "./RegisterPayload";
export { default as loginPayload } from "./LoginPayload";
// Models
export {
  createPayload as userCreatePayload,
  updatePayload as userUpdatePayload,
} from "./UserPayload";
export {
  createPayload as postCreatePayload,
  updatePayload as postUpdatePayload,
} from "./PostPayload";
