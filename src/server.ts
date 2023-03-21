import * as dotenv from "dotenv";
dotenv.config();

import appCreate from "./app";
import { PORT, HOST, APP_NAME } from "./configs/constants";

const ApplicationName: string = APP_NAME.replace(/^./, APP_NAME[0].toUpperCase());
const { JSON_PARSER_LIMIT = "50mb" } = process.env;

const app = appCreate({ JSON_PARSER_LIMIT });

/* Server start */
app.listen(Number(PORT), HOST, (): void => {
  console.log(
    `\n/------------/\n"${ApplicationName}" server start running on http://${HOST}:${PORT}\n/------------/\n`
  );
});