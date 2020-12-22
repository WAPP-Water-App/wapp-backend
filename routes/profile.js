// DEPENDENCIES
const router = require('express').Router();
const bodyParser = require('body-parser');
const { unauthorized } = require('../utils');
const axios = require('axios');
// const mongoose = require('mongoose');
const db = require('../models');
const User = db.User;

// MIDDLEWARE
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
router.get('/', getProfile);
router.get('/settings', getSettings);
router.post('/settings', addSettings);
router.put('/settings', updateSettings);
router.delete('/settings', clearSettings);

// FUNCTIONS

// parses authorization header for access token
// looks up user profile info
// sends it back
async function getProfile(req, res) {
  // get the user id
  const userGID = req.headers['x-wapp-user'];
  // look up access token in the db
  const findUser = await User.findOne(
    {
      google_id: userGID,
    },
    { access_token: true, _id: false }
  ).limit(1);

  // get the user's information
  const userInfo = await axios
    .get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${findUser.access_token}`
    )
    .catch(() => null);

  console.log(userInfo);

  if (!userInfo) {
    unauthorized(res);
  } else {
    res.status(200).json(userInfo.data);
  }
}

async function getSettings(req, res) {
  const userGID = req.headers['x-wapp-user'];

  const userSettings = await User.findOne(
    {
      google_id: userGID,
    },
    { settings: true, _id: false }
  );

console.log(userSettings)


  res.json(userSettings);
}

function addSettings(req, res) {
  const userGID = req.headers['x-wapp-user'];

  //get incoming form data here

  User.findOne(
    {
      google_id: userGID,
    },
    { access_token: true, _id: false }
  ).limit(1);

  res.status(201).send();
}

function updateSettings(req, res) {
  const userGID = req.headers['x-wapp-user'];

  User.findOne({
    google_id: userGID,
  }).limit(1);

  res.status(201).send();
}

function clearSettings(req, res) {
  const userGID = req.headers['x-wapp-user'];
  User.findOne(
    {
      google_id: userGID,
    }
    //set default settings here
  ).limit(1);

  res.status(204).send();
}

module.exports = router;
