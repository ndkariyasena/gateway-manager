/* Module imports */
const apiResponse = require('../../helpers/api_response');
const gatewayDataService = require('../../services/v1/gateway_data_service');

/**
 * Method: @POST
 * Request : Create a gateway record by serial number
 * @param req
 * @param res
 */
exports.createGatewayRecord = async (req, res) => {
  const { body } = req;

  return await gatewayDataService
    .createNewGatewayRecord(body)
    .then((response) => apiResponse.successApiResponse(res, response, 'success', 201))
    .catch((error) => {
      console.error('createGateway error : '.error);

      return apiResponse.errorApiResponse(res, error, 'error', 404);
    });
};

/**
 * Method: @GET
 * Request: Get a gateway record by serial_number
 * @param req
 * @param res
 */
exports.getGatewayBySerialNumber = async (req, res) => {
  const {
    params: { serial_number },
  } = req;

  return await gatewayDataService
    .getGatewayBySerialNumber(serial_number)
    .then((data) => apiResponse.successApiResponse(res, data, 'success', 200))
    .catch((error) => {
      console.error('Cache data read error : '.error);

      return apiResponse.errorApiResponse(res, error, 'error', 404);
    });
};

/**
 * Method: @PUT
 * Request: Add new peripheral object to the gateway record
 * @param req
 * @param res
 */
exports.addPeripheralToGateway = async (req, res) => {
  const {
    params: { serial_number },
    body,
  } = req;

  return await gatewayDataService
    .addPeripheralToGateway(serial_number, body)
    .then((data) => apiResponse.successApiResponse(res, data, 'success', 200))
    .catch((error) => {
      console.error('Cache data read error : '.error);

      return apiResponse.errorApiResponse(res, error, 'error', 404);
    });
};

/**
 * Method: @GET
 * Request: Get all gateway records
 * @param req
 * @param res
 */
exports.getAllGatewayRecords = async (req, res) => {
  const {
    params: { serial_number },
  } = req;

  return await gatewayDataService
    .getAllGatewayRecords(serial_number)
    .then((data) => apiResponse.successApiResponse(res, data, 'success', 200))
    .catch((error) => {
      console.error('Cache data read error : '.error);

      return apiResponse.errorApiResponse(res, error, 'error', 404);
    });
};

/**
 * Method: @DELETE
 * Request: Delete a gateway record
 * @param req
 * @param res
 */
exports.deleteGatewayBySerialNumber = async (req, res) => {
  const {
    params: { serial_number },
  } = req;

  return await gatewayDataService
    .deleteGatewayBySerialNumber(serial_number)
    .then((response) => apiResponse.successApiResponse(res, response, 'success', response.record_removed ? 204 : 404))
    .catch((error) => {
      console.error('deleteAllCache error : '.error);

      return apiResponse.errorApiResponse(res, error, 'error', 404);
    });
};

/**
 * Method: @DELETE
 * Request: Delete a peripheral device
 * @param req
 * @param res
 */
exports.deletePeripheralDeviceByUid = async (req, res) => {
  const {
    params: { serial_number, peripheral_uid },
  } = req;

  return await gatewayDataService
    .deletePeripheralDeviceByUid(serial_number, Number(peripheral_uid))
    .then((response) => apiResponse.successApiResponse(res, response, 'success', response.record_removed ? 204 : 404))
    .catch((error) => {
      console.error('deleteAllCache error : '.error);

      return apiResponse.errorApiResponse(res, error, 'error', 404);
    });
};
