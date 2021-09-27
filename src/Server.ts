// Import CJS modules.

import { Sequelize, Model, DataTypes } from 'sequelize';
import express from 'express';
import * as path from 'path';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../ext/knowgate.sqlite'
});

export { sequelize };

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Success!");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views/"));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
    console.log("Rendered index page.");
});

app.listen(5000);