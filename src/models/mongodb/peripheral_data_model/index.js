const mongoose = require('mongoose');

const { getConnection } = require('../../../configs/database/mongodb');
const { PERIPHERAL_STATUS } = require('../../../configs/constants');

const { Schema } = mongoose;
const APP_VERSION = 'V1';
const { V1_DB_NAME } = process.env;
const MODEL_NAME = 'peripheral';

const conn = getConnection(V1_DB_NAME, APP_VERSION);

mongoose.connection = conn;

/* Schema */
const PeripheralDataSchema = new Schema(
  {
    uid: { type: Number, required: true, unique: true },
    vendor: { type: String },
    status: { type: String, enum: Object.values(PERIPHERAL_STATUS) },
    manufactured_date: { type: String },
  },
  { timestamps: true }
);

const PeripheralDataModel = mongoose.model(MODEL_NAME, PeripheralDataSchema);

module.exports = {
  PeripheralModelName: MODEL_NAME,
  PeripheralDataModel,
  PeripheralDataSchema,
};
