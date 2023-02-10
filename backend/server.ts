import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({
  path: path.join(__dirname, "../../backend/config/config.env"),
});

import { app } from "./app";
import { connectDatabase } from "./config/database";

process.on("uncaughtException", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to Uncaught Exception");
  process.exit(1);
});

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to Unhandled Promise Rejections");
  process.exit(1);
});
