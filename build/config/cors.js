"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (app) => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,OPTIONS,UPDATE,POST');
        res.setHeader('Access-Control-Allow-headers', 'X-Requested-With,Content-Type,token');
        res.setHeader('Access-Control-Allow-credentials', 'true');
        next();
    });
    return;
};
