import mongoose from "mongoose";
import { MONGODB_CONNECTION } from "../constants";

export const connect = async (connectionUrl: string, options: object | null): Promise<void> => {
  try {
    const connectionOption = options ? options : {};

    await mongoose.connect(connectionUrl, connectionOption);
    console.log("Connected to MongoDB");

    mongoose.connection.on("connected", () => console.info("Connection is open to ", connectionUrl));
  
    mongoose.connection.on("error", (err) => console.warn(`Connection has occurred ${err}error`));
  
    mongoose.connection.on("disconnected", () => console.error("Connection is disconnected"));
  
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.warn("connection is disconnected due to application termination");
  
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export async function disconnect(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB", error);
  }
};

export const getDatabaseConnection = async () => {

  const connectionOption: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  await connect(MONGODB_CONNECTION, connectionOption);

  const db = mongoose.connection;
  if (!db) throw new Error("Database connection not established");

  return db;
};
