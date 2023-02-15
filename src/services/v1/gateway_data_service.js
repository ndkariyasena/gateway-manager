const { filterDataFoResponse } = require('../../helpers/data_filters');
const {
  findByIdAndRemove,
  createNewGatewayRecord,
  createNewPeripheralRecord,
  getGatewayRawRecordBySerialNumber,
  getGatewayRecordBySerialNumber,
  getAllGatewayRecords,
  findByIdAndUpdate,
  removePeripheralFromGateway,
} = require('../../models/mongodb');

/**
 * Get a gateway record by serial-number logic handler
 *
 * @param {string} serial_number
 * @return {object}
 */
exports.getGatewayBySerialNumber = async (serial_number) => {
  if (!serial_number || serial_number === '') throw Error('A valid serial_number not found!');

  const gatewayRecord = await getGatewayRecordBySerialNumber(serial_number);

  if (!gatewayRecord) throw Error('Gateway record not found!');

  return filterDataFoResponse(gatewayRecord);
};

/**
 * Get all gateway records logic handler
 *
 * @return {object}
 */
exports.getAllGatewayRecords = async () => {
  const gatewayRecords = await getAllGatewayRecords();

  if (!gatewayRecords) throw Error('Gateway records not found!');

  return gatewayRecords.map((record) => filterDataFoResponse(record));
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

/**
 * Add new peripheral object to the gateway record by serial-number logic handler
 *
 * @param {string} serial_number
 * @param {object} payload
 * @return {object}
 */
exports.addPeripheralToGateway = async (serial_number, payload) => {
  if (!serial_number || serial_number === '') throw Error('A valid serial_number not found!');

  let gatewayRecord = await getGatewayRawRecordBySerialNumber(serial_number);

  if (!gatewayRecord) throw Error('Gateway record not found!');

  if (gatewayRecord.peripherals.length === 10) throw Error('Gateway has reached peripherals limit of 10!');

  const peripheralRecord = await createNewPeripheralRecord(payload);

  gatewayRecord.peripherals.push(peripheralRecord._id);

  gatewayRecord = await findByIdAndUpdate(serial_number, gatewayRecord);

  return filterDataFoResponse(gatewayRecord);
};

/**
 * Delete a gateway record by serial-number
 *
 * @param {object} payload
 * @return {object}
 */
exports.deleteGatewayBySerialNumber = async (serial_number) => {
  if (!serial_number || serial_number === '') throw Error('Valid serial-number not found!');

  const gatewayRecord = await getGatewayRecordBySerialNumber(serial_number);

  if (gatewayRecord) {
    await findByIdAndRemove(gatewayRecord._id);

    return { record_removed: true };
  }

  return { record_removed: false };
};

/**
 * Delete a peripheral from the gateway record by UID
 *
 * @param {object} payload
 * @return {object}
 */
exports.deletePeripheralDeviceByUid = async (serial_number, peripheral_uid) => {
  if (!serial_number || serial_number === '') throw Error('Valid serial-number not found!');

  if (!peripheral_uid || peripheral_uid === '') throw Error('Valid serial-number not found!');

  const gatewayRecord = await getGatewayRecordBySerialNumber(serial_number);

  if (gatewayRecord) {
    const peripheral = gatewayRecord.peripherals.filter((item) => item.uid === peripheral_uid);

    if (peripheral && peripheral[0]) {
      await removePeripheralFromGateway(gatewayRecord._id, peripheral[0]._id);

      return { record_removed: true };
    }
  }

  return { record_removed: false };
};
