import express, { type Express } from "express";
import { RegisterRoutes } from "../build/routes";

declare global {
  var testApp: Express;
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

RegisterRoutes(app);

global.testApp = app;
