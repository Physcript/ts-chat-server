"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const register_1 = __importDefault(require("../middleware/user/register"));
const login_1 = __importDefault(require("../middleware/user/login"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const logout_1 = __importDefault(require("../middleware/user/logout"));
const router = express_1.default.Router();
router.post('/register', register_1.default, user_1.default.register);
router.post('/login', login_1.default, user_1.default.login);
router.post('/auth', authenticate_1.default, user_1.default.authenticate);
router.post('/logout', logout_1.default, user_1.default.logout);
exports.default = router;
