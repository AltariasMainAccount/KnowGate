// Import all modules

import "reflect-metadata";
import { createConnection } from "typeorm";

// Setup dotenv

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

// Import Models

import { Post } from "./Models/Post";
import { Profile } from "./Models/Profile";
import { PostComment } from "./Models/PostComment";

const connection = createConnection({
    type: "sqlite",
    database: "../ext/knowgate.sqlite",
    entities: [
        __dirname + "/Models/*.js"
    ],
    logging: false
});

export { connection, Post, Profile, PostComment }

// Express Code goes here

if (!process.env.PORT) { console.log("The port is not defined"); process.exit(1); } // If port doesn't exist, exit out. No port, no boot.

const port: number = parseInt(process.env.PORT as string, 10);
const app = express(); // Declare Express App

// All the Middleware

app.use(helmet()); // Helmet reduces attack vectors by setting HTTP headers
app.use(cors()); // CORS (https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing)
app.use(express.json()); // Default JSON Middleware

// Enable listening on given port

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});