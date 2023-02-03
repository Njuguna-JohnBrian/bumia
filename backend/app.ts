import express, { Express } from "express";

import { health } from "./routes/health";

const app: Express = express();

app.use(express.json());

const baseUrl = "/bumia/v1";

app.use(baseUrl, health);

export { app };
