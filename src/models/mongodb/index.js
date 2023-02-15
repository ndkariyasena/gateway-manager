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
 * Read a Gateway record in the database by serial_number.
 *
 * @param {object} payload
 * @return {object}
 */
const getGatewayRawRecordBySerialNumber = async (serial_number) => {
  return await GatewayDataModel.findOne({ serial_number });
};

/**
 * Read all Gateway records in the database.
 *
 * @return {object}
 */
const getAllGatewayRecords = async () => {
  return await GatewayDataModel.find().populate('peripherals');
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

/**
 * Find a document by ID and remove
 *
 * @param {string} id
 */
const findByIdAndRemove = async (id) => await GatewayDataModel.findOneAndRemove({ _id: id });

/**
 * Find a document by ID and update
 *
 * @param {string} id
 */
const findByIdAndUpdate = async (id, payload) => await GatewayDataModel.findByIdAndUpdate({ _id: id }, payload);

/**
 * Remove peripheral device from a gateway
 *
 * @param {string} id
 */
const removePeripheralFromGateway = async (gateway_id, peripheral_id) => {
  await GatewayDataModel.updateOne({ _id: gateway_id }, { $pull: { peripherals: peripheral_id } });
};

module.exports = {
  findByIdAndRemove,
  createNewGatewayRecord,
  createNewPeripheralRecord,
  getGatewayRawRecordBySerialNumber,
  getGatewayRecordBySerialNumber,
  getAllGatewayRecords,
  findByIdAndUpdate,
  removePeripheralFromGateway,
};
