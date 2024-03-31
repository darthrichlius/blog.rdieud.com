import { Request, Response } from "express";
import UserService from "~/resources/services/UserService";
import {
  BadRequestException,
  InternalErrorException,
  NotFoundException,
  isInstanceOfApiException,
  sendApiExceptionResponseError,
} from "~/utils/exception";
import { encryptMe } from "~/utils/security";

const UserController = {
  getAllUsers: (req: Request, res: Response) => {
    const { query: filters } = req;

    UserService.findAll(filters)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        // console.error"LOG_ERROR_FIND_ALL ===> ", err);
        sendApiExceptionResponseError(
          res,
          new InternalErrorException(err.message)
        );
      });
  },

  getUserById: (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;

    UserService.findOne({ id })
      .then((user) => {
        // console.log("LOOOG ===> ", user);
        if (!user) {
          throw new NotFoundException("User not found");
        } else {
          return res.status(200).json({
            status: true,
            data: user,
          });
        }
      })
      .catch((err) => {
        // console.error"LOG_ERROR_FIND_ONE ===> ", err);
        const Err = isInstanceOfApiException(err)
          ? err
          : new InternalErrorException(err.message);
        sendApiExceptionResponseError(res, Err);
      });
  },
  getUserByUsername: (req: Request, res: Response) => {
    const {
      params: { username },
    } = req;

    UserService.findOne({ username })
      .then((user) => {
        // console.log("LOOOG ===> ", user);
        if (!user) {
          throw new NotFoundException("User not found");
        } else {
          return res.status(200).json({
            status: true,
            data: user,
          });
        }
      })
      .catch((err) => {
        // console.error"LOG_ERROR_FIND_ONE ===> ", err);
        const Err = isInstanceOfApiException(err)
          ? err
          : new InternalErrorException(err.message);
        sendApiExceptionResponseError(res, Err);
      });
  },

  deleteUser: (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;

    UserService.delete({ id })
      .then((numberOfEntriesDeleted) => {
        return res.status(204).end();
      })
      .catch((err) => {
        // console.error"LOG_ERROR_DELETE ===> ", err);
        const Err = isInstanceOfApiException(err)
          ? err
          : new InternalErrorException(err.message);
        sendApiExceptionResponseError(res, Err);
      });
  },

  updateUser: (req: Request, res: Response) => {
    const {
      params: { id },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      throw new BadRequestException(
        "Body is empty, hence can not update the user"
      );
    }

    UserService.update({ id }, payload)
      .then(async () => {
        const user = await UserService.findOne({ id });
        // console.log("LOOOG ===> ", user);
        if (!user) throw new NotFoundException("User not found");
        else return user;
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user?.toJSON(),
        });
      })
      .catch((err) => {
        // console.error"LOG_ERROR_UPDATE ===> ", err);
        const Err = isInstanceOfApiException(err)
          ? err
          : new InternalErrorException(err.message);
        sendApiExceptionResponseError(res, Err);
      });
  },

  createUser: (req: Request, res: Response) => {
    const { body: payload } = req;

    const encryptedPassword = encryptMe(payload.password);

    UserService.add({ ...payload, password: encryptedPassword })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: {
            // @todo Don't send ui but uuid (?)
            // @ts-ignore
            id: user.id,
          },
        });
      })
      .catch((err) => {
        // console.log("LOG_ERROR_CREATE ===> ", err instanceof Error, err.errors);
        const Err = isInstanceOfApiException(err)
          ? err
          : new InternalErrorException(err.message);
        sendApiExceptionResponseError(res, Err);
      });
  },
};

export default UserController;
