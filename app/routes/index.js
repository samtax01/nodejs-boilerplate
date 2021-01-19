let router = require('express').Router();
let ApiResponse = require("../helpers/ApiResponse");

/**
 * Testing
 * http://localhost:5200/api/
 */
router.get('/', function (req, res) {
    res.json(ApiResponse.trueData("Api is working..."));
});


// Auth
router.use('/auth', require('./authRoute'));

// User
router.use('/users', require('./userRoute'));

module.exports = router;
