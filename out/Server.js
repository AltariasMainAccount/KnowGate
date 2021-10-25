"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var Routes_1 = __importDefault(require("./Routes/Routes"));
var PORT = process.env.PORT || 8000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("public"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, { swaggerOptions: { url: "../tsoa.json", }, }));
app.use(Routes_1.default);
(0, typeorm_1.createConnection)().then(function (_connection) {
    console.log(_connection);
    app.listen(PORT, function () {
        console.log("Server is running on port", PORT);
    });
}).catch(function (err) {
    console.log("Unable to connect to db", err);
    process.exit(1);
});
