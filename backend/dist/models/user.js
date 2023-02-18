"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../utils/database.config"));
const User = database_config_1.default.define("users", {
    userId: {
        type: sequelize_1.STRING,
        allowNull: false,
        primaryKey: true,
    },
    userName: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    userImg: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    userEmail: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    userPhoneNumber: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    userDOB: {
        type: sequelize_1.DATEONLY,
        allowNull: false,
    },
    userPassword: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: sequelize_1.BOOLEAN,
    },
    isTeacher: sequelize_1.BOOLEAN,
    isStudent: sequelize_1.BOOLEAN,
});
exports.default = User;
//# sourceMappingURL=user.js.map