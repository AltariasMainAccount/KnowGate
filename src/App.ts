import express from 'express';
import {Routes} from "./Routes/Routes";
import * as bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

class App {
    public app: express.Application;
    public routePrv: Routes;
    constructor() {
        // initializing express in this application
        this.app = express(); // support application/json type post data
        this.app.use(bodyParser.json()); //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false })); // for routing the http request to controller
        this.app.use(helmet()); // Helmet reduces attack vectors by setting HTTP headers
        this.app.use(cors()); // CORS (https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing)
        this.app.use(express.json()); // Default JSON Middleware
        this.routePrv = new Routes();
        this.routePrv.routes(this.app);
    }
}

export default new App().app;