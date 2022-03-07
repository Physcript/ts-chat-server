"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../route/user"));
module.exports = (app) => {
    // routes
    app.use('/api', user_1.default);
    // not found
    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found'
        });
    });
    return;
};
