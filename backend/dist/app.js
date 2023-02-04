"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signUp_1 = __importDefault(require("./routes/signUp"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use("/signup", signUp_1.default);
app.use("/login", login_1.default);
app.listen(port, () => {
    console.log(`[server]: server is listening at http://localhost:${port}/`);
});
//# sourceMappingURL=app.js.map