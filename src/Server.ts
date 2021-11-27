import "reflect-metadata";

// VERY DISGUSTING, BUT APPARENTLY IT'S THE ONLY POSSIBLE WAY
import 'dotenv/config'
const SECRET = <string>process.env.SECRET;

export { SECRET };

import { createConnection } from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import { jwt } from "./Helpers/jwt";
import { errorHandler } from "./Helpers/error_handler";
import Router from "./Routes/Routes";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;

const app: Application = express();

// Set the rendering engine to pug
app.set("view engine", "pug");

// Only take requests in form of JSON
app.use(express.json());

// Log everything in compact form
app.use(morgan("tiny"));

// Set the static directory to use "public"
app.use(express.static("public"));

// Set the cookieparser
app.use(cookieParser());

// Use a jwt middleware to authenticate everything
app.use(jwt());

// Use a custom error handler
app.use(errorHandler);

// Use all routes defined within the "router" file
app.use(Router);

// Create the connection to the database
createConnection().then(_connection => {
  // Start the webserver
  app.listen(PORT, () => { // Start it on PORT, which is 8000
    console.log("Server is running on port", PORT);
  });
}).catch(err => { // Catch an error during the connection with the database.
  console.log("Unable to connect to db", err);
  process.exit(1)
})