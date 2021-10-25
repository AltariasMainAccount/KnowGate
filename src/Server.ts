import "reflect-metadata";
import {createConnection} from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./Routes/Routes";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: "/swagger.json", }, }));

app.use(Router);

createConnection().then(_connection => {
  console.log(_connection)
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}).catch(err => {
  console.log("Unable to connect to db", err);
  process.exit(1)
})