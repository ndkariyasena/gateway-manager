import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { errorApiResponse } from "../helpers/api_responses";

/**
 *
 * @param validationSchema in /validations/ object
 * @param property string
 * @returns {function(...[*]=)}
 */
export const validator = (validationSchema: Schema, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validationSchema.validate(req[property], {
      abortEarly: false,
    });

    const valid = error == null;

    if (valid) {
      next();
      return null;
    }
    const { details } = error;
    const validation_messages = details.map((i) => i.message);

    return errorApiResponse(res, { validation_messages, details }, "Validation failed.", 422);
  };
};

module.exports = validator;
