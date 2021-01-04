// DEPENDENCIES
const router = require('express').Router();
const bodyParser = require('body-parser');
const { unauthorized } = require('../utils');
const axios = require('axios');
// const mongoose = require('mongoose');
const db = require('../models');
const User = db.User;
const Scheduler = db.Scheduler;

// MIDDLEWARE
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
router.get('/', getProfile);
router.get('/settings', getSettings);
router.post('/settings', addSettings);
router.put('/settings', updateSettings);
router.delete('/reset', reset);

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
  )
    .limit(1)
    .catch(() => null);

  if (!findUser) {
    unauthorized(res);
  } else {
    // get the user's information
    const userInfo = await axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${findUser.access_token}`
      )
      .catch(() => null);

    if (!userInfo) {
      unauthorized(res);
    } else {
      res.status(200).json(userInfo.data);
    }
  }
}

async function getSettings(req, res) {
  const userGID = req.headers['x-wapp-user'];

  const userSettings = await User.findOne(
    {
      google_id: userGID,
    },
    { settings: true, _id: false }
  ).catch(() => null);

  if (!userSettings) {
    console.log('error getting user settings');
  }

  res.json(userSettings);
}

async function addSettings(req, res) {
  const userGID = req.headers['x-wapp-user'];
  const settings = req.body;
  // calculate + update the schedule
  const schedule = [];
  for (
    let i = req.body.startTime;
    i <= req.body.endTime;
    i += req.body.reminder
  ) {
    schedule.push(i);
  }

  //update the user's settings + schedule in the database
  await User.updateOne(
    {
      google_id: userGID,
    },
    {
      schedule,
      settings,
    }
  ).catch((err) => console.log(err));

  // update the schedule
  // Step 1
  // remove any previous instances of user in the schedule
  await Scheduler.updateMany(
    {},
    { $pull: { users: `${userGID}` } },
    { multi: true }
  ).catch((err) => console.log(err));

  // step 2
  // loop over their schedule, add them into each relevant time document's user array
  for (const reminderTime of schedule) {
    await Scheduler.updateOne(
      { time: reminderTime },
      { $addToSet: { users: `${userGID}` } },
      { upsert: true }
    ).catch((err) => console.log(err));
  }

  res.status(201).send();
}

function updateSettings(req, res) {
  // const userGID = req.headers['x-wapp-user'];
  // User.findOne({
  //   google_id: userGID,
  // }).limit(1);
  // res.status(201).send();
}

async function reset(req, res) {
  const userGID = req.headers['x-wapp-user'];
  await User.findOne(
    {
      google_id: userGID,
    },
    {
      age: 25,
      weight: 50,
      height: 165,
      startTime: 900,
      endTime: 2200,
      reminder: 13,
    }
  ).catch((err) => console.log(err));
  res.status(204).send();
}

module.exports = router;
