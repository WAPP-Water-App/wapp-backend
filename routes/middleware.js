require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const { unauthorized } = require('../utils');
// const mongoose = require('mongoose');
const db = require('../models');
const User = db.User;

async function validate(req, res, next) {
  // check the headers to see if they have a user session id

  const userGID = req.headers['x-wapp-user'];
  // if valid, find them in the db based on their google id
  if (userGID) {
    const getUser = await User.findOne(
      {
        google_id: userGID,
      },
      { expiry_date: true, refresh_token: true, _id: false }
    )
      .limit(1)
      .catch(() => null);

    console.log('getting user', getUser);
    if (getUser) {
      // compare the current and expiry date
      const expiryDate = new Date(getUser.expiry_date).valueOf();
      const currentDate = new Date().valueOf();

      // 5 minutes until expiry
      const minutes = 5;
      // if expiry date is less than 5 minutes
      // refresh their token
      if (expiryDate - currentDate < minutes * 60 * 1000) {
        refresh(userGID, getUser.refresh_token);
      }
    }
    next();
  } else {
    unauthorized(res);
  }
}

async function refresh(userGID, refreshToken) {
  const response = await axios({
    method: 'POST',
    url: 'https://oauth2.googleapis.com/token',
    data: qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).catch((err) => console.log(err));

  if (response) {
    // calculate new expiration time
    const expiryDate = new Date();
    // add the # of seconds until it expires
    expiryDate.setSeconds(expiryDate.getSeconds() + response.data.expires_in);

    await User.updateOne(
      { google_id: userGID },
      {
        access_token: response.data.access_token,
        id_token: response.data.id_token,
        expiry_date: expiryDate.valueOf(),
      }
    ).catch((err) => console.log(err));
  }
}

module.exports = { validate };
