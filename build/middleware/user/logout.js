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
const User_1 = __importDefault(require("../../model/User"));
const main_1 = require("../main");
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // test
    const { token } = req.body;
    //
    const user = yield (0, main_1.check_token)(token);
    if (!user) {
        res.status(401).json({
            error: 'Invalid action'
        });
        return;
    }
    const filter = { email: user.email };
    const update = { token: '', status: false };
    yield User_1.default.findOneAndUpdate(filter, update);
    next();
});
exports.default = logout;
