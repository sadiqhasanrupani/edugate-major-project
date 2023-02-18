"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_config_1 = __importDefault(require("./utils/database.config"));
const auth_1 = __importDefault(require("./routes/auth"));
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Method", "GET,POST,PATCH,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/auth", auth_1.default);
app.use(error_1.error);
database_config_1.default
    .sync()
    .then(() => app.listen(port, () => {
    console.log(`[server]: server is listening at http://localhost:${port}/`);
}))
    .catch((err) => console.log(err));
//# sourceMappingURL=app.js.map