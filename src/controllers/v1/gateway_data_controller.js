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
    .then((response) => {
      return apiResponse.successApiResponse(res, response, 'success', 201);
    })
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
    .then((data) => {
      return apiResponse.successApiResponse(res, data, 'success', 200);
    })
    .catch((error) => {
      console.error('Cache data read error : '.error);

      return apiResponse.errorApiResponse(res, error, 'error', 404);
    });
};
