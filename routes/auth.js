// AUTH ROUTER

// DEPENDENCIES
const router = require('express').Router();
const bodyParser = require('body-parser');
const { oauth2Client, scopes, generateAuthUrl } = require('../constants');
const { parseToken } = require('../utils');
const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform'
});



// MIDDLEWARE
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
router.get('/', authorize);
router.post('/verify', verify);
router.put('/refresh', refresh)

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

async function refresh(req, res){
  // accessToken = parseToken(req);

    // access_token: 'ya29.a0AfH6SMBZ7yN3eeXsf46bYcTnjHSZ48wyioqwVufOLSMV8lUiKFwdH_r9Ov2PlpQwPr_Hn5L-0N6KzgoUwcRWB5epZeHUH3TeiBIfq-Z2aiTuiB-jzRvI41kBDLKPTz_lKlo4HeRcNZca9svqq6xMOv57Bkm-t0453ETZHyYeXpc',
    // refresh_token: '1//0doDNwSyfRrezCgYIARAAGA0SNwF-L9Irxm9Sjzn85shsLkr66t6rQM910fvGMucNwYZigvd_GOypgVrJVoCMKNJq7V-YkVzmoJo',
    // scope: 'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
    // token_type: 'Bearer',
    // id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhZGMxMDFjYzc0OThjMDljMDEwZGMzZDUxNzZmYTk3Yzk2MjdlY2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDc5ODUxOTk4Nzc1LXM4aHUxbmp2dGFvdmh1N3BnaTl0ZmdsOGRoYXZuNWIwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA3OTg1MTk5ODc3NS1zOGh1MW5qdnRhb3ZodTdwZ2k5dGZnbDhkaGF2bjViMC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNDkzNDc0NjM5NDE4MjgxODc3NSIsImVtYWlsIjoiZmluZWowMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjE0Z3ZwTjZZLVc5cU5uVi1YOWtFTGciLCJuYW1lIjoiSmVubnkgRiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHalI1YlZ5UC1LZDVWamxBckFkeTl1V0JxSFI3dlJOUGpLTm5PNTZ2UT1zOTYtYyIsImdpdmVuX25hbWUiOiJKZW5ueSIsImZhbWlseV9uYW1lIjoiRiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjA4NjAxODY0LCJleHAiOjE2MDg2MDU0NjR9.dOcoh0KYQ4cZGVvT_zRISlpP1ozu1DkouQeI1Uo6B1tlkbb4t71X57Reo0zPjLi5VvYr9WWXQjUrGBaW3cpWzx_OxUUhnCmizaL-Ovn6FKYO2vAXiriUYSjfPCnfJtRuriCBwfSU5OGebQago7X5zVo-ha6kuL8inEKN1FTDZMNNvpv_LLDYartHXbSOMSIMmmunOrsIzikwj6_0UaBpfD2-tAWWJnC8zuC9ykWmgnndsSmf6H9cniTTgJGjeMeA4bZz5b6r6tP-BLVLuTQxRNeppeiHTi8icodS1tv8he8h1tdVpcDmWFiYh9zud5K-rMPYHFHI4rR2FVfqRKuymQ',
    // expiry_date: 1608605464839


    const response = await axios({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: '1//0dNauiCHVZyBPCgYIARAAGA0SNwF-L9IrwnIepUbK1-wGDbaAyUZh0ECNNeKYUUqAP_c1sqRRjjb4qBC8CrwH24zycdlLtiueM7M',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });


    console.log(response)



}

module.exports = router;
