import express, { Express } from "express";

import { health } from "./routes/health.router";
import { product } from "./routes/product.router";

const app: Express = express();

app.use(express.json());

const baseUrl = "/bumia/v1";

app.use(baseUrl, health);

app.use(baseUrl, product);

export { app };
