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
exports.online_user = exports.check_token = exports.find_by_email = exports.find_by_name = void 0;
const User_1 = __importDefault(require("../model/User"));
const setting_1 = __importDefault(require("../config/setting"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const find_by_name = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ name });
    return user;
});
exports.find_by_name = find_by_name;
const find_by_email = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    return user;
});
exports.find_by_email = find_by_email;
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
exports.check_token = check_token;
const online_user = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.find({ status: true });
});
exports.online_user = online_user;
