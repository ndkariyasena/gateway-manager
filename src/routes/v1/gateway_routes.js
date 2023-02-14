/* Package imports */
const router = require('express').Router();

/* Middleware imports */
const validator = require('../../middleware/data_validator');
const { createGateway } = require('../../validations/data_validations');

/* Controller imports */
const gatewayDataController = require('../../controllers/v1/gateway_data_controller');

/* -- Routes -- */
/* Create a new record */
router.post('/', validator(createGateway, 'body'), gatewayDataController.createGatewayRecord);

/* Get a gateway record by serial_number */
router.get('/:serial_number', gatewayDataController.getGatewayBySerialNumber);

module.exports = router;
