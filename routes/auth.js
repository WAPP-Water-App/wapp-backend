// AUTH ROUTER

// DEPENDENCIES
const router = require('express').Router();
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { oauth2Client, scopes, generateAuthUrl } = require('../constants');

// MIDDLEWARE
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
router.get('/', authorize);
router.post('/verify', verify);

// FUNCTIONS

// User is sent from the login screen, and we redirect to the google auth page
function authorize(req, res) {
  res.redirect(generateAuthUrl());
}


// Code is sent from the react callback page, and we exchange the code for the user's access token
async function verify(req, res) {

  const { tokens } = await oauth2Client.getToken(req.body.code);

  console.log(tokens);
  console.log(tokens.access_token)


  res.json({accessToken: tokens.access_token, jwt: tokens.id_token})
}

module.exports = router;
