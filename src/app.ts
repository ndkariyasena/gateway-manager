import * as dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import swaggerUiExpress from "swagger-ui-express";

import { GatewayRoutes } from "./routes/v1/gateway_routes";
// import { specs } from "./swagger";
import { APP_NAME } from "./configs/constants";

export default ({ JSON_PARSER_LIMIT }: { JSON_PARSER_LIMIT: string }) => {
  const ApplicationName: string = APP_NAME.replace(/^./, APP_NAME[0].toUpperCase());

  const app: Application = express();

  app.use(cors());

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json({ limit: JSON_PARSER_LIMIT }));

  /* Routes define */
  app.use("/api/v1/gateways", GatewayRoutes);

  // app.use("/api/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

  app.get("/", (req: Request, res: Response): Response => res.json({ api: `Welcome to the ${ApplicationName} service` }));

  return app;
};
