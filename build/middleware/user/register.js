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
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const main_1 = require("../main");
const generate_uid_1 = require("../../module/generate_uid");
const generate_avatar_1 = require("../../module/generate_avatar");
const User_1 = __importDefault(require("../../model/User"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    const error = check_empty_string(req);
    const validate_email = yield check_email(email);
    const validate_password = check_password(password, confirmPassword);
    if (Object.keys(error).length >= 1) {
        res.status(400).json({
            error
        });
        return;
    }
    if (yield (0, main_1.find_by_name)(name)) {
        res.status(400).json({
            error: {
                name: 'Name already exists'
            }
        });
        return;
    }
    if (Object.keys(validate_email).length >= 1) {
        res.status(400).json({
            error: {
                email: validate_email
            }
        });
        return;
    }
    if (Object.keys(validate_password).length >= 1) {
        res.status(400).json({
            error: {
                password: validate_password
            }
        });
        return;
    }
    const uid = generate_uid_1.generate_uid;
    const avatar = generate_avatar_1.generate_avatar;
    const encrypt = yield encrypt_password(password);
    const user = new User_1.default({
        name,
        password: encrypt,
        email,
        uid,
        avatar,
    });
    yield user.save();
    // 
    // DONE chk error from check_empty_string
    // DONE chk error for duplicate name
    // DONE chck error from duplicate and invalid email
    // DONE chck passwrd no space min 6 then match for confirm password
    //
    // DONE generate uid
    // DONE generate avatar from user randomly
    // DONE finally encrypt password
    // FINALIZE SAVE DB THEN RETURN 
    next();
});
const check_empty_string = (req) => {
    const { name, email, password, confirmPassword } = req.body;
    const error = {};
    const data = {
        Name: name,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword
    };
    Object.entries(data).forEach(([key, value]) => {
        if (value.trim() === '') {
            error[key] = `${key} required`;
        }
    });
    return error;
};
const check_email = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const error = {};
    const user = yield (0, main_1.find_by_email)(email);
    if (user) {
        return error['email'] = 'Email already exist';
    }
    if (!validator_1.default.isEmail(email)) {
        return error['email'] = 'Enter valid email';
    }
    return error;
});
const check_password = (password, confirmPassword) => {
    const error = {};
    if (password !== confirmPassword) {
        error['password'] = 'Passowrd not match';
    }
    if (password.includes(' ')) {
        error['password'] = 'Invalid password';
    }
    if (password.length <= 5) {
        error['password'] = 'Password is too short';
    }
    return error;
};
const encrypt_password = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const encrypt = yield bcrypt_1.default.hash(password, 8);
    return encrypt;
});
exports.default = register;
