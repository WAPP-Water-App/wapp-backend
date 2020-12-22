const router = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../models');
const User = db.User;
const Data = db.Data;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', getData)

// gets the data
async function getData(req, res){

    const userGID = req.headers['x-wapp-user'];

    const userData = await Data.findAll(
        {
          google_id: userGID,
        }
      )

    res.json(userData)
}




module.exports = router;
