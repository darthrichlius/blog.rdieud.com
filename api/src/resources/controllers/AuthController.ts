import { Request, Response } from "express";
import UserService from "~/resources/services/UserService";
import {
  BadRequestException,
  UnauthorizedRequestException,
  sendApiExceptionResponseError,
} from "~/utils/exception";
import { encryptMe, generateAccessToken } from "~/utils/security";

import securityConfig from "~/config/security";

const {
  jwtToken: { jwtSecret, jwtExpirationInSeconds },
} = securityConfig;

const AuthController = {
  /**
   * /!\ NOTICE/!\
   * Register is different from /users/create
   * Register implies:
   *  - Break the current connextion if it exists
   *  - Creating an account
   *  - Providing a genuine password
   *  - Create a new connection
   */
  register: (req: Request, res: Response) => {
    const { body: payload } = req;

    const encryptedPassword = encryptMe(payload.password);

    UserService.add({ ...payload, password: encryptedPassword })
      .then((user) => {
        const accessToken = generateAccessToken(
          // We use direct type assertion as the more simple workaround to make TS correctly infers or type
          { userId: (user as any).id, username: (user as any).username },
          jwtSecret,
          jwtExpirationInSeconds
        );

        return res.status(200).json({
          status: true,
          token: accessToken,
        });
      })
      .catch((err) => {
        sendApiExceptionResponseError(res, JSON.stringify(err));
      });
  },

  login: (req: Request, res: Response) => {
    const {
      body: { username, password },
    } = req;

    if (!(username && password)) {
      throw new BadRequestException("Missing credentials");
    }

    UserService.findOne({ username })
      .then((user) => {
        if (!user) {
          throw new BadRequestException(
            "Provided username and password don't match"
          );
        }

        const encryptedProvidedPassword = encryptMe(password);

        if ((user as any).password !== encryptedProvidedPassword)
          throw new UnauthorizedRequestException(
            "Provided username and password don't match"
          );

        /* 
        Generating an AccessToken for the user, which will be required in every subsequent request.
        */
        const accessToken = generateAccessToken(
          // We use direct type assertion as the more simple workaround to make TS correctly infers or type
          { username: (user as any).username, userId: (user as any).id },
          jwtSecret,
          jwtExpirationInSeconds
        );

        return res.status(200).json({
          status: true,
          token: accessToken,
        });
      })
      /*
        As a reminder, throwing an exception in a Promise context can lead to Promise rejection errors
        Indeed, there is no catch to catch the catch
        Therefor, we send the error directly
      */
      .catch((err) => {
        sendApiExceptionResponseError(res, err);
      });
  },
};

export default AuthController;
