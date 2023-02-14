/**
 * 2XX type responses formatter
 * @param {object} res Response object
 * @param {object} payload
 * @param {string} message
 * @param {number=} code
 */
exports.successApiResponse = (res, payload, message = null, code = 200) => {
  res.status(code).json({
    status: code,
    data: payload,
    message,
  });
};

/**
 * Error responses formatter
 * @param {object} res Response object
 * @param {object} payload
 * @param {string} message
 * @param {number=} code
 */
exports.errorApiResponse = (res, payload, message = null, code = 400) => {
  res.status(code).json({
    status: code,
    error: { ...payload },
    message,
  });
};
