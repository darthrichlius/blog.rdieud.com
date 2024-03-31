import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: Record<string, any>; // Customize this to match your user object
}
