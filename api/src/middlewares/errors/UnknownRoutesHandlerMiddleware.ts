import { Request, Response, NextFunction } from "express";
import { NotFoundException } from "~/utils/exception";

export default function UnknownRoutesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  throw new NotFoundException(
    "The resource doesn't exist or is not available at the moment"
  );
}
