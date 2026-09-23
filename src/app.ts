import express, { type Express, urlencoded, json } from "express";
import { RegisterRoutes } from "../build/routes";

export const app: Express = express();

app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

RegisterRoutes(app);
