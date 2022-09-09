"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_spotify_1 = require("passport-spotify");
const auth_1 = __importDefault(require("./routes/auth"));
const morgan = require("morgan");
const session = require("express-session");
const connectRedis = require("connect-redis");
const redis = require("redis");
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();
const main = () => {
    const app = (0, express_1.default)();
    morgan.token("body", (req) => JSON.stringify(req.body));
    app.use(morgan(":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"));
    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60 * 60 * 1000 * 24 * 3,
            sameSite: "lax",
        },
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.use(new passport_spotify_1.Strategy({
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}/auth/spotify/callback`
    }, function (_accessToken, _refreshToken, _expires_in, profile, done) {
        done(null, profile);
    }));
    app.use('/auth', auth_1.default);
    app.use((_, res) => {
        res.status(404).json({ status: "404" });
    });
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
    });
};
main();
//# sourceMappingURL=index.js.map