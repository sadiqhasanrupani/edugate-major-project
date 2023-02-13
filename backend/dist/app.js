"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_config_1 = __importDefault(require("./utils/database.config"));
dotenv_1.default.config();
const signUp_1 = __importDefault(require("./routes/signUp"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Method", "GET,POST,PATCH,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authentication");
    next();
});
app.use("/signup", signUp_1.default);
app.use("/login", login_1.default);
database_config_1.default
    .sync()
    .then((result) => app.listen(port, () => {
    console.log(`[server]: server is listening at http://localhost:${port}/`);
}))
    .catch((err) => console.log(err));
//# sourceMappingURL=app.js.map