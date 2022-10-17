"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const router = express_1.default.Router();
router.get("/callback", (req, res) => {
    var code = req.query.code || null;
    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            code: code,
            redirect_uri: `${process.env.API_URL}/auth/callback`,
            grant_type: "authorization_code",
        },
        headers: {
            Authorization: "Basic " +
                Buffer.from(process.env.SPOTIFY_CLIENT_ID +
                    ":" +
                    process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
        },
        json: true,
    };
    request_1.default.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token, refresh_token = body.refresh_token;
            res.cookie("access_token", access_token, {
                domain: process.env.NODE_ENV === "production"
                    ? 'listr.eliaswambugu.com'
                    : "localhost",
            });
            res.redirect('http://' + process.env.CLIENT_URL +
                "/#" +
                new URLSearchParams({
                    access_token: access_token,
                    refresh_token: refresh_token,
                }).toString());
        }
        else {
            res.redirect("/#" +
                new URLSearchParams({
                    error: "invalid_token",
                }).toString());
        }
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map