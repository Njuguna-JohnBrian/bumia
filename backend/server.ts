import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({
  path: path.join(__dirname, "../../backend/config/config.env"),
});

import { app } from "./app";
import { connectDatabase } from "./config/database";
import { BumiaDefinitions } from "./interfaces/error.interface";

process.on(`${BumiaDefinitions.UNCAUGHT_EXCEPTION}`, (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`${BumiaDefinitions.SHUTTING_EXCEPTION}`);
  process.exit(1);
});

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on(`${BumiaDefinitions.UNHANDLED_PROMISE}`, (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`${BumiaDefinitions.SHUTTING_PROMISE}`);
  process.exit(1);
});
