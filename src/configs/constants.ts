export const PERIPHERAL_STATUS = {
  ONLINE: "online",
  OFFLINE: "offline",
};

export const ALLOWED_URL_PROTOCOLS: string[] = process.env.ALLOWED_URL_PROTOCOLS !== undefined
  ? process.env.ALLOWED_URL_PROTOCOLS.split(",") 
  : [];

export const { 
  STRINGS_SET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  RANDOM_TEXT_LENGTH = 8,
  SERVICE_BASE_URL,
  PORT = 5000, 
  HOST = "localhost", 
  APP_NAME = "",
  NODE_ENV = "development",
  MONGODB_DATABASE = "development",
  MONGODB_CONNECTION = `mongodb://${HOST}:${PORT}/${MONGODB_DATABASE}`
} = process.env;
