import { Response } from "express";

/**
 * 2XX type responses formatter
 * @param {object} res Response object
 * @param {object} payload
 * @param {string} message
 * @param {number=} code
 */
export const successApiResponse = (res: Response, payload: object | string, message?: string, code?: number) => {
  const status = code ? code : 200;
  res.status(status).json({
    status,
    data: payload,
    message: message ? message : null,
  });
};

/**
 * Error responses formatter
 * @param {object} res Response object
 * @param {object} payload
 * @param {string} message
 * @param {number=} code
 */
export const errorApiResponse = (res: Response, payload: object | string, message?: string, code?: number) => {
  const status = code ? code : 400;
  res.status(status).json({
    status,
    error: typeof payload === "string" ? payload : { ...payload },
    message: message ? message : null,
  });
};

/**
 * 3XX type responses formatter
 * @param {object} res Response object
 * @param {string} redirectUrl
 * @param {number=} code
 */
export const redirectApiResponse = (res: Response, redirectUrl: string, code?: number) => {
  const status = code ? code : 302;
  res.status(status).redirect(redirectUrl);
};
