import "dotenv-safe/config";
import "reflect-metadata";
import express from "express";
import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";

//routes 
import auth from './routes/auth'

const morgan = require("morgan");

const session = require("express-session");
const connectRedis = require("connect-redis");
const redis = require("redis");

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const main = () => {
  const app = express();

  morgan.token("body", (req: express.Request) => JSON.stringify(req.body));
  app.use(
    morgan(
      ":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
    )
  );

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        // secure: process.env.NODE_ENV === 'production' ? true : false, // if true: only transmit cookie over https, in prod, always activate this
        httpOnly: true, // if true: prevents client side JS from reading the cookie
        maxAge: 60 * 60 * 1000 * 24 * 3, // session max age in milliseconds (3 days)
        // explicitly set cookie to lax
        // to make sure that all cookies accept it
        // you should never use none anyway
        sameSite: "lax",
      },
    })
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user)
  })

  passport.deserializeUser((user: any, done: any) => {
    done(null, user)
  })

  passport.use(
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID as string,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
        callbackURL: `${process.env.API_URL}/auth/spotify/callback`
      },
      function(_accessToken, _refreshToken, _expires_in, profile, done) {
        done(null, profile);
      }
    )
  );

  app.use('/auth', auth)

  app.use((_, res: express.Response) => {
    res.status(404).json({ status: "404" });
  });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  });
};

main();
