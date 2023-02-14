const mongoose = require('mongoose');

const { getConnection } = require('../../../configs/database/mongodb');
const { PeripheralDataSchema, PeripheralModelName } = require('../peripheral_data_model');

const { Schema } = mongoose;
const APP_VERSION = 'V1';
const { MAX_PERIPHERALS_PER_GATEWAY = 10, V1_DB_NAME } = process.env;
const MODEL_NAME = 'gateway';

const conn = getConnection(V1_DB_NAME, APP_VERSION);

mongoose.connection = conn;

const peripheralsLimitValidator = (values) => {
  console.log({values})
  return values.length <= Number(MAX_PERIPHERALS_PER_GATEWAY)
};

/* Schema */
const GatewayDataSchema = new Schema(
  {
    serial_number: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ipv4_address: { type: String, required: true },
    peripherals: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: PeripheralModelName,
          // validate: [peripheralsLimitValidator, '{PATH} exceeds the limit of 10.'],
        },
      ],
      validate: [peripheralsLimitValidator, '{PATH} exceeds the limit of 10.'],
    },
    // peripherals: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: PeripheralModelName,
    //     validate: [peripheralsLimitValidator, '{PATH} exceeds the limit of 10.'],
    //   },
    // ],
  },
  { timestamps: true }
);

const GatewayDataModel = mongoose.model(MODEL_NAME, GatewayDataSchema);

module.exports = {
  GatewayModelName: MODEL_NAME,
  GatewayDataModel,
  GatewayDataSchema,
};
