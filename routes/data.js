const router = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../models');
const User = db.User;
const Data = db.Data;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', getData);
router.get('/daily', getDailyData);
router.put('/daily', updateDailyData);
router.get('/alldays', getAllData);

// gets the user data
async function getData(req, res) {
  const userGID = req.headers['x-wapp-user'];

  const userData = await User.findOne(
    {
      google_id: userGID,
    },
    {
      settings: true,
      schedule: true,
      _id: false,
    }
  ).catch(() => null);

  if (!userData) {
    console.log('error getting all user data');
  }
  res.status(200).json(userData);
}

// gets the data
async function getDailyData(req, res) {
  const userGID = req.headers['x-wapp-user'];

  const date = new Date();
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const userData = await Data.findOne({
    google_id: userGID,
    date: dateString,
  }).catch(()=>null);

  if (!userData) {
    console.log('error getting daily user data');
  }
  res.status(200).json(userData);
}

async function updateDailyData(req, res) {
  const userGID = req.headers['x-wapp-user'];
  const date = new Date();
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

console.log(req.body)

  await Data.updateOne(
    {
      google_id: userGID,
      date: dateString,
    },
    {
      progress: req.body.progress,
      weekday: date.getDay(),
      status: req.body.status,
    },
    { upsert: true }
  ).catch((err)=>console.log(err));

  res.status(201).send();
}

async function getAllData(req, res) {
  const userGID = req.headers['x-wapp-user'];

  const userData = await Data.find({
    google_id: userGID,
  }).catch(()=>null);

  if (!userData) {
    console.log('error getting daily user data for all days');
  }

  res.status(200).json(userData);
}

module.exports = router;
