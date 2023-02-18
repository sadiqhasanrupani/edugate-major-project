"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const error = (error, req, res, next) => {
    const status = error.errorStatus || 500;
    const data = error.errorData;
    const message = error.message;
    return res.status(status).json({ message, data });
};
exports.error = error;
//# sourceMappingURL=error.js.map