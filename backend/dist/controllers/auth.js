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
exports.postLogin = exports.postSignup = void 0;
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
const mailSend_mail_1 = __importDefault(require("../utils/mails/mailSend.mail"));
const welcome_1 = __importDefault(require("../utils/mails/messages/welcome"));
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userEmail, userPhoneNumber, userDOB, userPassword } = yield req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Invalid Credentials");
        error.errorStatus = 422;
        error.errorData = errors.array();
        throw error;
    }
    else {
        return bcrypt_1.default
            .hash(userPassword, 12)
            .then((hashPassword) => {
            user_1.default.create({
                userId: (0, uuid_1.v4)(),
                userName,
                userEmail,
                userPhoneNumber,
                userDOB,
                userPassword: hashPassword,
            })
                .then((user) => {
                (0, mailSend_mail_1.default)({
                    to: userEmail,
                    subject: "Welcome to Edugate",
                    htmlMessage: (0, welcome_1.default)(userName),
                })
                    .then(() => {
                    res.status(200).json({
                        message: "user created successfully.",
                        data: {
                            id: user.userId,
                        },
                    });
                })
                    .catch((err) => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                        err.message = "Something went wrong";
                        err.errorData = err;
                    }
                });
            })
                .catch((err) => {
                if (!err.statusCode && !err.message) {
                    err.statusCode = 402;
                    err.message = "Cannot created a user";
                    next(err);
                }
            });
        })
            .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
                err.message = "Something went wrong in the backend";
                err.errorData = err;
            }
        });
    }
});
exports.postSignup = postSignup;
const postLogin = (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Invalid credentials");
        error.statusCode = 422;
        error.errorData = errors.array();
        throw error;
    }
    else {
        user_1.default.findOne({
            attributes: ["userEmail", "userPassword", "userId"],
            where: { userEmail },
        }).then((userData) => {
            const token = jsonwebtoken_1.default.sign({
                email: userData.userEmail,
                userId: userData.userId,
            }, process.env.SECRET_TOKEN, {
                expiresIn: "1h",
            });
            res.status(200).json({ token: token, userId: userData.userId });
        });
    }
};
exports.postLogin = postLogin;
//# sourceMappingURL=auth.js.map