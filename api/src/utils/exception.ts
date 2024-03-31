import { Response } from "express";
import { ApiException, errorType } from "~/typings/exceptions";

/*
    Generic class used to create HTTP errors (400, 404, ...)

    `readonly` is a shorthand to declare this.property = value needed to correctly implement ApiException
    this.status = status and this.error = error
*/
class Exception implements ApiException {
  constructor(
    readonly status: boolean,
    readonly error: errorType,
    readonly details?: any
  ) {}
}

export class BadRequestException extends Exception {
  constructor(message: string, details?: any) {
    super(false, {
      status: 400,
      message: message,
      details: details,
    });
  }
}

export class UnauthorizedRequestException extends Exception {
  constructor(message: string, details?: any) {
    super(false, {
      status: 401,
      message: message,
      details: details,
    });
  }
}

export class ForbiddenRequestException extends Exception {
  constructor(message: string, details?: any) {
    super(false, {
      status: 403,
      message: message,
      details: details,
    });
  }
}

export class NotFoundException extends Exception {
  constructor(message: string, details?: any) {
    super(false, {
      status: 404,
      message: message,
      details: details,
    });
  }
}

export class InternalErrorException extends Exception {
  constructor(message: string, details?: any) {
    super(false, {
      status: 500,
      message: message,
      details: details,
    });
  }
}

export function isInstanceOfApiException(err: any): boolean {
  if (
    typeof err === "object" &&
    "status" in err &&
    "error" in err &&
    typeof err.error === "object" &&
    "status" in err.error &&
    "message" in err.error
  ) {
    return true; // It's an ApiException
  }

  return false; // It's not an ApiException
}

export function sendResponseError(
  res: Response,
  codeStatus: number,
  message: string = "",
  more: string | null = null
) {
  const errorDetails = {
    status: codeStatus,
    message: message || "Unknown error",
    details: more || "No extra details provided",
  };

  /*
    @devnotes
      - We could have used Object.assign, just a matter of choice ;)
  */
  const { details, ...shortenError } = errorDetails;
  return res.status(codeStatus).json({
    status: false,
    error: more !== null ? errorDetails : shortenError,
  });
}

export function sendApiExceptionResponseError(
  res: Response,
  err: ApiException | Error | string
) {
  if (isInstanceOfApiException(err)) {
    return res.status((err as ApiException).error.status).json(err);
  } else if (err instanceof Error) {
    // Check if err is an instance of Error
    return sendResponseError(
      res,
      500,
      "Internal error",
      process.env.NODE_ENV !== "production" ? err.message : ""
    );
  } else {
    // Handle other cases when err is neither ApiException nor Error
    return sendResponseError(
      res,
      500,
      "Internal error",
      typeof err === "string" && process.env.NODE_ENV !== "production"
        ? JSON.parse(err)
        : ""
    );
  }
}
