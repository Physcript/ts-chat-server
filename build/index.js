"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = __importDefault(require("./config/setting"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
// const
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const corsOption = {
    origin: true,
    credentials: true
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOption));
app.use((0, cookie_parser_1.default)());
// middleware
require('./config/middleware')(app);
// cors
require('./config/cors')(app);
//  io
require('./config/io')(httpServer);
// routes
require('./config/route')(app);
// initialize
mongoose_1.default
    .connect(`${setting_1.default.DATABASE.URL}`, setting_1.default.DATABASE.OPTIONS)
    .then(() => console.log('Database conneccted'))
    .catch((error) => console.log(`error, ${error}`));
httpServer.listen(setting_1.default.SERVER.PORT, () => {
    console.log(`Server: ${setting_1.default.SERVER.PORT}`);
});
