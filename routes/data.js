const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', getData)


function getData(req, res){


    // send all the fucking data, we'll parse it in react
    res.send('hello')
}




module.exports = router;
