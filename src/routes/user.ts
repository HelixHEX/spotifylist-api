import express from 'express';
import request from 'request';

const router = express.Router();

router.get('/me', (req: express.Request, res: express.Response) => {
  const access_token = req.query.access_token || null;
  if (access_token || access_token !== 'undefined') {
    var options = {
      url: "https://api.spotify.com/v1/me",
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };
  
    request.get(options, (error, response, body) => {
      if (error) {
        res.status(500).json({ error: "An error has occurred" });
      } else if (body.error) {
        res.status(body.error.status).json({ error: body.error.message });
      } else {
        res.status(200).json(body);
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
})

//get top tracks
router.get('/top-tracks', (req: express.Request, res: express.Response) => {
  const access_token = req.query.access_token || null;
  if (access_token || access_token !== 'undefined') {
    var options = {
      url: "https://api.spotify.com/v1/me/top/tracks",
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };
    
    request.get(options, (error, _response, body) => {
      if (error) {
        res.status(500).json({ error: "An error has occurred" });
      } else {
        res.status(200).json(body);
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
})

router.get('/top-artists', (req: express.Request, res: express.Response) => {
  const access_token = req.query.access_token || null;
  if (access_token || access_token !== 'undefined') {
    var options = {
      url: "https://api.spotify.com/v1/me/top/artists",
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };
    
    request.get(options, (error, response, body) => {
      
      if (error) {
        res.status(500).json({ error: "An error has occurred" });
      } else {
        res.status(200).json(body);
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
})

export default router