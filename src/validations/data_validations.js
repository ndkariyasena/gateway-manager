const joi = require('joi');

const { PERIPHERAL_STATUS } = require('../configs/constants');

const { MAX_PERIPHERALS_PER_GATEWAY = 10 } = process.env;

const PERIPHERAL_DATA_STRUCTURE = {
  uid: joi.number().required(),
  vendor: joi.string().optional(),
  status: joi.string().valid(PERIPHERAL_STATUS.ONLINE, PERIPHERAL_STATUS.OFFLINE).optional(),
  manufactured_date: joi.string().optional(),
};

const GATEWAY_DATA_STRUCTURE = {
  serial_number: joi.string().required(),
  name: joi.string().optional(),
  ipv4_address: joi
    .string()
    .ip({ version: ['ipv4'], cidr: 'optional' })
    .optional(),
  peripherals: joi
    .array()
    .max(Number(MAX_PERIPHERALS_PER_GATEWAY))
    .items(joi.object({ ...PERIPHERAL_DATA_STRUCTURE })),
};

/* Add new peripheral object to the gateway record */
const addPeripheralToGateway = {
  serial_number: joi.string().required(),
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
  addPeripheralToGateway: joi.object({ ...addPeripheralToGateway }),
};

module.exports = {
  ...gatewayValidationsSchema,
};
