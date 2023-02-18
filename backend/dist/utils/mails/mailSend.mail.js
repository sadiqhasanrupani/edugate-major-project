"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_config_1 = __importDefault(require("./mail.config"));
const mailSend = (message) => {
    return mail_config_1.default.sendMail({
        from: `"Edugate" <edugate110@gmail.com>`,
        to: message.to,
        subject: message.subject,
        html: message.htmlMessage,
    });
};
exports.default = mailSend;
//# sourceMappingURL=mailSend.mail.js.map