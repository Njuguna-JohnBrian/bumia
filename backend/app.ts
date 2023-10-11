import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { health } from "./routes/health.router";
import { product } from "./routes/product.router";
import { auth } from "./routes/auth.router";
import { admin } from "./routes/admin.router";
import errorMiddleware from "./middlewares/errors.middleware";
import swaggerDefinition from "./swagger.json";

const app: Express = express();

app.use(express.json());

const baseUrl = "/bumia/v1";

app.use(baseUrl, health);

app.use(baseUrl, product);

app.use(baseUrl, auth);

app.use(baseUrl, admin);

app.use(errorMiddleware);

/**
 * mount swagger
 */
app.use(
    baseUrl + "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDefinition),
  );

  

export { app };
