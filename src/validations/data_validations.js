const joi = require('joi');

const { PERIPHERAL_STATUS } = require('../configs/constants');

const { MAX_PERIPHERALS_PER_GATEWAY = 10 } = process.env;

const PERIPHERAL_DATA_STRUCTURE = {
  uid: joi.number().required(),
  vendor: joi.string().required(),
  status: joi.string().valid(PERIPHERAL_STATUS.ONLINE, PERIPHERAL_STATUS.OFFLINE).required(),
  manufactured_date: joi.string().required(),
};

const GATEWAY_DATA_STRUCTURE = {
  serial_number: joi.string().required(),
  name: joi.string().required(),
  ipv4_address: joi.string().ip({ version: ['ipv4'], cidr: 'optional' }),
  peripherals: joi
    .array()
    .max(Number(MAX_PERIPHERALS_PER_GATEWAY))
    .items(joi.object({ ...PERIPHERAL_DATA_STRUCTURE })),
};

/**
 * Validation schemas
 */
const gatewayValidationsSchema = {
  createGateway: joi.object({ ...GATEWAY_DATA_STRUCTURE }),
  updateGatewayBySerialNumber: joi.object({ ...GATEWAY_DATA_STRUCTURE }),
};

module.exports = {
  ...gatewayValidationsSchema,
};
