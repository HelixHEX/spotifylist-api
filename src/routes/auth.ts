import express from "express";
import request from "request";

const router = express.Router();

router.get("/callback", (req: express.Request, res: express.Response) => {
  var code = req.query.code || null;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: `${process.env.API_URL}/auth/callback`,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;
      console.log(process.env.NODE_ENV);
      // we can also pass the token to the browser to make requests from there
      res.cookie("access_token", access_token, {
        domain:
          process.env.NODE_ENV === "production"
            ? ".listr.eliaswambugu.com"
            : "localhost",
      });
      res.redirect(
        process.env.NODE_ENV === "production"
          ? "https://"
          : "http://" +
              process.env.CLIENT_URL +
              "/#" +
              new URLSearchParams({
                access_token: access_token,
                refresh_token: refresh_token,
              }).toString()
      );
    } else {
      res.redirect(
        "/#" +
          new URLSearchParams({
            error: "invalid_token",
          }).toString()
      );
    }
  });
});
export default router;
