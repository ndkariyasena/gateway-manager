const { GatewayDataModel } = require('./gateway_data_model');
const { PeripheralDataModel } = require('./peripheral_data_model');

/**
 * Create a new Gateway record in the database.
 *
 * @param {object} payload
 * @return {object}
 */
const createNewGatewayRecord = async (payload) => {
  const data = await GatewayDataModel.create(payload);

  return data;
};

/**
 * Read a Gateway record in the database by serial_number.
 *
 * @param {object} payload
 * @return {object}
 */
const getGatewayRecordBySerialNumber = async (serial_number) => {
  return await GatewayDataModel.findOne({ serial_number }).populate('peripherals');
};

/**
 * Create a new Peripheral record in the database.
 *
 * @param {object} payload
 * @return {object}
 */
const createNewPeripheralRecord = async (payload) => {
  const data = await PeripheralDataModel.create(payload);

  return data;
};

module.exports = {
  createNewGatewayRecord,
  createNewPeripheralRecord,
  getGatewayRecordBySerialNumber,
};
