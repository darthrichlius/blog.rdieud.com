import { NextFunction, Request, Response } from "express";
import UserService from "~/resources/services/UserService";
import { AuthenticatedRequest } from "~/typings";
import {
  ForbiddenRequestException,
  sendApiExceptionResponseError,
} from "~/utils/exception";

// @todo add role
export default function checkPermission(role = null) {
  return (req: Request, res: Response, next: NextFunction) => {
    const {
      user: { userId, username },
    } = req as AuthenticatedRequest;

    UserService.findOne({ id: userId, username: username })
      .then((user) => {
        if (!user) {
          return sendApiExceptionResponseError(
            res,
            new ForbiddenRequestException(
              "Invalid access token provided, please login again"
            )
          );
        }

        //   console.debug("checkPermission => ", { userId, username });

        // @todo check role and other thing (permission, ...)

        next();
      })
      .catch((err) => sendApiExceptionResponseError(res, JSON.stringify(err)));
  };
}
