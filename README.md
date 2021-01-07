# WAPP - Water App API 💧
## Hydration Life Coach
A web app that helps you track, calculate, schedule, and manage when to hydrate. Test it out at 👉 [https://wapp-water.herokuapp.com/](https://wapp-water.herokuapp.com/).

## APIs
> - 🎨 [Google OAuth](https://console.developers.google.com/)

## Instructions:
> 1.  Installation: No installation needed. This is a backend API
> 2.  To clone: clone to local repo, install dependencies with `npm i`, and make your .env file look like:
```text
CLIENT_ID=<google client_id>
CLIENT_SECRET=<google client secret>
REDIRECT_URI=<google redirect uri>
MONGO_URI=<connection to mongodb>
```

### Packages:
> - `axios`
> - `body-parser`
> - `cors`
> - `cron`
> - `dotenv`
> - `express`
> - `google-auth-library`
> - `googleapis`
> - `jsonwebtoken`
> - `mongoose`
> - `node`
> - `qs`

# CODE SNIPPETS

### Model Setup 🧱
Our web app interacts with a single `User`. Although relational data is minimal, to procedurally store, send, and update data for the concept of a single day, we needed to create two tables and document types that process different data points for a user in different ways.

The `User` model contains documents that each pertain to a unique user of the app. This document keeps basic info such as their google authentication data and their individual settings.

```javascript
const userSchema = new Schema({
    google_id: String,
    access_token: String,
//...
})
```

In order to keep our concept of "data by the day", we needed a way to dynamically store and lookup data by `date`, which would not have flowed easily if we had attempted to nest it within the `User` model. The `Data` model solves that issue by creating a new `daily data` document for each `User` each day.

```javascript
const dataSchema = new Schema({
    google_id: String,
    date: Date,
    progress: Number,
//...
})
```
### Google Oauth

Like most oauth flows, Google Oauth will allow users to sign in with their google account. For Wapp, we only needed basic profile information, so no further scopes were needed. And as usual, once a user authorizes they are sent back with a `code` which we then use to make a call to Google's API in order to receive their `access token`, `refresh token`...etc.

```javascript
// require the token
const { tokens } = await oauth2Client
    .getToken(req.body.code)
    .catch(() => null);

  // get the user data
  const userInfo = await axios
    .get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    )
    .catch(() => null);
```

### Validation

Validation on routes is currently limited to ensuring that a `user` is logged into the app when any API calls from the app are made. We do this by requiring a unique header called `x-wapp-user` which passes their unique `googleID` back to us each time a call to a protected API route is made. Without the header, we will not send back any data.

```javascript
async function validate(req, res, next) {
  // check the headers to see if they have a user session id

  const userGID = req.headers['x-wapp-user'];
  // if valid, find them in the db based on their google id
  if (userGID) {
      //...
```

### Profile & Data Endpoints
The API endpoints for getting `user profile` and `user data` information are all contained within the `data` and `profile` routes. These are basic `get`, `put`, `post`, `delete` routes that retrive and update a user's data and settings in the database.

```javascript
router.use('/profile', validate, require('./profile'));
router.use('/data', validate, require('./data'));
```


