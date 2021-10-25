// Import all modules

import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

// Setup dotenv

import * as dotenv from "dotenv";
dotenv.config();

// Import Models

import { Post } from "./Models/Post";
import { Profile } from "./Models/Profile";
import { PostComment } from "./Models/PostComment";

// Set up connection

const connection = createConnection({
    type: "sqlite",
    database: "../ext/knowgate.sqlite",
    logging: false,
    entities: [
        __dirname + "/Models/*.js"
    ],
});

// Declare port and app

const port: number = 8000;

// Helper Class - App

import app from './App';

export { app, connection, Post, Profile, PostComment }

// Enable listening on given port

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});