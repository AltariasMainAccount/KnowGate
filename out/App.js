"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var App = /** @class */ (function () {
    function App() {
        // initializing express in this application
        this.app = (0, express_1.default)(); // support application/json type post data
        this.app.use(body_parser_1.default.json()); //support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: false })); // for routing the http request to controller
        this.app.use((0, helmet_1.default)()); // Helmet reduces attack vectors by setting HTTP headers
        this.app.use((0, cors_1.default)()); // CORS (https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing)
        this.app.use(express_1.default.json()); // Default JSON Middleware
    }
    return App;
}());
exports.default = new App().app;
