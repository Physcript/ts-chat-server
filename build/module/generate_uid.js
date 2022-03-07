"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_uid = void 0;
const generate_uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
exports.generate_uid = generate_uid;
