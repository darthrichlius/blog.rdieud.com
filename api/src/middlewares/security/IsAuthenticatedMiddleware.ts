import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import securityConfig from "~/config/security";
import { AuthenticatedRequest } from "~/typings";
import {
  ForbiddenRequestException,
  UnauthorizedRequestException,
  sendApiExceptionResponseError,
} from "~/utils/exception";

const {
  jwtToken: { jwtSecret },
} = securityConfig;

/**
 * If you are interested by how the token is created, check utils/security/generateAccessToken
 * We encode a payload
 *
 * @param req
 * @param res
 * @param next
 */
export default function checkAuth(
  /*
    You could think, what not using "AuthenticatedRequest" here?
    Because it will triger where the function will be used as it not respect the middle function definition
    The workaround is to use the interface when adding the "user" property 
  */
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeaders = req.headers["authorization"];

  // IF no auth headers are provided
  // THEN return 401 Unauthorized error
  if (!authHeaders) {
    throw new UnauthorizedRequestException(
      "Auth headers not provided in the request"
    );
  }

  // IF bearer auth header is not provided
  // THEN return 401 Unauthorized error
  if (!authHeaders.startsWith("Bearer")) {
    throw new UnauthorizedRequestException(
      "Bearer token missing in the authorization headers"
    );
  }

  const token = authHeaders.split(" ")[1];

  // IF bearer auth header is provided, but token is not provided
  // THEN return 401 Unauthorized error
  if (!token) {
    throw new UnauthorizedRequestException(
      "Bearer token missing in the authorization headers"
    );
  }

  /*
    Following "jwt" verify fucntion definition, "decoded" is actually the payload extracted from the JSON Web Token (JWT)
    As in our case, we stored the user data, this is why we add "user" to the Request object
  */
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err !== null) {
      sendApiExceptionResponseError(
        res,
        new ForbiddenRequestException("Invalid access token provided", err)
      );
    } else {
      // All those tweaks are needed to tell TS to accept "user" property
      (req as AuthenticatedRequest).user = decoded as Record<string, any>; // Save the user object for further use
      next(); // Pass control to the next middleware
    }
  });
}
