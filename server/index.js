require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const code = req.body.code

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      const {expires_in, refresh_token, access_token } = data.body

      res.json({
        access_token,
        refresh_token,
        expires_in,
      })
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(process.env.PORT, console.log(`app listening on port ${process.env.PORT}`));
