/* Package imports */
const router = require('express').Router();

/* Middleware imports */
const validator = require('../../middleware/data_validator');
const { createGateway, addPeripheralToGateway } = require('../../validations/data_validations');

/* Controller imports */
const gatewayDataController = require('../../controllers/v1/gateway_data_controller');

/* -- Routes -- */
/* Create a new record */
router.post('/', validator(createGateway, 'body'), gatewayDataController.createGatewayRecord);

router.get('/', gatewayDataController.getAllGatewayRecords);

/* Get a gateway record by serial_number */
router.get('/:serial_number', gatewayDataController.getGatewayBySerialNumber);

/* Add a new peripheral device to the gateway */
router.put(
  '/:serial_number/peripheral',
  validator(addPeripheralToGateway, 'body'),
  gatewayDataController.addPeripheralToGateway
);

/* Delete a gateway record by serial-number */
router.delete('/:serial_number', gatewayDataController.deleteGatewayBySerialNumber);

/* Delete a peripheral device by UID */
router.delete('/:serial_number/peripheral/:peripheral_uid', gatewayDataController.deletePeripheralDeviceByUid);

module.exports = router;
