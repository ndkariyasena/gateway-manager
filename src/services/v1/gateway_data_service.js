const { filterDataFoResponse } = require('../../helpers/data_filters');
const {
  createNewGatewayRecord,
  createNewPeripheralRecord,
  getGatewayRecordBySerialNumber,
} = require('../../models/mongodb');

/**
 * Get cache by cache-key logic handler
 *
 * @param {object} payload
 * @return {object}
 */
exports.getGatewayBySerialNumber = async (serial_number) => {
  if (!serial_number || serial_number === '') throw Error('A valid serial_number not found!');

  const gatewayRecord = await getGatewayRecordBySerialNumber(serial_number);

  return filterDataFoResponse(gatewayRecord);
};

/**
 * Create a new gateway record in the database.
 *
 * @param {object} payload
 * @return {object}
 */
exports.createNewGatewayRecord = async (payload) => {
  const { peripherals = [] } = payload;

  const peripheralGeneratePromises = peripherals.map((item) => createNewPeripheralRecord(item));

  return await Promise.allSettled(peripheralGeneratePromises).then(async (peripheralRecords) => {
    const gatewayDataPayload = { ...payload };
    gatewayDataPayload.peripherals = [];

    peripheralRecords.forEach((item) => {
      if (item.status === 'fulfilled') gatewayDataPayload.peripherals.push(item.value['_id']);
    });

    return await createNewGatewayRecord(gatewayDataPayload);
  });
};
