// AUTH ROUTER

// DEPENDENCIES
const router = require('express').Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const { oauth2Client, generateAuthUrl } = require('../constants');
const db = require('../models');
const User = db.User;

// MIDDLEWARE
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
router.get('/', authorize);
router.post('/verify', verify);
router.put('/refresh', refresh);

// FUNCTIONS

// User is sent from the login screen, and we redirect to the google auth page
function authorize(req, res) {
  res.redirect(generateAuthUrl());
}

// Code is sent from the react callback page, and we exchange the code for the user's access token
async function verify(req, res) {
  const { tokens } = await oauth2Client
    .getToken(req.body.code)
    .catch(() => null);

  // get the user data
  const userInfo = await axios
    .get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    )
    .catch(() => null);

  if (!userInfo) {
    console.log('error getting user');
  } else {
    // if
    // add the user to the database
    const findUser = await User.findOne({
      google_id: userInfo.data.sub,
    });

    if (!findUser) {
      User.create({
        google_id: userInfo.data.sub,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        id_token: tokens.id_token,
        expiry_date: tokens.expiry_date,
        settings: {
          age: 25,
          weight: 50,
          height: 165,
          startTime: 9,
          endTime: 22,
          reminder: 1,
        },
      });
    }

    //send back the google_id
    res.status(200).json(userInfo.data.sub);
  }
}

async function refresh(req, res) {
  const response = await axios({
    method: 'POST',
    url: 'https://oauth2.googleapis.com/token',
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token:
        '1//0dNauiCHVZyBPCgYIARAAGA0SNwF-L9IrwnIepUbK1-wGDbaAyUZh0ECNNeKYUUqAP_c1sqRRjjb4qBC8CrwH24zycdlLtiueM7M',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).catch(() => null);
}

module.exports = router;
