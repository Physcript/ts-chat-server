"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    login: ((req, res) => {
        res.status(200).json({
            message: {
                user: res.locals.user,
                token: res.locals.token
            }
        });
        res.locals.user = undefined;
        res.locals.token = undefined;
        return;
    }),
    logout: ((req, res) => {
        res.status(200).json({
            message: 'Logout'
        });
        return;
    }),
    register: ((req, res) => {
        res.status(200).json({
            message: 'Register'
        });
        return;
    }),
    authenticate: ((req, res) => {
        res.status(200).json({
            message: {
                user: res.locals.user
            }
        });
        return;
    })
};
