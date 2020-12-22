const router = require('express').Router();
const bodyParser = require('body-parser');
const { unauthorized } = require('../utils');
const axios = require('axios');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', getProfile);

// parses authorization header for access token
// looks up user profile info
// sends it back
async function getProfile(req, res) {
  // get the user id
  // look up access token

  const accessToken = 'ya29.a0AfH6SMDXTF7Cw_ZTyfa4iEHYN6Cgl0ArBbfB_Tf9vSQprcv_fQe8-kSdPM6zQbj4ELVoo477K87Qr8is7DwjzQVFYUWwzYq9WpvXX8yIGtNdDISQ6_ax1gwR2rUkmfjh31YoH_3aLQZ5xWm0QEw3Vq-eFYUWBE2LOAJFM7SYqvo';
  //

  const userInfo = await axios
    .get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    )
    .catch(() => null);

  if (!userInfo) {
    unauthorized(res);
  } else {
    console.log(userInfo.data);
    res.status(200).json(userInfo.data);
  }
}

module.exports = router;
