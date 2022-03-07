"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (app) => {
    app.use((req, res, next) => {
        console.log(`Method: ${req.method} , Url: ${req.url}`);
        next();
    });
    return;
};
