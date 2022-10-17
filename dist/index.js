"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const morgan = require("morgan");
const main = () => {
    const app = (0, express_1.default)();
    morgan.token("body", (req) => JSON.stringify(req.body));
    app.use(morgan(":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"));
    app.use((0, cors_1.default)({
        origin: "*",
    }));
    app.use(express_1.default.json());
    app.use("/auth", auth_1.default);
    app.use('/user', user_1.default);
    app.get("/", (_, res) => {
        res.send("Hello world");
    });
    app.use((_, res) => {
        res.status(404).json({ status: "404" });
    });
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT} `);
    });
};
main();
//# sourceMappingURL=index.js.map