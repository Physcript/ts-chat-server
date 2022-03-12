"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_token = void 0;
const setting_1 = __importDefault(require("../config/setting"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generate_token = (user) => {
    const data = {
        _id: user._id,
        name: user.name,
        uid: user.uid,
        email: user.email,
        avatar: user.avatar,
        status: true,
        token: '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
    const token = jsonwebtoken_1.default.sign(data, `${setting_1.default.TOKEN.LOGIN}`);
    const result = {
        token,
        user: data
    };
    return result;
};
exports.generate_token = generate_token;
