const router = require('express').Router();
const bodyParser = require('body-parser');
const { parseToken } = require('../utils');
const axios = require('axios');
const jwt = require('jsonwebtoken')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', getProfile);

// parses authorization header for access token
// looks up user profile info
// sends it back
async function getProfile(req, res) {

    accessToken = parseToken(req);
    console.log(accessToken)

    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)

  res.status(200).json(userInfo.data)
}

module.exports = router;
