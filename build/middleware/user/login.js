"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const main_1 = require("../main");
const generate_token_1 = require("../../module/generate_token");
const User_1 = __importDefault(require("../../model/User"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, main_1.find_by_email)(email);
    if (!user) {
        res.status(400).json({
            error: 'Email/Password incorrect'
        });
        return;
    }
    const isMatch = yield check_password_match(password, user.password);
    if (!isMatch) {
        res.status(400).json({
            error: 'Email/Password incorrect'
        });
        return;
    }
    const data = (0, generate_token_1.generate_token)(user);
    const filter = { email: user.email };
    const update = { token: data.token, status: true };
    yield User_1.default.findOneAndUpdate(filter, update);
    res.locals.user = data.user;
    res.locals.token = data.token;
    next();
});
const check_password_match = (password, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, userPassword);
});
exports.default = login;
