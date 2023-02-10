import express, { Express } from "express";

import { health } from "./routes/health.router";
import { product } from "./routes/product.router";
import { errorMiddleware } from "./middlewares/errors.middleware";

const app: Express = express();

app.use(express.json());

const baseUrl = "/bumia/v1";

app.use(baseUrl, health);

app.use(baseUrl, product);

app.use(errorMiddleware);

export { app };
