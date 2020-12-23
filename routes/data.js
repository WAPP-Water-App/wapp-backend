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
  );

  res.json(userData);
}

// gets the data
async function getDailyData(req, res) {

  console.log('endpoint reached')
  const userGID = req.headers['x-wapp-user'];

  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

  const userData = await Data.findOne({
    google_id: userGID,
    date: dateString
  });

  console.log(userData)

  res.status(200).json(userData);
}

async function updateDailyData(req, res) {
  const userGID = req.headers['x-wapp-user'];
  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`


  console.log(req.body)

  await Data.updateOne(
    {
      google_id: userGID,
      date: dateString
    },
    { progress: req.body.progress, weekday: date.getDay(), status: req.body.status },
    { upsert: true }
  );


  res.status(201).send();
}

module.exports = router;
