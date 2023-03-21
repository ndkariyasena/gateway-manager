import { Router } from "express";

/* Middleware imports */
import { validator } from "../../middleware/data_validator";
import { createGateway, addPeripheralToGateway } from "../../validations/data_validations";

/* Controller imports */
const gatewayDataController = require("../../controllers/v1/gateway_data_controller");

export const GatewayRoutes = Router();

/* -- Routes -- */
/* Create a new record */
GatewayRoutes.post("/", validator(createGateway, "body"), gatewayDataController.createGatewayRecord);

GatewayRoutes.get("/", gatewayDataController.getAllGatewayRecords);

/* Get a gateway record by serial_number */
GatewayRoutes.get("/:serial_number", gatewayDataController.getGatewayBySerialNumber);

/* Add a new peripheral device to the gateway */
GatewayRoutes.put(
  "/:serial_number/peripheral",
  validator(addPeripheralToGateway, "body"),
  gatewayDataController.addPeripheralToGateway
);

/* Delete a gateway record by serial-number */
GatewayRoutes.delete("/:serial_number", gatewayDataController.deleteGatewayBySerialNumber);

/* Delete a peripheral device by UID */
GatewayRoutes.delete("/:serial_number/peripheral/:peripheral_uid", gatewayDataController.deletePeripheralDeviceByUid);
