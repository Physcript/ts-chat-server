"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SERVER: {
        HOST: 'localhost',
        PORT: '1337'
    },
    DATABASE: {
        URL: 'mongodb://127.0.0.1/chat',
        OPTIONS: {
            useUnifiedTopology: true,
            wtimeoutMS: 50000,
            maxPoolSize: 50
        }
    },
    TOKEN: {
        LOGIN: 'IOLETEMPLANZA'
    }
};
