import "dotenv-safe/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
//routes
import auth from "./routes/auth";
import user from './routes/user'

const morgan = require("morgan");

const main = () => {
  const app = express();

  morgan.token("body", (req: express.Request) => JSON.stringify(req.body));
  app.use(
    morgan(
      ":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
    )
  );

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());

  app.use("/auth", auth);
  app.use('/user', user)

  app.use((_, res: express.Response) => {
    res.status(404).json({ status: "404" });
  });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT} `);
  });
};

main();
