const { unauthorized } = require('../utils');

async function validate(req, res, next) {
  // check the custom to see if
  const user = req.headers['X-WAPP-User'];

  if (user) {
    // call the database
    // check the expiration time
    // if soon to expire < 5minute
    // get the refresh token

    //

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
    });

    // then i get back the new data
    // update the database with the new access token + expiry date

    next();
  } else {
    unauthorized(res);
  }
}


module.exports = {validate}