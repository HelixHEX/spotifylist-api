"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const router = express_1.default.Router();
router.get('/me', (req, res) => {
    const access_token = req.query.access_token || null;
    if (access_token || access_token !== 'undefined') {
        var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
        };
        request_1.default.get(options, (error, response, body) => {
            if (error) {
                res.status(500).json({ error: "An error has occurred" });
            }
            else if (body.error) {
                res.status(body.error.status).json({ error: body.error.message });
            }
            else {
                res.status(200).json(body);
            }
        });
    }
    else {
        res.status(401).json({ message: "Not logged in" });
    }
});
router.get('/top-tracks', (req, res) => {
    const access_token = req.query.access_token || null;
    if (access_token || access_token !== 'undefined') {
        var options = {
            url: "https://api.spotify.com/v1/me/top/tracks",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
        };
        request_1.default.get(options, (error, _response, body) => {
            if (error) {
                res.status(500).json({ error: "An error has occurred" });
            }
            else {
                res.status(200).json(body);
            }
        });
    }
    else {
        res.status(401).json({ message: "Not logged in" });
    }
});
router.get('/top-artists', (req, res) => {
    const access_token = req.query.access_token || null;
    if (access_token || access_token !== 'undefined') {
        var options = {
            url: "https://api.spotify.com/v1/me/top/artists",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
        };
        request_1.default.get(options, (error, response, body) => {
            if (error) {
                res.status(500).json({ error: "An error has occurred" });
            }
            else {
                res.status(200).json(body);
            }
        });
    }
    else {
        res.status(401).json({ message: "Not logged in" });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map