import { NextFunction, Request, Response } from "express";
import { ApiException } from "~/typings/exceptions";
import {
  sendApiExceptionResponseError,
  sendResponseError,
} from "~/utils/exception";

const ExceptionsHandler = (
  err: ApiException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * @see "The default error handler"
   * @link https://expressjs.com/en/guide/error-handling.html
   */
  if (res.headersSent) {
    return next(err);
  }

  /**
   * Our customized error
   * @devnotes
   *  IMPORTANT: Following the current Error Handling strategy
   *  This section handles synchronous error
   *  Asynchronous Error are handled directly in the CATCH
   *  We don't throw an error there as it will result in Unhandled Rejection
   *
   *  An "improvement" or other approach would be to redirect the ERROR into this file
   *  .catch(err => next)
   *  Then proceed to the response here using sendApiExceptionResponseError()
   *  rather than letting it being used directly in the .catch()
   */
  sendApiExceptionResponseError(res, err);

  // FINALLY

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      status: false,
      error: {
        status: 400,
        message: "Syntax Error: Invalid format in request body",
      },
    });
  }

  // Handle the case where the structure of 'err' is not as expected

  const _details = err instanceof Error ? err.message : "Unknown error";
  sendResponseError(
    res,
    500,
    "Internal error",
    process.env.NODE_ENV === "development" ? _details : null
  );
};

export default ExceptionsHandler;
