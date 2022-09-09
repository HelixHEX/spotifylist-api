import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
  })
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/auth/failed",
    successRedirect: process.env.CLIENT_URL,
  })
);

router.get("/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ success: true, user: req.user });
  }
});

router.get("/failed", (_, res) => {
  res.status(401).json({ success: false, message: "failure" });
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); } 
    res.redirect(process.env.CLIENT_URL as string);
  });
  res.redirect(process.env.CLIENT_URL as string);
})

export default router