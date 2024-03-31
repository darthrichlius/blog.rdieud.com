import { Response, Request, NextFunction } from "express";
import AJV, { AnySchema, ValidateFunction } from "ajv";

import defaults from "~/config/parameters";
import { sendResponseError } from "~/utils/exception";
import { validateEmailFormat } from "~/utils/validation";

export default function verify(schema: AnySchema) {
  if (!schema) {
    throw Error("Schema not provided");
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const ajv = new AJV(defaults.modules?.AJV.options);
    /*
      AJV doesn't have a "email" format, 
      We tweak it by adding a keyword validation
      We could have done it differently, for example by using addFormat()
      This is just a matter of choice 
    */
    ajv.addKeyword({ keyword: "emailFormat", validate: validateEmailFormat });
    const validate: ValidateFunction = ajv.compile(schema);
    const isValid = validate(body);

    if (isValid) {
      return next();
    }

    return sendResponseError(
      res,
      400,
      `Invalid Payload: ${ajv.errorsText(validate.errors)}`
    );
  };
}
