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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setting_1 = __importDefault(require("../config/setting"));
const User_1 = __importDefault(require("../model/User"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // testing
    const { token } = req.body;
    // deployment
    // const token = req.headers.token
    const user = yield check_token(token);
    if (!user) {
        res.status(401).json({
            error: 'Invalid auth'
        });
        return;
    }
    const filter = { email: user.email };
    const update = { status: true };
    yield User_1.default.findOneAndUpdate(filter, update);
    res.locals.user = user;
    next();
});
const check_token = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = yield jsonwebtoken_1.default.verify(token, `${setting_1.default.TOKEN.LOGIN}`, (error, decode) => {
        if (error) {
            return null;
        }
        else {
            return decode;
        }
    });
    return decode;
});
exports.default = authenticate;
