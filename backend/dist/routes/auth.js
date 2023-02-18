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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../controllers/auth");
const user_1 = __importDefault(require("../models/user"));
const regex_1 = require("../utils/regex");
const router = (0, express_1.Router)();
router.post("/signup", (0, express_validator_1.body)("userName", "Username should be more then 6 character").isLength({
    min: 6,
}), (0, express_validator_1.body)("userEmail")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!regex_1.gmailRegex.test(value)) {
        throw new Error("Email's domain should be GmailId");
    }
    else {
        return user_1.default.findOne({
            attributes: ["userEmail"],
            where: { userEmail: value },
        }).then((emailId) => {
            if (emailId) {
                return Promise.reject("Email Exists already, try with another emailId.");
            }
        });
    }
})), (0, express_validator_1.body)("userPhoneNumber", "Phone number should have exactly 13 characters")
    .isLength({ min: 13, max: 13 })
    .custom((value, { req }) => {
    if (!regex_1.numRegex.test(value)) {
        throw new Error("Please enter a valid phone number");
    }
    return true;
}), (0, express_validator_1.body)("userDOB").custom((value, { req }) => {
    if (!regex_1.dateRegex.test(value)) {
        throw new Error("Enter a valid DOB");
    }
    return true;
}), (0, express_validator_1.body)("userPassword", "Please enter a password with only number and text and also it should be more than 6 character ")
    .isLength({ min: 6 })
    .isAlphanumeric(), (0, express_validator_1.body)("userConfirmPassword").custom((value, { req }) => {
    if (value !== req.body.userPassword) {
        throw new Error("Both password should be match.");
    }
    else {
        return true;
    }
}), (0, express_validator_1.body)("user"), auth_1.postSignup);
router.post("/login", (0, express_validator_1.body)("userEmail", "Please enter a valid EmailId")
    .isEmail()
    .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!regex_1.gmailRegex.test(value)) {
        throw new Error("Email's domain should be GmailId");
    }
    else {
        return user_1.default.findOne({
            attributes: ["userEmail"],
            where: { userEmail: value },
        }).then((emailId) => {
            if (!emailId) {
                return Promise.reject("Email is not exists in the database");
            }
        });
    }
})), (0, express_validator_1.body)("userPassword", "Enter correct password")
    .not()
    .isEmpty()
    .isAlphanumeric()
    .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: { userEmail: req.body.userEmail },
    });
    return bcrypt_1.default.compare(value, user.userPassword).then((result) => {
        if (!result) {
            return Promise.reject("password did not match");
        }
    });
})), auth_1.postLogin);
exports.default = router;
//# sourceMappingURL=auth.js.map