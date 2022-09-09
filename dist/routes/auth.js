"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/spotify", passport_1.default.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
}));
router.get("/spotify/callback", passport_1.default.authenticate("spotify", {
    failureRedirect: "/auth/failed",
    successRedirect: process.env.CLIENT_URL,
}));
router.get("/success", (req, res) => {
    if (req.user) {
        res.status(200).json({ success: true, user: req.user });
    }
});
router.get("/failed", (_, res) => {
    res.status(401).json({ success: false, message: "failure" });
});
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(process.env.CLIENT_URL);
    });
    res.redirect(process.env.CLIENT_URL);
});
exports.default = router;
//# sourceMappingURL=auth.js.map