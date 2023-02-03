import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({
  path: path.join(__dirname, "../../backend/config/config.env"),
});

import { app } from "./app";
import { connectDatabase } from "./config/database";

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
